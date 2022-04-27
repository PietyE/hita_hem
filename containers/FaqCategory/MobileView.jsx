import React, {useState} from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import {sanitizeHtmlFromBack} from "../../utils/sanitazeHTML";
import {faChevronDown, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import IconComponent from "../../components/ui/IconComponent";

function MobileView({oneCategoryData}) {
    const [activeKey, setActiveKey] = useState(null)

    const handleClickQuestion = (e) => {
        if (e.target?.dataset?.key !== activeKey) {
            setActiveKey(e.target?.dataset?.key)
        } else {
            setActiveKey(null)
        }
    }
    return (
        <Accordion as='ul' className='mobile_one_category_list'>
            {oneCategoryData.map((item, i) =>
                <Card as='li' key={item.question} className='mobile_one_category_item'>
                    <Card.Header className='mobile_one_category_question'>
                        <IconComponent
                            style={Number(activeKey) === i + 1 ? {color: '#1F607C'} : {}}
                            icon={Number(activeKey) === i + 1 ? faChevronDown : faChevronRight}
                        />
                        <Accordion.Toggle
                            variant="link"
                            eventKey={i + 1}
                            data-key={i + 1}
                            style={Number(activeKey) === i + 1 ? {color: '#1F607C'} : {}}
                            onClick={handleClickQuestion}
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtmlFromBack(item.question)
                            }}
                        >
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

        </Accordion>
    );
}

export default MobileView;