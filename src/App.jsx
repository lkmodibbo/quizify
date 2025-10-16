import './App.css';
import QuizHome from './components/QuizHome';
// 👇 FIX: Import the necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SetupPage from './components/SetupPage';
import QuizPage from './components/QuizPage';
import Layout from './components/Layout';
import ResultPage from './components/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} />
        <Route path="/" element={<QuizHome />} /> 
        <Route path='/setup' element={<SetupPage />} />
        <Route path='/quiz-page' element={<QuizPage />} />
        <Route path='/result' element={<ResultPage /> } />
      </Routes>
    </Router>
  );
}

export default App;