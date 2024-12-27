export const extractNumber = (text) => {
  if (typeof text === "string") {
    return text.match(/\d+/g);
  }
};

export const createElement = ({ element, id, text }) => {
  const newElement = document.createElement(element);
  newElement.id = id;
  newElement.innerText = text;

  return newElement;
};
