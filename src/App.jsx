import './App.css'
import QuizHome from './components/QuizHome'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizHome /> />
      <QuizHome />
      </Routes>
    </Router>
  )
}

export default App
