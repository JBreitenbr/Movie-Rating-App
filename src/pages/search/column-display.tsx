import {Grid,Card,Form,Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {DisplayType} from './index'
import {useMutation} from '@tanstack/react-query'
import {useState} from 'react'
import {rateMovie,rateTvShow} from './mutation'
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?:string;
  vote_average: number;
  release_date: string;
  rating?: number;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
}

export const ColumnDisplay = (props:Props) => {
const {data,displayType,isRated} = props
const [rating,setRating] = useState<number>(0)
const onSuccess=()=>{
  toast.success("Rated Successfully")
}
const onError=()=>{
  toast.error("Failed to Rate")
}
const {mutate: rateMovieMutation} = useMutation({mutationKey:["rateMovie"],mutationFn:(id:number)=>rateMovie(id,rating),onSuccess,onError});const {mutate: rateTvShowMutation} = useMutation({mutationKey:["rateTvShow"],mutationFn:(id:number)=>rateTvShow(id,rating),onSuccess, onError});
const rate=displayType==DisplayType.Movies?rateMovieMutation:rateTvShowMutation
    return (<Grid columns={3} stackable centered verticalAlign="top" padded="vertically">{data.map((displayData:DisplayData)=><Grid.Column key={displayData.id}><Card.Group>
<Link to={`/Movie-Rating-App/${displayType==DisplayType.Movies?"movies":"tvshows"}/${displayData.id}`}>
<Card style={{height: 720}} fluid image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`} header={displayType==DisplayType.Movies?displayData.title:displayData.name} meta={displayType==DisplayType.Movies?`Release Date: ${displayData.release_date} | Rating: ${displayData.vote_average}`:`Rating: ${displayData.vote_average}`} description={displayData.overview.slice(0,350)+"..."}/>{isRated && <Label>Your rating: {displayData.rating}</Label>}</Link><Form><Form.Group><Form.Field><Form.Input type="number" min="0" max="10" step="0.5" onChange={(e)=>setRating(Number(e.target.value))}  action={{color:"teal",labelPosition:"right",icon:"star",content:"Rate",onClick:()=>rate(displayData.id)}}/></Form.Field></Form.Group></Form></Card.Group></Grid.Column>)}</Grid>);
  };