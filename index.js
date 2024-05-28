let clicks = 0;
let pairsMatched = 0;
let totalPairs;
let timer = 0;
let timerInterval;
let initialPairsMatched = 0;
let cards = undefined;
let difficulty = "easy";
img1 = undefined;
img2 = undefined;
img3 = undefined;
img4 = undefined;
img5 = undefined;
img6 = undefined;

function updateHeader() {
  totalPairs = $(".card").length / 2;
  $("#game-header").text(`Clicks: ${clicks} | Pairs Matched: ${pairsMatched} | Pairs Left: ${totalPairs - pairsMatched} | Total Pairs: ${totalPairs} | You have 30 seconds! Time Remaining: ${formatTime(timer)}` );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    updateHeader();
    if (timer === 30) {
      clearInterval(timerInterval);
      alert("You lose! Time's up!");
      resetGame();
    }
  }, 1000);
}


function checkWin() {
  const matchedCards = $(".card.matched");
  pairsMatched = matchedCards.length / 2;
  updateHeader();
  if (pairsMatched === totalPairs) {
    clearInterval(timerInterval);
    setTimeout(() => {
      alert("Congratulations! You win!");
    }, 1000);
  }
}

function powerUp() {
  const randomValue = Math.random();
  if (randomValue < 0.1) {
    alert("Power up!");
    $(".card:not(.matched)").each(function () {
      const card = $(this);
      if (!card.hasClass("flip")) {
        card.toggleClass("flip");
        setTimeout(() => {
          card.toggleClass("flip");
        }, 1000);
      }
    });
  }
}


let pokemons = [];

const setup = async () => {
  let firstCard = undefined;
  let secondCard = undefined;

  $(".card").on("click", function () {
    if ($(this).hasClass("flip") || $(this).hasClass("matched")) {
      return;
    }
    if (firstCard && secondCard) {
      return;
    }
    powerUp();
    $(this).toggleClass("flip");
    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
    } else {
      secondCard = $(this).find(".front_face")[0];

      if (firstCard.src === secondCard.src) {
        $(`#${firstCard.id}`).parent().off("click");
        $(`#${secondCard.id}`).parent().off("click");
        $(`#${firstCard.id}`).parent().addClass("matched");
        $(`#${secondCard.id}`).parent().addClass("matched");
        firstCard = undefined;
        secondCard = undefined;
        checkWin();
      } else {
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip");
          $(`#${secondCard.id}`).parent().toggleClass("flip");
          firstCard = undefined;
          secondCard = undefined;
        }, 1000);
      }
    }
    clicks++;
    updateHeader();
  });
};

function resetGame() {
  clearInterval(timerInterval);
  $("#game_grid").hide();
  clearInterval(timerInterval);
  $(".card").removeClass("flip matched");
  pairsMatched = initialPairsMatched;
  timer = 0;
  clicks = 0;
  updateHeader();
  clearInterval(timerInterval);
  $("#game-header").hide();
}

function difficultyHard() {
  difficulty = "hard";
  cards = `
  <div class="card harder">
      <img id="img1" class="front_face" src="${img1}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card harder">
      <img id="img2" class="front_face" src="${img2}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card harder">
      <img id="img3" class="front_face" src="${img3}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card harder">
      <img id="img4" class="front_face" src="${img1}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card harder">
      <img id="img5" class="front_face" src="${img2}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card harder">
      <img id="img6" class="front_face" src="${img3}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>

    <div class="card harder">
      <img id="img7" class="front_face" src="${img4}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card harder">
      <img id="img8" class="front_face" src="${img5}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card harder">
      <img id="img9" class="front_face" src="${img6}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card harder">
      <img id="img10" class="front_face" src="${img4}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card harder">
      <img id="img11" class="front_face" src="${img5}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card harder">
      <img id="img12" class="front_face" src="${img6}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
  `;
}

function difficultyEasy() {
  difficulty = "easy";
  cards = `
  <div class="card">
      <img id="img1" class="front_face" src="${img1}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card">
      <img id="img2" class="front_face" src="${img2}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card">
      <img id="img3" class="front_face" src="${img3}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <br>
    <div class="card">
      <img id="img4" class="front_face" src="${img1}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card">
      <img id="img5" class="front_face" src="${img2}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
    <div class="card">
      <img id="img6" class="front_face" src="${img3}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>
  `;
}

function lightMode() {
  document.getElementById("game_grid").style.backgroundColor = "white";
}

function darkMode() {
  document.getElementById("game_grid").style.backgroundColor = "black";
}

function gameStart() {
  resetGame();
  $("#game_grid").show();
  $("#game-header").show();
  document.getElementById("game_grid").innerHTML = cards;
  setup();
  startTimer();
  updateHeader();

}

const getPokemons = async () => {
  let pokemonName1 = Math.floor(Math.random() * 811);
  const res1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName1}`)
  img1 = res1.data.sprites.other['official-artwork'].front_default;
  let pokemonName2 = Math.floor(Math.random() * 811);
  const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName2}`)
  img2 = res2.data.sprites.other['official-artwork'].front_default;
  let pokemonName3 = Math.floor(Math.random() * 811);
  const res3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName3}`)
  img3 = res3.data.sprites.other['official-artwork'].front_default;
  let pokemonName4 = Math.floor(Math.random() * 811);
  const res4 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName4}`)
  img4 = res4.data.sprites.other['official-artwork'].front_default;
  let pokemonName5 = Math.floor(Math.random() * 811);
  const res5 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName5}`)
  img5 = res5.data.sprites.other['official-artwork'].front_default;
  let pokemonName6 = Math.floor(Math.random() * 811);
  const res6 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName6}`)
  img6 = res6.data.sprites.other['official-artwork'].front_default;
  if (difficulty === "easy") {
    cards = `
      <div class="card">
          <img id="img1" class="front_face" src="${img1}" alt="">
          <img class="back_face" src="back.webp" alt="">
        </div>
        <div class="card">
          <img id="img2" class="front_face" src="${img2}" alt="">
          <img class="back_face" src="back.webp" alt="">
        </div>
        <div class="card">
          <img id="img3" class="front_face" src="${img3}" alt="">
          <img class="back_face" src="back.webp" alt="">
        </div>
        <div class="card">
          <img id="img4" class="front_face" src="${img1}" alt="">
          <img class="back_face" src="back.webp" alt="">
        </div>
        <div class="card">
          <img id="img5" class="front_face" src="${img2}" alt="">
          <img class="back_face" src="back.webp" alt="">
        </div>
        <div class="card">
          <img id="img6" class="front_face" src="${img3}" alt="">
          <img class="back_face" src="back.webp" alt="">
        </div>
      `;
  }
}

$(document).ready(() => {
  getPokemons();
  totalPairs = $(".card").length / 2;
  $("#game_grid").hide();
  updateHeader();
  $("#game-header").hide();
});