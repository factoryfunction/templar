// Utility for encoding an uploaded file to base64.
// Created with fonts in mind, but may work for other
// uploaded files.
export const encodeUploadToBase64 = (file) => {
  const reader = new FileReader()

  return new Promise((resolve) => {
    const onBase64 = async (base64) => {
      resolve(base64)
    }

    reader.addEventListener('load', onBase64)
    reader.readAsDataURL(file)
  })
}
