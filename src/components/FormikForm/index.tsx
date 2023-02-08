import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { Iloans } from '../../interfaces';

export const FormikForm = () => (
    /*     const [isValidated, SetisValidated] = useState(true) */
    <div>
        <h1 className='text-center m-4'>Registrar Empréstimo</h1>
        <Formik validateOnChange={false} validateOnBlur={false}
            initialValues={
                {
                    name: '',
                    cpf: '',
                    email: '',
                    phone: '',
                    title: '',
                    author: '',
                    publisher: '',
                    year: '',
                    date: ''
                }}

            onSubmit={(values) => {
                axios.post('https://apigenerator.dronahq.com/api/je8sPrSf/library', values)
                    .then(() => {
                        alert('Empréstimo cadastrado com sucesso!')
                    })
                    .catch(function (error) {
                        alert(error);
                    });
            }}
            validate={(values) => {
                const errors: Iloans = {};

                if (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(values.email)) {
                    errors.email = 'Informe um endereço de email válido'
                }
                else if (/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(values.email)) {
                    errors.email = 'Informe um endereço de email válido'
                }

                Object.keys(errors).length != 0 ? alert(JSON.stringify(errors, null, 2)) : null
                return errors
            }}
        >
            {() => (
                <Form>
                    <div className="person d-flex flex-column justify-content-center">
                        <h4 className='mt-2'>Dados do Cliente</h4>

                        <div className="row gap-3 mb-3 w-100 m-auto">
                            <Field className='form-control col' type="text" name="name" placeholder="Nome" required />
                            <Field className='form-control col' type="text" name="cpf" placeholder="CPF" />
                        </div>
                        <div className="row gap-3 mb-3 w-100 m-auto">
                            <Field className='form-control col' type="email" name="email" placeholder="E-mail" />
                            <Field className='form-control col' type="text" name="phone" placeholder="Telefone" />
                        </div>

                    </div>
                    <div className="book">
                        <h4 className='mt-2'>Dados do Livro</h4>

                        <div className="row gap-3 mb-3 w-100 m-auto">
                            <Field className='form-control col' type="text" name="title" placeholder="Título" required />
                            <Field className='form-control col' type="text" name="author" placeholder="Autor" />
                        </div>
                        <div className="row gap-3 mb-3 w-100 m-auto">
                            <Field className='form-control col' type="text" name="publisher" placeholder="Editora" />
                            <Field className='form-control col' type="number" name="year" placeholder="Ano de Publicação" />
                        </div>
                    </div>
                    <div className="loan">
                        <h4 className='mt-2'>Dados do Empréstimo</h4>
                        <Field className='form-control mb-3' type="datetime-local" name="date" placeholder="Data" required />
                    </div>

                    <button className='btn btn-primary' type="submit">Registrar</button>
                </Form>

            )}
        </Formik>
    </div >
);