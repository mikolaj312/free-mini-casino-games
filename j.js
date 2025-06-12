//game 1
let betAmmount = document.getElementById("bet");
let bombQuantity = document.getElementById("bomb");
let mn = document.getElementById("mn");
const playBtn = document.getElementById("StartGame");
const gameBoard = document.getElementById("t");
const cashOutBtn = document.getElementById("cashOut");
let Money = document.getElementById("m");
const game1Btn = document.getElementById("game1");
const game2Btn = document.getElementById("game2");
const game3Btn = document.getElementById("game3");
const game1Block = document.getElementById("g1");
const game2Block = document.getElementById("g2")
const game3Block = document.getElementById("g3")
const bombGame = document.getElementById("bb")
const SlotsGame = document.getElementById("slots");
const CoinFlipGame = document.getElementById("CoinFlip");
const exit = document.getElementById("exit");
const diamont = '💎';
const bomb = '💣';
let currentGame = "";
let userMoney =  1000;
localStorage.setItem("money",userMoney);
let clicks = 0;
let mnoznik = 0;
let userBet;
let bombQ;





//game 1
game1Btn.addEventListener("click",()=>{
  exit.classList.add("gg");
  bombGame.style.display = "block";
  game1Block.style.display = "none";
  game2Block.style.display = "none";
  game3Block.style.display = "none";
  currentGame = bombGame;
})

game2Btn.addEventListener("click",()=>{
  exit.classList.add("gg");
  SlotsGame.style.display = "block";
  game1Block.style.display = "none";
  game2Block.style.display = "none";
  game3Block.style.display = "none";
  currentGame = SlotsGame;

})

game3Btn.addEventListener("click",()=>{
    exit.classList.add("gg");
    CoinFlipGame.style.display = "block";
    game1Block.style.display = "none";
   game2Block.style.display = "none";
   game3Block.style.display = 'none';
   currentGame = CoinFlipGame;
})

exit.addEventListener("click",()=>{
  currentGame.style.display = "none";
  game1Block.style.display = "block";
  game2Block.style.display = "block";
  game3Block.style.display = "block";
  exit.classList.remove("gg");
}) 


generateTiles();
function generateTiles(){

  for(let i = 0;i<25;i++){
    gameBoard.innerHTML+=`
      <div class="tile" id=${i+1}></div>
    `
  }
}



playBtn.addEventListener("click",start);

function start(){
   userBet = Number(betAmmount.value);
   bombQ = Number(bombQuantity.value);
   clicks = 0;
   mn.value = 1;
   mnoznik = 1;

   if(userMoney <= 0){
        noMoney();
   }else{
    if(userBet >=1 && userBet <= userMoney){
         if(userBet ==="" || bombQ === "" ){
    console.log("Bład.Wystepuja puste wartosci");
  }else{
    userMoney = userMoney - (userBet * mnoznik);
    localStorage.setItem("money",userMoney);
    Money.value = userMoney.toFixed(2)
    cashOutBtn.style.display = "block";
    playBtn.style.opacity = 0.6;
    playBtn.style.cursor = "default";

    playBtn.removeEventListener("click",start);

    b(bombQ);
    removeBombclass();
    setTilesClass();
    clearBoard();
    canClick();
  }
    }else{
      alert("Błąd!");
    }
 
   }
  



}

function b(s = 1){

  const tiles = document.querySelectorAll(".tile");


  tiles.forEach(tile => tile.innerText = "");
  tiles.forEach(tile=>tile.innerText=diamont);

  let count = 0;

  while(count < s){
    let r = Math.floor(Math.random() * 25);
    let tile = tiles[r];

    if(tile.innerText  !=bomb){
      tile.innerText = bomb;
      count++;
    }


  }
}


function canClick() {
  document.querySelectorAll(".tile").forEach(tile => {
    tile.addEventListener("click", () => {
      check(tile);
    }, { once: true });
  });
}


function check(tile){
  console.log(clicks)

    if(tile.innerText == bomb){
      lose(tile);
    }else{
      mnoznik = Math.round((1.07 ** clicks) * (10 + (bombQ/4) )) / 10;
      mn.value = mnoznik + "x";
    }
    tile.style.fontSize = 50 + "px";
    tile.classList.add("lose");

    clicks++;
    if (clicks == 24) win();

}

function clearBoard(){
  document.querySelectorAll(".tile").forEach(tile=>{
    tile.style.fontSize = 0;
  })
}


function lose(tile = null){
  mn.value = "";
  clicks = 0;

  tile ?  tile.classList.add("bomb") : "";
  gameOverTiles();
  setTilesClass(true);

  playBtn.style.opacity = 1;
  playBtn.style.cursor = "pointer";
  cashOutBtn.style.display = "none";

  playBtn.addEventListener("click",start); 
}


function setTilesClass(t){
  if(t){
    document.querySelectorAll(".tile").forEach(x=>x.classList.add("lose"));
  }else{
    document.querySelectorAll(".tile").forEach(x=>x.classList.remove("lose"));
  }
}






