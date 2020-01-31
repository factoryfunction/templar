import ICONS_LIST from './line.json'

const UNICONS_ICON_LIST_URL = 'https://unicons.iconscout.com/release/v2.0.1/json/line.json'

const iconTagsMap = new Map()
const iconTags = []

ICONS_LIST.forEach((icon) => {
  const tagsString = icon.tags.join(',')
  iconTagsMap.set(tagsString, icon)
  iconTags.push(tagsString)
})
