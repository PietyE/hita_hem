import dynamic from "next/dynamic";
import React from "react";

const SimpleReactLightbox = dynamic(() => import("simple-react-lightbox"), {
    ssr: false,
});

const SRLWrapper = dynamic(() =>
    import('simple-react-lightbox').then((mod) => mod.SRLWrapper), {ssr: false}
)

export const SimpleReactLightboxComponent = ({ children, ...extra }) => {
    return <SimpleReactLightbox {...extra}>{children}</SimpleReactLightbox>;
};

export const SRLWrapperComponent = ({ children, ...extra }) => {
    return <SRLWrapper {...extra}>{children}</SRLWrapper>;
};