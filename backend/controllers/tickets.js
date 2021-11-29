const axios = require('axios');

exports.ping =  (req, res) => {
    res.status(200).send("Welcome to Zendesk Ticket Viewer API! API is running!");
};

exports.authenticate = (req, res) => {
    axios.post(`https://${req.body.subdomain}.zendesk.com/api/v2/oauth/tokens.json`,
        {
            token: {
                client_id: process.env.CLIENT_ID,
                scopes: ["read", "write"]
            }
        },
        {
            auth: {
                username: req.body.email,
                password: req.body.password
            }
        },
    ).then(response => {
        res.status(200).json({message: "Successfully authenticated!", token: response.data.token.full_token});
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({message: "Uh oh! Authentication unsuccessful!"});
    })
}

exports.getTickets = (req, res) => {
    axios.get(req.body.url ?? `https://${req.body.subdomain}.zendesk.com/api/v2/tickets?page[size]=${req.body.pagesize}`,
        {
            headers: {Authorization: `Bearer ${req.body.token}`}
        }
    ).then(response => {
        res.status(200).json(response.data);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({message: "Uh oh! Something went wrong!"});
    })
}
