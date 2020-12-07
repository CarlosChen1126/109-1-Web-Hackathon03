import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Question() {
  const [complete, setComplete] = useState(false)  // true if answered all questions
  const [contents, setContents] = useState([])     // to store questions
  const [ans, setAns] = useState([])               // to record your answers
  const [score, setScore] = useState(0)            // Your score
  const [current_question, setCurrentQuestion] = useState(0) // index to current question

  const next = async() => {
    // TODO : switch to the next question,
    // and check answers to set the score after you finished the last question
    if(current_question+1===contents.length){
      setComplete(true)
      const {
        data:{
          message,score
        }}=await instance.post('/checkAns',{answer:ans})
        console.log(message)
        console.log(score)
      document.getElementById('question-title').innerText = "Your Score: " +score + "/" + contents.length;
      document.getElementById('options').style.display = "none";
      document.getElementById('actions').style.display = "none";
    }
    else{
      document.getElementById(`q${current_question+1}_${ans[current_question]}`).checked=false
      setCurrentQuestion(current_question+1)
    }
  }

  const choose = (indexx) => {
    // TODO : update 'ans' for the option you clicked
    const a=[...ans]
    a[current_question]=indexx
    setAns(a)
    console.log(a)
  }

  const getQuestions = async() => {
    // TODO : get questions from backend
    const {
      data:{
        message,contents
      }
    }
    = await instance.get('/getContents')
    console.log(message)
    
    setContents(contents)

  }

  useEffect(() => {
    if (!contents.length)
      getQuestions()
  })

  // TODO : fill in the rendering contents and logic
  return (
    <div id="quiz-container">
      {contents.length ?
        <React.Fragment>
          <div id="question-box">
            <div className="question-box-inner">
              Question {current_question+1} of {contents.length}
            </div>
          </div>
          <div id="question-title">
            {contents[current_question].question}
          </div>

          <div id="options">
            {contents[current_question].options.map((op,idd)=>
              <div className='each-option'>
                <input type='radio' 
                      id={`q${current_question+1}_${idd+1}`}
                      name='option'
                      onChange={()=>choose(idd+1)}
                      />
                <span>{op}</span>
              </div>
            )}
          </div>
          
          <div id="actions" onClick={next}>
            NEXT
          </div>
        </React.Fragment>
        : <React.Fragment></React.Fragment>
      }
    </div>
  )
}

export default Question
