let currentQuestionIndex = 0;

const questions = [
  { red: "Be the only unique person", blue: "Be the most boring person", redVotes: 0, blueVotes: 0 },
  { red: "Live in a lawless land", blue: "Live in a land with far too many rules", redVotes: 0, blueVotes: 0 },
  { red: "Be blamed for something you didn’t do", blue: "Live with the guilt of a really bad choice you made", redVotes: 0, blueVotes: 0 },
  { red: "Do nothing but what one singular person does", blue: "Be the one that many others copy exactly", redVotes: 0, blueVotes: 0 },
  { red: "Be the only smart person in a room where everybody listens to others", blue: "Be unintelligent in a room full of geniuses where nobody listens", redVotes: 0, blueVotes: 0 },
  { red: "Follow the rules and rat out a close friend", blue: "Give yourself up instead of a close friend", redVotes: 0, blueVotes: 0 },
  { red: "Live in a society where everyone is kind but fake", blue: "Live in a society where everyone is brutally honest", redVotes: 0, blueVotes: 0 },
  { red: "Be controlled by a singular unbeatable entity", blue: "Be dictated by everybody", redVotes: 0, blueVotes: 0 },
  { red: "Live in a world where nobody can lie", blue: "Live in a world where nobody can tell the truth", redVotes: 0, blueVotes: 0 },
  { red: "Have everyone agree with you always", blue: "Have the ability to never be manipulated", redVotes: 0, blueVotes: 0 }
];


// Load saved votes from localStorage
function loadVotes() {
  const savedQuestions = JSON.parse(localStorage.getItem("questions"));
  if (savedQuestions) {
    savedQuestions.forEach((savedQuestion, index) => {
      questions[index].redVotes = savedQuestion.redVotes;
      questions[index].blueVotes = savedQuestion.blueVotes;
    });
  }
}

// Save votes to localStorage
function saveVotes() {
  localStorage.setItem("questions", JSON.stringify(questions));
}

// Function to generate a new question
function generateNewQuestion() {
  // Move to the next question
  currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
  const question = questions[currentQuestionIndex];

  // Update the text for the new question
  document.getElementById("red-choice").innerText = question.red;
  document.getElementById("blue-choice").innerText = question.blue;

  // Reset the displayed percentages to "--%" (even if votes exist)
  document.getElementById("red-percentage-text").innerText = "--%";
  document.getElementById("blue-percentage-text").innerText = "--%";

  // Enable the buttons in case they were disabled
  document.getElementById("red-button").disabled = false;
  document.getElementById("blue-button").disabled = false;

  // Hide the Next Question button until an answer is chosen
  document.getElementById("next-question").style.display = "none";
}

// Function to handle choice selection
function chooseOption(choice) {
  const question = questions[currentQuestionIndex];

  if (choice === 'red') {
    question.redVotes++;
  } else if (choice === 'blue') {
    question.blueVotes++;
  }

  // Disable both buttons to prevent further clicking
  document.getElementById("red-button").disabled = true;
  document.getElementById("blue-button").disabled = true;

  // Save the updated votes to localStorage
  saveVotes();

  // Show the Next Question button after an answer is chosen
  document.getElementById("next-question").style.display = "inline-block";

  // Update the percentage display
  updateResults(question);
}

// Function to update the result percentages
function updateResults(question) {
  const total = question.redVotes + question.blueVotes;
  const redPercentage = total === 0 ? "--" : ((question.redVotes / total) * 100).toFixed(2);
  const bluePercentage = total === 0 ? "--" : ((question.blueVotes / total) * 100).toFixed(2);

  // Update percentages for both sides
  document.getElementById("red-percentage-text").innerText = `${redPercentage}%`;
  document.getElementById("blue-percentage-text").innerText = `${bluePercentage}%`;
}

// Initialize the app
loadVotes();  // Load previously saved votes
generateNewQuestion();  // Generate the first question
