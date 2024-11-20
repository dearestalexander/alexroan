/*

When #search-input contains 'Red' & #search-button clicked
- alert("Pokémon not found")

Clear #types between searches (and other things?)

When #search-input contains 'Pikachu' & #search-button clicked
- values should be: PIKACHU, #25/25, Weight: 60 or 60, Height: 4 or 4, 35, 55, 40, 50, 50, 90
- add an img element with id of "sprite" and src set to Pokemon's front_default sprite
- #types should contain a single inner element with value 'ELECTRIC'

When #search-input contains '94' & #search-button clicked
- values should be: GENGAR, #94/94, Weight: 405 or 405, Height: 15 or 15, 60, 65, 60, 130, 75, 110
- add an img element with id of "sprite" and src set to Pokemon's front_default sprite
- #types should contain two inner elements with value 'GHOST' and 'POISON'

** functions **

3. fetch data from API 
- await fetch
- await json (convert to json)


4. search for pokemon
- deconstruct id and name
- search through values
  - if no match alert " not found "
  - if found call function to update HTML


5. Update HTML
- deconstruct required values / data
- fill HTML sections
  - Name, ID, weight, height
  - Types
  - Image
  - Stats

API details

All valid pokemon names, id numbers, and URLs
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon

Data for pokemon
https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id}

*/

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');

const pkName = document.getElementById('pokemon-name');
const pkId = document.getElementById('pokemon-id');
const pkWeight = document.getElementById('weight');
const pkHeight = document.getElementById('height');
const imgContainer = document.getElementById('img-container');
const pkTypes = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const spattack = document.getElementById('special-attack');
const spdefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const allValues = document.querySelectorAll('.vls');

const allUrL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
const pkUrL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"


// Main program. Listen for click on search then run functions.

searchBtn.addEventListener('click', async e => {
  e.preventDefault();
  const searchVal = searchInput.value;
  const pokeNameOrNum = formatInput(searchVal);
  const data = await fetchPokemon();
  const pokemonUrl = searchForPokemon(data, pokeNameOrNum);
  const detailsData = await fetchPokemonDetails(pokemonUrl);
  console.log(detailsData);
  updateHTML(detailsData);
})


// Clear / reset form

const clearResults = (arr) => {
  for (i = 0; i < arr.length; i++) {
    arr[i].textContent = "";
  }
}

// Check the input value and format as required
// Returns either a Pokemon name or number

const formatInput = (inpVal) => {

  // check it's not a number
  if (isNaN(parseInt(inpVal))) {
    inpVal = inpVal.toLowerCase();

    // if it's not a number, check for special characters
    const regex = /[^a-z0-9♀♂\s]/i;
    if (regex.test(inpVal)) {
      console.log(inpVal + " : contains special characters");
    } else {
      console.log(inpVal + " : doesn't contains special characters");

      // replace space with dash
      inpVal = inpVal.replace(/ /g, "-");
      console.log(inpVal + " : spaces replaced");

      // replace meal and female symbol with text
      if (inpVal.includes("♀")) {
        inpVal = inpVal.replace(/♀/, "");
        inpVal += "-f";
        console.log(inpVal + " : female replaced");
      };
      if (inpVal.includes("♂")) {
        inpVal = inpVal.replace(/♂/, "");
        inpVal += "-m";
        console.log(inpVal + " : male replaced");
      }
    }
    return inpVal;

  } else {

    // if it is a number
    console.log(inpVal + ": is a number");
    return parseInt(inpVal);
  }
}


// Fetch list of Pokemon from API
// Return the fetched data which is an object which includes an array called 'results'

const fetchPokemon = async () => {
  const res = await fetch(allUrL);
  const data = await res.json();
  return data;
}


// Search for Pokémon

const searchForPokemon = (data, searchVal) => {
  console.log(data);
  const { results } = data;
  let found = false;
  let foundUrl = "";

  results.forEach((obj) => {
    const { id, name, url } = obj;
    if (id === searchVal || name === searchVal) {
      foundUrl = url;
      found = true;
    }
  })
  if (found === true) {
    return foundUrl;
  } else {
    alert("Pokémon not found");
  }
}


// Get Pokémon details

const fetchPokemonDetails = async (url) => {
  console.log(url);
  const detailsRes = await fetch(url);
  const detailsData = await detailsRes.json();
  return detailsData;
}


// Update HTML with Pokémon details

const updateHTML = (data) => {
  const { height, id, name, sprites, stats , types, weight } = data;

  pkName.textContent = name.toUpperCase();
  pkId.textContent = `# ${id}`;
  pkWeight.textContent = `Weight: ${weight}`;
  pkHeight.textContent = `Height: ${height}`;

  // pkTypes
  types.forEach((el) => {
    pkTypes.innerHTML += `<p class="pkTypes">${el.type.name}</p>`;
    console.log(el.type.name);
  })

  // imgContainer
  imgContainer.innerHTML = `<img id="sprite" src="${sprites.front_default}">`;
  console.log(sprites.front_default);
  
  // stats
  hp.innerHTML = `<p>${stats[0].base_stat}`;
  attack.innerHTML = `<p>${stats[1].base_stat}`;
  defense.innerHTML = `<p>${stats[2].base_stat}`;
  spattack.innerHTML = `<p>${stats[3].base_stat}`;
  spdefense.innerHTML = `<p>${stats[4].base_stat}`;
  speed.innerHTML = `<p>${stats[5].base_stat}`;
}



/*
const res = await fetch(forumLatest);
const data = await res.json();
showLatestPosts(data);

const showLatestPosts = (data) => {
  const { topic_list, users } = data;
  const { topics } = topic_list;
  postsContainer.innerHTML = topics.map((item) => {
    const { id, title, views, posts_count, slug, posters, category_id, bumped_at } = item;
  });
};
*/