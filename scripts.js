const calcBtns = document.querySelectorAll(`.calc-btns`);
let calculation = document.querySelector(`.calculation`);
let calcInput = document.querySelector(`.calc-input`);

function calcHandler(input) {
  switch (input) {
    /*
      If "CLR" Btn or keyboard input of "c"/"C" is pressed clears current calculation by overriding
      calculation to `` and calcInput to `0`. Then Loops over calcBtns and checks if it contains a
      CSS class of `toggled`. If true, removes class.. If false, does nothing.
    */
    case `CLR`:
    case `c`:
    case `C`:
      calculation.textContent = ``;
      calcInput.textContent = "0";
      calcBtns.forEach((calcBtn) =>
        calcBtn.classList.contains(`selected`)
          ? calcBtn.classList.toggle(`selected`)
          : null
      );
      break;

    /*
      If "DEL" Btn or keyboard input of "Backspace" is pressed allows you to remove the last digit of your
      calcInput if the "calcInput" variable is not equal to 0 using slice. If you delete the last digit
      of "calcInput" variable it will reset it to zero.
    */
    case `DEL`:
    case `Backspace`:
      calcInput.textContent !== "0"
        ? (calcInput.textContent = calcInput.textContent.slice(0, -1))
        : null;

      calcInput.textContent === `` ? (calcInput.textContent = "0") : null;
      break;

    /*
      If input of "0-9" is pressed will first check if trying to input addional zeros (EX:0000)
      and prevents that. If operator toggled will set calcInput to a empty string, to allow next numerical value
      the expression to be entered. If no operator selected allows additional numerical inputs
      to be added to calcInput.
    */
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      calcInput.textContent === `0` ? (calcInput.textContent = "") : null;

      calcBtns.forEach((calcBtn) => {
        if (calcBtn.classList.contains(`selected`)) {
          calcBtn.classList.toggle(`selected`);
          calcInput.textContent = ``;
        }
      });

      calcInput.insertAdjacentHTML(`beforeend`, input);
      break;

    /*
      If a input of (+, -, *, /) is seen will loop over calcBtns to check if any of them contain the class of
      "toggle" if so removes it to allow switching of selected operator. The second conditonal statement will check
      that the input matches one of the CalcBtn operators, If so will add the class of toggle to it to show its selected.
      Then stores current calcInput into prevcalcInput which then updates the calculation variable with the numerical
      value and operator selected.
    */
    case `+`:
    case `-`:
    case `*`:
    case `/`:
      calcBtns.forEach((calcBtn) => {
        if (calcBtn.classList.contains(`selected`)) {
          calcBtn.classList.remove(`selected`);
        }

        if (calcBtn.dataset.value === input) {
          let operator = document.querySelector(`[data-value = "${input}"]`);
          operator.classList.toggle(`selected`);
          let prevcalcInput = calcInput.textContent;
          calculation.textContent = `${prevcalcInput} ${input} `;
        }
      });
      break;
    /*
      When input is detected it will update the calculation variable with the math expression, calculates
      the answer via the "eval()" function stored inside a answer variable. Adds a equal sign at the end of
      the calculation variable. Then updates the calcInput to the answer.
    */
    case `=`:
    case `Enter`:
      input === `Enter` ? (input = `=`) : null;
      calculation.insertAdjacentHTML(`beforeend`, `${calcInput.textContent} `);
      let answer = eval(calculation.textContent);
      calculation.insertAdjacentHTML(`beforeend`, `${input}`);
      calcInput.textContent = answer;
    default:
      break;
  }
}

function handleBtn(event) {
  // Grabs the HTML element clicked and stores within variable.
  let input = event.currentTarget.dataset.value;
  calcHandler(input);
}

function handleKey(event) {
  event.preventDefault();
  let input = event.key;
  if (event.shiftKey) {
    input = event.key;
  }
  calcHandler(input);
}

calcBtns.forEach((calcBtn) => calcBtn.addEventListener(`click`, handleBtn));
window.addEventListener(`keydown`, handleKey);
