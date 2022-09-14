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

async function listUsers(req, res){
    const users = await CustomersModel.find()

    res.render('listUsers',{
        title: 'Listagem de usuários',
        users,
})
}


module.exports={
    index,
    add,
    listUsers,
}