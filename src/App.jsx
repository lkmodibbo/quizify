import './App.css';
import QuizHome from './components/QuizHome';
// 👇 FIX: Import the necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SetupPage from './components/SetupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizHome />} /> 
        <Route path='/setup' element={<SetupPage />} />
      </Routes>
    </Router>
  );
}

export default App;