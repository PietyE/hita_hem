import React, {useRef} from 'react';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import {FAQ_ROUTE, FAQ_ROUTE_EN} from "../../constants/routesConstant";
import {getSelectedLangSelector} from "../../redux/reducers/language";
import {getFaqCategoriesSelector} from "../../redux/reducers/faq";

const Categories = () => {
    const {t} = useTranslation();
    const router = useRouter()
    const lang = useSelector(getSelectedLangSelector)
    const categories = useSelector(getFaqCategoriesSelector)
    const categoriesRef = useRef()

    const handleClickCategory = (e) => {
        const slug = (e.target.dataset.slug)
        if(slug){
            router.push(

                {
                    pathname: lang === 'en' ? `${FAQ_ROUTE_EN}/[slug]` : `${FAQ_ROUTE}/[slug]`,
                    // pathname: `${FAQ_ROUTE}/[slug]`,
                    query: { slug: slug},
                },
                // {
                //     pathname: lang === 'en' ? `${FAQ_ROUTE_EN}/[slug]` : `${FAQ_ROUTE}/[slug]`,
                //     // pathname: `${FAQ_ROUTE}/[slug]`,
                //     query: { slug: slug},
                // },

                // lang === 'en' ? `${FAQ_ROUTE_EN}/[slug]` : `${FAQ_ROUTE}/[slug]`,
                // lang === 'en' ? `${FAQ_ROUTE_EN}/${slug}` : `${FAQ_ROUTE}/${slug}`,
                // {shallow: true}
            )
        }
    }

    return (
        <>
            {categories?.length > 0 &&
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