import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Favourites from './components/Favourites';

import './App.css';
import Detail from './components/Detail';
import Cover from './components/Cover';

function App() {
  return (
    <div>
     <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path="/"  element={ <Cover />} />
            <Route path="/movies" element={
              <>
                <Banner />
                <Movies />
                
              </>
            } />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
