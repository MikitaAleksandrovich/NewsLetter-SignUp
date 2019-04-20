//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: 'https://us20.api.mailchimp.com/3.0/lists/f796ce10e2',
        method: 'POST',
        headers: {
            'Authorization': 'nikita1 8320cc30e8d682a85193391f20e02741-us20'
        },
        body: jsonData
    };

    request(options, (error, response, body) => {
        if (error) {
            res.sendFile(__dirname + '/failure.html');
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + '/success.html');
            } else {
                res.sendFile(__dirname + '/failure.html');
            }
        }
    });

});

app.post('/failure', (req, res) => {
    res.redirect('/');
});


// API key
// 8320cc30e8d682a85193391f20e02741-us20

// List id
// f796ce10e2


app.listen(process.env.PORT || 3000, () => {
    console.log('server is running on port 3000');
});