require('dotenv').config();
const crypto = require('crypto');

exports.getUrl = (req, res) => {

    let msg = process.env.BILLDESK_MERCHANT_ID+ "|ARP10234"+ req.params.id +"|NA|210.00|NA|NA|NA|INR|NA|R|"+ process.env.BILLDESK_SECURITY_ID +"|NA|NA|F|NA|NA|NA|NA|NA|NA|NA|http://localhost:3000/payment/response";

    let checksum = crypto.createHmac('sha256', process.env.BILLDESK_CHECKSUM_KEY).update(msg).digest('hex').toUpperCase();

    res.json({
        status: "success",
        msg: msg + '|' + checksum,
        url: process.env.BILLDESK_URL
    });

}