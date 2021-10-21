import { useEffect } from 'react';
const useGoogleCaptcha = () => {
    useEffect(() => {
            const script = document.createElement('script');
            script.src = 'https://www.google.com/recaptcha/api.js?render=6LdhbeQcAAAAANViCW7EUOdc7mGAIUWkDISUt-gP';
            script.async = true;
            document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);
};
export default useGoogleCaptcha;