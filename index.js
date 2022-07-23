const tesseract = require('node-tesseract-ocr');
const fs = require('fs');

const CONFIG = {
    lang: 'eng',
    oem: 1,
    psm: 3
};
const OUTPUT_FILE = 'output.txt';

function run() {
    if (process.argv.length !== 3) {
        console.error('Pass in the path to one image.');
        process.exit();
    }
    const imgPath = process.argv[2];
    console.info(`About to OCR ${imgPath}`);
    if (!fs.existsSync(imgPath)) {
        console.error(`${imgPath} is not a valid path.`);
        process.exit();
    }

    tesseract.recognize(imgPath, CONFIG)
    .then(text => {
        text = text.trim();
        if (text.length === 0) {
            console.error('Something went wrong becuase no text as found.');
            process.exit();
        }
        // If you want to massage your data, now's your chance
        // let text = rawText.replace(/\r\n/g, ' ');
        fs.writeFileSync(`./${OUTPUT_FILE}`, text);
        console.info(`Text written to ${OUTPUT_FILE}`);
    })
    .catch((error) => {
        console.log(error.message)
    });
}

run();