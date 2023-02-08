import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { IFilters, Iloans } from '../../interfaces'
import './index.scss'

export const LoanView = () => {

    const [loans, setLoans] = useState<Iloans[]>([])
    const [isGet, setIsGet] = useState(false)

    const [filterValues, setFilterValues] = useState<IFilters>({})

    const GetData = async () => {
        const response = await axios.get('https://apigenerator.dronahq.com/api/je8sPrSf/library')
        setLoans(response.data)
        setIsGet(true)
    }

    const GetFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValues({ ...filterValues, [e.target.id]: e.target.value })
    }

    const GetFilters = (e: React.FormEvent) => {
        e.preventDefault()
        const namefilter = filterValues.nameFilter || ''
        const cpfFilter = filterValues.cpfFilter || ''
        const titleFilter = filterValues.titleFilter || ''
        const dateFilter = filterValues.dateFilter || '00/00/0000'
        const minYearFilter = filterValues.minYearFilter || 0

        //formatar data para formato brasileiro
        const filterLoans = loans.filter(loan => (
            namefilter ? loan.name?.includes(namefilter) : true
                && cpfFilter ? loan.cpf?.includes(cpfFilter) : true
                    && titleFilter ? loan.title?.includes(titleFilter) : true
                        && dateFilter ? new Date(loan.date || '00/00/0000') >= new Date(dateFilter) : true
            // && minYearFilter && maxYearFilter ? loan.year != undefined ? loan.year > minYearFilter && loan.year < maxYearFilter : null : true
        ))

        console.log(filterLoans)
    }


    useEffect(() => {
        GetData()
    }, [])

    return (
        <div className='loanView'>
            <Navbar />
            <div className="container">
                <h1 className='text-center mb-3'>Empréstimos Realizados</h1>

                <section className="filter d-flex justify-content-center">
                    <a className="addFilters btn btn-primary d-flex gap-2 align-items-center"
                        data-bs-toggle="offcanvas"
                        href="#chooseFilter"
                        role="button"
                        aria-controls="chooseFilter">Filtrar
                        <span className='material-symbols-outlined'>filter_list</span>
                    </a>

                </section>

                <div className="offcanvas offcanvas-start" tabIndex={-1} id="chooseFilter" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <h4 className="offcanvas-title" id="offcanvasExampleLabel">Filtrar</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <h5>
                            Escolha um ou mais filtros e clique em aplicar
                        </h5>
                        <form action="">
                            <div className="nameFilter mt-3">
                                <label htmlFor="#nameFilter">Pelo nome</label>
                                <input onChange={GetFilterValue} id='nameFilter' className='form-control' type="text" />
                            </div>
                            <div className="cpfFilter mt-3">
                                <label htmlFor="#cpfFilter">Pelo CPF</label>
                                <input onChange={GetFilterValue} id='cpfFilter' className='form-control' type="text" />
                            </div>
                            <div className="titleFilter mt-3">
                                <label htmlFor="#titleFilter">Pelo título do livro</label>
                                <input onChange={GetFilterValue} id='titleFilter' className='form-control' type="text" />
                            </div>
                            <div className="dateFilter mt-3">
                                <label htmlFor="#dateFilter">Emprestado a partir da data</label>
                                <input onChange={GetFilterValue} id='dateFilter' className='form-control' type="date" />
                            </div>
                            <div className="yearFilter mt-3 mb-3">
                                <label htmlFor="#yearFilter">Livro publicado entre os anos</label>
                                <div className="d-flex gap-3">
                                    <input onChange={GetFilterValue} id='minYearFilter' className='form-control' type="number" />
                                    <input onChange={GetFilterValue} id='maxYearFilter' className='form-control' type="number" />
                                </div>
                            </div>
                            <button className='btn btn-primary' type='submit' onClick={GetFilters} data-bs-dismiss="offcanvas">Aplicar</button>
                        </form>
                    </div>
                </div>

                <div className="loans d-flex flex-column justify-content-center mb-3">
                    {isGet && loans.map((loan) => {
                        return (
                            <div key={loan.id} className="card mt-3 m-auto w-50 shadow-lg border-white">
                                <div className="card-body">
                                    <ul style={{ listStyle: 'none' }}>
                                        <li><b>Nome: </b>{loan.name}</li>
                                        <li><b>CPF: </b>{loan.cpf}</li>
                                        <li><b>E-mail: </b>{loan.email}</li>
                                        <li><b>Telefone: </b>{loan.phone}</li>
                                        <hr />
                                        <li><b>Título: </b>{loan.title}</li>
                                        <li><b>Autor: </b>{loan.author}</li>
                                        <li><b>Editora: </b>{loan.publisher}</li>
                                        <li><b>Ano de Publicação: </b>{loan.year}</li>
                                        <hr />
                                        <li><b>Data e hora do empréstimo: </b>{loan.date}</li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
