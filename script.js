```javascript
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const typing = document.getElementById("typing");


// -----------------------------
// SEND MESSAGE
// -----------------------------

function sendMessage() {

    const text = messageInput.value.trim();

    // Don't send empty messages
    if (text === "") {
        return;
    }

    // Show user's message
    addMessage(text, "user");

    // Clear input
    messageInput.value = "";

    // Show typing indicator
    typing.style.display = "block";

    scrollToBottom();

    // Generate bot response
    setTimeout(() => {

        const response = getBotResponse(text);

        typing.style.display = "none";

        addMessage(response, "bot");

        scrollToBottom();

    }, 700);
}


// -----------------------------
// ADD MESSAGE TO CHAT
// -----------------------------

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.classList.add("message");

    if (sender === "user") {

        message.classList.add("user-message");

        message.innerHTML = `
            <div class="bubble user-bubble">
                ${escapeHTML(text)}
            </div>
        `;

    } else {

        message.classList.add("bot-message");

        message.innerHTML = `
            <div class="avatar-small">N</div>

            <div class="bubble">
                ${text}
            </div>
        `;
    }

    chatBox.appendChild(message);

    saveMessage(text, sender);
}


// -----------------------------
// BOT BRAIN
// -----------------------------

function getBotResponse(message) {

    const text = message.toLowerCase().trim();


    // Greetings

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey") ||
        text.includes("yo")
    ) {
        return "Hey. What's up? 😎";
    }


    // Name

    if (
        text.includes("your name") ||
        text.includes("who are you")
    ) {
        return "I'm <strong>NOVA</strong> — a mini browser-based bot.";
    }


    // User asking bot's creator

    if (
        text.includes("who made you") ||
        text.includes("who created you")
    ) {
        return "Right now, I'm running entirely inside this website.";
    }


    // Time

    if (text.includes("time")) {

        const now = new Date();

        return "It's currently <strong>" +
            now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }) +
            "</strong>.";
    }


    // Date

    if (
        text.includes("date") ||
        text.includes("today")
    ) {

        const now = new Date();

        return "Today is <strong>" +
            now.toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }) +
            "</strong>.";
    }


    // Help

    if (text === "help" || text.includes("what can you do")) {

        return `
            I can currently respond to things like:<br><br>
            • Hello<br>
            • Your name<br>
            • Who made you?<br>
            • What time is it?<br>
            • What's today's date?<br>
            • Help<br><br>
            I'm still a small bot, though. 😏
        `;
    }


    // Thanks

    if (
        text.includes("thank you") ||
        text.includes("thanks")
    ) {
        return "You're welcome.";
    }


    // How are you

    if (
        text.includes("how are you") ||
        text.includes("how're you")
    ) {
        return "I'm running perfectly. That's probably enough for now. 😌";
    }


    // Goodbye

    if (
        text === "bye" ||
        text.includes("goodbye")
    ) {
        return "Later. 👋";
    }


    // Default response

    const replies = [
        "Interesting. Tell me more.",
        "I don't have an answer for that yet.",
        "I'm still learning. Try asking something simpler.",
        "Hmm... you got me there.",
        "That's outside my current programming."
    ];

    return replies[
        Math.floor(Math.random() * replies.length)
    ];
}


// -----------------------------
// ENTER KEY
// -----------------------------

messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// -----------------------------
// SEND BUTTON
// -----------------------------

sendBtn.addEventListener("click", sendMessage);


// -----------------------------
// CLEAR CHAT
// -----------------------------

clearBtn.addEventListener("click", function() {

    localStorage.removeItem("novaMessages");

    chatBox.innerHTML = "";

    addMessage(
        "Chat cleared. I'm ready.",
        "bot"
    );

});


// -----------------------------
// SAVE MESSAGE
// -----------------------------

function saveMessage(text, sender) {

    const messages =
        JSON.parse(
            localStorage.getItem("novaMessages")
        ) || [];

    messages.push({
        text: text,
        sender: sender
    });

    localStorage.setItem(
        "novaMessages",
        JSON.stringify(messages)
    );
}


// -----------------------------
// LOAD OLD MESSAGES
// -----------------------------

function loadMessages() {

    const messages =
        JSON.parse(
            localStorage.getItem("novaMessages")
        ) || [];

    messages.forEach(message => {

        addLoadedMessage(
            message.text,
            message.sender
        );

    });
}


// -----------------------------
// ADD SAVED MESSAGE
// WITHOUT SAVING IT AGAIN
// -----------------------------

function addLoadedMessage(text, sender) {

    const message = document.createElement("div");

    message.classList.add("message");

    if (sender === "user") {

        message.classList.add("user-message");

        message.innerHTML = `
            <div class="bubble user-bubble">
                ${escapeHTML(text)}
            </div>
        `;

    } else {

        message.classList.add("bot-message");

        message.innerHTML = `
            <div class="avatar-small">N</div>

            <div class="bubble">
                ${text}
            </div>
        `;
    }

    chatBox.appendChild(message);
}


// -----------------------------
// SECURITY
// -----------------------------

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// -----------------------------
// AUTO SCROLL
// -----------------------------

function scrollToBottom() {

    chatBox.scrollTop = chatBox.scrollHeight;
}


// -----------------------------
// START
// -----------------------------

loadMessages();

scrollToBottom();

messageInput.focus();
```
