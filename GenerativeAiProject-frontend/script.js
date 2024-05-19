const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
  const message = userInput.value.trim();
  if (message) {
    // Send message to Django backend using AJAX (On Progress....)
    fetch('/send-message/', {
      method: 'POST',
      body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
      appendMessage(message, 'user');
      appendMessage(data.response, 'bot');
      userInput.value = '';
    })
    .catch(error => console.error(error));
  }
}

function appendMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.textContent = message;
  chatHistory.appendChild(messageElement);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}
