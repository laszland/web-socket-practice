const CryptoJS = require("crypto-js");
const socket = io.connect('http://localhost:4000');

// Query DOM
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');


// make secret key
function getSecretKey(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const SECRET_KEY = 'This is Story of My pony';

// encryption
let encrypting = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

// Emit events
btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: encrypting(message.value),
    handle: encrypting(handle.value)
  })
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

// Listen for events
socket.on('chat', (data) => {
  feedback.innerHTML = '';
  let decryptedHandle = CryptoJS.AES.decrypt(data.handle, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  let decryptedMessage = CryptoJS.AES.decrypt(data.message, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  output.innerHTML += '<p><strong>' + decryptedHandle + ':</strong> ' + decryptedMessage + '</p>'
});

socket.on('typing', (data) => {
  let decryptedHandle = CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  feedback.innerHTML = '<p><em>' + decryptedHandle + ' is typing a message...</em></p>';
});