// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.addEventListener(`load`, () => {
  document.body.classList.add(`page-loaded`);
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const wordToOrdersObj = {
  'ТАИНСТВЕННЫЙ': [4, 2, 1, 2, 3, 2, 1, 6, 3, 1, 3, 1],
  'ОТПУСК': [4, 6, 3, 1, 5, 2],
  '01 — 31.05 / 2020': [4, 3, 1, 3, 1, 5, 2, 3, 3, 6, 1, 2, 1, 1, 5, 4, 2],
  'ИСТОРИЯ': [5, 2, 1, 2, 3, 2, 1],
  'ПРИЗЫ': [4, 2, 1, 2, 3],
};

function getDelaysForWord(word) {
  const defaultOrders = [];
  const customizedWord = word.toUpperCase();

  for (let i = 0; i < word.length; i++) {
    defaultOrders.push(getRandomInt(1, 6));
  }

  return wordToOrdersObj[customizedWord] ? wordToOrdersObj[customizedWord] : defaultOrders;
}

function animateText(parentElem) {
  const parentText = parentElem.textContent
    .split(/\r\n|\r|\n/g)
    .map((item) => item.trim())
    .filter((item) => item !== ``);

  parentElem.innerHTML = ``;

  parentText.forEach((row) => {
    const currentRow = document.createElement(`span`);
    const letterDelays = getDelaysForWord(row);
    currentRow.classList.add(`text-block`);

    for (let i = 0; i < row.length; i++) {
      const currentLetter = document.createElement(`span`);
      currentLetter.classList.add(`letter`);
      currentLetter.classList.add(`letter--${letterDelays[i]}`);
      currentLetter.innerText = row[i];
      currentRow.appendChild(currentLetter);
    }

    parentElem.appendChild(currentRow);
  });
}

animateText(document.querySelector(`.intro__title`));
animateText(document.querySelector(`.intro__date`));
animateText(document.querySelector(`.slider__item:nth-child(1) .slider__item-title`));
animateText(document.querySelector(`.prizes__title`));
