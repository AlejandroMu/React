import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ChatPage from "../pages/CharPage";
import Authenticator from "../componets/Authenticator";
import Header from "../componets/Header";


const routes = createRoutesFromElements(
    <Route path="/" element={<Header/>}>
        <Route path="/chat" element={
            <Authenticator>
                <ChatPage />
            </Authenticator>
        } />,
    </Route>
);




export const router = createBrowserRouter(routes);