import React, {useEffect, useState, useCallback} from 'react'
import CategorySelector from "./components/category-selector";
import Scoreboard from "./components/scoreboard";
import Question from "./components/question";
import ResultModal from "./components/result-modal";

import './App.css'

const App = () => {
    const [question, setQuestion] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('any')
    const [isCorrect, setIsCorrect] = useState(null)

    const getQuestion = useCallback(() => {
        setIsCorrect(null)
        let url = 'https://opentdb.com/api.php?amount=1';
        if (selectedCategory !== 'any') url += `&category=${selectedCategory}`

        fetch(url)
            .then(res => res.json())
            .catch(e => console.log(e))
            .then(data => setQuestion(data.results[0]))
    }, [selectedCategory])

    const handleQuestionAnswer = (answer) => {
        const isAnswerCorrect = answer === question.correct_answer
        setIsCorrect(isAnswerCorrect)
    }

    useEffect(() => {
        console.log("render")
        getQuestion()
    }, [getQuestion, selectedCategory])


    return (
        <div className="app">
            {isCorrect !== null && <ResultModal isCorrect={isCorrect} question={question} nextQuestion={getQuestion}/> }

            <div className="question-header">
                <CategorySelector category={selectedCategory} chooseCategory={setSelectedCategory}/>
                <Scoreboard  isCorrect={isCorrect}/>
            </div>

            <div className="question-main">
                {question && <Question question={question} answerQuestion={handleQuestionAnswer}/>}
            </div>

            <div className="question-footer">
                <button onClick={getQuestion}>Go to next question 👉</button>
            </div>
        </div>
    );
}

export default App;
