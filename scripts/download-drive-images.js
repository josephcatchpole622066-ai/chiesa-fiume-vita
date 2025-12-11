import fs from "fs";
import path from "path";
import { google } from "googleapis";

// Inserisci qui il contenuto del service account JSON
const SERVICE_ACCOUNT = {
  type: "service_account",
  project_id: "ultra-path-465914-f3",
  private_key_id: "c7c228d88492bbb045261deb5a4749dfaa283086",
  private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCheD0Xn3Hzshnp\nE8LK+qo1wh3WGZniAHTDPpTugx6+5f8RxHre0t3GmOVPnPUgyf/n5vTlq58V8+jP\nQ4woLBaOTiQohuiCuwWhOaERc7uumbppFMyq97hbBU1gW9I8LoKFzxRv4DA1s4EJ\nE4wX8PsEhu+wymqbPqt9haPYX72LQHkKigk9lXfNTS61+6Zj84Wwf269cRJELDlC\nFgCGbm8DhM/w6fiqv2mn/R+FQmFlfEPgIzzYWN90RXeJExK64FVAh5TiJTmlhbsu\naCIjAiYFV7AA+b8pmrDGAQdgem5/KLS4N0o11VIzRxMUQosXhfPTz1TjJmgaJW0g\nRnEdfOlrAgMBAAECggEARdSAozM27jvTXcvIfczrCIWzLpDyzl0BIiDx+rZk+Qzx\ngwcUVkIeXFFqNkR8dFo3nFxzA9J1YeKSh/Q/7G2osZFUrNwvOL5WAHQyVqBVBf0A\ns4oluziXl3GTFX2QTauVkfXM8lcjsk23m6vC9eWnQT1z8mKPuSTguE+v3JcHG22u\nEekSrOdBP7ZnZ6cwlEStDng0uxR+j+Ha9fY+hAEz0esWzUdeoFSW5ThQfgQ5jNjL\nt5KENT1mrevsGQUksU51Y/AKyfb685bFQEvpu9FXqpqjJF3UAFr4xawKHucJWmQc\nyrspe3ZOFgcUQ2MPB+a4tICzySnXxOprixniRD7n6QKBgQDS7iKDO9Q8L8p5UIl3\nWwTaz4kI9JO8EgPUzV4liOzfbgQsT9+PdctuoMXKJzk9zbWXOg6CO4b9CVwhXLuI\nyTs89sGRrXJ2ymMgZQlOE689d9N2RzMcpvZO3PuoKxiUjELHSFi833CM47Jl3k6D\n9/PTGEp/3PdzrAryKyjpbASwEwKBgQDD+J3pPui8DSdhlsHllqp8++UH8wHyuTle\nwz5oB0uTcuHaRF8alle37/zNQWontytigNIBGVEK+82oH9tmiHBhUyryfct6n51G\nVCyFtNrdIujA6cUKsnNhdRL5/gaiub3ajT0PdhJ0K4kcz38Cef3Z+trN3NmhkJUy\n8TNSZFz8SQKBgDzj/9SQpfEF/tZMmJJ7FQixlqaeLDPDo5V//6ioQXEyikPcfvYk\nFCkIgnCcKBseUkiout1/n7VWSWFcKssPBGnR9gk+3+dI/5qvcCM47YK6H7JqVWf1\nDu+vPXrLjhn7758l1HAZtJ0Hck2UAmh4YMvUnFUTDeA3jyVfrjzMMQI/AoGBAJcx\nPpNvR5ueAl4WM63v2cTnikHhyAT9xjdIJuOXjUVLAtikm0Ml7rMoYj/xUfcmKECs\n5liWsaHptzcYrOqkJR/RTHcdelk2v948nsThTWICxtPfB3hDSSVNb8CTrYbqCoGN\nKii9jWs3E2e45mKAv8rm8NyWoQk3RQSydkgAyoSRAoGBAIRp84lSrOIhnCj2mgh8\nswc+Uvc1HTQsc6yhsZLL5mz3HcCJ4P02ZQgxDndtqXtf5LcCULMTm5Y8930D+/fz\nmlvHgyztH2il87PDZXylTvg2ZqxF6sO0K272k4fvlV27kI/5kES2I1bMvNe/+eu5\n1tRsZESjMIsC0GeDcwTbhU2g\n-----END PRIVATE KEY-----\n`,
  client_email: "jos-467@ultra-path-465914-f3.iam.gserviceaccount.com",
  client_id: "109911858760185815262",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/jos-467%40ultra-path-465914-f3.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

const FOLDER_ID = "19jb6R3X73YobIw9Em3_4OsKP1BiDkLP2";
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function main() {
  const auth = new google.auth.GoogleAuth({
    credentials: SERVICE_ACCOUNT,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  const drive = google.drive({ version: "v3", auth });

  // 1. List all folders in the main folder
  const folderRes = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id, name)",
    pageSize: 100,
  });
  const folders = folderRes.data.files;
  if (!folders || folders.length === 0) {
    console.log("No folders found in the Drive folder.");
    return;
  }
  const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
  if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR);

  const VIDEOS_DIR = path.join(PUBLIC_DIR, "videos");
  if (!fs.existsSync(VIDEOS_DIR)) fs.mkdirSync(VIDEOS_DIR);

  for (const folder of folders) {
    // Se è la cartella "Il futuro", scarica video e immagini
    if (folder.name === "Il futuro") {
      console.log(`\n🏗️ Processing "Il futuro" folder: ${folder.name}`);

      // Lista tutti i file (video e immagini) in questa cartella
      const filesRes = await drive.files.list({
        q: `'${folder.id}' in parents and trashed = false`,
        fields: "files(id, name, mimeType)",
        pageSize: 1000,
      });
      const files = filesRes.data.files;

      if (!files || files.length === 0) {
        console.log(`No files found in folder ${folder.name}`);
      } else {
        // Separa video e immagini
        const videos = files.filter(f => f.mimeType.includes('video/'));
        const images = files.filter(f => f.mimeType.includes('image/'));

        // Scarica il video come futuro-hero.mp4
        if (videos.length > 0) {
          const videoFile = videos[0];
          const destPath = path.join(VIDEOS_DIR, "futuro-hero.mp4");
          const dest = fs.createWriteStream(destPath);
          console.log(`📹 Downloading video ${videoFile.name} as futuro-hero.mp4...`);

          await drive.files
            .get({ fileId: videoFile.id, alt: "media" }, { responseType: "stream" })
            .then((res) => {
              return new Promise((resolve, reject) => {
                res.data
                  .on("end", () => {
                    console.log(`✅ Downloaded video: futuro-hero.mp4`);
                    resolve();
                  })
                  .on("error", (err) => {
                    console.error(`Error downloading ${videoFile.name}:`, err);
                    reject(err);
                  })
                  .pipe(dest);
              });
            });
        }

        // Scarica le immagini nella cartella images/Il futuro
        if (images.length > 0) {
          const localFolder = path.join(IMAGES_DIR, folder.name);
          if (!fs.existsSync(localFolder)) fs.mkdirSync(localFolder);

          for (const file of images) {
            const destPath = path.join(localFolder, file.name);
            const dest = fs.createWriteStream(destPath);
            console.log(`🖼️ Downloading image ${file.name}...`);

            await drive.files
              .get({ fileId: file.id, alt: "media" }, { responseType: "stream" })
              .then((res) => {
                return new Promise((resolve, reject) => {
                  res.data
                    .on("end", () => {
                      console.log(`✅ Downloaded: ${file.name}`);
                      resolve();
                    })
                    .on("error", (err) => {
                      console.error(`Error downloading ${file.name}:`, err);
                      reject(err);
                    })
                    .pipe(dest);
                });
              });
          }
        }
      }
      continue; // Salta il resto del ciclo per la cartella "Il futuro"
    }

    // Se è la cartella Video, scarica in public/videos
    if (folder.name.toLowerCase() === "video") {
      console.log(`\n🎥 Processing video folder: ${folder.name}`);

      // Lista tutti i video in questa cartella
      const videoRes = await drive.files.list({
        q: `'${folder.id}' in parents and mimeType contains 'video/' and trashed = false`,
        fields: "files(id, name, mimeType)",
        pageSize: 1000,
      });
      const videos = videoRes.data.files;

      if (!videos || videos.length === 0) {
        console.log(`No videos found in folder ${folder.name}`);
      } else {
        // Prendi il primo video e salvalo come hero-background.mp4
        const file = videos[0];
        const destPath = path.join(VIDEOS_DIR, "hero-background.mp4");
        const dest = fs.createWriteStream(destPath);
        console.log(`Downloading ${file.name} as hero-background.mp4...`);

        await drive.files
          .get(
            {
              fileId: file.id,
              alt: "media",
            },
            { responseType: "stream" }
          )
          .then((res) => {
            return new Promise((resolve, reject) => {
              res.data
                .on("end", () => {
                  console.log(`✅ Downloaded: hero-background.mp4`);
                  resolve();
                })
                .on("error", (err) => {
                  console.error(`Error downloading ${file.name}:`, err);
                  reject(err);
                })
                .pipe(dest);
            });
          });
      }
      continue; // Salta il resto del ciclo per la cartella Video
    }

    // Processa cartelle immagini normalmente
    const localFolder = path.join(IMAGES_DIR, folder.name);
    if (!fs.existsSync(localFolder)) fs.mkdirSync(localFolder);
    console.log(`\n📁 Processing folder: ${folder.name}`);
    // 2. List all images in this folder
    const imgRes = await drive.files.list({
      q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: "files(id, name, mimeType)",
      pageSize: 1000,
    });
    const images = imgRes.data.files;
    if (!images || images.length === 0) {
      console.log(`No images found in folder ${folder.name}`);
      continue;
    }
    for (const file of images) {
      const destPath = path.join(localFolder, file.name);
      const dest = fs.createWriteStream(destPath);
      console.log(`Downloading ${file.name} to ${folder.name}...`);
      await drive.files
        .get(
          {
            fileId: file.id,
            alt: "media",
          },
          { responseType: "stream" }
        )
        .then((res) => {
          return new Promise((resolve, reject) => {
            res.data
              .on("end", () => {
                console.log(`Downloaded: ${file.name}`);
                resolve();
              })
              .on("error", (err) => {
                console.error(`Error downloading ${file.name}:`, err);
                reject(err);
              })
              .pipe(dest);
          });
        });
    }
  }
  console.log("\n✅ All images and videos downloaded to /public");
}

main().catch((err) => {
  console.error("❌ Error:", err);
});
