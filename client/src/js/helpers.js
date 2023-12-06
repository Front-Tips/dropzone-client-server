/**
 * Append file status to the output element
 */
export const appendFileStatus = (
  fileName,
  status
) => {
  output.innerHTML += `<div id="${sanitize(
    fileName
  )}">${status}: ${fileName}</div>`;
};

/**
 * Update the status of a specific
 * file in the output element
 */
export const updateFileStatus = (
  fileName,
  status
) => {
  const fileStatusElement =
    document.getElementById(sanitize(fileName));
  if (fileStatusElement) {
    fileStatusElement.textContent = `${status}: ${fileName}`;
  }
};

/**
 * Sanitize file name to use as
 * a valid HTML element ID
 */
const sanitize = (fileName) => {
  return fileName
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();
};
