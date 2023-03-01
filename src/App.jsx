import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import styles from './styles.scss';
import Main from "./pages/Main/Main";
import Checkout from "./pages/Checkout/Checkout";
import SlideRoutes from 'react-slide-routes';
import Modal from "react-modal";
import Nav from "./components/Nav/Nav";

Modal.setAppElement("#root");

const App = () => {
    return (
        <div className={styles.container}>
            <BrowserRouter>
                <Nav/>
                <div className={styles.container}>
                    <SlideRoutes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/checkout" element={<Checkout/>}/>
                    </SlideRoutes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;