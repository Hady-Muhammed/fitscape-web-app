import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from "./pages/Home";
import Champions from "./pages/Champions";
import Navbar from "./components/Navbar";
import Volume from "./pages/Volume";
import Workouts from './pages/Workouts';

function App() {
  const location = useLocation();
  return (
    <>
    <Navbar/>
    <AnimatePresence>
      <Routes location={location} key={location.key}>
        <Route path="/fitscape-web-app/" element={<Home />}/>
        <Route path="/fitscape-web-app/champions" element={<Champions />}/>
        <Route path="/fitscape-web-app/volume" element={<Volume/>}/>
        <Route path="/fitscape-web-app/workout" element={<Workouts />}/>
      </Routes>
    </AnimatePresence>
    </>
  );
}

export default App;
