/* ------- Libraries ------ */
const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();

/* ----- Env variables ---- */
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN =
  process.env.CORS_ORIGIN ||
  "http://localhost:9000";

/* ------------------------ */
/*    CORS configuration    */
/* ------------------------ */
const corsOptions = {
  origin: CORS_ORIGIN,
};
app.use(cors(corsOptions));

/* ------------------------ */
/*    File Storage Config   */
/* ------------------------ */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./server/uploads/");
  },
  filename: function (req, file, cb) {
    // Sanitize the file name
    const safeFileName =
      file.originalname.replace(
        /[^a-zA-Z0-9.]/g,
        "_"
      );
    cb(
      null,
      `${
        file.fieldname
      }-${Date.now()}${path.extname(
        safeFileName
      )}`
    );
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: fileFilter,
});

/* ------------------------ */
/*      Upload endpoint     */
/* ------------------------ */
app.post(
  "/upload",
  upload.single("file"),
  (req, res) => {
    res
      .status(200)
      .send("File uploaded successfully!");
  },
  (error, req, res, next) => {
    console.error(
      "Error during file upload:",
      error
    );
    res
      .status(500)
      .send(
        error.message || "Error uploading file"
      );
  }
);

/* ------------------------ */
/*     Start the server     */
/* ------------------------ */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
