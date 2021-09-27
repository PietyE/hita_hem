import React, { useState} from 'react';
import {useDispatch} from 'react-redux';
import Modal from '../ui/Modal';
import {setShowQuiz, setShowQuizError} from 'redux/actions/authPopupWindows';
import ButtonStyled from '../ui/Button';
import QuizItem from './components/QuizItem';
import {quizData} from './quizData';

const Quiz = ({show, onSubmit}) => {
    const dispatch = useDispatch()
    const handleCloseQuiz = () => {
        dispatch(setShowQuiz(false))
    }

    const initialResultsValues = {
        answer1: false,
        answer2: false,
        answer3: false,
        answer4: false,
        answer5: false,
        answer6: false,
        answer7: false,
        answer8: false,
        answer9: false,

    }

    const [quizResults, setQuizResults] = useState(initialResultsValues)
    const [warnings, setWarnings] = useState({})

    const receiveAnswer = (data, answerNumber) => {
        setQuizResults({...quizResults, [answerNumber]: data})
    }
    const handleSubmit = () => {
        let warningList = {}
        let allAnswersIsCorrect = true

        for (let answer in quizResults){
            warningList[answer] = (quizResults[answer] === false || quizResults[answer] === null)
            if(warningList[answer]){
                allAnswersIsCorrect = false
            }
        }
        if(allAnswersIsCorrect){
            onSubmit()
            return
        }
        setWarnings(warningList)
        dispatch(setShowQuizError(true))

    }
    return (
        <Modal
            show={show}
            onHide={handleCloseQuiz}
            backdrop={true}
            keyboard={false}
            centered={true}
            className='quiz_modal'
            dialogClassName='quiz_modal_dialog'
            bodyClassName='quiz_modal_body'
        >

            <section className='quiz'>
                <header className='quiz_header'>
                    <h2 className='quiz_header_title'>
                        To complete the registration process, please answer the following questions
                    </h2>
                    <p className='quiz_header_text'>These questions are to assess your financial literacy and knowledge about investments</p>
                </header>
                <div className='quiz_body'>
                    {quizData?.length &&
                        quizData.map(question =>

                                <QuizItem key={question.id} 
                                          data={question}
                                          onSelect={receiveAnswer}
                                          warningList={warnings}
                                />
                            
                        )
                    }
                </div>
                <footer className='quiz_footer'>
                    <ButtonStyled colorStyle='outline-green' className='quiz_footer_button_back quiz_footer_button' onClick={handleCloseQuiz}>Back</ButtonStyled>
                    <ButtonStyled colorStyle='dark-green' className='quiz_footer_button_confirm quiz_footer_button' onClick = {handleSubmit}>Confirm</ButtonStyled>
                </footer>
            </section>
        </Modal>
    );
}

export default Quiz;