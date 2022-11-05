import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbars from './components/Navbars';
import Home from './features/User/pages/Home';

function App() {
  return (
    <div className="App">
     <Navbars/>
     <HeroSection/>
     <Routes>
      <Route path='/' element={<Home/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
