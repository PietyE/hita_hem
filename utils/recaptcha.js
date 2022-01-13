const recaptchaToken = '6LdhbeQcAAAAANViCW7EUOdc7mGAIUWkDISUt-gP'



export const recaptcha = async (action, functionToExecute, data) => {

    const generateToken = () => {
        grecaptcha.ready(function() {
            grecaptcha.execute(recaptchaToken, {action: action}).then(function(token) {
                functionToExecute({token, data})
            });
        });
    }



    if(typeof grecaptcha !== 'object'){
        const script = await  document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=6LdhbeQcAAAAANViCW7EUOdc7mGAIUWkDISUt-gP';
    script.async = true;

        script.onload = () => generateToken();

     document.body.appendChild(script);
    }else{
        generateToken()
    }






}
