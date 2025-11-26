const createElement = function createNewElement(data) {
  const { name: pokemonName, types } = data;
  const { front_default: pokemonImage } =
    data.sprites.other['official-artwork'];
  pokemonTypes = types.map((item) => item.type.name).join(', ');

  const card = document.createElement('div');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const type = document.createElement('p');

  card.setAttribute('class', 'card');
  h2.textContent = pokemonName;
  img.src = pokemonImage;
  img.alt = `image of ${pokemonName}`;
  img.width = '240';
  img.height = '240';
  type.textContent = pokemonTypes;

  card.append(h2);
  card.append(img);
  card.append(type);

  return card;
};

const getData = async function getPokeAPIData() {
  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=10';

  const container = document.querySelector('.pokemon-container');

  try {
    const response = await fetch(url);
    const data = await response.json();

    const pokemonList = data.results;

    const promises = pokemonList.forEach((pokemon) => {
      console.log(pokemon);
      fetch(pokemon.url).then((response) =>
        response.json().then((data) => {
          console.log(data);
          const elem = createElement(data);
          container.append(elem);
        })
      );
    });
    console.log(pokemonData);
  } catch (error) {
    console.error('Error fetching from PokeAPI: ', error);
  } finally {
    console.log('executes at the end');
  }
};

const getSingleData = async function getSinglePokeAPIData() {
  const url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';

  const container = document.querySelector('.pokemon-single-container');

  try {
    const response = await fetch(url);
    const bodyData = await response.json();

    const elem = createElement(bodyData);
    container.append(elem);
  } catch (error) {
    console.error('Error fetching from PokeAPI: ', error);
  } finally {
    console.log('executes at the end');
  }
};

getData();

getSingleData();
