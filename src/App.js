import './App.css';
import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search';
import { fetchPokemon } from './services/getPokemon';
import PokemonData from './components/PokemonData';

function App() {
  const [pokemon, setPokemon] = useState([]);
  
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [totalPageNum, setTotPageNum] = useState();
  const [currentPageNum, setCurrentPageNum] = useState();
  const [loading, setLoading] = useState(true);
  const [pokSearchRes, setPokemonSearchRes] = useState();
  const [error, setError] = useState();
  const [fPokDet, setPokDetail] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadPoke, setLoadPoke] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
  );
  


  const getAllPokemons = async () => {
    setLoading(true)
    const res = await fetch(currentPageUrl);
    const data = await res.json();
    //console.log(data)
    //setLoadPoke(data.next);
    setNextPageUrl(data.next);
    setPrevPageUrl(data.previous);
    setCurrentPageNum(getParameterByName('offset',data.next));
    setTotPageNum(Math.ceil(data.count/10));
  
    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
         // console.log(data);
         //setAllPokemons((currentList) => [...currentList, data]);
        setAllPokemons((currentList) => [...currentList, data]);
        //setAllPokemons([data]);
      });
    }
    setAllPokemons((currentList) => []);
    createPokemonObject(data.results);
    setLoading(false);
    //await console.log(allPokemons);
  };
  useEffect(() => {
    getAllPokemons();
  }, []);

  function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
    //setLoadPoke(nextPageUrl);
    getAllPokemons()
  }

  function goToPrevPage() {
    console.log(prevPageUrl);
    setCurrentPageUrl(prevPageUrl);
    //setLoadPoke(prevPageUrl);
    getAllPokemons()
  }

  const getPokemon = async (query) => {
    setLoading(true)
    setTimeout(async () => {
      const response = await fetchPokemon(query);
      const results = await response.json();
      setPokemonSearchRes(results);
      setLoading(false);
    }, 100);
  }
  
  if(loading) return (<div className="text-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Pokemon Go</a>         
        </div>
      </nav>
      <Search getPokemon={getPokemon} />
      {!loading && pokSearchRes ? (
        <PokemonData 
          name = {pokSearchRes.name}
          sprite = {pokSearchRes.sprites}
          abilities = {pokSearchRes.abilities}
          stats = {pokSearchRes.stats}
          types = {pokSearchRes.types}
        />
      ) : null}
      <PokemonList allPokemons={allPokemons} />
      <Pagination 
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
        totalPageNum={totalPageNum}
        currentPageNum={currentPageNum}
      />
    </>
  );
}

export default App;
