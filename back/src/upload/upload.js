const multer = require("multer");
const path = require('path');
 
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

//console.log("hello");
const storage = multer.diskStorage({
  
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Mime type invalide");
        if (isValid) {
            error = null;
        }
        cb(error, path.join(__dirname, '../../', 'images'));
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        console.log(file)
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});
 
module.exports = multer({ storage: storage }).fields([{ name: "Image" }]);