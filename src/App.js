import { useEffect , useState } from 'react'
import MovieCard from './MovieCard'
import './App.css'
import SearchIcon from './search.svg'

//af77aaf8

const API_URL = 'https://www.omdbapi.com/?apikey=af77aaf8'


const App = ()=>{

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) =>{

    const completeURL = API_URL + "&s=" + title;
    const response = await fetch(completeURL)
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(()=>{
    searchMovies('Batman');
  },[])

  return(
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input 
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={()=>searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 
        ? (
            <div className='container'>
              {movies.map((movie)=> (
                <MovieCard movie={movie} />
              ))}
            </div>
        ) : (
            <div className="empty">
              <h2>No movies found </h2>
            </div>
        )
      }
    </div>
  )
}

export default App