const express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());

const VERIFY_TOKEN = '3087a72aa34e51a0b6ed2614d28a021add37a9293611cf6100fd1c323657b3c9';
app.post('/webhook', (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      const webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return res.status(200).send(challenge);
    }
  }
  res.sendStatus(403);
});

const port = +procses.env.PORT || 9000;
app.listen(port, () => console.log('webhook is listening on port' + port));