
import './css/App.css';
import Favorites from './pages/Favorites';
import Home from "./pages/Home"
import {Routes, Route} from "react-router-dom"
import NavBar from './components/NavBar';
import { MusicProvider } from './contexts/MusicContext';

function App() {

  return (
    <MusicProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MusicProvider>
    
  );
}


export default App
