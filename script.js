const btnGuess = document.querySelector(`.btn--guess`);
const input = document.querySelector(`.input--guess`);
const addingDiv = document.getElementById(`result--main`);

const message = function (text) {
  document.querySelector(`.h--guess`).textContent = text;
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
    addNew(`${secretNumber} --- загаданное число!`);
    return message(`ПОБЕДА`);
  }

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
  addNew(`${inputRawValue} --- ${bull} 🐂 и ${cow} 🐄`);
  console.log(`${bull} 🐂 и ${cow} 🐄`);
});

// БАГ: Никогда не бывает 0-я
