const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

async function _connectToThirdPartyApi(data) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'maha.vatnala.usa@gmail.com',
          pass: 'kvdu ojnr dbdb iefa',
        },
      });
      
      
      transporter.sendMail({
        from: '"Rao" <maha.vatnala.usa@gmail.com>', // sender address
        to: "rao.vatnala@oracle.com", // list of receivers
        subject: "ATK Perf Job Response", // Subject line
        text: data,
        html: "<b>"+data+"</b>", // html body
      }).then(info => {
        console.log({info});
      }).catch(console.error);
}

app.post('/api/post_success', async (req, res) => {
    if (req.is('application/json')) {
        const data = req.body;
        try {
            console.log(data.data);
            const thirdPartyResponse = await _connectToThirdPartyApi(data.data);
            res.status(200).json(thirdPartyResponse);
        } catch (error) {
            res.status(500).json({ error: 'Failed to connect to third-party API' });
        }
    } else {
        res.status(400).json({ error: 'Invalid input' });
    }
});

app.post('/api/post_failure', async (req, res) => {
    if (req.is('application/json')) {
        const data = req.body;
        try {
            console.log(data.data);
            const thirdPartyResponse = await _connectToThirdPartyApi(data.data);
            res.status(200).json(thirdPartyResponse);
        } catch (error) {
            res.status(500).json({ error: 'Failed to connect to third-party API' });
        }
    } else {
        res.status(400).json({ error: 'Invalid input' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
