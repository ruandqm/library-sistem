import React from 'react'
import { FormikForm } from '../../components/FormikForm'
import Navbar from '../../components/Navbar'
import './index.scss'

export const LoanRegist = () => {
    return (
        <div className='loanRegist'>
            <Navbar />
            <div className="container">
                <FormikForm />
            </div>

        </div>
    )
}
