// Made for use when downloading images,
// but like... why? In this app we just
// need to pass the image url on to the
// img element and it will do work...
export const getImageFromBlob = (blob) => {
  fetch('/images/editor-placeholder-image.png')
    .then((response) => response.blob())
    .then((imageBlob) => {
      return URL.createObjectURL(imageBlob)
    })
}
