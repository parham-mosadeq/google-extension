import { obj } from "./constants";
import { extractNumber, createElement } from "./utils";

let convertBtn = null;
let isShown = false;

const calcNumber = ({ currentNumber, type = "inches" }) => {
  const key = obj[type];
  const convertedNumber = key * currentNumber;
  return convertedNumber;
};

const handleConvertBtn = (selectedNumber) => {
  if (!convertBtn) return;
  const calculatedNumber = calcNumber({ currentNumber: selectedNumber });
  const result = createElement({
    element: "p",
    id: "resultParagraph",
    text: `here is your number - ${calculatedNumber} - converted from-${"inches"} to-${"px"}`,
  });
  convertBtn.appendChild(result);
  isShown = true;
};

const createPopup = (event, selectedNumber) => {
  const btn = createElement({
    element: "button",
    id: "convertButton",
    text: `convert from ${obj.inches}`,
  });
  btn.style =
    "display:block; border-radius:10px; border:1px solid lightgray; background:white; color:black;";
  btn.onclick = handleConvertBtn(selectedNumber);

  event.target.appendChild(btn);
};

const handleMouseUp = (event) => {
  const selectedText = window.getSelection()?.toString().trim();
  if (!selectedText) return;

  const [selectedNumber] = extractNumber(selectedText);
  createPopup(event, selectedNumber);
};

const cleanUp = () => {
  isShown = false;
  convertBtn.remove();
  handleMouseUp(null);
};

document.addEventListener("mouseup", (event) => {
  convertBtn = document.querySelector("#convertButton");

  if (convertBtn && isShown) {
    cleanUp();
    return;
  } else {
    isShown = false;
    handleMouseUp(event);
  }
});
