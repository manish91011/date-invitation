/*
  SUPABASE SETUP
  Replace the two values below with your Supabase Project URL
  and Publishable Key.

  IMPORTANT:
  Use the publishable/anon key only.
  NEVER put a secret/service-role key in this file.
*/

const SUPABASE_URL = "https://moxhvjojvbgwspezvuwh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_tLK7vmgNEIVn73WVmS7pXw_LDQpnLPd";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const buttonArea = document.getElementById("buttonArea");
const hint = document.getElementById("hint");

const questionScreen = document.getElementById("questionScreen");
const yesScreen = document.getElementById("yesScreen");
const placeScreen = document.getElementById("placeScreen");
const dateScreen = document.getElementById("dateScreen");
const finalScreen = document.getElementById("finalScreen");

const foodChoices = document.querySelectorAll("#foodChoices .choice");
const vibeChoices = document.querySelectorAll("#vibeChoices .choice");
const placeChoices = document.querySelectorAll("#placeChoices .choice");

const continueButton = document.getElementById("continueButton");
const placeContinue = document.getElementById("placeContinue");
const dateContinue = document.getElementById("dateContinue");

const datePicker = document.getElementById("datePicker");
const timePicker = document.getElementById("timePicker");

const finalText = document.getElementById("finalText");
const finalFood = document.getElementById("finalFood");
const finalVibe = document.getElementById("finalVibe");
const finalPlace = document.getElementById("finalPlace");
const finalDate = document.getElementById("finalDate");
const finalTime = document.getElementById("finalTime");
const saveStatus = document.getElementById("saveStatus");
const restartButton = document.getElementById("restartButton");

let food = "";
let vibe = "";
let place = "";
let dateChoice = "";
let timeChoice = "";
let noCount = 0;

const noMessages = [
  "NO 😭",
  "Are you sure? 🥺",
  "Really? 😭",
  "Pleaseee 🥹",
  "Think again! 💔",
  "Nice try 😂",
  "You can't catch me 😈"
];

function moveNoButton() {
  noCount++;

  const areaRect = buttonArea.getBoundingClientRect();
  const btnRect = noButton.getBoundingClientRect();

  const maxX = Math.max(0, areaRect.width - btnRect.width);
  const maxY = Math.max(0, areaRect.height - btnRect.height);

  noButton.style.left = `${Math.random() * maxX}px`;
  noButton.style.top = `${Math.random() * maxY}px`;
  noButton.textContent = noMessages[Math.min(noCount, noMessages.length - 1)];

  if (noCount >= 3) {
    hint.textContent = "Okay... the universe clearly wants you to press YES 😂";
    yesButton.style.transform =
      `scale(${1 + Math.min(noCount, 5) * 0.07})`;
  }
}

noButton.addEventListener("mouseenter", moveNoButton);

noButton.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

noButton.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

yesButton.addEventListener("click", () => {
  questionScreen.classList.add("hidden");
  yesScreen.classList.remove("hidden");
  burstHearts();
});

function selectChoice(buttons, value) {
  buttons.forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.value === value);
  });
}

function updateFoodVibeContinue() {
  continueButton.disabled = !(food && vibe);
}

foodChoices.forEach(btn => {
  btn.addEventListener("click", () => {
    food = btn.dataset.value;
    selectChoice(foodChoices, food);
    updateFoodVibeContinue();
  });
});

vibeChoices.forEach(btn => {
  btn.addEventListener("click", () => {
    vibe = btn.dataset.value;
    selectChoice(vibeChoices, vibe);
    updateFoodVibeContinue();
  });
});

continueButton.addEventListener("click", () => {
  yesScreen.classList.add("hidden");
  placeScreen.classList.remove("hidden");
});

placeChoices.forEach(btn => {
  btn.addEventListener("click", () => {
    place = btn.dataset.value;
    selectChoice(placeChoices, place);
    placeContinue.disabled = !place;
  });
});

placeContinue.addEventListener("click", () => {
  placeScreen.classList.add("hidden");
  dateScreen.classList.remove("hidden");
});

const now = new Date();
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, "0");
const dd = String(now.getDate()).padStart(2, "0");
datePicker.min = `${yyyy}-${mm}-${dd}`;

function updateDateContinue() {
  dateContinue.disabled = !(datePicker.value && timePicker.value);
}

datePicker.addEventListener("change", updateDateContinue);
timePicker.addEventListener("change", updateDateContinue);

async function saveResponse() {
  saveStatus.textContent = "Saving your choices... 💌";

  const { error } = await supabaseClient
    .from("date_responses")
    .insert([{
      answer: "YES ❤️",
      food: food,
      vibe: vibe,
      place: place,
      date_choice: `${dateChoice} ${timeChoice}`
    }]);

  if (error) {
    console.error("Supabase error:", error);
    saveStatus.textContent =
      "It's a date! 💕 (The response could not be saved.)";
    return false;
  }

  saveStatus.textContent =
    "Your choices have been saved successfully! 💕";
  return true;
}

dateContinue.addEventListener("click", async () => {
  dateChoice = datePicker.value;
  timeChoice = timePicker.value;

  finalFood.textContent = food;
  finalVibe.textContent = vibe;
  finalPlace.textContent = place;
  finalDate.textContent = formatDate(dateChoice);
  finalTime.textContent = formatTime(timeChoice);

  finalText.textContent =
    "Everything is planned. All that's left is to show up and have an amazing time! 🥰";

  questionScreen.classList.add("hidden");
  yesScreen.classList.add("hidden");
  placeScreen.classList.add("hidden");
  dateScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");

  burstHearts();

  await saveResponse();
});

restartButton.addEventListener("click", () => {
  location.reload();
});

function formatDate(value) {
  const d = new Date(`${value}T00:00:00`);
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function formatTime(value) {
  const [hours, minutes] = value.split(":");
  const d = new Date();
  d.setHours(Number(hours), Number(minutes), 0, 0);

  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit"
  });
}

function burstHearts() {
  const symbols = ["❤️", "💕", "💗", "💖", "✨", "🥰"];

  for (let i = 0; i < 35; i++) {
    const el = document.createElement("span");
    el.className = "heart";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${14 + Math.random() * 24}px`;
    el.style.animationDuration = `${2 + Math.random() * 3}s`;

    document.querySelector(".hearts").appendChild(el);
    setTimeout(() => el.remove(), 5500);
  }
}

setInterval(() => {
  const el = document.createElement("span");
  el.className = "heart";
  el.textContent = Math.random() > 0.5 ? "♡" : "♥";
  el.style.left = `${Math.random() * 100}%`;
  el.style.fontSize = `${12 + Math.random() * 20}px`;
  el.style.animationDuration = `${5 + Math.random() * 5}s`;

  document.querySelector(".hearts").appendChild(el);
  setTimeout(() => el.remove(), 10000);
}, 900);
