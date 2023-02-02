const express = require('express');
const Sequelize = require('sequelize');
const cors = require('cors');
const app = express();

const sequelize = new Sequelize('chatappone', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const ChatMessage = sequelize.define('chat_message', {
  message: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

ChatMessage.sync({ force: false });

app.use(express.json());
app.use(cors());

app.post('/message', (req, res) => {
  ChatMessage.create({
    message: req.body.message
  }).then(() => {
    res.send('Message saved');
  }).catch((error) => {
    res.status(500).send(error);
  });
});

app.get('/messages', (req, res) => {
  ChatMessage.findAll().then((messages) => {
    res.send(messages);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

app.listen(3000, () => {
  console.log('Chat app listening on port 3000');
});
