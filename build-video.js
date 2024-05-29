const path = require('path');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const FFmpeg = require('fluent-ffmpeg');

FFmpeg.setFfmpegPath(ffmpegPath);

// Array of GIF files
const gifFiles = [
  'error.gif',
  'no_data.gif',
  'preloader2.gif',
];

function convertToVideo(gifFilename) {
  const gify = new FFmpeg({
    source: path.resolve(__dirname, 'src/public/images', gifFilename),
  });

  gify.clone()
    .withVideoCodec('libx264')
    .withFps(25)
    .toFormat('mp4')
    .saveToFile(path.resolve(__dirname, 'src/public/images', `${gifFilename.split('.')[0]}.mp4`));

  gify.clone()
    .withFps(25)
    .toFormat('webm')
    .saveToFile(path.resolve(__dirname, 'src/public/images', `${gifFilename.split('.')[0]}.webm`));
}

gifFiles.forEach((gifFile) => {
  convertToVideo(gifFile);
});
