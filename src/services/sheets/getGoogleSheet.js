export const getGoogleSheet = async (sheetId) => {
  const response = await fetch(`/api/v0/getGoogleSheet?sheetId=${sheetId}`)
  const json = await response.json()
  return json
}
