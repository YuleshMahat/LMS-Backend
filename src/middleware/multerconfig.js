import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets");
  },
  filename: function (req, file, cb) {
    cb(null, "image-" + Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });
