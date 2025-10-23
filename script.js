document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  // nextBtn removed
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  // Added new element selectors
  const instructionsContainer = document.getElementById(
    "instructions-container"
  );
  const timerDisplay = document.getElementById("timer-display");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let timer; // Variable to hold the interval
  let timeLeft = 15; // Time per question

  startBtn.addEventListener("click", startQuiz);

  // nextBtn listener removed

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    questionContainer.classList.add("hidden"); // Hide quiz
    instructionsContainer.classList.remove("hidden"); // Show instructions
    startBtn.classList.remove("hidden"); // Show start button
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    instructionsContainer.classList.add("hidden"); // Hide instructions
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    // nextBtn.classList.add("hidden"); // No longer needed
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = ""; //clear previous choices
    startTimer(); // Start the timer for the new question

    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      // Pass the 'li' element to selectAnswer for styling
      li.addEventListener("click", () => selectAnswer(choice, li));
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(choice, liElement) {
    clearInterval(timer); // Stop the timer
    disableChoices(); // Disable all other options

    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) {
      score++;
      liElement.classList.add("correct"); // Add correct style
    } else {
      liElement.classList.add("incorrect"); // Add incorrect style
    }

    // Wait 1 second to show feedback, then move to next question
    setTimeout(moveToNextQuestion, 1000);
  }

  // New Function: Move to the next question or show results
  function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  // New Function: Start the 15-second timer
  function startTimer() {
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;
    timerDisplay.style.color = "#6200ea"; // Reset color

    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft <= 5) {
        timerDisplay.style.color = "#d50000"; // Turn red when low
      }

      if (timeLeft <= 0) {
        clearInterval(timer);
        disableChoices();
        // Time's up! Wait 1 sec, then move on
        setTimeout(moveToNextQuestion, 1000);
      }
    }, 1000);
  }

  // New Function: Disable all choices after one is clicked
  function disableChoices() {
    Array.from(choicesList.children).forEach((child) => {
      child.classList.add("disabled"); // Uses CSS to disable pointer-events
    });
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
});