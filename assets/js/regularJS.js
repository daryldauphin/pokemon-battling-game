
var pokemonDB = [
    {
      name: 'charmander',
      type: 'fire',
      hp: 43,
      attack: 48,
      defense: 65,
      level: 1,
      img:'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
    },
    {
      name: 'bulbasaur',
      type: 'fire',
      hp: 45,
      attack: 49,
      defense: 49,
      level: 1,
      img:'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'

    },
    {
      name: 'squirtle',
      type: 'water',
      hp: 44,
      attack: 48,
      defense: 65,
      level: 1,
      img:'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'

    },
    
  ]

  // state
var gameState = {
  userPokemon: '',
  rivalPokemon: ''
}

//elements
var pokemonsEl = document.querySelector('.select-screen').querySelectorAll('.character');
var battleScreenEl = document.getElementById('battle-screen');
var attackBtnsEl = document.getElementById('battle-screen').querySelectorAll('.attack');


var i = 0;

//initial loop
while (i < pokemonsEl.length) {
  //add function to all characters on screen select
  pokemonsEl[i].onclick = function () {
    //current pokemon name
   var pokemonName = this.dataset.pokemon;
   //elements for imaghes on battle screen
   var player1Img = document.querySelector('.player1').getElementsByTagName('img')
   var player2Img = document.querySelector('.player2').getElementsByTagName('img')

    //save the current pokemon name to the game state
   gameState.userPokemon = pokemonName;

   //cpu picks pokemon
   cpuPick();

   //change screen to battle screen
   battleScreenEl.classList.toggle('active');

   //select data from current pokemon
    gameState.currentPokemon = pokemonDB.filter(function(pokemon) {
      return pokemon.name === gameState.userPokemon;
    })

    //select data from current cpu pokemon
    gameState.currentRivalPokemon = pokemonDB.filter(function(pokemon) {
      return pokemon.name === gameState.rivalPokemon;
    })

    player1Img[0].src = gameState.currentPokemon[0].img;
    player2Img[0].src = gameState.currentRivalPokemon[0].img;

//current user and cpu pokemon initial health
    gameState.currentPokemon[0].health = calculateInitialHealth(gameState.currentPokemon);
        gameState.currentRivalPokemon[0].health = calculateInitialHealth(gameState.currentRivalPokemon);
    
        //user choose attack

    //cpu health goes down 


    //cpu attack


    //user health goes down


    //rock > scissors > paper > rock

    //depending on pokemon type and defense is how hard the attack is going to be

    //if user health is 0, game over
  }
i++
}


var a = 0;
while (a < attackBtnsEl.length) {
  attackBtnsEl[a].onclick = function() {
    var attackName = this.dataset.attack;
    gameState.currentUserAttack = attackName;

    play(attackName, cpuAttack())  
  }
  a++;
}

var cpuAttack = function () {
  var attacks = ["rock", "paper", "scissors"]

  return attacks[randomNumber(0, 3)]
}

var calculateInitialHealth = function (user) {
 return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
}

var attackMove = function (attack, level, stack, critical, enemy) {
  var attackAmount = (((2 * level + 10) / 250) * (attack / enemy.defense) * stack) * critical;
  enemy.health -= attackAmount;

  console.log(enemy.health)
}

var checkWinner = function (enemy) {
  if (enemy <= 0) {
    return true;
  }
  return false;
}


var play = function (userAttack, cpuAttack) {
  var currentPokemon = gameState.currentPokemon[0];
  var currentRivalPokemon = gameState.currentRivalPokemon[0];

  switch (userAttack) {
    case "rock":
      if (cpuAttack === "paper") {
        attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 0.5, currentRivalPokemon);
        attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 2, currentPokemon);

        console.log("paper wins")
      }
      if (cpuAttack === "sciccors") {
        attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 2, currentRivalPokemon);
        attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, .5, currentPokemon);
        console.log("rock wins")
      }
      if (cpuAttack === "rock") {
        attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 0.1, currentRivalPokemon);
        attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 1, currentPokemon);
        console.log("DRAW")
      }
      break;
    case "paper":
      if (cpuAttack === "paper") {
        attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 1, currentRivalPokemon);
        attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 1, currentPokemon);

        console.log("paper wins")
      }
      if (cpuAttack === "sciccors") {
        attackMove(currentPokemon.attack, currentPokemon.level, 0.8, .5, currentRivalPokemon);
        attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 2, currentPokemon);
        console.log("rock wins")
      }
      if (cpuAttack === "rock") {
        attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 2, currentRivalPokemon);
        attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, .5, currentPokemon);
        console.log("DRAW")
      }
      break;
    case "scissors":
      if (cpuAttack === "paper") {
        attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 2, currentRivalPokemon);
        attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, .5, currentPokemon);

        console.log("paper wins")
      }
      if (cpuAttack === "sciccors") {
        attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 1, currentRivalPokemon);
        attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 1, currentPokemon);
        console.log("rock wins")
      }
      if (cpuAttack === "rock") {
        attackMove(currentPokemon.attack, currentPokemon.level, 0.8, 0.5, currentRivalPokemon);
        attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, 0.8, 2, currentPokemon);
        console.log("DRAW")
      }
      break;
  }
}


var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var cpuPick = function () {
  gameState.rivalPokemon = pokemonsEl[randomNumber(0, 3)].dataset.pokemon;
  
}

















  
  
//   var attack = 20;
//   var level = 10;
//   var stack = 1.3;
//   var defence = 39;
  
//   // create a formula for attacks
//   console.log((attack * level ) * stack / 7)
  
  
  
//   // create a formula for health
//   //HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
//   console.log(((0.20 * Math.sqrt(level)) * defence) * 15)
  
  
  
  
//   // let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
//   // p1 vs p2
  
  
  
  
//   // when one user loses all his health declare a winner
  
  