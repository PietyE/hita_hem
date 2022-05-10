import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {
    getFaqIsFetchingSelector,
    getIs404QuestionSelector,
    getOneCategorySelector,
    getQuestionSelector
} from "../../redux/reducers/faq";
import {getQuestion, saveOneCategory, set404InQuestion, setQuestion} from "../../redux/actions/faq";
import {ERROR_PAGE, FAQ_ROUTE, FAQ_ROUTE_EN} from "../../constants/routesConstant";
import TopContainer from "../../containers/Faq/TopContainer";
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import MobileView from "../../containers/FaqQuestion/MobileView";
import {useMediaQueries} from "@react-hook/media-query";
import SpinnerStyled from "../../components/ui/Spinner";
import MetaTags from "../../components/MetaTags";
import Schema from "../../components/Schema";
import makeFaqSchema from "../../Schemas/faqSchema";
import makeQuestionSchema from "../../Schemas/faqQuestionSchema";
import {wrapper} from "../../redux/store";
import {END} from "redux-saga";

const Slug = ({initialLang}) => {
    const dispatch = useDispatch();
    const titleRef = useRef()
    const router = useRouter()
    const slug = router?.query?.slug

    const question = useSelector(getQuestionSelector)
    const oneCategoryData = useSelector(getOneCategorySelector)
    const isFetching = useSelector(getFaqIsFetchingSelector)
    const is404Error = useSelector(getIs404QuestionSelector)

    const [isMounted,setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    },[]);

    const {matchesAll} = useMediaQueries({
        screen: "screen",
        width: "(max-device-width: 900px)",
    });

    useEffect(() => {
        // if (slug && oneCategoryData.length === 0) {
            _getQuestion(slug)
        // }
        return () => {
            _resetQuestion()
            _resetOneCategory()
        }
    }, [slug])

    useEffect(() => {
        if (is404Error) {
            _resetError()
            router.push(ERROR_PAGE)
        }
    }, [is404Error])

    const _getQuestion = useCallback(
        (data) => {
            dispatch(getQuestion(data));
        },
        [dispatch]
    );

    const _resetOneCategory = useCallback(
        () => {
            dispatch(saveOneCategory([]));
        },
        [dispatch]
    );
    const _resetQuestion = useCallback(
        () => {
            dispatch(setQuestion([]));
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
        const questionSlug = e.target.dataset.slug
        if (questionSlug !== slug) {
            router.push(
                initialLang === 'en' ? `${FAQ_ROUTE_EN}/[slug]` : `${FAQ_ROUTE}/[slug]`,
                initialLang === 'en' ? `${FAQ_ROUTE_EN}/${questionSlug}` : `${FAQ_ROUTE}/${questionSlug}`,
                {scroll: false})
        }
    }

    const seo = {
        title: '',
        description: '',
    }
    return (
        <>
            <MetaTags seo={seo}/>
            <Schema makeSchema={makeQuestionSchema} data={{questionsList: oneCategoryData, question:question}}/>

            {isFetching && <SpinnerStyled/>}

            <TopContainer/>
            <div className='faq_one_category_block'>
                <h2 className='faq_one_category_title' ref={titleRef}>{question?.category?.title}</h2>
                {!matchesAll &&

                <div className='faq_one_category_content_container'>
                    <ul className='faq_one_category_questions'>
                        {oneCategoryData.map((item, i) => (
                            <li
                                className={item?.question === question.question ? 'faq_one_category_questions_item_selected' : 'faq_one_category_questions_item'}
                                key={item.question}
                                data-index={i}
                                style={item?.question === question.question ? {color: '#1F607C'} : {}}
                                data-slug={item.slug}
                                onClick={handleClickQuestion}
                            >
                                {item?.question}
                            </li>
                        ))}
                    </ul>
                    <div className='faq_one_category_answers'>
                        {question?.question &&
                        <p
                            className='faq_one_category_question'
                        >
                            {question?.question}
                        </p>
                        }
                        {question?.answer && isMounted &&
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
                <div >
                    <MobileView
                        oneCategoryData={oneCategoryData}
                        slug={slug}
                        handleClickQuestion={handleClickQuestion}
                        parentTitleRef={titleRef?.current}
                    />
                </div>
                }
            </div>

        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({req, res, params, ...etc}) => {
            store.dispatch(getQuestion(params.slug));
            store.dispatch(END);
            await store.sagaTask.toPromise();
        }
);

export default Slug;