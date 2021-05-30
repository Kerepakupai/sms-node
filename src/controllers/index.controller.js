const MessagingResponse = require('twilio').twiml.MessagingResponse

const { twilioPhone } = require('../config')
const { sendMessage } = require('../twilio/send-sms')
const Sms = require('../models/sms')
const { getSocket } = require('../socket')

const indexController = async (req, res) => {
    const messages = await Sms.find().sort('-createdAt').lean()
   
    res.render('index', { messages })
}

const sendMessageController = async (req, res) => {
    const { message, phone } = req.body

    if (!message || !phone) {
        return res.json('Missing message or phone')
    }
    const response = await sendMessage(message, phone)
    console.log(response.sid)

    await Sms.create({ Body: message, To: phone, From: twilioPhone })
    res.redirect('/')
}

const receiveMessage = async (req, res) => {
    const { Body, From } = req.body;

    const savedSms = await Sms.create({ Body, From })

    getSocket().emit('new-message', savedSms)

    const twiml = new MessagingResponse()
    // Respuesta al usuario
    // twiml.message('This is my response')

    res.send(twiml.toString())
}

module.exports = {
    indexController,
    sendMessageController,
    receiveMessage
}
