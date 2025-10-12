import './App.css';
import QuizHome from './components/QuizHome';
// 👇 FIX: Import the necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizHome />} /> 
      </Routes>
    </Router>
  );
}

export default App;