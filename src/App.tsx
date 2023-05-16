import React from 'react';
import './scss/app.scss';
import {Route, Routes} from "react-router";
import Login from "./pages/login/Login";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/home/Home";


function App() {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route path={''} element={<Login/>}/>
                <Route path={'home'} element={<Home/>}/>
                <Route path={'*'} element={<h1>not found</h1>}/>
            </Route>
        </Routes>
    );
}

export default App;
