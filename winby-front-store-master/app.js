'use strict'
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const app = express()
const { join } = require('path')
const Links = require('./utils/Links')
const BodyParser = require('body-parser')
var cors = require('cors')
Links()

// Middlewares
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(express.static(join(__dirname, './public')))
app.use(require('./metas/DetailProducts'))
app.use(require('./metas/DetailServices'))
app.use(require('./metas/Home'))
app.use('/compra', require('./post'))

// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
//       if (err) {
//         res.status(500).send(err)
//       }
//     })
//   })
app.listen(process.env.PORT || 5002)