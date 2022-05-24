import React, {useCallback, useEffect} from 'react';
import useDropInBlog from "../customHooks/useDropInBlog";
import SeoComponent from "../components/SeoComponent";
import makeBlogSchema from "../Schemas/blogSchema";
import {useDispatch, useSelector} from "react-redux";
import {getNewsPageSeoSelector} from "../redux/reducers/news";
import {getNewsSeo} from "../redux/actions/news";
import {wrapper} from "../redux/store";
import {END} from "redux-saga";

const Nyheter = () => {
    const dispatch = useDispatch();
    const seo = useSelector(getNewsPageSeoSelector)

    useEffect(() => {
        _getNewsPageSeo()
    }, [])

    useDropInBlog()

    const _getNewsPageSeo = useCallback((data) => {
        dispatch(getNewsSeo(data));
    }, [dispatch]);

    return (
        <>
            <SeoComponent seo={seo}
                          url={'https://accumeo.com/nyheter'}
                          makeSchema={makeBlogSchema}
                          data={seo?.mark_up}
                          keyName='blog-page'
            />
            <div id="dib-posts"></div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({req, res, ...etc}) => {
            store.dispatch(getNewsSeo());
            store.dispatch(END);
            await store.sagaTask.toPromise();
        }
);

export default Nyheter;