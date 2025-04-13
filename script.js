// script.js (Based on the code you provided, with fixes for relationship keywords)

// --- Q&A Data ---
const aboutNeshwan = {
  // --- Basic Info & Status ---
  "who is neshwan": "Neshwan is a 12th grader (as of early 2025) from Kerala, India, interested in tech, space, anime, and exploring.",
  "what grade is neshwan in": "Neshwan is currently a 12th grader (as of early 2025).",
  "what is neshwan studying": "Neshwan is studying in the 12th grade at MES International School Pattambi.",
  "where does neshwan go to school": "Neshwan studies at MES International School Pattambi.",
  "where is neshwan from": "Neshwan is from Ayanikkode, Malappuram, Kerala, India.",
  "where does neshwan live": "Neshwan lives in the Malappuram district of Kerala, India (specifically Ayanikkode).",

  // --- Hobbies & Interests ---
  "what are neshwan's hobbies": "Neshwan loves stargazing, traveling, talking a lot with his best friend, and researching things he's interested in like space, new tech, and the One Piece anime.",
  "what does neshwan like to do": "Neshwan enjoys stargazing, traveling, chatting with his best friend, and learning about space, tech, and One Piece.",
  "what does neshwan like to research": "Neshwan is interested in researching space, new technology, and the One Piece anime.",
  "what anime does neshwan like": "Neshwan follows the One Piece anime.",
  "does neshwan enjoy being outdoors": "Yes, Neshwan enjoys activities like stargazing and traveling.",
  "what does neshwan do for fun": "For fun, Neshwan enjoys stargazing, travel, research, and spending time talking with his best friend.",

  // --- Passions & Personality ---
  "what is neshwan passionate about": "Neshwan is passionate about exploring, experiencing thrills (in moderation!), and putting effort into his friendships, especially with his best friend.",
  "is neshwan adventurous": "Neshwan enjoys thrills and exploring new things, finding excitement in experiences that are a bit risky.",
  "are friends important to neshwan": "Yes, friends are very important to Neshwan, particularly his best friend.",
  "who does neshwan talk to a lot": "Neshwan talks a lot with his best friend.",
  "who is important in neshwan's life": "Neshwan's best friend is very important to him.",

  // --- Tech Skills ---
  "what programming languages does neshwan know": "Neshwan knows the basics of Python, HTML, and JavaScript.",
  "does neshwan code": "Yes, Neshwan knows the basics of Python, HTML, and JavaScript.",
  "is neshwan interested in programming": "Neshwan likes the basics (Python, HTML, JS) and is exploring whether to dive deeper into programming.",

  // --- Favorites ---
  "what's neshwan's favorite book": "Neshwan's favorite book that he's read is 'Atomic Habits'. He finds it great for lifestyle building.",
  "what book does neshwan recommend": "Neshwan recommends 'Atomic Habits'.",
  "has neshwan read many books": "Neshwan mentions 'Atomic Habits' as a key book he's read.",
  "what kind of movies does neshwan like": "Neshwan is a fan of Christopher Nolan movies, mentioning Interstellar and Oppenheimer as examples.",
  "what's neshwan's favorite movie": "Neshwan enjoys Christopher Nolan films like Interstellar and Oppenheimer.",
  "what games does neshwan play": "Neshwan enjoys playing PC and console games.",

  // --- Relationships ---
  "does neshwan have a girlfriend": "No, Neshwan does not currently have a girlfriend.",
  "is neshwan single": "Yes, Neshwan is single.",
  "is neshwan looking for a girlfriend": "No, Neshwan isn't looking for a girlfriend right now. He jokingly (or maybe seriously!) says his best friend gets to choose!",

  // --- Afiya Specific (Friendship & Relationship Status) ---
  "who is afiya": "Afiya is Neshwan's friend. (DUDE! WE'RE JUST FRIENDS!)",
  "is afiya neshwan's friend": "Yes, Afiya is Neshwan's friend. (Just friends!)",
  "who is neshwan's best friend": "It's Afiya!",
  "does neshwan have a best friend": "Yes, Neshwan's best friend is Afiya.",
  "is afiya neshwan's best friend": "Yes, she is!",
  "are neshwan and afiya dating": "NO! They are just FRIENDS!",
  "are neshwan and afiya in a relationship": "NO! They are just FRIENDS!",
  "is afiya neshwan's girlfriend": "No, Afiya is Neshwan's best friend, not his girlfriend.",
  "is afiya neshwan's lover": "No, she is his best friend and they are just friends.", // ADDED this line
  "who are neshwan's friends": "Afiya is Neshwan's best friend. He also values his other friendships.",
};

