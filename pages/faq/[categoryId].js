import React, {useCallback, useEffect, useState} from 'react';
import TopContainer from "../../containers/Faq/TopContainer";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentQuestionSelector, getOneCategorySelector} from "../../redux/reducers/faq";
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import {getOneCategory, saveOneCategory, setCurrentQuestion} from "../../redux/actions/faq";
import {useRouter} from "next/router";

const Category = () => {
    const dispatch = useDispatch();

    const router = useRouter()
    const categoryId = router?.query?.categoryId

    const [selectedQuestion, setSelectedQuestion] = useState(0)

    const oneCategoryData = useSelector(getOneCategorySelector)
    const currentQuestion = useSelector(getCurrentQuestionSelector)

    useEffect(()=>{
        if(currentQuestion){
            const questionIndex = oneCategoryData.findIndex(el => el.question === currentQuestion)
       if(questionIndex !== -1){
           setSelectedQuestion(questionIndex)
           _resetCurrentQuestion()
       }
        }
    },[currentQuestion,oneCategoryData])

    useEffect(() => {
        _getOneCategory(categoryId)
        return () => _resetOneCategory()
    }, [])

    const _getOneCategory = useCallback(
        (data) => {
            dispatch(getOneCategory(data));
        },
        [dispatch]
    );

    const _resetCurrentQuestion = useCallback(
        () => {
            dispatch(setCurrentQuestion(''));
        },
        [dispatch]
    );

    const _resetOneCategory = useCallback(
        () => {
            dispatch(saveOneCategory([]));
        },
        [dispatch]
    );

    const handleClickQuestion = (e) => {
        setSelectedQuestion(e.target.dataset.index)
    }
    return(
    <>
        <TopContainer/>

        <div className='faq_one_category_block'>
            {oneCategoryData.length > 0 &&
            <h2 className='faq_one_category_title'>{oneCategoryData[0].category.title}</h2>
            }
            <div className='faq_one_category_content_container'>
                <ul className='faq_one_category_questions'>
                    {oneCategoryData.map((item, i) => (
                        <li
                            className={Number(selectedQuestion) === i ?'faq_one_category_questions_item_selected': 'faq_one_category_questions_item'}
                            key={item.question}
                            data-index={i}
                            style = {Number(selectedQuestion) === i ? {color: '#1F607C'} : {}}

                            onClick={handleClickQuestion}
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtmlFromBack(item.question)
                            }}
                        />
                    ))}
                </ul>
                <div className='faq_one_category_answers'>
                    {oneCategoryData[Number(selectedQuestion)]?.question &&
                    <p
                        className='faq_one_category_question'
                        dangerouslySetInnerHTML={{
                            __html: sanitizeHtmlFromBack(oneCategoryData[Number(selectedQuestion)]?.question)
                        }}
                    />
                    }
                    { oneCategoryData[Number(selectedQuestion)]?.answer &&
                    <p
                        className='faq_one_category_answer'
                        dangerouslySetInnerHTML={{
                            __html: sanitizeHtmlFromBack(oneCategoryData[Number(selectedQuestion)]?.answer)
                        }}
                    />
                    }

                </div>
            </div>


        </div>
    </>
);
}

export default Category;