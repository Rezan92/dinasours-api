const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dinoRouter = require('./dinosaur/router')
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use(dinoRouter)
app.listen(port, () => console.log(`Listening on port ${port}`))
