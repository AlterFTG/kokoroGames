import "./style.css"
import gameRepository from "./repositories/gamesRepository";

async function getGames() {
  try {
    //array of games
    const games = await gameRepository.get();
    showGames(games);
   
  } catch (err) {
    let errMsg = document.createElement("p");
    errMsg.textContent = err;
    document.body.appendChild(errMsg);
  }
}
getGames();

let globalGames;
let selectedGame;

function showGames(games) {
  //Creating JSON Object
  globalGames = games;

  var container = document.createElement("div");
  container.setAttribute("id", "container");
  document.body.appendChild(container);


  for (var i = 0; i < games.length; i++) {
    const game = games[i];
    const item = document.createElement('div');
    item.setAttribute("class", "item");
    const myH2 = document.createElement('h2');

    myH2.textContent = game.title;
    item.addEventListener("click", function () {
      selectedGame = game;
      showDetails();
    });

    item.appendChild(myH2);
    container.appendChild(item);
  }

}

function showDetails() {

  //Create overlay div
  const overlay = document.createElement('div');
  overlay.setAttribute("id", "overlay");
  overlay.setAttribute("class", "overlay");
  overlay.addEventListener("click", closeModal)
  document.body.appendChild(overlay);

  //Create popup
  const modal = document.createElement('div');
  modal.setAttribute("id", "modal");
  modal.setAttribute("class", "modal");
  const myPara1 = document.createElement('p');


  //Getting title, description, etc
  const myH2 = document.createElement('h1');

  myH2.textContent = selectedGame.title;
  myPara1.textContent = selectedGame.description;
  modal.appendChild(myH2);
  modal.appendChild(myPara1);

  //Getting categories 
  const categories = selectedGame.categories;
  const listItem = document.createElement('p');
  listItem.textContent += "Categories: ";

  for (var j = 0; j < categories.length; j++) {
    let string = categories[j].name;
    string = string.replace('_', ' ');

    listItem.textContent += "/" + string + "/ ";

  }
  modal.appendChild(listItem);


  document.body.appendChild(modal);
  document.body.appendChild(overlay);

}

function closeModal() {
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");
  overlay.parentNode.removeChild(overlay);
  modal.parentNode.removeChild(modal);
  selectedGame = null;
}

