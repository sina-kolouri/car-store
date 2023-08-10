const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001
const token = 'sinakolouri'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const { username, password } = req.body
    if ('sinako' === username && '12345' === password) {
        res.send({
            success: true,
            data: token
        })
    }
    res.send({
        success: false,
        error: 'نام کاربری یا رمز عبور اشتباه است'
    })
})

app.get('/users/me', (req, res) => {
    const { authorization } = req.headers
    if (token === authorization) {
        res.send({
            success: true,
            data: {
                id: 1,
                username: 'sinako',
                email: 'sinakolouri@gmail.com',
                name: 'سینا'
            }
        })
    }
    res.send({
        success: false,
        error: 'توکن معتبر نیست'
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})