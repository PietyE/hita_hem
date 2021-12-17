import React from 'react';
import useDropInBlog from "../customHooks/useDropInBlog";

const Blog = () => {
    useDropInBlog()
    return (
        <div id="dib-posts"></div>
    );
}

export default Blog;