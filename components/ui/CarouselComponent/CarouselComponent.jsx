import Carousel from "react-bootstrap/Carousel";
import React from "react";

export const CarouselComponent = ({ children, ...extra }) => {
    return <Carousel {...extra}>{children}</Carousel>;
};

export const CarouselItem = ({ children, ...extra }) => {
    return <Carousel.Item {...extra}>{children}</Carousel.Item>;
};