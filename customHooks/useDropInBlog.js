import React, { useEffect } from 'react';
import {useSelector} from "react-redux";
import {getSelectedLangSelector} from "../redux/reducers/language";
const useDropInBlog = () => {
    const lang = useSelector(getSelectedLangSelector)

    useEffect(()=>{
        if(lang === 'en'){
            window.dib_categories = 'english'
        }
        if(lang === 'sv'){
            window.dib_categories = 'swedish'
        }
    },[lang])

    useEffect(() => {
        const script = document.createElement('script');
        window.dib_id = process.env.NEXT_PUBLIC_DIP_ID;
        // window.dib_categories = lang === 'en' ? 'english' : 'swedish';
        script.src = "https://io.dropinblog.com/js/embed.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

};
export default useDropInBlog;