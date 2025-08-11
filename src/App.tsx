import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import {Navbar} from './components/Navbar'
import {Auth} from './pages/auth/index'
import {Search} from './pages/search/index'
import {Movie} from './pages/movie/index'
import {TvShow} from './pages/tvshow/index'
import {Rated} from './pages/rated/index'
function App(){
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/Movie-Rating-App" element={<Search/>}/>
          <Route path="/Movie-Rating-App/auth" element={<Auth/>}/>
          <Route path="/Movie-Rating-App/rated" element={<Rated/>}/>
          <Route path="/Movie-Rating-App/movies/:id" element={<Movie/>}/>
          <Route path="/Movie-Rating-App/tvshows/:id" element={<TvShow/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App