function gameOverTiles(){
  document.querySelectorAll(".tile").forEach(tile=>{
    tile.classList.add("lose");
    tile.style.fontSize = 50 + "px";
  })
}
function removeBombclass(){
  document.querySelectorAll(".tile").forEach(tile=>{
    tile.classList.remove("bomb");
  })
}


cashOutBtn.addEventListener("click",()=>{
  win();
})

function win(){
  userMoney = userMoney + (userBet * mnoznik);
  localStorage.setItem("money",userMoney);
  Money.value = userMoney.toFixed(2);
  lose();
}


const slotPlayBtn = document.getElementById("sPlay");
let slot1 = document.getElementById("leftSlot");
let slot2 = document.getElementById("centerSlot");
let slot3 = document.getElementById("rightSlot");
let slotUserBet = document.getElementById("slotBet");
let slotValues = ["🍒","🍇","🍉"]
let slotBet;
slotPlayBtn.addEventListener("click",start2);


function start2(){
  slotBet = slotUserBet.value;
  
  if(Number(Money.value) <=0){
    noMoney();
  }else{
  if(slotBet > Number(Money.value)){
    alert("Wartość zakładu jest większa niż to co posiadasz!");
  }else{
  if(slotBet >=1){
    slot();
  }else{
    alert("Podana wartość jest nieprawidłowa");
    slotUserBet.classList.add("alert");
  }
  }
  }




  setTimeout(removeInpAnimation,2000)


}
function removeInpAnimation(){
  slotUserBet.classList.remove("alert")
}
function slot(){
  slotPlayBtn.classList.add("playing");
  animation();
  setTimeout(insertIntoSlots,3100);
  setTimeout(remove,3100);
}


function animation(){
    document.querySelectorAll("span").forEach(span=>{
    span.classList.add("animation")
  })
}


function removeAnimation(){
      document.querySelectorAll("span").forEach(span=>{
    span.classList.remove("animation")
  })
}

function insertIntoSlots(){
    let slots = document.querySelectorAll(".slot span");
    let currentSlots = [];
    for(let i =0; i < 3;i++){
    let r= Math.floor(Math.random() * 3);
    slots[i].innerText = slotValues[r];
    currentSlots.push(slotValues[r]);
    }
    
    checkWin(currentSlots)
}

function remove(){
  removeAnimation();
  slotPlayBtn.classList.remove("playing");
}




function checkWin(cSlots){

  let [a,b,c] = cSlots;

  if(a == b && a == c && b == c){
    ubdtMoney("bigwin")
  }else if(a === b || b === c || a === c){
    ubdtMoney("smallwin")
  }else{
    ubdtMoney("notwin");
  }
}


function ubdtMoney(winSize){
  let winAmount = 0;
  switch(winSize){
    case "bigwin":
      winAmount =  Number(slotBet) * 5;
      break;
    case "smallwin":
      winAmount = Number(slotBet) * 1.2;
      break;
    case "notwin":
     winAmount = -Number(slotBet);
      break;
  }

  let ubdtMoney = userMoney + winAmount;
  userMoney = ubdtMoney;
  Money.value = ubdtMoney.toFixed();
}


function noMoney(){
  alert(`Nie masz już pieniędzy!
      Strona zostanie odświeżona abyś mógł znowu grać.
    `)
  location.reload();
}


//game  3


let userBetCoinFlip = document.getElementById("betCoinFlip");
const headsBtn = document.getElementById("h");
const tailsBtn = document.getElementById("t2");
const betCoinFlipBtn = document.getElementById("betCoinBtn");
let coin = document.getElementById("coin")
let userChoice;
let coinplay = false;
betCoinFlipBtn.addEventListener("click",start3);
let choices = ["h","t"];
let userBetC;



headsBtn.addEventListener("click",()=>{
  userChoice = "h";
  addClass();
})

tailsBtn.addEventListener("click",()=>{
  userChoice="t";
  addClass();
})

function start3(){

   userBetC = Number(userBetCoinFlip.value);

  if(userMoney <= 0){
    noMoney();
  }else{
  if(userBetC >= 1 && userBetC <= userMoney){
    addClassToCoin();

    setTimeout(roll,1200);

  }else{
    alert("Wartość zakladu jest za wysoka!");
  }
  }
}

function roll(){
  let r = Math.floor(Math.random() * 2);
  if(r == 0){
     coin.textContent = "🦅"
    coin.style.background = "rgba(21, 137, 214,.5)";
  }else{
     coin.textContent = "🪙"
    coin.style.background = "rgba(226, 154, 21,.5)";
  }

  if(userChoice == choices[r]){
    userMoney += userBetC*2;
    Money.value = userMoney.toFixed(2);
  }else{
    userMoney -= userBetC;
    Money.value = userMoney.toFixed(2);
  }

  userChoice = "";
  removeClassToCoin();
  removeClass();
}

function addClass(){
  betCoinFlipBtn.classList.add("onplay");
}

function removeClass(){
    betCoinFlipBtn.classList.remove("onplay");
}

function addClassToCoin(){
  coin.classList.add("flip");
}
function removeClassToCoin(){
  coin.classList.remove("flip");
}