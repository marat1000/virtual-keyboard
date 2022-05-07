'use strict';


const toggle = document.querySelector('.j-header-toggle');
const mainNavList = document.querySelector('.main-nav__list');
const header = document.querySelector('.page-header');
const links = document.querySelectorAll('.main-nav__link');
const linkActive = document.querySelector('.main-nav__link.is-active');
const overlay = document.querySelector('.overlay');
const breakpoint = window.matchMedia('(max-width: 767px)');

const isMainNavActive = () => {
  return header.classList.contains('is-active');
};

const breakpointChecker = () => {
  const menuClickClose = () => {
    overlay.classList.remove('overlay__show');
    toggle.classList.remove('page-header__toggle_vertical');
    overlay.removeEventListener('click', menuClickClose);
    header.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (breakpoint.matches) {
    toggle.addEventListener('click', () => {
      if (isMainNavActive()) {
        menuClickClose();
      } else {
        header.classList.add('is-active');
        overlay.classList.add('overlay__show');
        toggle.classList.add('page-header__toggle_vertical');
        overlay.addEventListener('click', menuClickClose);
        linkActive.addEventListener('click', () => {
          menuClickClose();
          window.scrollTo(0, 0);
        });
        document.body.style.overflow = 'hidden';

        links.forEach((link) => {
          link.addEventListener('click', () => {
            menuClickClose();
          });
        });
      }
    });
  }
};

const initMainNav = () => {
  if (!toggle) {
    return;
  }
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

initMainNav();


(function () {
  let arrowLeft = document.querySelector('.our-pets__slider-button_left');
  let arrowRight = document.querySelector('.our-pets__slider-button_right');
  let slider = document.querySelector('.our-pets__inner');
  let slides = document.querySelectorAll('.our-pets__card');
  if (!(arrowLeft && arrowRight && slider && slides)) {
    return;
  }
  let arrRandom = [];
  let prevSlides = [0, 2, 4];

  arrowLeft.addEventListener('click', function () {
    slider.style.animation = 'slider-move-left 2s linear';
    resetAnimation();
  });

  arrowRight.addEventListener('click', function () {
    slider.style.animation = 'slider-move-right 2s linear';
    resetAnimation();
  });

  function resetAnimation() {
    setTimeout(function () {
      showRandomSlides();
    }, 600);
    setTimeout(function () {
      slider.style.animation = '';
    }, 1000);
  }

  function showRandomSlides() {
    arrRandom = getArrRandom(3);
    while (prevSlides.includes(arrRandom[0]) || prevSlides.includes(arrRandom[1]) || prevSlides.includes(arrRandom[2])) {
      arrRandom = [];
      arrRandom = getArrRandom(3);
    }
    let i = 0;
    while (i !== arrRandom.length) {
      slides[i].children[1].textContent = JSONPets[arrRandom[i]].name;
      slides[i].children[0].alt = JSONPets[arrRandom[i]].name;
      slides[i].children[0].src = JSONPets[arrRandom[i]].img;
      i++;
    }
    prevSlides = [...arrRandom];
    arrRandom = [];
  }
})();


function getArrRandom(qty) {
  let arr = [];
  let number = getRandomInt(0, JSONPets.length);
  while (arr.length !== qty) {
    if (!arr.includes(number)) {
      arr.push(number);
    }
    number = getRandomInt(0, JSONPets.length);
  }
  return arr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


let card = document.querySelectorAll('.our-friends__card, .our-pets__card');

(function () {
  let arrRandom = [];
  let arrRandomBig = [];
  let numberCards;
  let first = document.querySelector('.pagination__first');
  let prev = document.querySelector('.pagination__prev');
  let current = document.querySelector('.pagination__current');
  let next = document.querySelector('.pagination__next');
  let cards = document.querySelector('.our-friends__cards');
  let last = document.querySelector('.pagination__last');

  if (!(first && prev && current && next && last && cards && card)) {
    return;
  }

  if (window.innerWidth < 768) {
    numberCards = 3;
  } else if (window.innerWidth < 1280) {
    numberCards = 6;
  } else {
    numberCards = 8;
  }

  while (arrRandomBig.length < 48) {
    arrRandom = getArrRandom(8);
    if (!(arrRandomBig.slice(-4).includes(arrRandom[0]) || arrRandomBig.slice(-4).includes(arrRandom[1]) || arrRandomBig.slice(-4).includes(arrRandom[2]) || arrRandomBig.slice(-4).includes(arrRandom[3]))) {
      arrRandomBig.push(...arrRandom);
    }
  }

  first.addEventListener('click', function () {
    if (cards.style.animation === '') {
      cards.style.animation = 'slider-move-left 2s linear';
      setTimeout(function () {
        showRandomSlides(0);
        current.textContent = '1';
        last.disabled = false;
        next.disabled = false;
        first.disabled = true;
        prev.disabled = true;
      }, 600);
      resetAnimation();
    }
  });

  prev.addEventListener('click', function () {
    if (cards.style.animation === '') {
      cards.style.animation = 'slider-move-left 2s linear';
      if (+current.textContent === 2) {
        setTimeout(function () {
          first.disabled = true;
          prev.disabled = true;
          showRandomSlides(current.textContent - 2);
          current.textContent--;
        }, 600);
      } else {
        setTimeout(function () {
          last.disabled = false;
          next.disabled = false;
          showRandomSlides(current.textContent - 2);
          current.textContent--;
        }, 600);
      }
      resetAnimation();
    }
  });

  next.addEventListener('click', function () {
    if (cards.style.animation === '') {
      cards.style.animation = 'slider-move-right 2s linear';
      if (!JSONPets[arrRandomBig[(+current.textContent + 1) * numberCards]]) {
        setTimeout(function () {
          last.disabled = true;
          next.disabled = true;
          showRandomSlides(current.textContent);
          current.textContent++;
        }, 600);
      } else {
        setTimeout(function () {
          first.disabled = false;
          prev.disabled = false;
          showRandomSlides(current.textContent);
          current.textContent++;
        }, 600);
      }
      resetAnimation();
    }
  });

  last.addEventListener('click', function () {
    if (cards.style.animation === '') {
      cards.style.animation = 'slider-move-right 2s linear';
      setTimeout(function () {
        showRandomSlides(arrRandomBig.length / numberCards - 1);
        current.textContent = arrRandomBig.length / numberCards;
        last.disabled = true;
        next.disabled = true;
        first.disabled = false;
        prev.disabled = false;
      }, 600);
      resetAnimation();
    }
  });

  function resetAnimation() {
    setTimeout(function () {
      cards.style.animation = '';
    }, 1000);
  }

  function showRandomSlides(pageNumber) {
    let i = 0;
    while (i < numberCards) {
      card[i].children[1].textContent = JSONPets[arrRandomBig[i + pageNumber * numberCards]].name;
      card[i].children[0].alt = JSONPets[arrRandomBig[i + pageNumber * numberCards]].name;
      card[i].children[0].src = JSONPets[arrRandomBig[i + pageNumber * numberCards]].img;
      i++;
    }
  }

  showRandomSlides(0);
})();


let key;
let index;
let overlayPopup = document.querySelector('.overlay__popup');
let popup = document.querySelector('.popup');
let popupImg = popup.querySelector('.popup__img');
let popupTitle = popup.querySelector('.popup__title');
let popupSubtitle = popup.querySelector('.popup__subtitle');
let popupDesc = popup.querySelector('.popup__description');
let popupList = popup.querySelector('.popup__list');
let popupClose = popup.querySelector('.popup__close');

for (let i = 0; i < card.length; i++) {
  card[i].addEventListener('click', function () {
    overlayPopup.classList.add('is-active');
    popup.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    calcPopup(i);
  });
}

overlayPopup.addEventListener('mouseenter', function () {
  popupClose.style.backgroundColor = '#FDDCC4';
  popupClose.style.borderColor = '#FDDCC4';
});

overlayPopup.addEventListener('mouseout', function () {
  popupClose.style.backgroundColor = 'transparent';
  popupClose.style.borderColor = '';
});

popupClose.addEventListener('mouseenter', function () {
  popupClose.style.backgroundColor = '#FDDCC4';
  popupClose.style.borderColor = '#FDDCC4';
});

popupClose.addEventListener('mouseout', function () {
  popupClose.style.backgroundColor = 'transparent';
  popupClose.style.borderColor = '';
});

popupClose.addEventListener('click', function () {
  popup.classList.remove('is-active');
  overlayPopup.classList.remove('is-active');
  document.body.style.overflow = '';
});

overlayPopup.addEventListener('click', function () {
  overlayPopup.classList.remove('is-active');
  popup.classList.remove('is-active');
  document.body.style.overflow = '';
});

function calcPopup(i) {
  key = card[i].childNodes[3].textContent;
  index = JSONPets.findIndex(el => el.name === key);
  popupImg.src = JSONPets[index].img;
  popupTitle.textContent = key;
  popupSubtitle.textContent = `${JSONPets[index].type} - ${JSONPets[index].breed}`;
  popupDesc.textContent = JSONPets[index].description;
  popupList.childNodes[1].childNodes[1].textContent = JSONPets[index].age;
  popupList.childNodes[3].childNodes[1].textContent = JSONPets[index].inoculations;
  popupList.childNodes[5].childNodes[1].textContent = JSONPets[index].diseases;
  popupList.childNodes[7].childNodes[1].textContent = JSONPets[index].parasites;
}


// // Переключение табов в блоке .season-tickets
//
// (function () {
//   let tabs = document.querySelector('.tabs');
//   if (!tabs) {
//     return;
//   }
//   let showTab = function (tabsItemTarget) {
//     if (!tabsItemTarget) {
//       return;
//     }
//     let ratesItem = document.querySelector(tabsItemTarget.getAttribute('href'));
//     let tabsItemActive = tabsItemTarget.parentElement.querySelector('.tabs__item_active');
//     if (!(ratesItem && tabsItemActive)) {
//       return;
//     }
//     let ratesListActive = ratesItem.parentElement.querySelector('.rates__list_active');
//     if (tabsItemTarget === tabsItemActive || !ratesListActive) {
//       tabsItemTarget.blur();
//       return;
//     }
//     tabsItemActive.classList.remove('tabs__item_active');
//     ratesListActive.classList.remove('rates__list_active');
//     tabsItemTarget.classList.add('tabs__item_active');
//     tabsItemTarget.blur();
//     ratesItem.classList.add('rates__list_active');
//   };
//
//   tabs.addEventListener('click', function (evt) {
//     if (!evt.target.classList.contains('tabs__item')) {
//       return;
//     }
//     evt.preventDefault();
//     showTab(evt.target);
//   });
// })();
//
// // Слайдеры
//
// var $;
// $(document).ready(function () {
//   $('.trainers__list').slick({
//     dots: false,
//     infinite: true,
//     speed: 1100,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     responsive: [{
//       breakpoint: 1199,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         infinite: false,
//         dots: false
//       }
//     },
//     {
//       breakpoint: 767,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//     ]
//   });
//   $('.reviews__list').slick({
//     variableWidth: true
//   });
// });
//
// // Маска
//
// let phone = document.querySelector('#user-phone');
// let MASK_OPTIONS = {
//   mask: '+{7}(000)0000000'
// };
// if (phone) {
//   IMask(phone, MASK_OPTIONS);
// }
//
// // localStorage
//
// let formInputs = document.querySelectorAll('.form input');
//
// if (formInputs) {
//   formInputs.forEach((item) => {
//     item.value = localStorage.getItem(item.getAttribute('id'));
//     item.addEventListener('input', () => {
//       localStorage.setItem(item.getAttribute('id'), item.value);
//     });
//   });
// }
