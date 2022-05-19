import React from 'react';
import useDropInBlog from "../customHooks/useDropInBlog";
import Schema from "../components/Schema";
import makeBlogSchema from "../Schemas/blogSchema";

const Nyheter = () => {
    useDropInBlog()
    return (
        <>
            <Schema makeSchema={makeBlogSchema} data={{}} keyName='blog-page'/>
            <div id="dib-posts"></div>
            </>
    );
}

export default Nyheter;