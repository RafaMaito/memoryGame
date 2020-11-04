window.onload = function () {
  rememberCards();
};
const cardsBoard = document.getElementById('cardsBoard');

const realCards = [
  'car-topview.svg',
  'car-topview-2.svg',
  'car-topview-3.svg',
  'car-topview-4.svg',
  'car-topview-5.svg',
  'car-topview-6.svg',
];
let firstCard,
  secondCard,
  moves = 0,
  points = 0;
let pointsInput = document.getElementById('pointsInput'),
  movesInput = document.getElementById('movesInput');
function showCards() {
  cardsBoard.innerHTML = '';
  shuffleCards();
  shuffleCards();
}
showCards();

function shuffleCards() {
  realCards.sort(() => Math.random() - 0.5);
  for (const item of realCards) {
    cardsBoard.innerHTML += `
      <div class="cardMem d-flex align-items-center justify-content-center flex-wrap" onclick="flipCard(event)">
      <img src="./img/${item}" />
      <img src="./img/inte.svg"  />
      </div>
        `;
  }
}

function rememberCards() {
  const cards = document.querySelectorAll('.cardMem');
  cards.forEach((card) => {
    card.classList.add('flip');
  });
  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove('flip');
    });
  }, 2000);
}

function compareCards(firstCard, secondCard) {
  moves++;
  movesInput.value = moves;
  if (firstCard.outerHTML === secondCard.outerHTML) {
    firstCard.removeAttribute('onclick');
    secondCard.removeAttribute('onclick');
    points++;
    pointsInput.value = points;
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      firstCard.setAttribute('onclick', 'flipCard(event)');
      secondCard.setAttribute('onclick', 'flipCard(event)');
    }, 500);
  }
  if (points === 6) {
    setTimeout(() => {
      alert(`Parabéns você venceu com ${moves} jogadas`);
      document.location.reload(true);
    }, 500);
  }
}
function flipCard(event) {
  const cardFunc = event.path[1];

  if (!firstCard) {
    firstCard = cardFunc;
    firstCard.removeAttribute('onclick');
    firstCard.classList.add('flip');
    return;
  }
  if (!secondCard) {
    secondCard = cardFunc;
    secondCard.removeAttribute('onclick');
    secondCard.classList.add('flip');
    compareCards(firstCard, secondCard);
  }
  firstCard = undefined;
  secondCard = undefined;
  return;
}
