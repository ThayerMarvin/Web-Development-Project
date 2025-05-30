import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import CreateExercisePage from './pages/CreateExercisePage';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {

  return (
    <div className="app">
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/edit-exercise/" element={ <EditExercisePage />}></Route>
            <Route path="/create-exercise/" element={ <CreateExercisePage />}></Route>
          </Routes>
          <Footer/>
        </Router>
    </div>
  );
}

export default App;
