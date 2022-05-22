import React from 'react';
import useDropInBlog from "../customHooks/useDropInBlog";
import SeoComponent from "../components/SeoComponent";
import makeBlogSchema from "../Schemas/blogSchema";

const Nyheter = () => {
    useDropInBlog()
    return (
        <>
            <SeoComponent makeSchema={makeBlogSchema}
                          data={{}}
                          keyName='blog-page'
            />
            <div id="dib-posts"></div>
            </>
    );
}

export default Nyheter;