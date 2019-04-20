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
            'Authorization': 'nikita1 c1a04225d216e5b6d233e0d677625cdf-us20'
        },
        body: jsonData
    };

    request(options, (error, response, body) => {
        if(error) {
            console.log(error);
        } else {
            console.log(response.statusCode);
        }
    });

});

// API key
// c1a04225d216e5b6d233e0d677625cdf-us20

// List id
// f796ce10e2



app.listen(3000, () => {
    console.log('server is running on port 3000');
});