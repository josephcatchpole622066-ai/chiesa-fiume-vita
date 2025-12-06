import fs from "fs";

const API_KEY =
  process.env.VITE_YOUTUBE_API_KEY || "AIzaSyDxL-zPcTV4WyrbejEZ2iNXMORWbSbwySI";
const CHANNEL_ID = "UCGdxHNQjIRAQJ66S5bCRJlg";

async function fetchAllVideos() {
  const maxResults = 50;
  let allVideos = [];
  let nextPageToken = null;

  do {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=${maxResults}${
      nextPageToken ? "&pageToken=" + nextPageToken : ""
    }`;

    console.log("Fetching page...");
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("API Error:", data.error);
      throw new Error(data.error.message);
    }

    if (!data.items) {
      console.log("No items in response");
      break;
    }

    const videoIds = data.items.map((item) => item.id.videoId).join(",");
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=statistics`;
    const statsResponse = await fetch(statsUrl);
    const statsData = await statsResponse.json();

    const videos = data.items.map((item, index) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.default.url,
      publishedAt: item.snippet.publishedAt,
      embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
      views: parseInt(statsData.items[index]?.statistics?.viewCount || 0),
    }));

    allVideos = allVideos.concat(videos);
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return allVideos;
}

function filterSermons(videos) {
  // Estrai i campi e filtra
  return videos
    .filter((video) => {
      const descLower = video.description.toLowerCase();
      // INCLUDI SOLO i video che contengono "Predica domenicale" nella descrizione
      return descLower.includes("predica domenicale");
    })
    .map((video) => {
      // Parsing del titolo: "TITOLO | BRANO | PREDICATORE"
      const parts = video.title.split("|").map((p) => p.trim());
      let preacher = "";
      let scripture = "";
      let mainTitle = "";
      if (parts.length === 3) {
        mainTitle = parts[0];
        scripture = parts[1];
        preacher = parts[2];
      } else if (parts.length === 2) {
        mainTitle = parts[0];
        // Se il secondo è un nome, lo metto come preacher
        if (/^[A-Z][a-z]+( [A-Z][a-z]+)*$/.test(parts[1])) {
          preacher = parts[1];
        } else {
          scripture = parts[1];
        }
      } else {
        mainTitle = video.title;
      }
      // Playlist: cerca in descrizione, es: "Playlist: ..." oppure lascia vuoto
      let playlist = "";
      const playlistMatch = video.description.match(/playlist: ([^\n]+)/i);
      if (playlistMatch) {
        playlist = playlistMatch[1].trim();
      }
      return {
        ...video,
        mainTitle,
        preacher,
        scripture,
        playlist,
      };
    });
}
function filterTestimonials(videos) {
  return videos.filter((video) => {
    const titleLower = video.title.toLowerCase();

    // Deve contenere "nati di nuovo"
    if (!titleLower.includes("nati di nuovo")) {
      return false;
    }

    // Escludi shorts
    if (titleLower.includes("shorts") || titleLower.includes("#shorts")) {
      return false;
    }

    // Escludi canti
    if (
      titleLower.includes("canto") ||
      titleLower.includes("cantico") ||
      titleLower.includes("lode") ||
      titleLower.includes("adorazione") ||
      titleLower.includes("worship")
    ) {
      return false;
    }

    return true;
  });
}

(async () => {
  try {
    console.log("🎬 Fetching all videos from YouTube...");
    const allVideos = await fetchAllVideos();
    console.log(`✅ Total videos fetched: ${allVideos.length}`);

    const sermons = filterSermons(allVideos);
    const testimonials = filterTestimonials(allVideos);

    console.log(`📖 Sermons: ${sermons.length}`);
    console.log(`💬 Testimonials: ${testimonials.length}`);

    // Crea directory se non esiste
    if (!fs.existsSync("public/data")) {
      fs.mkdirSync("public/data", { recursive: true });
    }

    // Salva i dati
    fs.writeFileSync(
      "public/data/sermons.json",
      JSON.stringify(sermons, null, 2)
    );
    fs.writeFileSync(
      "public/data/testimonials.json",
      JSON.stringify(testimonials, null, 2)
    );
    fs.writeFileSync(
      "public/data/all-videos.json",
      JSON.stringify(allVideos, null, 2)
    );

    console.log("\n✅ Data saved successfully!");
    console.log("📁 Files created:");
    console.log("   - public/data/sermons.json");
    console.log("   - public/data/testimonials.json");
    console.log("   - public/data/all-videos.json");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
})();
