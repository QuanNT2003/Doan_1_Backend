const fetch = require('node-fetch');

const CLIENT_ID = 'ASHs_lxigQTAUBuJyKxaYO58uuXFh7_eK6o6e4za7WveNu1-R4zmHQC1kpryHHovvK2sjuWaIIt-o_6U';
const CLIENT_SECRET = 'ECHY7Sv2FWFxHIuF0w5cW7CF383PONXoRW4oUh1BvNzQcVkxoTDZMgbXUAgc24nrUlxilbCT4ZM8V2AB';

const generateAccessToken = async () => {
    const auth = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
    const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
};

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
    }
    return data;
};

const createOrderPayPal = async (body) => {
    try {
        const accessToken = await generateAccessToken();
        const url = "https://api-m.sandbox.paypal.com/v2/checkout/orders";

        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: body.product.cost,
                    },
                },
            ],
        };

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + accessToken,
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        return handleResponse(response);
    } catch (e) {
        console.error(e);
        throw e;
    }
};

module.exports = {
    createOrderPayPal
};