const fragment = document.createDocumentFragment();
const textarea = document.createElement('textarea');
textarea.setAttribute('autofocus', '');
textarea.setAttribute('rows', '10');

const form = document.createElement('form');
form.appendChild(textarea);
fragment.appendChild(form);
const keysWrapper = document.createElement('div');
keysWrapper.classList.add('keys-wrapper');
fragment.appendChild(keysWrapper);

function getLanguage() {
  let current = 'en';
  if (localStorage.getItem('UserLanguage')) {
    current = localStorage.getItem('UserLanguage');
  } else {
    localStorage.setItem('UserLanguage', current);
  }
  let next = current === 'en' ? 'ru' : 'en';
  const getCurrent = () => current;
  const getNext = () => next;
  const change = () => {
    [current, next] = [next, current];
    localStorage.setItem('UserLanguage', current);
  };
  return {
    getCurrent,
    getNext,
    change,
  };
}

function getKey(content) {
  const keyContent = document.createElement('span');
  if (content.length === 2) {
    const firstSymbol = document.createElement('span');
    const secondSymbol = document.createElement('span');
    firstSymbol.textContent = `${content[0]}`;
    secondSymbol.textContent = `${content[1]}`;
    firstSymbol.classList.add('first-symbol');
    secondSymbol.classList.add('second-symbol');
    keyContent.appendChild(firstSymbol);
    keyContent.appendChild(secondSymbol);
  } else {
    keyContent.textContent = content;
  }
  return keyContent;
}

const KEYS = [
// eCode, type,  shifting, name(en), input(en), input(en) + shift,
// name(ru), input(ru), input(ru) + shift
  ['Backquote', 'char', true, '~`', '`', '~', 'Ё', 'ё', 'Ё'],
  ['Digit1', 'char', false, '!1', '1', '!', '!1', '1', '!'],
  ['Digit2', 'char', false, '@2', '2', '@', '"2', '2', '"'],
  ['Digit3', 'char', false, '#3', '3', '#', '№3', '3', '№'],
  ['Digit4', 'char', false, '$4', '4', '$', ';4', '4', ';'],
  ['Digit5', 'char', false, '%5', '5', '%', '%5', '5', '%'],
  ['Digit6', 'char', false, '^6', '6', '^', ':6', '6', ':'],
  ['Digit7', 'char', false, '&7', '7', '&', '?7', '7', '?'],
  ['Digit8', 'char', false, '*8', '8', '*', '*8', '8', '*'],
  ['Digit9', 'char', false, '(9', '9', '(', '(9', '9', '('],
  ['Digit0', 'char', false, ')0', '0', ')', ')0', '0', ')'],
  ['Minus', 'char', false, '_-', '-', '_'],
  ['Equal', 'char', false, '+=', '=', '+'],
  ['Delete', 'action', false, 'Delete'],
  ['Tab', 'char', false, 'Tab', '\t'],
  ['KeyQ', 'char', true, 'Q', 'q', 'Q', 'Й', 'й', 'Й'],
  ['KeyW', 'char', true, 'W', 'w', 'W', 'Ц', 'ц', 'Ц'],
  ['KeyE', 'char', true, 'E', 'e', 'E', 'У', 'у', 'У'],
  ['KeyR', 'char', true, 'R', 'r', 'R', 'К', 'к', 'К'],
  ['KeyT', 'char', true, 'T', 't', 'T', 'Е', 'е', 'Е'],
  ['KeyY', 'char', true, 'Y', 'y', 'Y', 'Н', 'н', 'Н'],
  ['KeyU', 'char', true, 'U', 'u', 'U', 'Г', 'г', 'Г'],
  ['KeyI', 'char', true, 'I', 'i', 'I', 'Ш', 'ш', 'Ш'],
  ['KeyO', 'char', true, 'O', 'o', 'O', 'Щ', 'щ', 'Щ'],
  ['KeyP', 'char', true, 'P', 'p', 'P', 'З', 'з', 'З'],
  ['BracketLeft', 'char', true, '{[', '[', '{', 'Х', 'х', 'Х'],
  ['BracketRight', 'char', true, '}]', ']', '}', 'Ъ', 'ъ', 'Ъ'],
  ['Backspace', 'action', false, 'Backspace'],
  ['CapsLock', 'action', false, 'Caps Lock'],
  ['KeyA', 'char', true, 'A', 'a', 'A', 'Ф', 'ф', 'Ф'],
  ['KeyS', 'char', true, 'S', 's', 'S', 'Ы', 'ы', 'Ы'],
  ['KeyD', 'char', true, 'D', 'd', 'D', 'В', 'в', 'В'],
  ['KeyF', 'char', true, 'F', 'f', 'F', 'А', 'а', 'А'],
  ['KeyG', 'char', true, 'G', 'g', 'G', 'П', 'п', 'П'],
  ['KeyH', 'char', true, 'H', 'h', 'H', 'Р', 'р', 'Р'],
  ['KeyJ', 'char', true, 'J', 'j', 'J', 'О', 'о', 'О'],
  ['KeyK', 'char', true, 'K', 'k', 'K', 'Л', 'л', 'Л'],
  ['KeyL', 'char', true, 'L', 'l', 'L', 'Д', 'д', 'Д'],
  ['Semicolon', 'char', true, ':;', ';', ':', 'Ж', 'ж', 'Ж'],
  ['Quote', 'char', true, '"\'', '\'', '"', 'Э', 'э', 'Э'],
  ['Backslash', 'char', false, '|\\', '\\', '|', '/\\', '\\', '/'],
  ['Enter', 'char', false, 'Enter', '\r'],
  ['ShiftLeft', 'action', false, 'Shift'],
  ['KeyZ', 'char', true, 'Z', 'z', 'Z', 'Я', 'я', 'Я'],
  ['KeyX', 'char', true, 'X', 'x', 'X', 'Ч', 'ч', 'Ч'],
  ['KeyC', 'char', true, 'C', 'c', 'C', 'С', 'с', 'C'],
  ['KeyV', 'char', true, 'V', 'v', 'V', 'М', 'м', 'М'],
  ['KeyB', 'char', true, 'B', 'b', 'B', 'И', 'и', 'И'],
  ['KeyN', 'char', true, 'N', 'n', 'N', 'Т', 'т', 'Т'],
  ['KeyM', 'char', true, 'M', 'm', 'M', 'Ь', 'ь', 'Ь'],
  ['Comma', 'char', true, '<,', ',', '<', 'Б', 'б', 'Б'],
  ['Period', 'char', true, '>.', '.', '>', 'Ю', 'ю', 'Ю'],
  ['Slash', 'char', true, '?/', '/', '?', ',.', '.', ','],
  ['ArrowUp', 'action', false, '\u2191'],
  ['ShiftRight', 'action', false, 'Shift'],
  ['ControlLeft', 'action', false, 'Ctrl'],
  ['MetaLeft', 'action', false, 'Win'],
  ['AltLeft', 'action', false, 'Alt'],
  ['Space', 'char', false, '', ' '],
  ['AltRight', 'action', false, 'Alt'],
  ['ControlRight', 'action', false, 'Ctrl'],
  ['ArrowLeft', 'action', false, '\u2190'],
  ['ArrowDown', 'action', false, '\u2193'],
  ['ArrowRight', 'action', false, '\u2192'],
];

