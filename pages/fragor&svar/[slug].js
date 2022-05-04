import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getIs404QuestionSelector, getQuestionSelector} from "../../redux/reducers/faq";
import {getQuestion, set404InQuestion} from "../../redux/actions/faq";
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

    const _resetError = useCallback(
        () => {
            dispatch(set404InQuestion(false));
        },
        [dispatch]
    );

    return (
        <>
            <TopContainer/>
            <div className='faq_one_category_block'>
                {/*{oneCategoryData.length > 0 &&*/}
                {/*<h2 className='faq_one_category_title'>{oneCategoryData[0].category.title}</h2>*/}
                {/*}*/}
                {!matchesAll &&

                <div className='faq_one_category_content_container'>
                    <ul className='faq_one_category_questions'>
                        {/*{oneCategoryData.map((item, i) => (*/}
                        {/*    <li*/}
                        {/*        className={Number(selectedQuestion) === i ?'faq_one_category_questions_item_selected': 'faq_one_category_questions_item'}*/}
                        {/*        key={item.question}*/}
                        {/*        data-index={i}*/}
                        {/*        style = {Number(selectedQuestion) === i ? {color: '#1F607C'} : {}}*/}

                        {/*        onClick={handleClickQuestion}*/}
                        {/*        dangerouslySetInnerHTML={{*/}
                        {/*            __html: sanitizeHtmlFromBack(item.question)*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*))}*/}
                    </ul>
                    <div className='faq_one_category_answers'>
                        {/*{oneCategoryData[Number(selectedQuestion)]?.question &&*/}
                        {/*<p*/}
                        {/*    className='faq_one_category_question'*/}
                        {/*    dangerouslySetInnerHTML={{*/}
                        {/*        __html: sanitizeHtmlFromBack(oneCategoryData[Number(selectedQuestion)]?.question)*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {/*}*/}
                        {/*{ oneCategoryData[Number(selectedQuestion)]?.answer &&*/}
                        {/*<p*/}
                        {/*    className='faq_one_category_answer'*/}
                        {/*    dangerouslySetInnerHTML={{*/}
                        {/*        __html: sanitizeHtmlFromBack(oneCategoryData[Number(selectedQuestion)]?.answer)*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {/*}*/}

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