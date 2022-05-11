const fragment = document.createDocumentFragment();
const textarea = document.createElement('textarea');
textarea.setAttribute('autofocus', '');
textarea.setAttribute('rows', '10');

const desc = document.createElement('div');
desc.classList.add('desc');
desc.innerHTML = `
  <h2>Здравствуйте! Это страница реализации задачи "RSS Virtual Keyboard"</h2>
  <p>Возможны различия в нажатиях на кнопки клавиатуры для разных операционных систем.
    Эта реализация выполнена в ОС Windows 10.</p>
  <p>Переключение языка ввода осуществляется комбинацией клавиш Shift+Ctrl.</p>
  <p>Чтобы зажать клавишу Shift, нажмите ее правой кнопкой мыши.
  Правой кнопкой мыши можно ввести несколько символов без сброса Shift, левой только один.
  Совместная работа Shift и CapsLock идентична поведению физической клавиатуры.
  Ввод символов стрелок соответствует требованиям задачи:
  "pressing the Up, Down, Left or Right arrow key inputs an arrow symbol
    in the input field, or implements navigation on the text area."
  Приятной проверки)</p>
`;
fragment.appendChild(desc);
const form = document.createElement('form');
form.appendChild(textarea);
form.setAttribute('spellcheck', 'false');
fragment.appendChild(form);
const keysWrapper = document.createElement('div');
keysWrapper.classList.add('keys-wrapper');
fragment.appendChild(keysWrapper);

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
  ['Enter', 'char', false, 'Enter', '\n'],
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
  ['ArrowUp', 'char', false, '\u2191'],
  ['ShiftRight', 'action', false, 'Shift'],
  ['ControlLeft', 'action', false, 'Ctrl'],
  ['MetaLeft', 'action', false, 'Win'],
  ['AltLeft', 'action', false, 'Alt'],
  ['Space', 'char', false, '', ' '],
  ['AltRight', 'action', false, 'Alt'],
  ['ControlRight', 'action', false, 'Ctrl'],
  ['ArrowLeft', 'char', false, '\u2190'],
  ['ArrowDown', 'char', false, '\u2193'],
  ['ArrowRight', 'char', false, '\u2192'],
];

const WIDE_KEYS = ['Delete', 'Tab', 'Backspace', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'Space'];
const FIRST_IN_ROW = ['Backquote', 'Tab', 'CapsLock', 'ShiftLeft', 'ControlLeft'];

let language;
let capsLock = false;
let shiftLeft = false;
let shiftRight = false;
let ctrlLeft = false;
let ctrlRight = false;
let delay = false;

const keyboard = {};

let pressedKeys = [];
let currentKey;

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

function changeLanguage() {
  if (!delay) {
    Object.values(keyboard).forEach((key) => {
      key.languageToggle();
    });
    language.change();
    delay = true;
    setTimeout(() => {
      delay = false;
    }, 100);
  }
}

function setUpperCase() {
  Object.values(keyboard).forEach((key) => {
    key.keyToUpperCase();
  });
}

function setLowerCase() {
  Object.values(keyboard).forEach((key) => {
    key.keyToLowerCase();
  });
}

function renderCase() {
  if ((shiftLeft || shiftRight) + capsLock === 1) {
    setUpperCase();
  } else {
    setLowerCase();
  }
}

function clearPressed() {
  shiftLeft = false;
  shiftRight = false;
  ctrlLeft = false;
  ctrlRight = false;
  keyboard.ShiftRight.keyItem.classList.remove('pressed');
  keyboard.ShiftLeft.keyItem.classList.remove('pressed');
  keyboard.AltRight.keyItem.classList.remove('pressed');
  keyboard.AltLeft.keyItem.classList.remove('pressed');
  keyboard.ControlLeft.keyItem.classList.remove('pressed');
  keyboard.ControlRight.keyItem.classList.remove('pressed');
  renderCase();
}

textarea.insertText = function insertText(text) {
  this.setRangeText(text, textarea.selectionStart, textarea.selectionEnd, 'end');
};

