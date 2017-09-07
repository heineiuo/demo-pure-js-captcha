const captcha = require('trek-captcha')
const express = require('express')
const morgan = require('morgan')

const captchTokens = {

}
const app = express()

app.use(morgan('dev'))
app.get('/captcha', async (req, res, next) => {
  const { id } = req.query
  const { token, buffer } = await captcha({ size: 4 })
  captchTokens[id] = token
  res.write(buffer)
  res.end()
})
app.get('/verify', (req, res, next) => {
  const { id, token } = req.query
  res.json({
    verified: captchTokens[id] === token
  })
})

app.listen(8080, () => console.log('Running on port 8080'))
