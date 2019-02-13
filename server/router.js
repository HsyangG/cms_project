let express = require('express')
let login = require('./routes/login')
let register = require('./routes/register')

let router = express()

router.use(login)
router.use(register)

module.exports = router
