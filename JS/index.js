// campo onde vai aparecer o nome,ID,Imagen do pokemon
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_id');
const pokemonImage = document.querySelector('.pokemon_image');

// evento de busca no inpunt
const form = document.querySelector('.form');
const input = document.querySelector('.inpunt_search');

// função que realiza a busca na API
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

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
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']
        ['black-white']['animated']['front_default'];
        input.value = ''
        input.value = ''
    } else {
        pokemonName.innerHTML = 'Not Foud :c'
        pokemonNumber.innerHTML = ''
    }
}

// funcao de busca pelo input
form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value)

})