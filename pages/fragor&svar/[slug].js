import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getIs404QuestionSelector, getOneCategorySelector, getQuestionSelector} from "../../redux/reducers/faq";
import {getOneCategory, getQuestion, saveOneCategory, set404InQuestion} from "../../redux/actions/faq";
import {ERROR_PAGE} from "../../constants/routesConstant";
import TopContainer from "../../containers/Faq/TopContainer";
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import MobileView from "../../containers/FaqCategory/MobileView";
import {useMediaQueries} from "@react-hook/media-query";

const Slug = () => {
    const dispatch = useDispatch();

    const router = useRouter()
    const slug = router?.query?.slug

    const question = useSelector(getQuestionSelector)
    const oneCategoryData = useSelector(getOneCategorySelector)

    const categoryId = question?.category?.pk
    console.log('question',question)
    console.log('oneCategoryData',oneCategoryData)
    const is404Error = useSelector(getIs404QuestionSelector)

    const {matchesAll} = useMediaQueries({
        screen: "screen",
        width: "(max-device-width: 900px)",
    });

    useEffect(()=>{
        if(slug){
            _getQuestion(slug)
        }
    },[])

    useEffect(() => {
        _getOneCategory(categoryId)
        return () => _resetOneCategory()
    }, [categoryId])

    useEffect(()=>{
        if(is404Error){
            _resetError()
            router.push(ERROR_PAGE)
        }
    },[is404Error])

    const _getQuestion = useCallback(
        (data) => {
            dispatch(getQuestion(data));
        },
        [dispatch]
    );

    const _getOneCategory = useCallback(
        (data) => {
            dispatch(getOneCategory(data));
        },
        [dispatch]
    );

    const _resetOneCategory = useCallback(
        () => {
            dispatch(saveOneCategory([]));
        },
        [dispatch]
    );

    const _resetError = useCallback(
        () => {
            dispatch(set404InQuestion(false));
        },
        [dispatch]
    );

    const handleClickQuestion = (e) => {
        router.push
    }

    return (
        <>
            <TopContainer/>
            <div className='faq_one_category_block'>
                {oneCategoryData.length > 0 &&
                <h2 className='faq_one_category_title'>{oneCategoryData[0].category.title}</h2>
                }
                {!matchesAll &&

                <div className='faq_one_category_content_container'>
                    <ul className='faq_one_category_questions'>
                        {oneCategoryData.map((item, i) => (
                            <li
                                className={item?.question === question.question ?'faq_one_category_questions_item_selected': 'faq_one_category_questions_item'}
                                key={item.question}
                                data-index={i}
                                style = {item?.question === question.question ? {color: '#1F607C'} : {}}

                                onClick={handleClickQuestion}
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtmlFromBack(item.question)
                                }}
                            />
                        ))}
                    </ul>
                    <div className='faq_one_category_answers'>
                        {question?.question &&
                        <p
                            className='faq_one_category_question'
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtmlFromBack(question?.question)
                            }}
                        />
                        }
                        { question?.answer &&
                        <p
                            className='faq_one_category_answer'
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtmlFromBack(question?.answer)
                            }}
                        />
                        }

                    </div>
                </div>
                }
                {matchesAll &&
                <MobileView
                    // oneCategoryData={oneCategoryData}
                />
                }
            </div>

        </>
    );
}

export default Slug;