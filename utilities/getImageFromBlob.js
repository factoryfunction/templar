// import fetch from 'node-fetch'

const getImageFromBlob = (blob) => {
  // const img = document.createElement('img')
  // img.setAttribute('src', '/images/editor-placeholder-image.png')
  fetch('/images/editor-placeholder-image.png')
    .then((response) => response.blob())
    .then((imageBlob) => {
      const outside = URL.createObjectURL(imageBlob)
    })
}

export default getImageFromBlob
