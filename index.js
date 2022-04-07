const tesseract = require('node-tesseract-ocr');

const CONFIG = {
    lang: 'eng',
    oem: 1,
    psm: 3
};

function run() {
    tesseract
    .recognize("images/11.png", CONFIG)
    .then((rawText) => {
        let text = rawText.replace(/\r\n/g, ' ');
      console.log(text);
    })
    .catch((error) => {
      console.log(error.message)
    });
}

run();