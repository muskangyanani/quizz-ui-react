import './App.css';
import NavBar from './components/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from './pages/HomePage';
import CreateQuizPage from './pages/CreateQuizPage';
import AllQuizzes from './pages/AllQuizzes';
import AttemptQuiz from './pages/AttemptQuiz';

function App() {
  const location = useLocation();
  const showNavBar = !/^\/quiz\/\d+$/.test(location.pathname);
  return (
    <div className="App">
      {showNavBar && <NavBar/>}
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/create-quiz" element={<CreateQuizPage/>} />
          <Route path="/quizzes" element={<AllQuizzes/>} />
          <Route path='/quiz/:id' element={<AttemptQuiz/>}/>
        </Routes>
    </div>
  );
}

function AppWithRouter() {
  return (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  );
}

export default AppWithRouter;
