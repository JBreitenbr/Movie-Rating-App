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
  const [displayType,setDisplayType]=useState(DisplayType.Movies)
const {data:ratedMovies,isLoading:isLoadingMovies} = useQuery({queryKey:["ratedMovies"],queryFn:fetchRatedMovies})

const {data:ratedTvShows,isLoading:isLoadingTvShows} = useQuery({queryKey:["ratedTvShows"],queryFn:fetchRatedTvShows})
  //document.write(JSON.stringify(ratedMovies))
  return (
    <Container style={{marginTop:"80px"}}><Menu pointing secondary><Menu.Item name="Movies" active={activeTabs==DisplayType.Movies} onClick={()=>setActiveTabs(DisplayType.Movies)} /><Menu.Item name="TV Shows" active={activeTabs==DisplayType.TvShows} onClick={()=>setActiveTabs(DisplayType.TvShows)} /></Menu><Segment>{isLoadingMovies||isLoadingTvShows?(<div>Loading...</div>):(<div style={{marginTop:20}}>{displayType==DisplayType.Movies?(<ColumnDisplay data={ratedMovies.results} displayType={DisplayType.Movies}/>):(<ColumnDisplay data={ratedTvShows.results} displayType={DisplayType.TvShows}/>)}</div>)}</Segment></Container>)
}