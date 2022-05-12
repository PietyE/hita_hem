import React from 'react';
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import Accordion from "react-bootstrap/Accordion";

const MobileView = ({oneCategoryData, slug, handleClickQuestion, parentTitleRef}) => {
 console.log('slug',slug)
 console.log('oneCategoryData',oneCategoryData)


    return (
        <ul className='mobile_one_category_list'>
            {oneCategoryData.map((item, i) =>{
                const _answerStyle = slug === item.slug ? 'mobile_one_category_answer' : 'mobile_one_category_answer_closed'
                return (
                    <li className='mobile_one_category_item' key={item.slug}>
                        <p
                            className='mobile_one_category_item_question'
                            onClick={handleClickQuestion}
                            data-slug={item.slug}

                        >
                            {item.question}
                        </p>
                        <p
                            className={_answerStyle}
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtmlFromBack(item.answer)
                            }}
                        />


                    </li>
                )
            }
            ) }

        </ul>
    );
}

export default MobileView;