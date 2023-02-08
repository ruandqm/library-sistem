import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoanRegist } from '../pages/LoanRegist';
import { LoanView } from '../pages/LoanView';

export const BrowseRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoanRegist />} />
                <Route path='/loans' element={<LoanView />} />
            </Routes>
        </BrowserRouter>
    )
}