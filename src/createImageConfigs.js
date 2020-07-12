const fs = require('fs');
const Jimp = require('jimp');
const svg2png = require('svg2png');

const assets = ['./src/assets'];
const outputDir = './src/tmp';
const maxWidth = 15;
const validExtensions = /\.(gif|jpg|jpeg|tiff|png)$/i;
const svgExtension = /\.(svg)$/i;
const promises = [];
const items = [];

function run() {
  assets.forEach((assetDir) => {
    fs.readdirSync(assetDir).forEach((file) => {
      const path = `${assetDir}/${file}`;
      if (file.match(validExtensions)) {
        createConfig(path, getItemPath(path));
      } else if (file.match(svgExtension)) {
        const file = fs.readFileSync(path);
        const tempPromise = new Promise((res, rej) => {
          svg2png(file, {
            width: maxWidth,
          }).then((buffer) => {
            createConfig(buffer, getItemPath(path))
              .then(() => res())
              .catch(() => rej());
          });
        });
        promises.push(tempPromise);
      }
    });
  });

  Promise.all(promises).then(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    const outputPath = `${outputDir}/assets.json`;
    fs.writeFileSync(outputPath, JSON.stringify(items, null, 4));
    console.log(`Image configs have been written to: ${outputPath}`);
  });
}

function getItemPath(path) {
  return path.replace('./src', '');
}

function createConfig(image, itemPath) {
  const tempPromise = new Promise((res, rej) => {
    Jimp.read(image).then((img) => {
      const width = img.bitmap.width;
      const height = img.bitmap.height;
      const mime = img.getMIME();
      img.resize(maxWidth, Jimp.AUTO);
      img.getBuffer(mime, (err, buffer) => {
        const data = buffer.toString('base64');
        const dataString = buildDataString(mime, data);
        const imgConfig = {
          src: itemPath,
          width: width,
          height: height,
          data: dataString,
        };
        items.push(imgConfig);
        res();
      });
    });
  });
  promises.push(tempPromise);
  return tempPromise;
}

function buildDataString(mime, encodedString) {
  return `data:${mime};base64,${encodedString}`;
}

run();
