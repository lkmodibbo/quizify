import './App.css';
import QuizHome from './components/QuizHome';
// 👇 FIX: Import the necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SetupPage from './components/SetupPage';
import QuizPage from './components/QuizPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} />
        <Route path="/" element={<QuizHome />} /> 
        <Route path='/setup' element={<SetupPage />} />
        <Route path='/quiz-page' element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;