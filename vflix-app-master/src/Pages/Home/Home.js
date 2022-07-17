import { Container } from '@mui/system';
// import './App.css';
import Header from '../../components/Header/Header';
import SimpleBottomNavigation from '../../components/MainNav';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Trending from '../Trending/Trending';
import Movies from '../Movies/Movies';
import Series from '../Series/Series';
import Search from '../Search/Search';
import SinglePage from '../../components/SinglePage/Singlepage';
import SinglePageSeries from '../../components/SinglePageSeries/SinglePageSeries';
import MovieEntry from '../Form/MovieEntry';
import DisplayMovie from '../Displaymovie/DisplayMovie';
import Updatemovie from '../Updatemovie/Updatemovie';
import Register from '../../Pages/Register/Register';
import Login from '../Login/Login';

function Home() {
  return (
    <Router>
    <Header />
    <div className="app">
      <Container>
        <Routes>
          {/* <Route path="/login" element={<Login/>} exact/> */}
          <Route path="/" element={<Trending />} exact/>
          <Route path="/movies" element={<Movies />} exact/>
          <Route path="/series" element={<Series />} exact/>
          <Route path="/search" element={<Search />} exact/>
          <Route path="/movies/:id" element={<SinglePage type="movie" />} /> 
          <Route path="/series/:id" element={<SinglePageSeries type="tv"/>} /> 
          <Route path="/movieentry" element={<MovieEntry />} exact/> 
          <Route path="/displaymovie" element={<DisplayMovie />} exact/> 
          <Route path="/updatemovie/:id" element={<Updatemovie />}/> 
          <Route path="/register" element={<Register />} exact/> 
          <Route path="/login" element={<Login />} exact/> 
          {/* <Route path="/users/" component={Users} /> */}
         
        </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation/>
  </Router>
  );
}

export default Home;
