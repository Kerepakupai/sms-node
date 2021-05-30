const { Router } = require('express')
const router = Router()

const { indexController, sendMessageController, receiveMessage } = require('../controllers/index.controller')

router.get('/', indexController)

router.post('/send-sms', sendMessageController)

router.post('/sms', receiveMessage)

module.exports = router
