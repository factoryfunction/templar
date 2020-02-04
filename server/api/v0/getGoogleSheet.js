import fetch from 'node-fetch'

const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets'
const { GOOGLE_SHEETS_API_KEY } = process.env

const DEFAULT_OPTIONS = {
  sheetId: '',
}

const DEFAULT_HEADERS = {
  // Authorization: `Bearer ${options.token}`,
  'content-type': 'application/json',
}

const getGoogleSheetApiUrl = (options = DEFAULT_OPTIONS) => {
  return `${BASE_URL}/${options.sheetId}?key=AIzaSyBOVPyZk5hxaodNruXc5_KsOCueAGSoe3U&includeGridData=true`
}

const requestGoogleSheet = async (options) => {
  const url = getGoogleSheetApiUrl(options)

  try {
    const response = await fetch(url, {
      headers: DEFAULT_HEADERS,
    })

    const json = await response.json()
    return json
  } catch (error) {
    console.error(error)
    return error
  }
}

export default async (req, res) => {
  console.log(req.query)
  const sheet = await requestGoogleSheet(req.query)
  res.send(sheet)
}
