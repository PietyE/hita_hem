import React, {useCallback, useEffect, useRef} from 'react';
import {getFaqCategories, setFaqCategories} from "../../redux/actions/faq";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import {FAQ_ROUTE, FAQ_ROUTE_EN} from "../../constants/routesConstant";
import {getSelectedLangSelector} from "../../redux/reducers/language";

const Categories = ({categories}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter()

    const lang = useSelector(getSelectedLangSelector)
    const categories = useSelector(getFaqCategoriesSelector)
    const categoriesRef = useRef()

    useEffect(() => {
        _getCategories()
        return () => _resetCategories()
    }, [])


    const _getCategories = useCallback(
        () => {
            dispatch(getFaqCategories());
        },
        [dispatch]
    );

    const _resetCategories = useCallback(
        () => {
            dispatch(setFaqCategories([]));
        },
        [dispatch]
    );


    const handleClickCategory = (e) => {
        const slug = (e.target.dataset.slug)
        if(slug){
            router.push(lang === 'en' ? `${FAQ_ROUTE_EN}/${slug}` : `${FAQ_ROUTE}/${slug}`)
        }
    }

    return (
        <>
            {categories.length > 0 &&
            <section className='faq_categories_section' ref={categoriesRef}>
                <div className='faq_categories_content_container'>
                    <>
                        <h2 className='faq_categories_title'>{t("faq_page.categories_title")}</h2>
                        <ul className='faq_categories_list'>
                            {categories.map(item => (
                                <li
                                    key={item?.title}
                                    className='faq_categories_item'
                                    data-slug={item?.post_slugs[0]}
                                    onClick={handleClickCategory}
                                >
                                    <span className='faq_categories_item_text'>{item?.title}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                </div>
            </section>
            }
        </>
    );
}

export default Categories;