function printSymbol(key) {
  let symbol = (shiftLeft || shiftRight)
    ? keyboard[key].modContent[language.getCurrent()]
    : keyboard[key].content[language.getCurrent()];
  if (capsLock) {
    symbol = (shiftLeft || shiftRight)
      ? symbol.toLowerCase()
      : symbol.toUpperCase();
  }
  textarea.insertText(symbol);
}

function deletePrev() {
  if (textarea.selectionStart === textarea.selectionEnd && textarea.selectionStart > 0) {
    textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd, 'end');
  } else {
    textarea.insertText('');
  }
}

function deleteNext() {
  if (textarea.selectionStart === textarea.selectionEnd
    && textarea.selectionStart < textarea.value.length) {
    textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd + 1, 'end');
  } else {
    textarea.insertText('');
  }
}

function beginAction(key) {
  switch (key) {
    case 'Delete':
      deleteNext();
      break;
    case 'Backspace':
      deletePrev();
      break;
    case 'CapsLock':
      capsLock = !capsLock;
      keyboard.CapsLock.keyItem.classList.toggle('caps-lock');
      renderCase();
      break;
    case 'ShiftLeft':
      shiftLeft = true;
      shiftRight = false;
      keyboard.ShiftRight.keyItem.classList.remove('pressed');
      renderCase();
      break;
    case 'ShiftRight':
      shiftRight = true;
      shiftLeft = false;
      keyboard.ShiftLeft.keyItem.classList.remove('pressed');
      renderCase();
      break;
    case 'ControlLeft':
      ctrlLeft = true;
      break;
    case 'ControlRight':
      ctrlRight = true;
      break;
    default:
  }
}

function endAction(key) {
  switch (key) {
    case 'ShiftLeft':
      if (shiftLeft) {
        shiftLeft = false;
      } else {
        shiftRight = false;
        keyboard.ShiftRight.keyItem.classList.remove('pressed');
      }
      if (ctrlLeft || ctrlRight) {
        changeLanguage();
      }
      renderCase();
      break;
    case 'ShiftRight':
      if (shiftRight) {
        shiftRight = false;
      } else {
        shiftLeft = false;
        keyboard.ShiftLeft.keyItem.classList.remove('pressed');
      }
      if (ctrlLeft || ctrlRight) {
        changeLanguage();
      }
      renderCase();
      break;
    case 'ControlLeft':
      ctrlLeft = false;
      if (shiftLeft || shiftRight) {
        changeLanguage();
      }
      break;
    case 'ControlRight':
      ctrlRight = false;
      if (shiftLeft || shiftRight) {
        changeLanguage();
      }
      break;
    default:
  }
}

function emulateKeyDown(code) {
  if (keyboard[code]) {
    keyboard[code].keyItem.classList.add('pressed');
    if (keyboard[code].type === 'action') {
      beginAction(code);
    } else if (code.indexOf('Arrow') > -1) {
      textarea.insertText(keyboard[code].keyItem.textContent);
    } else {
      printSymbol(code);
    }
  }
}

function emulateKeyUp(code) {
  if (keyboard[code]) {
    keyboard[code].keyItem.classList.remove('pressed');
    if (keyboard[code].type === 'action') {
      endAction(code);
    }
  }
}

function emptyPressedKeys() {
  while (pressedKeys.length > 0) {
    emulateKeyUp(pressedKeys.pop());
  }
}

function mouseWatch() {
  const timeout = setTimeout(() => {
    if (currentKey && currentKey !== pressedKeys[pressedKeys.length - 1]) {
      emulateKeyUp(pressedKeys.pop());
      pressedKeys.push(currentKey);
      emulateKeyDown(currentKey);
    }
    const interval = setInterval(() => {
      if (currentKey) {
        emulateKeyUp(pressedKeys.pop());
        pressedKeys.push(currentKey);
        emulateKeyDown(currentKey);
      }
    }, 50);
    keysWrapper.addEventListener('mouseup', () => {
      clearInterval(interval);
    }, { once: true });
    keysWrapper.addEventListener('mouseleave', () => {
      clearInterval(interval);
    }, { once: true });
  }, 200);
  keysWrapper.addEventListener('mouseup', () => {
    clearTimeout(timeout);
  }, { once: true });
  keysWrapper.addEventListener('mouseleave', () => {
    clearTimeout(timeout);
  }, { once: true });
}

