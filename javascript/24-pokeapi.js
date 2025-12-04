const pokemonColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const createElement = function createNewElement(data) {
  const { name: pokemonName, types } = data;
  const { front_default: pokemonImage } =
    data.sprites.other['official-artwork'];
  // pokemonTypes = types.map((item) => item.type.name).join(', ');
  pokemonTypesArr = types.map((item) => item.type.name);
  console.log(pokemonTypesArr);

  const card = document.createElement('div');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const typesDiv = document.createElement('div');

  card.setAttribute('class', 'card');
  h2.textContent = pokemonName;
  img.src = pokemonImage;
  img.alt = `image of ${pokemonName}`;
  img.width = '240';
  img.height = '240';
  typesDiv.setAttribute('class', 'types-container');
  // type.textContent = pokemonTypes;

  card.append(h2);
  card.append(img);

  pokemonTypesArr.map((elem) => {
    console.log(elem);
    const type = document.createElement('span');
    type.setAttribute('class', 'pokemon-type');
    type.textContent = elem;
    type.style.backgroundColor = pokemonColors[elem];
    typesDiv.append(type);
  });

  card.append(typesDiv);

  return card;
};

const getData = async function getPokeAPIData() {
  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=30';

  const container = document.querySelector('.pokemon-container');

  try {
    const response = await fetch(url);
    const data = await response.json();

    const pokemonList = data.results;

    const promises = pokemonList.map((pokemon) => {
      fetch(pokemon.url).then((response) =>
        response.json().then((data) => {
          const elem = createElement(data);
          container.append(elem);
        })
      );
    });
  } catch (error) {
    console.error('Error fetching from PokeAPI: ', error);
  } finally {
    console.log('executes at the end');
  }
};

const getDataFixed = async function getPokeAPIData() {
  const url = 'https://pokeapi.co/api/v2/pokemon/?limit=30';
  const container = document.querySelector('.pokemon-container2');

  try {
    const response = await fetch(url);
    const data = await response.json();

    const pokemonList = data.results;

    const promises = pokemonList.map((pokemon) =>
      fetch(pokemon.url).then((res) => res.json())
    );

    const pokemonData = await Promise.all(promises);

    pokemonData.forEach((pokemon) => {
      const elem = createElement(pokemon);
      container.append(elem);
    });
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

getDataFixed();

getSingleData();
