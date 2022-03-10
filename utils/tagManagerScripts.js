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