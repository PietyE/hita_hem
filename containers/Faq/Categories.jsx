import React, {useCallback, useEffect, useRef, useState} from 'react';
import {getFaqCategories, getOneCategory, saveOneCategory} from "../../redux/actions/faq";
import {useDispatch, useSelector} from "react-redux";
import {getFaqCategoriesSelector, getOneCategorySelector} from "../../redux/reducers/faq";
import {useTranslation} from "react-i18next";
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";

const Categories = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const categories = useSelector(getFaqCategoriesSelector)
    const oneCategoryData = useSelector(getOneCategorySelector)

    const categoriesRef = useRef()

    const [selectedQuestion, setSelectedQuestion] = useState(0)
    useEffect(() => {
        _getCategories()

        return () => _resetOneCategory()
    }, [])


    const _getCategories = useCallback(
        () => {
            dispatch(getFaqCategories());
        },
        [dispatch]
    );

    const _resetOneCategory = useCallback(
        () => {
            dispatch(saveOneCategory([]));
        },
        [dispatch]
    );

    const _getOneCategory = useCallback(
        (data) => {
            dispatch(getOneCategory(data));
        },
        [dispatch]
    );

    const handleClickCategory = (e) => {
        _getOneCategory(e.target.dataset.pk)
    }

    const handleClickQuestion = (e) => {
        setSelectedQuestion(e.target.dataset.index)
    }

    let _sectionHeight = {}
    if(typeof window !== 'undefined') {
        const contentSectionHeight = categoriesRef?.current?.offsetHeight
        const calculatedHeight = window.innerHeight - categoriesRef?.current?.offsetTop - 100

        _sectionHeight = {height: calculatedHeight ? `${calculatedHeight}px` : 'auto'}
    }

    return (
        <section className='faq_categories_section' ref={categoriesRef} style={_sectionHeight}>
            <div className='faq_categories_content_container'>
                {oneCategoryData.length === 0 &&
                <>
                    <h2 className='faq_categories_title'>{t("faq_page.categories_title")}</h2>
                    <ul className='faq_categories_list'>
                        {categories.map(item => (
                            <li
                                key={item?.title}
                                className='faq_categories_item'
                                data-pk={item.pk}
                                onClick={handleClickCategory}
                            >
                                <span className='faq_categories_item_text'>{item?.title}</span>
                            </li>
                        ))}
                    </ul>
                </>
                }
                {oneCategoryData.length !== 0 &&
                <div className='faq_one_category_block'>
                    <ul className='faq_one_category_questions'>
                        {oneCategoryData.map((item, i) => (
                            <li
                                className='faq_one_category_questions_item'
                                key={item.question}
                                data-index={i}
                                onClick={handleClickQuestion}
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtmlFromBack(item.question)
                                }}
                            />
                        ))}
                    </ul>
                    <div className='faq_one_category_answers'>
                        <p
                            className='faq_one_category_question'
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtmlFromBack(oneCategoryData[Number(selectedQuestion)].question)
                            }}
                        />
                        <p
                            className='faq_one_category_answer'
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtmlFromBack(oneCategoryData[Number(selectedQuestion)].answer)
                            }}
                        />
                    </div>

                </div>
                }

            </div>

        </section>
    );
}

export default Categories;