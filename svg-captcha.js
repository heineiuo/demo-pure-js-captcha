const captcha = require('svg-captcha')
const express = require('express')
const morgan = require('morgan')

const captchTokens = {}

const app = express()

app.use(morgan('dev'))
app.get('/captcha', (req, res, next) => {
  const { id } = req.query
  const { data, text } = captcha.create()
	captchTokens[id] = text
	res.type('svg')
	res.status(200).send(data)
})
app.get('/verify', (req, res, next) => {
  const { id, token } = req.query
  res.json({
    verified: captchTokens[id] === token
  })
})

app.listen(8080, () => console.log('Running on port 8080'))
