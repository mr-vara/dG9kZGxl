/**
 * Service to deal with Image Operations
 */
const Jimp = require("jimp")

module.exports = {
    resize
};

/**
 * Function to read image from given URL and return resized thumbnail
 * @param {*} url Remote URL of the image
 * @param {*} res Represents HTTP Response
 */
async function resize(url) {
    const image = await Jimp.read(url);
    return new Promise((resolve, reject) => {
        image.resize(50, 50).getBase64(Jimp.AUTO, function(err, img64) {
            if (err) return reject(err);
            resolve('<img src="'+img64+'">');
        });
    });
}
