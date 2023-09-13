const date = require('date-and-time');
const now = new Date();

const DateHelper = {
    getCurrentDate: function () {
        return date.format(now, 'YYYY/MM/DD HH:mm:ss A Z'); // "Year/Month/Day Hour:minute:second AM/PM Timezone"
    },

    getCurrentTime: function () {
        return date.format(now, 'HH:mm:ss');
    },
}

module.exports = DateHelper
