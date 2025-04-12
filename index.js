/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
        games.forEach(game => {
            let element=document.createElement("div");
            element.classList.add("game-card");
            element.innerHTML=` <img class="game-img" src="${game.img}" alt="${game.name}">
                                <h3>${game.name}</h3>
                                <p>${game.backers} people have donated</p> `;
            document.getElementById("games-container").appendChild(element);
        });

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalcontributions= GAMES_JSON.reduce((acc,game)=>acc+game.pledged,0)
const totalppl=GAMES_JSON.reduce((acc,game)=>acc+game.backers,0)
// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML=`${totalppl.toLocaleString("en-US")}`
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
raisedCard.innerHTML=`$${totalcontributions.toLocaleString("en-US")}`
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML=`${GAMES_JSON.length}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
let unfunded=false;
let funded=false;
let allgames=true;
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfunded=GAMES_JSON.filter(game=>game.pledged<game.goal)
    console.log("unfunded:"+unfunded.length);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);
    unfunded=true;
    funded=false;
    allgames=false;

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded=GAMES_JSON.filter(game=>game.pledged>=game.goal);
    console.log("funded:"+funded.length);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded)
    funded=true;
    unfunded=false;
    allgames=false;
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
    funded=false;
    unfunded=false;
    allgames=true;
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundednum=GAMES_JSON.reduce((acc,game)=>(game.pledged<game.goal) ? acc+1: acc,0)

// create a string that explains the number of unfunded games using the ternary operator
let explanation=`There ${unfundednum==1? "is":"are"} ${unfundednum} ${unfundednum==1 ? "unfunded game": "unfunded games"}.`

// create a new DOM element containing the template string and append it to the description container
let newelement=document.createElement("p");
newelement.textContent=explanation;
descriptionContainer.appendChild(newelement)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first,second,...others]=sortedGames;
console.log("first: "+first.name+"\nsecond: "+second.name)

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstp=document.createElement("p")
let secondp=document.createElement("p")
firstp.textContent=first.name;
secondp.textContent=second.name;
firstGameContainer.appendChild(firstp);
// do the same for the runner up item
secondGameContainer.appendChild(secondp);
function search(text) {
    let prevjson = [];
    if (funded) {
        prevjson=GAMES_JSON.filter(game=>game.pledged>=game.goal)
    } else if (unfunded) {
        prevjson=GAMES_JSON.filter(game=>game.pledged<game.goal);
    } else if (allgames) {
        prevjson=GAMES_JSON
    }
    let regex = new RegExp(`^${text}`, "i");
    let searched = prevjson.filter(game => regex.test(game.name));
    deleteChildElements(gamesContainer)
    if (text.length==0)
        addGamesToPage(prevjson)
    else 
        addGamesToPage(searched)
}
document.getElementById("search").addEventListener("input",(e)=>{search(e.target.value)});