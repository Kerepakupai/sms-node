const timeago = require('timeago.js')

module.exports = {
    hideNumber: (phone = '') => {
        return phone.replace(/[0-9]/g, 'x')
    },

    timeAgo: (date) => timeago.format(date)
}
