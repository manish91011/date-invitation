/* =========================================================
   DATE INVITATION WEBSITE
   ========================================================= */


/* =========================
   SCREEN ELEMENTS
   ========================= */

const questionScreen =
  document.getElementById("questionScreen");

const yesScreen =
  document.getElementById("yesScreen");

const placeScreen =
  document.getElementById("placeScreen");

const dateScreen =
  document.getElementById("dateScreen");

const finalScreen =
  document.getElementById("finalScreen");


/* =========================
   YES / NO BUTTONS
   ========================= */

const yesButton =
  document.getElementById("yesButton");

const noButton =
  document.getElementById("noButton");

const buttonArea =
  document.getElementById("buttonArea");

const hint =
  document.getElementById("hint");


/* =========================
   USER CHOICES
   ========================= */

let selectedFood = "";

let selectedVibe = "";

let selectedPlace = "";

let selectedDate = "";

let selectedTime = "";

let noCount = 0;


/* =========================
   NO BUTTON MESSAGES
   ========================= */

const noMessages = [

  "NO 😭",

  "Are you sure? 🥺",

  "Really? 😭",

  "Pleaseee 🥹",

  "Think again! 💔",

  "Nice try 😂",

  "You can't catch me 😈"

];


/* =========================================================
   RUNAWAY NO BUTTON
   ========================================================= */

function moveNoButton() {

  noCount++;


  const areaRect =
    buttonArea.getBoundingClientRect();


  const buttonRect =
    noButton.getBoundingClientRect();


  const maxX =
    Math.max(
      0,
      areaRect.width -
      buttonRect.width
    );


  const maxY =
    Math.max(
      0,
      areaRect.height -
      buttonRect.height
    );


  const randomX =
    Math.random() * maxX;


  const randomY =
    Math.random() * maxY;


  noButton.style.left =
    `${randomX}px`;


  noButton.style.top =
    `${randomY}px`;


  noButton.textContent =
    noMessages[
      Math.min(
        noCount,
        noMessages.length - 1
      )
    ];


  if (noCount >= 3) {

    hint.textContent =
      "Okay... the universe clearly wants you to press YES 😂";


    yesButton.style.transform =
      `scale(${1 + Math.min(noCount, 5) * 0.07})`;

  }

}


/* Desktop */

noButton.addEventListener(
  "mouseenter",
  moveNoButton
);


/* Mobile */

noButton.addEventListener(
  "touchstart",
  function(event) {

    event.preventDefault();

    moveNoButton();

  },
  {
    passive: false
  }
);


/* If they somehow click it */

noButton.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    moveNoButton();

  }
);


/* =========================================================
   YES BUTTON
   ========================================================= */

yesButton.addEventListener(
  "click",
  function() {

    questionScreen.classList.add(
      "hidden"
    );

    yesScreen.classList.remove(
      "hidden"
    );

    burstHearts();

  }
);


/* =========================================================
   FOOD SELECTION
   ========================================================= */

const foodChoices =
  document.querySelectorAll(
    "#foodChoices .choice"
  );


foodChoices.forEach(
  function(button) {

    button.addEventListener(
      "click",
      function() {

        selectedFood =
          button.dataset.value;


        foodChoices.forEach(
          function(item) {

            item.classList.remove(
              "selected"
            );

          }
        );


        button.classList.add(
          "selected"
        );


        updateFoodVibeButton();

      }
    );

  }
);


/* =========================================================
   VIBE SELECTION
   ========================================================= */

const vibeChoices =
  document.querySelectorAll(
    "#vibeChoices .choice"
  );


vibeChoices.forEach(
  function(button) {

    button.addEventListener(
      "click",
      function() {

        selectedVibe =
          button.dataset.value;


        vibeChoices.forEach(
          function(item) {

            item.classList.remove(
              "selected"
            );

          }
        );


        button.classList.add(
          "selected"
        );


        updateFoodVibeButton();

      }
    );

  }
);


/* =========================================================
   FOOD + VIBE CONTINUE
   ========================================================= */

const continueButton =
  document.getElementById(
    "continueButton"
  );


function updateFoodVibeButton() {

  continueButton.disabled =
    !(
      selectedFood &&
      selectedVibe
    );

}


continueButton.addEventListener(
  "click",
  function() {

    yesScreen.classList.add(
      "hidden"
    );

    placeScreen.classList.remove(
      "hidden"
    );

  }
);


/* =========================================================
   PLACE SELECTION
   ========================================================= */

const placeChoices =
  document.querySelectorAll(
    "#placeChoices .choice"
  );


const placeContinue =
  document.getElementById(
    "placeContinue"
  );


placeChoices.forEach(
  function(button) {

    button.addEventListener(
      "click",
      function() {

        selectedPlace =
          button.dataset.value;


        placeChoices.forEach(
          function(item) {

            item.classList.remove(
              "selected"
            );

          }
        );


        button.classList.add(
          "selected"
        );


        placeContinue.disabled =
          false;

      }
    );

  }
);


