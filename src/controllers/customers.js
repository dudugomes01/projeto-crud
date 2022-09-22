const CustomersModel = require('../models/customers')
const {crypto} = require('../utils/password')

const defaulTitle = 'Cadastro de Clientes'

function index(req, res){
    res.render('register', {
        title: defaulTitle
    })
}

async function add(req, res){
    console.log('Deu cero o Console.log')
    const{
        name,
        age,
        email,
        password,
    } = req.body

    const passwordCrypto = await crypto(password)
    
    const register = new CustomersModel({
        name,
        age,
        email,
        password: passwordCrypto,
    })

    register.save()
    res.render('register', {
        title: defaulTitle,
        message: 'Cadastro realizado com sucesso!'
    })
    
}

async function list(req, res){
    const users = await CustomersModel.find()

    res.render('list',{
        title: 'Listagem de usuários',
        users,
})
}

async function indexEdit(req, res){
    const {id} = req.query
    
    const user = await CustomersModel.findById(id)
    
    res.render('edit', {
        title:'Editar Usuario',
        user,
    })   
}

async function edit(req, res){
   
    const{
        name,
        age,
        email,
    } = req.body

    const {id} = req.params

    const user = await CustomersModel.findById(id)

    user.name = name
    user.age = age
    user.email = email

    user.save()

    res.render('edit',{
        title:'Editar Usuário',
        user,
        message: 'Usuário alterado com sucesso.'
    })
}

module.exports={
    index,
    add,
    list,
    // formEdit,
    indexEdit,
    edit,
}