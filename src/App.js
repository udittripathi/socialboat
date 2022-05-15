// import logo from './logo.svg';
import './App.css';


function App() {

  const charactersList = document.getElementById('charactersList');
  const searchBar = document.getElementById('searchBar');
  let hpCharacters = [];
  
  searchBar.addEventListener('keyup', (e) => {
      const searchString = e.target.value.toLowerCase();
  
      const filteredCharacters = hpCharacters.filter((character) => {
          return (
              character.name.toLowerCase().includes(searchString) ||
              character.house.toLowerCase().includes(searchString)
          );
      });
      displayCharacters(filteredCharacters);
  });
  
  const loadCharacters = async () => {
      try {
          const res = await fetch('https://hp-api.herokuapp.com/api/characters');
          hpCharacters = await res.json();
          displayCharacters(hpCharacters);
      } catch (err) {
          console.error(err);
      }
  };
  
  const displayCharacters = (characters) => {
      const htmlString = characters
          .map((character) => {
              return `
              <li class="character">
                  <h2>${character.name}</h2>
                  <p>House: ${character.house}</p>
                  <img src="${character.image}"></img>
              </li>
          `;
          })
          .join('');
      charactersList.innerHTML = htmlString;
  };
  
  loadCharacters();
  

  return (
    <div class="container">
    <h1>&#x2728;Harry Potter Characters &#x2728;</h1>
    <div id="searchWrapper">
        <input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="search for a character"
        />
    </div>
    <ul id="charactersList"></ul>
</div>

  );

}

export default App;
