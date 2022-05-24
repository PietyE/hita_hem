import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";


export const AccordionComponent = ({ children, ...extra }) => {
    return <Accordion {...extra}>{children}</Accordion>;
};

export const AccordionToggle = ({children, ...extra}) => {
    return <Accordion.Toggle {...extra}>{children}</Accordion.Toggle>;
};

export const AccordionCollapse = ({ children, ...extra }) => {
    return <Accordion.Collapse {...extra}>{children}</Accordion.Collapse>;
};

export const CardComponent = ({ children, ...extra }) => {
    return <Card {...extra}>{children}</Card>;
};

export const CardHeader = ({ children, ...extra }) => {
    return <Card.Header {...extra}>{children}</Card.Header>;
};

export const CardBody = ({ children, ...extra }) => {
    return <Card.Body {...extra}>{children}</Card.Body>;
};