// --- Default answer ---
const defaultAnswer = "Sorry, I don't have specific information about that aspect of Neshwan. Try asking something else!";

// --- Privacy Counter for Afiya (Non-persistent version from your code) ---
let afiyaInfoCount = 0;
const afiyaInfoLimit = 2; // Set the limit
const afiyaPrivacyMessage = "Sorry, no more info about Afiya. Thank you! May I help you with anything else about Neshwan?";

// --- Get HTML Elements ---
const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// --- Function to Add Message to Chat ---
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

    const textElement = document.createElement('p');
    textElement.textContent = message;
    messageElement.appendChild(textElement);

    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// --- Function to Get Answer --- // UPDATED: Only keyword logic improved
function getAnswer(question) {
    const formattedQuestion = question.toLowerCase().trim();
    let potentialAnswer = null;
    let isAboutAfiya = false; // Flag to track if the question is about Afiya

    // --- Helper function (similar to before) ---
     function identifyIfAboutAfiya(key) {
         if (key.includes("afiya")) return true;
         const afiyaRelatedKeys = [
            "who is neshwan's best friend",
            "does neshwan have a best friend",
            "who are neshwan's friends" // Answer mentions Afiya
         ];
        return afiyaRelatedKeys.includes(key);
    }
    // --- End Helper ---


    // 1. Check for exact match
    if (aboutNeshwan.hasOwnProperty(formattedQuestion)) {
        potentialAnswer = aboutNeshwan[formattedQuestion];
        isAboutAfiya = identifyIfAboutAfiya(formattedQuestion); // Check if this exact match is about Afiya

    } else {
        // 2. Basic keyword checks (if no exact match)

        // --- PRIORITIZE RELATIONSHIP KEYWORDS + "Afiya" --- // MODIFIED Logic Start
        const relationshipKeywords = ["lover", "dating", "relationship", "girlfriend", "bf", "gf"];
        if (formattedQuestion.includes("afiya") && relationshipKeywords.some(keyword => formattedQuestion.includes(keyword))) {
             potentialAnswer = aboutNeshwan["are neshwan and afiya in a relationship"]; // Give the "NO! Just friends" answer
             isAboutAfiya = true;
        }
        // --- Check for "Afiya" or "Best Friend" (Lower Priority) ---
        else if (formattedQuestion.includes("afiya")) {
             // Default to explaining who she is if afiya is mentioned non-specifically
             potentialAnswer = aboutNeshwan["who is afiya"];
             isAboutAfiya = true;
        } else if (formattedQuestion.includes("best friend")) {
             potentialAnswer = aboutNeshwan["who is neshwan's best friend"]; // It's likely asking who it is
             isAboutAfiya = true;
        }
        // --- Other Existing Keyword Checks (from your code) ---
        else if (formattedQuestion.includes("hobbies") || formattedQuestion.includes("like to do")) {
            potentialAnswer = aboutNeshwan["what are neshwan's hobbies"];
        } else if (formattedQuestion.includes("school") || formattedQuestion.includes("study")) {
             potentialAnswer = aboutNeshwan["where does neshwan go to school"];
        } else if (formattedQuestion.includes("live") || formattedQuestion.includes("from")) {
             potentialAnswer = aboutNeshwan["where is neshwan from"];
        } else if (formattedQuestion.includes("movie") || formattedQuestion.includes("film")) {
             potentialAnswer = aboutNeshwan["what kind of movies does neshwan like"];
        } else if (formattedQuestion.includes("book") || formattedQuestion.includes("read")) {
             potentialAnswer = aboutNeshwan["what's neshwan's favorite book"];
        }
         // End of MODIFIED Logic
    }

    // 3. Apply Privacy Logic if the answer is about Afiya (using non-persistent counter)
    if (isAboutAfiya && potentialAnswer) { // Added check for potentialAnswer
        if (afiyaInfoCount < afiyaInfoLimit) {
            afiyaInfoCount++; // Increment counter only when giving info
            return potentialAnswer; // Return the found answer or default if null
        } else {
            return afiyaPrivacyMessage; // Return the privacy message if limit reached
        }
    }

    // 4. Return regular answer or default
    return potentialAnswer || defaultAnswer;
}


// --- Function to Handle Sending a Message ---
function handleSendMessage() {
    const question = userInput.value.trim();

    if (question) {
        addMessage(question, 'user');
        userInput.value = '';

        setTimeout(() => {
            const answer = getAnswer(question);
            addMessage(answer, 'bot');
        }, 500);
    }
}

// --- Event Listeners ---
sendButton.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
});