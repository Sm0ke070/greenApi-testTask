import React, {FC} from 'react';
import Header from "../header/Header";
import {Outlet} from "react-router";

const MainLayout: FC = () => {
    return (
        <div>
            <Header/>
            <div>
                <Outlet/>
            </div>

        </div>
    );
};

export default MainLayout;
