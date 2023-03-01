const btnGuess = document.querySelector(`.btn--guess`);
const input = document.querySelector(`.input--guess`);
const message = document.querySelector(`.h--guess`).textContent;

const testingDiv = document.getElementById(`guess-test`);
const addNew = function (text) {
  const newDiv = document.createElement(`div`);
  const newText = document.createTextNode(text);
  //newDiv.ad
  testingDiv.appendChild(newDiv);
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
    generateValue = Math.trunc(Math.random() * 8) + 1;
    array.push(generateValue);
  }
};

let secretNumber = [];

generateArray(secretNumber);
console.log(secretNumber);
console.log(typeof secretNumber);

while (hasDuplicates(secretNumber)) {
  //проверяет загаданный массив на наличие дубликатов, если есть - генерирует его заново
  secretNumber = [];
  generateArray(secretNumber);
}

console.log(secretNumber);

btnGuess.addEventListener(`click`, function () {
  const inputRawValue = input.value;
  const inputStringValue = inputRawValue.split("");
  const inputValue = inputStringValue.map(Number);

  console.log(typeof inputRawValue);
  console.log(inputValue);
  console.log(secretNumber);

  if (inputValue.length === 4 && !hasDuplicates(inputValue)) {
    addNew(inputRawValue);
    if (compareValues(secretNumber, inputValue)) {
      // TODO: тут расписать победу
      console.log(`ПОБЕДА`);
    } else {
      for (let i = 0; i < secretNumber.length; i++) {
        for (let j = 0; j < inputValue.length; j++) {
          if (secretNumber[i] === inputValue[j]) {
            if (secretNumber[i] === inputValue[i]) {
              console.log(`БЫК`);
            } else {
              console.log(`КОРОВА`);
            }
          }
        }
      }
    }
  } else {
    // TODO: тут ошибка, что условие в 4 цифры не выполнено ИЛИ есть ошибка в дубликатах
    hasDuplicates(inputValue)
      ? console.log(`Нельзя использовать повторяющиеся значения`)
      : console.log(`Нужно ввести 4 цифры`);
  }
});

// БАГ: Никогда не бывает 0-я
