import React from 'react';
import useDropInBlog from "../customHooks/useDropInBlog";

const Nyheter = () => {
    useDropInBlog()
    return (
        <div id="dib-posts"></div>
    );
}

export default Nyheter;