export interface Iloans {
    name?: string
    cpf?: string
    email?: string
    phone?: string
    title?: string
    author?: string
    publisher?: string
    year?: number
    date?: string
    id?: number
}

export interface IFilters {
    nameFilter?: string,
    cpfFilter?: string,
    titleFilter?: string,
    dateFilter?: any,
    minYearFilter?: number,
    maxYearFilter?: number
}
