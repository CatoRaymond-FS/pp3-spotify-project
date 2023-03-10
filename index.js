require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const spotify = require('./middlewares/spotify')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// This is a comment that references a ticket
// This is a new comment that closes a ticket
// This is a new comment that uses a Pull Request to close a ticket
app.use('/spotify/v1', spotify)

app.listen(3001)