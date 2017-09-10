const fs = require('fs');
const encoder = require('base64-img');
const Jimp = require('jimp');

const assets = './src/assets';
const validExtensions = /\.(gif|jpg|jpeg|tiff|png)$/i;
const promises = [];
const items = [];

fs.readdirSync(assets).forEach(item => {
    if (item.match(validExtensions)) {
        const tempPromise = new Promise((res, rej) => {
            const path = `${assets}/${item}`;
            Jimp.read(path).then(img => {
                const width = img.bitmap.width;
                const height = img.bitmap.height;
                const mime = img.getMIME();

                img.resize(25, Jimp.AUTO);
                img.getBuffer(mime, (err, buffer) => {
                    const data = buffer.toString('base64');
                    const dataString = buildDataString(mime, data);
                    const imgConfig = {
                        src: `/assets/${item}`,
                        width: width,
                        height: height,
                        data: dataString
                    };
                    items.push(imgConfig);
                    res();
                });
            })
        })
        promises.push(tempPromise);
    }
});

Promise.all(promises).then(() => {
    console.log(JSON.stringify(items, null, 4));
})



function buildDataString(mime, encodedString) {
    return `data:${mime};base64,${encodedString}`;
}
