export const loadImageFromUrl = (url) => {
  return new Promise((resolve) => {
    const image = new window.Image()
    image.addEventListener('load', (event) => resolve([image, event]))
    image.src = url
  })
}
