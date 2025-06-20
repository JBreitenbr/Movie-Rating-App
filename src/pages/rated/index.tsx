import {Container,Menu,Segment,Header} from 'semantic-ui-react'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {fetchRatedMovies,fetchRatedTvShows} from './query'
import {ColumnDisplay} from '../home/column-display'

enum DisplayType{
    Movies="movies",
    TvShows="tvshows"
}
export const Rated = () => {
  const [activeTabs,setActiveTabs]=useState<DisplayType>(DisplayType.Movies)
 /* const [displayType,setDisplayType]=useState(DisplayType.Movies)*/
const {data:ratedMovies,isLoading:isLoadingMovies} = useQuery({queryKey:["ratedMovies"],queryFn:fetchRatedMovies})

const {data:ratedTvShows,isLoading:isLoadingTvShows} = useQuery({queryKey:["ratedTvShows"],queryFn:fetchRatedTvShows})
  return (
    <Container style={{marginTop:"80px"}}><Menu pointing secondary><Menu.Item name="Movies" active={activeTabs==DisplayType.Movies} onClick={()=>setActiveTabs(DisplayType.Movies)} /><Menu.Item name="TV Shows" active={activeTabs==DisplayType.TvShows} onClick={()=>setActiveTabs(DisplayType.TvShows)} /></Menu><div>{activeTabs}</div><Segment>{isLoadingMovies||isLoadingTvShows?(<div>Loading...</div>):(<div style={{marginTop:20}}>{activeTabs==DisplayType.Movies?(<div><Header as={"h2"}>Rated Movies</Header><ColumnDisplay data={ratedMovies.results} displayType={DisplayType.Movies}  /></div>):(<div><Header as={"h2"}>Rated TV Shows</Header><ColumnDisplay data={ratedTvShows.results} displayType={DisplayType.TvShows}   /></div>)}</div>)}</Segment></Container>)
}