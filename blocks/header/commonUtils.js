

export function cleanSubTree(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

export function createAnchorElement (text, destination, classNames) {
  const element = document.createElement('a');
  element.innerText = text;
  element.setAttribute('href', destination);
  element.classList.add(...classNames);
  return element;
}