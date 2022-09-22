const express = require('express')
const path = require('path')


const db = require('./database')
const routes = require('./routes')
const app = express()

// conectando banco de dados
db.connect()

// definindootemplate engine
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))

// definindo os arquivos públicos
app.use(express.static(path.join(__dirname,'public')))

// habilita server para receber dados via post(formulário)
app.use(express.urlencoded({ extended: true }))

//Definindo rotas
app.use('/', routes)

// 404 error(not found)
app.use((req,res)=>{ // middleware
    res.send('Página não encontrada!')
  })
        
// executandooservidor
  const port = process.env.PORT || 8080
  app.listen(port,() => console.log(`Server is listening on port ${port}`))
