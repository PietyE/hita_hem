import React, {useEffect, useState} from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import {faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import IconComponent from "../../components/ui/IconComponent";

function MobileView({oneCategoryData, slug, handleClickQuestion, parentTitleRef}) {

    const [activeKey, setActiveKey] = useState(null)
    const [isOpen,setIsOpen] = useState(true)


    useEffect(() => {
        const currentQuestionIndex = oneCategoryData.findIndex(el => el.slug === slug)
        if (currentQuestionIndex !== -1) {
            setIsOpen(true)
            setActiveKey(currentQuestionIndex + 1)
        }
    }, [slug, oneCategoryData])

    const handleClick = (e) => {
        if (activeKey === Number(e.target.dataset.key)) {
            setIsOpen(prev=>!prev)
        } else {
            if(parentTitleRef){
                window.scrollTo({top: parentTitleRef.offsetTop - 140})
            }
            handleClickQuestion(e)
        }
    }

    return (
        <div key={activeKey}>
            {activeKey &&

            <Accordion
                as='ul'
                className='mobile_one_category_list'
                defaultActiveKey={activeKey}
            >
                {oneCategoryData.map((item, i) =>
                    <Card as='li' key={item.question} className='mobile_one_category_item'>
                        <Card.Header className='mobile_one_category_question'>
                            <IconComponent
                                style={Number(activeKey) === i + 1 && isOpen ? {color: '#1F607C'} : {}}
                                icon={Number(activeKey) === i + 1 && isOpen ? faChevronDown : faChevronRight}
                            />
                            <Accordion.Toggle
                                variant="link"
                                eventKey={i + 1}
                                data-slug={item.slug}
                                data-key = {i + 1}
                                style={Number(activeKey) === i + 1 && isOpen ? {color: '#1F607C'} : {}}
                                onClick={handleClick}
                            >
                                {item.question}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={i + 1}>
                            {item.answer &&
                            <Card.Body
                                className='mobile_one_category_answer'
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtmlFromBack(item.answer)
                                }}
                            >
                            </Card.Body>
                            }
                        </Accordion.Collapse>
                    </Card>
                )}

            </Accordion>}
        </div>
    );
}

export default MobileView;