const WIDE_KEYS = ['Delete', 'Tab', 'Backspace', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'Space'];

const FIRST_IN_ROW = ['Backquote', 'Tab', 'CapsLock', 'ShiftLeft', 'ControlLeft'];

let language;

const keyboard = {};

class Key {
  constructor(
    eCode,
    type,
    isShifting,
    enName,
    enContent,
    enShiftContent,
    ruName,
    ruContent,
    ruShiftContent,
  ) {
    this.type = type;
    this.isShifting = isShifting;
    this.keyContent = {
      en: getKey(enName),
    };

    if (type === 'char') {
      this.content = {
        en: enContent,
        ru: ruContent,
      };
      this.modContent = {
        en: enShiftContent,
        ru: ruShiftContent,
      };
      this.keyContent.ru = getKey(ruName || enName);
    }

    this.keyItem = document.createElement('div');
    this.keyItem.classList.add('key');
    this.keyItem
      .appendChild(type === 'char' ? this.keyContent[language.getCurrent()] : this.keyContent.en);

    this.nameToLowerCase();

    if (WIDE_KEYS.includes(eCode)) {
      this.keyItem.classList.add('wide');
    }
  }

  nameToLowerCase() {
    if (this.isShifting) {
      this.keyItem.classList.add('lowercase');
    }
  }
}

function renderKeyboard() {
  let keysRow;
  KEYS.forEach((item) => {
    keyboard[item[0]] = new Key(...item);
    if (FIRST_IN_ROW.includes(item[0])) {
      keysRow = document.createElement('div');
      keysRow.classList.add('row');
      keysWrapper.appendChild(keysRow);
    }
    keysRow.appendChild(keyboard[item[0]].keyItem);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  language = getLanguage();
  renderKeyboard();
  document.body.appendChild(fragment);
});
