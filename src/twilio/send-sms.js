const { accountSid, authToken, twilioPhone: from } = require('../config')

const client = require('twilio')(accountSid, authToken)

/**
 * Send an sms message
 * @param {string} body - The sms message 
 * @param {string} to - The phone number
 */
const sendMessage = async (body, to) => {
    try {
        const response = await client.messages.create({
            from,
            to,
            body
        })

        return response
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    sendMessage
}
