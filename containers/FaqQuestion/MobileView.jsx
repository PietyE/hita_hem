import React, {useEffect, useRef} from 'react';
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import {faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import IconComponent from "../../components/ui/IconComponent";

const MobileView = ({oneCategoryData, slug, handleClickQuestion, parentTitleRef}) => {

    const itemRef = useRef()
    const offsetTop = itemRef?.current?.offsetTop

    useEffect(() => {
        if (offsetTop) {
            window.scrollTo({top: parentTitleRef.offsetTop - 40})
        }
    }, [slug, offsetTop])

    return (
        <ul className='mobile_one_category_list'>
            {oneCategoryData.map(item => {
                    return (
                        <li className='mobile_one_category_item' key={item.slug} ref={itemRef}>
                            <p
                                className={slug === item.slug ? 'mobile_one_category_question_active' : 'mobile_one_category_question'}
                                onClick={handleClickQuestion}
                                data-slug={item.slug}
                            >
                                <IconComponent
                                    style={slug === item.slug ? {color: '#5400E2'} : {}}
                                    icon={slug === item.slug ? faChevronDown : faChevronRight}
                                />
                                <span data-slug={item.slug}>
                               {item.question}
                            </span>
                            </p>
                            <p
                                className={slug === item.slug ? 'mobile_one_category_answer' : 'mobile_one_category_answer_closed'}
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtmlFromBack(item.answer)
                                }}
                            />
                        </li>
                    )
                }
            )}

        </ul>
    );
}

export default MobileView;