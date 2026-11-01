const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const videoPath = path.join(__dirname, "public/assets/videos/gallery-hero.mp4");
const optimizedPath = path.join(
  __dirname,
  "public/assets/videos/gallery-hero-optimized.mp4",
);

let ffmpegPath;
try {
  ffmpegPath = require("ffmpeg-static");
} catch (e) {
  console.log(
    "ffmpeg-static not found. Installing temporarily in project directory...",
  );
  execSync("npm install --no-save ffmpeg-static@5.2.0", { stdio: "inherit" });
  ffmpegPath = require("ffmpeg-static");
}

console.log("ffmpeg binary located at:", ffmpegPath);

async function optimizeVideo() {
  if (!fs.existsSync(videoPath)) {
    console.error("Source video does not exist at:", videoPath);
    return;
  }

  console.log("Starting video optimization...");
  console.log(
    "Source size:",
    (fs.statSync(videoPath).size / 1024 / 1024).toFixed(2),
    "MB",
  );


  const command = `"${ffmpegPath}" -y -i "${videoPath}" -vf "scale=640:-2"
-vcodec libx264
-crf 38
-preset slow
-an
-movflags +faststart "${optimizedPath}"`;

  console.log("Running ffmpeg command:", command);

  try {
    execSync(command, { stdio: "inherit" });

    // Replace original video with optimized video
    if (fs.existsSync(optimizedPath)) {
      console.log("Optimization complete!");
      console.log(
        "Optimized size:",
        (fs.statSync(optimizedPath).size / 1024 / 1024).toFixed(2),
        "MB",
      );

      // Rename files: keep original as backup if needed, or overwrite
      fs.renameSync(
        videoPath,
        path.join(__dirname, "public/assets/videos/gallery-hero-original.mp4"),
      );
      fs.renameSync(optimizedPath, videoPath);
      console.log("Replaced original video with optimized web version.");
    }
  } catch (err) {
    console.error("Failed to run ffmpeg optimization:", err);
  }
}

optimizeVideo().catch(console.error);
