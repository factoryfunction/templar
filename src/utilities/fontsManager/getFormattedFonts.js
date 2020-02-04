const getFontWeightsList = (font) => {
  return font.variants.filter((variant) => {
    return variant.match(/\d/) && variant.length === 3
  })
}

const getWeightStyles = (font, weight) => {
  const styles = font.variants.filter((variant) => {
    return variant.startsWith(weight) && variant.length > 3
  })

  return styles.map((style) => {
    return style.substr(3)
  })
}

const getFormattedFontWeights = (font) => {
  const allFontWeights = getFontWeightsList(font)
  const fontWeights = {}

  const hasRegularVariant = font.variants.includes('regular')
  const hasItalicVariant = font.variants.includes('italic')

  if (hasRegularVariant || hasItalicVariant) {
    fontWeights[400] = {}

    hasItalicVariant && (fontWeights[400].italic = font.files.italic)
    hasRegularVariant && (fontWeights[400].normal = font.files.regular)
  }

  for (const weight of allFontWeights) {
    const weightStyles = getWeightStyles(font, weight)
    fontWeights[weight] = {}
    fontWeights[weight].normal = font.files.regular

    for (const style of weightStyles) {
      fontWeights[weight][style] = font.files[weight + style]
    }

    if (font.variants.includes('italic')) {
      fontWeights[weight].normal = font.files[weight]
    }
  }

  return fontWeights
}

export const getFormattedFonts = (fonts) => {
  return fonts.map((font) => {
    const fontWeights = getFormattedFontWeights(font)

    return {
      family: font.family,
      category: font.category,
      variants: font.variants,
      files: font.files,
      fontWeights,
    }
  })
}

export const getFormattedFontsMap = (fonts) => {
  const formattedFonts = getFormattedFonts(fonts)

  return formattedFonts.map((font) => {
    return [font.family, font]
  })
}
