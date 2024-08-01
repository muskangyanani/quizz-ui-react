import './App.css';
import NavBar from './components/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from './pages/HomePage';
import CreateQuizPage from './pages/CreateQuizPage';
import AllQuizzes from './pages/AllQuizzes';
import AttemptQuiz from './pages/AttemptQuiz';
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  const location = useLocation();
  const showNavBar = !/^\/quiz\/\d+$/.test(location.pathname);
  return (
    <div className="App">
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/create-quiz" element={<PrivateRoute><CreateQuizPage /></PrivateRoute>} />
        <Route path="/quizzes" element={<PrivateRoute><AllQuizzes /></PrivateRoute>} />
        <Route path='/quiz/:id' element={<PrivateRoute><AttemptQuiz /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

function AppWithRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppWithRouter;
