import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import styles from './styles.scss';
import Main from "./pages/Main/Main";

import SlideRoutes from 'react-slide-routes';

const App = () => {
    return (
        <div className={styles.container}>
            <BrowserRouter>
                <div className={styles.container}>
                    <SlideRoutes>
                        <Route path="/" element={<Main/>}/>
                        {/*<Route path="/characters" element={</>}/>*/}
                        {/*<Route path="/episodes" element={</>}/>*/}
                        {/*<Route path="/character/:id" element={</>}/>*/}
                    </SlideRoutes>

                </div>
            </BrowserRouter>
        </div>

    )
}

export default App;