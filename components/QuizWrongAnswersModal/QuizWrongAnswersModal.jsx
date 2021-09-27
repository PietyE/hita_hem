import React from 'react';
import Modal from '../ui/Modal';
import Icon from 'public/images/icon.svg';
import {setShowQuizError} from 'redux/actions/authPopupWindows';
import {useDispatch} from 'react-redux';

const QuizWrongAnswersModal = ({show}) => {
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setShowQuizError(false))
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop={true}
            keyboard={false}
            centered={true}
            className="quiz_error_modal"
            bodyClassName="quiz_error_body"
            dialogClassName='quiz_error_dialog'
        >
            <div className="successful_investment_icon_container quiz_error_dialog_icon_container">
                <img src={Icon} alt='icon'/>
            </div>
            <h2 className='successful_investment_title'> Some of the selected answers are wrong</h2>
            <p className='successful_investment_text'>Please review your answers and read up on the risks related to investing in unlisted companies.</p>

        </Modal>
    );
}

export default QuizWrongAnswersModal;