const express = require('express')
//const cors = require('cors')
const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
// app.use(cors(corsOptions))

const multiparyMiddleware = multiparty({ uploadDir: './uploads' })

app.post('/upload', multiparyMiddleware, 
    (req, res) => {
        const files = req.files
        res.json({ message: files })
    })

app.use((err, req, res, next) => res.json({ error: err.message }))

app.get('/downloadExcel', (req, res) => {
    res.download('./uploads/dividas.xlsx')
})

app.get('/downloadPdf', (req, res) => {
    res.download('./uploads/boleto.pdf')
})


app.listen(8000, () => {
    console.log('Server port 8000')
})