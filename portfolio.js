document.addEventListener('DOMContentLoaded', function () {
    ChatBot.init({
        welcomeMessage: 'Hello! How can I assist you today?',
        chatContainer: 'chat-container',
        suggestionDelay: 400,
        suggestions: ['Tell me about yourself', 'Show me your projects', 'Contact information']
    });
});
