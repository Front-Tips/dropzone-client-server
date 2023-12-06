/* ------- Libraries ------ */
import Dropzone from "dropzone";

/* --------- Style -------- */
import "../../../node_modules/dropzone/dist/dropzone.css";

/* -------- Helpers ------- */
import { appendFileStatus, updateFileStatus } from "./helpers";

/* -- Files Upload Rules -- */
const acceptedFileTypes = "image/jpeg, image/jpg, image/png, image/gif";
const maxFileSize = 1; // in MB

/* ------------------------ */
/*    Initialize Dropzone   */
/* ------------------------ */
new Dropzone("#upload-pictures", {
  url: "http://localhost:3000/upload",
  acceptedFiles: acceptedFileTypes,
  maxFilesize: maxFileSize,
  thumbnailWidth: 300,
  thumbnailHeight: 300,
  dictDefaultMessage: "Drop Images here",
  init: function () {
    /* ------------------------ */
    /*       File addition      */
    /* ------------------------ */
    this.on("addedfile", (file) => {
      appendFileStatus(file.name, "Added");
    });

    /* ------------------------ */
    /*     Successful upload    */
    /* ------------------------ */
    this.on("success", (file, response) => {
      console.log("File successfully uploaded:", response);
      updateFileStatus(file.name, "✅ Uploaded");
    });

    /* ------------------------ */
    /*       Upload error       */
    /* ------------------------ */
    this.on("error", (file, errorMessage) => {
      console.error("Error uploading file:", errorMessage);
      updateFileStatus(file.name, "❌ Error");
    });
  },
});
