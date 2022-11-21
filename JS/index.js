// variaveis nome,ID,Imagen do pokemon
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_id');
const pokemonImage = document.querySelector('.pokemon_image');

// variaveis evento de busca no inpunt e botão de proximo
const form = document.querySelector('.form');
const input = document.querySelector('.inpunt_search');
const buttonPrev = document.querySelector('.bnt_prev');
const buttonNext = document.querySelector('.bnt_next');

// variavel de pagina inicial com o pokemon renderizado.
let searchPokemon = 1


// função que realiza a busca na API
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    //quando a informacao nao encontrar nada ele nao irar retornar nada.
    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data;
    }
}

// função para colocar o nome do pokemon
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'

    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name.toLowerCase();
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']
        ['black-white']['animated']['front_default'];
        input.value = ''
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not Foud :c'
        pokemonNumber.innerHTML = ''
    }
}

// funcao de busca pelo input
form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value)
})

//Funçao do botão next
buttonNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)

})

//Funçao do botão prev
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

renderPokemon(searchPokemon)