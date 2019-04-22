let express = require('express')
let login = require('./routes/login')
let register = require('./routes/register')
let getAuthCode = require('./routes/getAuthCode')

let router = express()

router.use(login)
router.use(register)
router.use(getAuthCode)

module.exports = router
