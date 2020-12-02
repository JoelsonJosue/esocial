import * as Yup from 'yup'

export default Yup.object().shape({
    tipo: Yup.string().required(),
    //entidade: Yup.string().required("O campo Entidade é obrigatório"),
    entidade: Yup.string().notRequired()
        .when('tipo', {
        is: (val) => val === '1',
        then: Yup.string().required('O campo Entidade é obrigatório'),
        otherwise: Yup.string().notRequired()
    }),
    database: Yup.string().required("O campo do Código do Banco é obrigatório"),
    //nrinsc: Yup.string().required("O campo do Número de Inscrição é obrigatório"),
    nrinsc: Yup.string().notRequired()
        .when('tipo', {
        is: (val) => val === '2',
        then: Yup.string().required('O campo do Número de Inscrição é obrigatório'),
        otherwise: Yup.string().notRequired()
    })
})