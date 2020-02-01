const { buffer, text, json } = require('micro')
const microCors = require('micro-cors')

const cors = microCors({ allowMethods: ['PUT', 'POST', 'OPTIONS'] })

module.exports = cors(async (req, res) => {
  const requestJson = await json(req)
  console.log(requestJson)
  return { success: true }
})
