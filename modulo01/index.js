const express = require('express'); // chamando dependencias

const server = express(); // iniciando a aplicação
server.use(express.json());

const users = ['evaldo', 'fabio', 'isaque', 'STRNeoh'];

//existem 3 tipos de parametros
// Query params => ?test=1   -> .query
// Route params => /users/1  -> .params   ***/:id
//Request body = { "name": "Diego"} -> .body

//requisição para o servidor
//req => é todos os dados da requisição
//rep => é todas as informações, que são necessarias p/ retornar uma resposta para o cliente
//middleware são utilizados  pra controle de fluxo

//middleware Global
server.use((req,res,next) => {
    console.time('Request');
    console.log(`Método: ${req.method}; URL: ${req.url}`);
    next();
    console.timeEnd('Request');
})


//midle LOcal
function checkUserExists(req,res,next){
    if (!req.body.user){
        return res.status(400).json({error: 'User name is required'});
    }

    return next();
}


function checkUserInArray(req,res,next){
    if (!users[req.params.index]){
        return res.status(400).json({error: 'User does not exists'});
    }

    return next();
}


//retorna apenasum usuarios especifico
server.get('/users', (req,res) => {
    return res.json(users);
})

//retorna todos os usuarios
server.get('/users/:index', checkUserInArray, (req,res) => {
    // return res.send('Hello World');
    const { index } = req.params;
    return res.json(users[index]);
})

//criar um novo usuario
server.post("/users", checkUserExists, (req, res) => {
    const {name} = req.body;
    users.push(name);
    return res.json(users);
})

//edita usuario
server.put("/users/:index", checkUserExists, checkUserInArray, (req,res) => {
    const { index } = req.params;
    const { name } = req.body;
    users[index] = name;
    return res.json(users);
})

//deleta usuario
server.delete("/users/:index", checkUserInArray, (req,res) => {
    const { index } = req.params;
    users.splice(index, 1);
    return res.json(users);
})

 
server.listen(3000); //nosso servidor esta ouvindo a porta 3000
