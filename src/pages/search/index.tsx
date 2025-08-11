import { useState } from "react";
import {Button,Input} from 'semantic-ui-react';
import {ColumnDisplay} from './column-display';
import {Navigate} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {fetchMovies,fetchTvShows} from './query';
export enum DisplayType {
  Movies="movies",
  TvShows="tvshows"
}
export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [tvShows,setTvShows]=useState([]);
  const [displayType,setDisplayType]=useState<DisplayType>(DisplayType.Movies);
  const [error, setError] =useState("");
  const {data: movieData,isLoading: isLoadingMovies} = useQuery({queryKey:["movies"],queryFn:fetchMovies})
const {data: tvShowData,isLoading: isLoadingTvShows} = useQuery({queryKey:["tvshows"],queryFn:fetchTvShows})
  if(!localStorage.getItem("guest_session_id")){
    return <Navigate to="/Movie-Rating-App/auth"/>
  }
  async function searchMovie(query:any) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`
      );

      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
        setError("");
      } else {
        setError("An error occurred while fetching movies.");
        setMovies([]);
      }
    } catch (error) {
      setError("An error occurred while fetching movies.");
      setMovies([]);
    }
  }
  async function searchTvShow(query:any) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`
      );

      if (response.ok) {
        const data = await response.json();
        setTvShows(data.results);
        setError("");
      } else {
        setError("An error occurred while fetching TV shows.");
        setTvShows([]);
      }
    } catch (error) {
      setError("An error occurred while fetching movies.");
      setTvShows([]);
    }
  }
  function handleSearch(e:any) {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== "") {
      if(displayType==DisplayType.Movies){searchMovie(query);}
      else if(displayType==DisplayType.TvShows){
        searchTvShow(query);
      }
    } else {
      setMovies([]);
      setTvShows([]);
      setError("");
    }
  }

  return (
    <div style={{marginTop:80,height:"auto",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Button.Group><Button color={displayType==DisplayType.Movies?"blue":undefined} onClick={()=>setDisplayType(DisplayType.Movies)}>Movies</Button><Button color={displayType==DisplayType.TvShows?"blue":undefined} onClick={()=>setDisplayType(DisplayType.TvShows)}>TV Shows</Button></Button.Group>
        <Input
        icon="search"
          style={{marginTop:20,marginBottom:20}}
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          value={searchQuery}
          className="search-input"
        />
      
      {error && <p>{error}</p>}

       {searchQuery?   displayType==DisplayType.Movies?<ColumnDisplay data={movies} displayType={DisplayType.Movies} />:<ColumnDisplay data={tvShows} displayType={DisplayType.TvShows}/>:isLoadingMovies||isLoadingTvShows?(<div>Loading...</div>):(<div style={{marginTop:20}}>{displayType==DisplayType.Movies?(<ColumnDisplay data={movieData.results} displayType={DisplayType.Movies}/>):(<ColumnDisplay data={tvShowData.results} displayType={DisplayType.TvShows}/>)}</div>)}
  
    </div>
  );
};