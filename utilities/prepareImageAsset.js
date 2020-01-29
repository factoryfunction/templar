export const prepareFontAsset = (file) => {
  const reader = new FileReader()

  return new Promise((resolve) => {
    const onBase64 = async () => {
      resolve()
    }

    reader.addEventListener('load', onBase64)
    reader.readAsDataURL(file)
  })
}

export const loadFont = async (name, url) => {
  const font = new FontFace(name, `url("${url}")`)
  await font.load()
  document.fonts.add(font)
}
