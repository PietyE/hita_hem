
export const recaptcha = async (action, functionToExecute, data) => {

    const generateToken = () => {
        grecaptcha.ready(function() {
            grecaptcha.execute(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA, {action: action}).then(function(token) {
                functionToExecute({token, data})
            });
        });
    }



    if(typeof grecaptcha !== 'object'){
        const script = await  document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA}`;
    script.async = true;

        script.onload = () => generateToken();

     document.body.appendChild(script);
    }else{
        generateToken()
    }






}
