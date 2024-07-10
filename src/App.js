import './App.css';
import NavBar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import CreateQuizPage from './pages/CreateQuizPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/create-quiz" element={<CreateQuizPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
