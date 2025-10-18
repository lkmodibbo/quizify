import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Layout from './components/Layout';
import QuizHome from './components/QuizHome';
import SetupPage from './components/SetupPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import HistoryPage from './components/HistoryPage';


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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
