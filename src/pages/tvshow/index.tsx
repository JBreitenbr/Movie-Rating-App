import {Segment,Header,Grid,Image,List,Label,Accordion,Card} from 'semantic-ui-react'
import {useParams} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {fetchTvShowDetails} from './query'
export const TvShow = () => {
  const {id} = useParams<string>()
  
  if(!id){
    return (<div>Invalid Tvshow Id</div>)
  }
  const {data,isLoading} = useQuery({queryKey:["tvshow"],queryFn:()=>fetchTvShowDetails(id)})
  const seasonPanels=data?.seasons?.map((season:any)=>({key: season.id,title:`Season ${season.season_number}`,content:{content:<Card style={{height:"70px"}} meta={season.air_date} description= {season.episode_count}/>}}))
return (<div style={{marginTop:80}}>{isLoading?<div>Loading...</div>:<Segment><Header style={{textAlign:"center"}}>{data.name}</Header><Grid columns={2} divided textAlign="left" style={{marginTop:"20"}}><Grid.Row><Grid.Column width={6}><div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}><Image size="medium" centered src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} /></div></Grid.Column><Grid.Column width={10}>
<List><List.Item><List.Header >Created by:</List.Header><List.Description>{data.created_by.map((creator:any)=>creator.name).join(", ")}</List.Description></List.Item><List.Item><List.Header>Episodes Run Time:</List.Header>{data.episode_run_time.join(", ")}</List.Item><List.Item><List.Header>Genres:</List.Header>{data.genres.map((genre:any)=><Label key={genre.id}>{genre.name}</Label>)}</List.Item><List.Item><List.Header>First Air Date:</List.Header>{data.first_air_date}</List.Item><List.Item><List.Header>Networks:</List.Header>{data.networks.map((network:any)=><Image key={network.id} src={`https://image.tmdb.org/t/p/original/${network.logo_path}`} size="mini" style={{marginRight:"10"}}/>)}</List.Item><List.Item><List.Header >Production Companies:</List.Header>{data.production_companies.map((company:any)=>company.name).join(", ")}</List.Item><List.Item><List.Header>Number of episodes:</List.Header>{data.number_of_episodes}</List.Item><List.Item><List.Header>Number of seasons:</List.Header>{data.number_of_seasons}</List.Item><List.Item><List.Header>Seasons:</List.Header><List.Description style={{height:"200px",overflowY:"scroll"}}><Accordion defaultActiveIndex={0} panels={seasonPanels} styled/></List.Description></List.Item><List.Item><List.Header>Vote Average:</List.Header>{data.vote_average}</List.Item>
</List></Grid.Column>
  </Grid.Row></Grid></Segment>}
    </div>);
}