function onMouseUp(event) {
  textarea.focus();
  if (event.button === 2
    && (pressedKeys[0] === 'ShiftLeft' || pressedKeys[0] === 'ShiftRight') && pressedKeys.length === 1) {
    return;
  }
  if (event.button === 2 && (pressedKeys[0] === 'ShiftLeft' || pressedKeys[0] === 'ShiftRight')
    && pressedKeys.length === 2) {
    if (pressedKeys[1] === 'ShiftLeft' || pressedKeys[1] === 'ShiftRight') {
      if (pressedKeys[0] === pressedKeys[1]) {
        emulateKeyUp(pressedKeys.pop());
        pressedKeys = [];
      } else {
        pressedKeys.shift();
      }
    } else {
      emulateKeyUp(pressedKeys.pop());
    }
  } else {
    emptyPressedKeys();
  }
}

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
        ru: ruContent || enContent,
      };
      this.modContent = {
        en: enShiftContent || enContent,
        ru: ruShiftContent || ruContent || enShiftContent || enContent,
      };
      this.keyContent.ru = getKey(ruName || enName);
    }
    this.keyItem = document.createElement('div');
    this.keyItem.classList.add('key');
    this.keyItem.appendChild(type === 'char' ? this.keyContent[language.getCurrent()] : this.keyContent.en);

    this.keyToLowerCase();

    this.keyItem.addEventListener('mousedown', (event) => {
      textarea.focus();
      pressedKeys.push(eCode);
      emulateKeyDown(eCode);
      if (event.button === 0) {
        mouseWatch();
      }
    });
    this.keyItem.addEventListener('mouseenter', () => {
      currentKey = eCode;
    });
    this.keyItem.addEventListener('mouseleave', () => {
      currentKey = false;
    });
    if (WIDE_KEYS.includes(eCode)) {
      this.keyItem.classList.add('wide');
    }
  }

  languageToggle() {
    if (this.type === 'char') {
      this.keyItem
        .replaceChild(this.keyContent[language.getNext()], this.keyContent[language.getCurrent()]);
    }
  }

  keyToUpperCase() {
    if (this.keyContent.en.children.length === 2 && !capsLock) {
      this.keyContent.en.children[1].style.display = 'none';
      this.keyContent.en.children[0].style.display = '';
      if (this.keyContent.ru.children[0] && this.keyContent.ru.children[1]) {
        this.keyContent.ru.children[1].style.display = 'none';
        this.keyContent.ru.children[0].style.display = '';
      }
    } else if (this.keyContent.en.children.length === 2 && capsLock) {
      this.keyContent.en.children[0].style.display = 'none';
      this.keyContent.en.children[1].style.display = '';
      if (this.keyContent.ru.children[0] && this.keyContent.ru.children[1]) {
        this.keyContent.ru.children[0].style.display = 'none';
        this.keyContent.ru.children[1].style.display = '';
      }
    }
    if (this.isShifting) {
      this.keyItem.classList.remove('lowercase');
    }
  }

  keyToLowerCase() {
    if (this.keyContent.en.children.length === 2 && !capsLock) {
      this.keyContent.en.children[0].style.display = 'none';
      this.keyContent.en.children[1].style.display = '';
      if (this.keyContent.ru.children[0] && this.keyContent.ru.children[1]) {
        this.keyContent.ru.children[0].style.display = 'none';
        this.keyContent.ru.children[1].style.display = '';
      }
    } else if (this.keyContent.en.children.length === 2 && capsLock) {
      this.keyContent.en.children[1].style.display = 'none';
      this.keyContent.en.children[0].style.display = '';
      if (this.keyContent.ru.children[0] && this.keyContent.ru.children[1]) {
        this.keyContent.ru.children[1].style.display = 'none';
        this.keyContent.ru.children[0].style.display = '';
      }
    }
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

  window.addEventListener('load', () => {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      emulateKeyDown(event.code);
    });

    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      emptyPressedKeys();
      emulateKeyUp(event.code);
    });

    document.addEventListener('mouseup', onMouseUp);

    keysWrapper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    window.addEventListener('blur', clearPressed);
  });
});
