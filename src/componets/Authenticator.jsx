import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import ChatPage from "../pages/CharPage";


const Authenticator = ({ preAuth, children }) => {
    const [auth, setAuth] = useState(false);
    const nav = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        let isAuth = false;
        console.log({token});
        if (token) {
            const decodedData = jwtDecode(token);
            const now = Date.now();
            const notExpired = decodedData.exp * 1000 > now;

            if (notExpired) {
                isAuth = true;
            }
        }
        setAuth(isAuth);
        if (!isAuth) {
            window.location.href = "http://localhost:8081/auth/login";
            localStorage.setItem("redirectUrl", window.location.href);
        }
    }, [preAuth, nav]);

    return (
        <>
            {auth ? <ChatPage />: null}
        </>
    )
};

export default Authenticator;