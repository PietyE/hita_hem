const recaptchaToken = '6LdhbeQcAAAAANViCW7EUOdc7mGAIUWkDISUt-gP'

export const recaptcha =  (action, functionToExecute, data) => {
    grecaptcha.ready(function() {
        grecaptcha.execute(recaptchaToken, {action: action}).then(function(token) {
            functionToExecute({token, data})
        });
    });
}
