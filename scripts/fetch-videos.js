import fs from "fs";

const API_KEY = "AIzaSyDxL-zPcTV4WyrbejEZ2iNXMORWbSbwySI";
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

    if (!data.items) break;

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
  return videos.filter((video) => {
    const titleLower = video.title.toLowerCase();
    return (
      !titleLower.includes("nati di nuovo") &&
      !titleLower.includes("canto") &&
      !titleLower.includes("cantico") &&
      !titleLower.includes("lode") &&
      !titleLower.includes("adorazione") &&
      !titleLower.includes("worship")
    );
  });
}

function filterTestimonials(videos) {
  return videos.filter((video) => {
    const titleLower = video.title.toLowerCase();
    return (
      titleLower.includes("nati di nuovo") &&
      !titleLower.includes("canto") &&
      !titleLower.includes("cantico") &&
      !titleLower.includes("lode") &&
      !titleLower.includes("adorazione") &&
      !titleLower.includes("worship")
    );
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