/* =========================================================
   PLACE → DATE
   ========================================================= */

placeContinue.addEventListener(
  "click",
  function() {

    placeScreen.classList.add(
      "hidden"
    );

    dateScreen.classList.remove(
      "hidden"
    );

  }
);


/* =========================================================
   DATE PICKER
   ========================================================= */

const datePicker =
  document.getElementById(
    "datePicker"
  );


const timePicker =
  document.getElementById(
    "timePicker"
  );


const dateContinue =
  document.getElementById(
    "dateContinue"
  );


/* Prevent selecting a date in the past */

const today =
  new Date();


const year =
  today.getFullYear();


const month =
  String(
    today.getMonth() + 1
  ).padStart(2, "0");


const day =
  String(
    today.getDate()
  ).padStart(2, "0");


const todayString =
  `${year}-${month}-${day}`;


datePicker.min =
  todayString;


/* Check date/time */

function updateDateButton() {

  dateContinue.disabled =
    !(
      datePicker.value &&
      timePicker.value
    );

}


datePicker.addEventListener(
  "change",
  updateDateButton
);


timePicker.addEventListener(
  "change",
  updateDateButton
);


/* =========================================================
   DATE → FINAL SCREEN
   ========================================================= */

dateContinue.addEventListener(
  "click",
  function() {

    selectedDate =
      datePicker.value;


    selectedTime =
      timePicker.value;


    showFinalScreen();

  }
);


/* =========================================================
   FINAL SCREEN
   ========================================================= */

function showFinalScreen() {

  questionScreen.classList.add(
    "hidden"
  );

  yesScreen.classList.add(
    "hidden"
  );

  placeScreen.classList.add(
    "hidden"
  );

  dateScreen.classList.add(
    "hidden"
  );

  finalScreen.classList.remove(
    "hidden"
  );


  /* Food */

  document.getElementById(
    "finalFood"
  ).textContent =
    selectedFood;


  /* Vibe */

  document.getElementById(
    "finalVibe"
  ).textContent =
    selectedVibe;


  /* Place */

  document.getElementById(
    "finalPlace"
  ).textContent =
    selectedPlace;


  /* Date */

  const formattedDate =
    formatDate(selectedDate);


  document.getElementById(
    "finalDate"
  ).textContent =
    formattedDate;


  /* Time */

  const formattedTime =
    formatTime(selectedTime);


  document.getElementById(
    "finalTime"
  ).textContent =
    formattedTime;


  document.getElementById(
    "finalText"
  ).textContent =
    "Everything is planned. All that's left is to show up and have an amazing time! 🥰";


  burstHearts();

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(dateString) {

  const date =
    new Date(
      dateString + "T00:00:00"
    );


  return date.toLocaleDateString(
    undefined,
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );

}


/* =========================================================
   FORMAT TIME
   ========================================================= */

function formatTime(timeString) {

  const [
    hours,
    minutes
  ] =
    timeString.split(":");


  const date =
    new Date();


  date.setHours(
    Number(hours)
  );


  date.setMinutes(
    Number(minutes)
  );


  return date.toLocaleTimeString(
    undefined,
    {
      hour: "numeric",
      minute: "2-digit"
    }
  );

}


/* =========================================================
   HEART ANIMATION
   ========================================================= */

function burstHearts() {

  const symbols = [

    "❤️",

    "💕",

    "💗",

    "💖",

    "✨",

    "🥰"

  ];


  for (
    let i = 0;
    i < 35;
    i++
  ) {

    const heart =
      document.createElement(
        "span"
      );


    heart.className =
      "heart";


    heart.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    heart.style.left =
      `${Math.random() * 100}%`;


    heart.style.fontSize =
      `${14 + Math.random() * 24}px`;


    heart.style.animationDuration =
      `${2 + Math.random() * 3}s`;


    document
      .querySelector(".hearts")
      .appendChild(heart);


    setTimeout(
      function() {

        heart.remove();

      },
      5500
    );

  }

}


/* =========================================================
   CONTINUOUS BACKGROUND HEARTS
   ========================================================= */

setInterval(
  function() {

    const heart =
      document.createElement(
        "span"
      );


    heart.className =
      "heart";


    heart.textContent =
      Math.random() > 0.5
        ? "♡"
        : "♥";


    heart.style.left =
      `${Math.random() * 100}%`;


    heart.style.fontSize =
      `${12 + Math.random() * 20}px`;


    heart.style.animationDuration =
      `${5 + Math.random() * 5}s`;


    document
      .querySelector(".hearts")
      .appendChild(heart);


    setTimeout(
      function() {

        heart.remove();

      },
      10000
    );


  },
  900
);


/* =========================================================
   RESTART
   ========================================================= */

const restartButton =
  document.getElementById(
    "restartButton"
  );


restartButton.addEventListener(
  "click",
  function() {

    location.reload();

  }
);