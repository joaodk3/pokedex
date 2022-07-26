const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const next = document.querySelector('.btn-next')
const prev= document.querySelector('.btn-prev')

let searchPokemon = 1;


async function fetchPokemon(pokemon) {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
    } 
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading...";
    
    const data = await fetchPokemon(pokemon);

    if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = "";
    searchPokemon = data.id;
    } else {
        pokemonImage.style.display = "none";
        pokemonName.innerHTML = "Not found :c ";
        pokemonNumber.innerHTML = "";
    }
}

form.addEventListener('submit', (event) => { 
    event.preventDefault();
    renderPokemon(input.value);
    input.value = "";
});

prev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

next.addEventListener('click', () => {
    searchPokemon += 1; 
    renderPokemon(searchPokemon);
    
});




renderPokemon(searchPokemon);



