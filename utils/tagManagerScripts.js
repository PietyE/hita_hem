export const sendSignInToGTM = () => {
    if(typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'user-signin-submit',
            eventProps: {
                category: 'new-account',
                action: 'user-signin-submit',
                label: 'google',
                value: 1
            }
         });
    }
}

export const sendSignUpToGTM = (method) => {
    if(typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'user-signup',
            eventProps: {
                category: 'new-account',
                action: 'user-signup',
                label: method,
                value: 1
            }
        });
    }
}