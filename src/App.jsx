import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Layout from './components/Layout';
import QuizHome from './components/QuizHome';
import SetupPage from './components/SetupPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import HistoryPage from './components/HistoryPage';
import Contact from './components/Contact';
import About from './components/About';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<QuizHome />} /> 
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/quiz-page" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='about' element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
