// Se debe almacenar la URL del JSON que se quiere recuperar en una variable
import "./style.css"
const requestURL = 'https://api-prod.kokorokids.app/games/';
let globalGames;

const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
  const games = request.response;
  showGames(games);
}

function showGames(jsonObj) {
  //Creating JSON Object
  const games = jsonObj['games'];
  globalGames = games;

  var container = document.createElement("div");
  container.setAttribute("id", "container");
  document.body.appendChild(container);


  for (var i = 0; i < games.length; i++) {
    const item = document.createElement('div');
    item.setAttribute("class", "item");
    const myH2 = document.createElement('h2');

    myH2.textContent = games[i].title;
    item.setAttribute("onclick", "showDetails(" + i + ")");

    item.appendChild(myH2);
    container.appendChild(item);
  }

}

function showDetails(id) {

  //Create overlay div
  const overlay = document.createElement('div');
  overlay.setAttribute("id", "overlay");
  overlay.setAttribute("class", "overlay");
  overlay.setAttribute("onclick", "closeModal()");
  document.body.appendChild(overlay);

  //Create popup
  const modal = document.createElement('div');
  modal.setAttribute("id", "modal");
  modal.setAttribute("class", "modal");
  const myPara1 = document.createElement('p');


  //Getting title, description, etc
  const myH2 = document.createElement('h1');

  myH2.textContent = globalGames[id].title;
  myPara1.textContent = globalGames[id].description;
  modal.appendChild(myH2);
  modal.appendChild(myPara1);

  //Getting categories 
  const categories = globalGames[id].categories;
  const listItem = document.createElement('p');
  listItem.textContent += "Categories: ";

  for (var j = 0; j < categories.length; j++) {
      string = categories[j].name;
      string = string.replace('_',' ');
    
    listItem.textContent += "/"+string+"/ ";

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


}


