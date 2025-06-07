import {Button} from 'semantic-ui-react'
import {useState} from 'react'
import {ColumnDisplay} from './column-display'
import {useQuery} from '@tanstack/react-query'
import {fetchMovies,fetchTvShows} from './query'
export enum DisplayType{
    Movies="movies",
    TvShows="tvshows"
}
export const Home = () => {
  
  const [displayType,setDisplayType]=useState(DisplayType.Movies)
const {data: movieData,isLoading: isLoadingMovies} = useQuery({queryKey:["movies"],queryFn:fetchMovies})
const {data: tvShowData,isLoading: isLoadingTvShows} = useQuery({queryKey:["tvshows"],queryFn:fetchTvShows})
  return (<div style={{marginTop:80,height:"auto",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}><Button.Group><Button color={displayType==DisplayType.Movies?"blue":undefined} onClick={()=>setDisplayType(DisplayType.Movies)}>Movies</Button><Button color={displayType==DisplayType.TvShows?"blue":undefined} onClick ={()=>setDisplayType(DisplayType.TvShows)}>TV Shows</Button></Button.Group><div>{localStorage.getItem("guest_session_id")}</div>
  {isLoadingMovies||isLoadingTvShows?(<div>Loading...</div>):(<div style={{marginTop:20}}>{displayType==DisplayType.Movies?(<ColumnDisplay data={movieData.results} displayType={DisplayType.Movies}/>):(<ColumnDisplay data={tvShowData.results} displayType={DisplayType.TvShows}/>)}</div>)}
  </div>)
}