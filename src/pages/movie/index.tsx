import {Segment,Header,Grid,Image,List,Label} from 'semantic-ui-react'
import {useParams} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {fetchMovieDetails} from './query'
export const Movie = () => {
  const {id} = useParams<string>()
  if(!id){
    return (<div>Invalid Movie Id</div>)
  }
  const {data,isLoading} = useQuery({queryKey:["movie"],queryFn:()=>fetchMovieDetails(id)})
  return (<div style={{marginTop:80}}>{isLoading?<div>Loading...</div>:<Segment><Header style={{textAlign:"center"}}>{data.title}</Header><Grid columns={2} divided textAlign="left" style={{marginTop:"20"}}><Grid.Row><Grid.Column width={6}><div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}><Image size="medium" centered src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} /></div></Grid.Column><Grid.Column width={10}><List><List.Item><List.Header>Is the movie for adults?</List.Header>{data.adult?"Yes":"No"}</List.Item><List.Item><List.Header>Budget:</List.Header>{data.budget}</List.Item>
<List.Item><List.Header>Genres:</List.Header>{data.genres.map((genre:any)=><Label key={genre.id}>{genre.name}</Label>)}</List.Item><List.Item><List.Header>IMDB ID:</List.Header>{data.imdb_id}</List.Item><List.Item><List.Header>Popularity:</List.Header>{data.popularity}</List.Item><List.Item><List.Header >Production Companies:</List.Header>{data.production_companies.map((company:any)=>company.name).join(", ")}</List.Item><List.Item><List.Header>Release Date:</List.Header>{data.release_date}</List.Item><List.Item><List.Header>Revenue:</List.Header>{data.revenue}</List.Item><List.Item><List.Header>Runtime:</List.Header>{data.runtime}</List.Item><List.Item><List.Header>Vote Average:</List.Header>{data.vote_average}</List.Item><List.Item><List.Header>Language:</List.Header>{data.original_language}</List.Item>
</List></Grid.Column></Grid.Row></Grid></Segment>}
    </div>);
}