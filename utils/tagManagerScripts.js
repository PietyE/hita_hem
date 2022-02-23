export const sendSignUpToGTM = () => {
    if(typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'user-signup-submit',
            eventProps: {
                category: 'new-account',
                action: 'user-signup-submit',
                label: 'google',
                value: 1
            }
         });
    }


}