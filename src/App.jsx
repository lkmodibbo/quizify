import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Layout from './components/Layout';
import QuizHome from './components/QuizHome';
import SetupPage from './components/SetupPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import Login from './components/Login';
import Signup from './components/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<QuizHome />} /> 
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/quiz-page" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
