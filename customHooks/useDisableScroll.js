import {useEffect} from "react";

const keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();

    return false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventScroll(e);
        return false;
    }
}

const useDisableScroll = () => {
    useEffect(() => {
        document.addEventListener('wheel', preventScroll, {passive: false});
        window.addEventListener('touchmove', preventScroll, {passive: false});
        window.addEventListener('keydown', preventDefaultForScrollKeys, {passive: false});


        return () => {
            document.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            window.removeEventListener('keydown', preventDefaultForScrollKeys);
        }
    }, [])
}

export default useDisableScroll