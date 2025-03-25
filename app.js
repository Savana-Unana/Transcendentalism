let currentQuestionIndex = 0;

// Store the questions with separate vote counts
const questions = [
  { red: "Be able to fly", blue: "Be invisible", redVotes: 0, blueVotes: 0 },
  { red: "Live forever", blue: "Have unlimited money", redVotes: 0, blueVotes: 0 },
  { red: "Travel the world", blue: "Never have to sleep", redVotes: 0, blueVotes: 0 }
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
