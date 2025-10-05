import React, { useState } from 'react'
import  Login  from '../components/Login'
import SignUp from '../components/SignUp'
import '../components/styles/QuizHome.css'

const QuizHome = () => {
    const [showLogin, setShowLogin] = useState(true)
  return (
    <div className='home-container'>
        <div className="logo">
            <div className="mark">?</div>
        </div>
        <h1 className="header">QuizMaster</h1>
        <div className="btns">
            <button className='btn' onClick={() => setShowLogin(true)}>Login</button>
            <button className='btn' onClick={() => setShowLogin(false)}>SignUp</button>
            <hr className={showLogin ? 'hr-login' : 'hr-signup'}/>
            {showLogin ? (
              <Login onSwitchToSignup={() => setShowLogin(false)}/>
            ): (
              <SignUp onSwitchToLogin={() => setShowLogin(true)}/>
            )}
        </div>
    </div>
  )
}
export default QuizHome