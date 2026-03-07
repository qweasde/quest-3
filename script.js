const audioBtn = document.querySelector('.audio-btn');
const audio = document.getElementById('voice-audio');

audioBtn.addEventListener('click', () => {
    audio.play();
});

const cards = document.querySelectorAll(".card");
const result = document.getElementById("memory-result");

let firstCard = null;
let secondCard = null;
let lock = false;
let matched = 0;


// перемешивание карточек
function shuffle(){
  const game = document.getElementById("memory-game");
  const arr = Array.from(cards);

  arr.sort(()=>Math.random()-0.5);

  arr.forEach(card=>{
    game.appendChild(card);
  });
}


// показать все карточки на 2 секунды
function preview(){
  cards.forEach(card=>{
    card.classList.add("open");
  });

  setTimeout(()=>{
    cards.forEach(card=>{
      card.classList.remove("open");
    });
  },2000);
}


// клик по карточке
cards.forEach(card=>{
  card.addEventListener("click",()=>{

    if(lock || card.classList.contains("open")) return;

    card.classList.add("open");

    if(!firstCard){
      firstCard = card;
      return;
    }

    secondCard = card;
    lock = true;

    const id1 = firstCard.dataset.id;
    const id2 = secondCard.dataset.id;

    if(id1 === id2){

      firstCard.classList.add("matched");
      secondCard.classList.add("matched");

      matched += 2;

      reset();

      if(matched === 8){
        result.textContent = "Ура! Ты уже близко к главному подарку! Сейчас иди к духовке ";
      }

    }else{

      setTimeout(()=>{
        firstCard.classList.remove("open");
        secondCard.classList.remove("open");
        reset();
      },800);

    }

  });
});


function reset(){
  firstCard = null;
  secondCard = null;
  lock = false;
}


// запуск
shuffle();
preview();