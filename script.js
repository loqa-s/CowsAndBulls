`use strict`;

const input = document.querySelector(`.input--guess`);
const addingDiv = document.getElementById(`result--main`);
const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const resultActualEl = document.querySelector(`.result--actual`);
const attemptValue = document.querySelector(`.attempt--guessValue`);
const highScoreValue = document.querySelector(`.highscore--guessValue`);
const btnGuess = document.querySelector(`.btn--guess`);
const btnCloseModal = document.querySelector(`.close-modal`);
const btnOpenModal = document.querySelector(`.btn--rules`);
const btnNew = document.querySelector(`.btn--newGame`);

const message = function (text) {
  document.querySelector(`.h--guess`).textContent = text;
};

const openModal = function () {
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
};
const closeModal = function () {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
};

const modalWindow = function () {
  btnOpenModal.addEventListener("click", openModal);
  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains(`hidden`)) {
      closeModal();
    }
  });
};

const newGame = function () {
  secretNumber = [];
  attempt = 0;
  generateArray(secretNumber);
  message(`Начнем?`);
  resultActualEl.textContent = ``;
  input.value = ``;
  console.log(secretNumber);
  attemptValue.textContent = attempt;
  btnGuess.classList.remove(`disabled`);

  while (hasDuplicates(secretNumber)) {
    //проверяет загаданный массив на наличие дубликатов, если есть - генерирует его заново
    secretNumber = [];
    generateArray(secretNumber);
  }
  console.log(secretNumber);
};

const addNew = function (text) {
  // добавление див элемента с текстом
  const newDiv = document.createElement(`div`);
  const newText = document.createTextNode(text);
  addingDiv.appendChild(newDiv);
  newDiv.appendChild(newText);
};

const compareValues = function (a, b) {
  // функция сравнивает значения в массиве
  return a.toString() === b.toString();
};

const hasDuplicates = function (array) {
  // функция ищет дубликаты
  return new Set(array).size !== array.length;
};

const generateArray = function (array) {
  //функция генерируерт рандомные 4 числа и пушит их в массив
  let generateValue;
  for (i = 0; i < 4; i++) {
    generateValue = Math.trunc(Math.random() * 9) + 1;
    array.push(generateValue);
  }
};

let secretNumber;
let attempt;
let highScore = 0;

newGame();
modalWindow();

btnNew.addEventListener(`click`, function () {
  newGame();
});

btnGuess.addEventListener(`click`, function () {
  const inputRawValue = input.value;
  const inputStringValue = inputRawValue.split("");
  const inputValue = inputStringValue.map(Number);

  console.log(typeof inputRawValue);
  console.log(inputValue);
  console.log(secretNumber);

  if (inputValue.length !== 4) {
    //Проверяем, что введеное число состоит из 4х знаков
    return message(`Нужно ввести 4 цифры`);
  }

  if (hasDuplicates(inputValue)) {
    //Проверяем, что в введенном чилсле нет дублей
    return message(`Нельзя использовать повторяющиеся значения`);
  }

  if (compareValues(secretNumber, inputValue)) {
    //Проверяем, является ли введеное число победным
    //TODO: Доделать условия победы
    addNew(`✨ ${inputRawValue} — загаданное число! ✨`);
    btnGuess.classList.add(`disabled`);
    if (attempt < highScore || highScore === 0) {
      highScore = attempt;
      highScoreValue.textContent = highScore;
    }
    return message(`✨ ПОБЕДА ✨`);
  }

  message(`🤔🤔🤔`);

  attempt++;
  attemptValue.textContent = attempt;

  let cow = 0;
  let bull = 0;

  for (let i = 0; i < secretNumber.length; i++) {
    for (let j = 0; j < inputValue.length; j++) {
      if (secretNumber[i] === inputValue[j]) {
        if (secretNumber[i] === inputValue[i]) {
          bull++;
        } else {
          cow++;
        }
      }
    }
  }

  addNew(`${inputRawValue}  —  ${bull} 🐂 ${cow} 🐄`);
  console.log(`${bull} 🐂 ${cow} 🐄`);
});

// БАГ: Никогда не бывает 0-я
