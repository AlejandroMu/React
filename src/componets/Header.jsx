import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    if (token) {
        localStorage.setItem("token", token);
        queryParams.delete("token");
        let redirectUrl = localStorage.getItem("redirectUrl");
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }

    const onClick = () => {
        window.location.href = "http://localhost:8081/users";
        localStorage.setItem("redirectUrl", window.location.href);
    }   
    return (
        <div style={{ display: "flex", flexDirection: 'column', width:'100%', alignItems: 'center' }}>
            <div className="container" style={{ display: "flex", width:'100%', justifyContent: 'center', alignItems: 'center', gap:200}}>
                <h1>My Header</h1>
                <button onClick={onClick} 
                    style={{height:'100%'}}
                >
                    Usuarios
                </button>

                <button onClick={() =>{
                    localStorage.removeItem("token");
                    window.location.href = "http://localhost:8081/auth/logout";
                }} 
                    style={{height:'100%'}}
                >
                    Cerrar Sesion
                </button>
            </div>
            <Outlet />
        </div>
    );
};

export default Header;