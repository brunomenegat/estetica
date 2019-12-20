const express = require('express');
const bodyParser = require('body-parser');//Facilita a transmissão do back e front
const app = express(); //criando app
const mongoose = require('mongoose');// conexão banco de dados
const clientRouter = require('./routes/clientcontroller');
//Conectar com database
mongoose.connect('mongodb+srv://bno:bnobno@cluster0-vmlmz.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true } )//criadnoconexão e define mongoclient 
.then(() => console.log('DB conectado!!'))
.catch((err) => console.log(`Algum erro ocorreu: ${err}`)); // Função que pega os erro. 

//controle fluxo de dados
//app.use(express.json());
app.use(bodyParser.json()); //utilizar json - entenda requisicao
app.use(bodyParser.urlencoded({ extended: false}));

require('./routes/authcontroller')(app);

app.post('/client', clientRouter);
app.use('', express.static('front'));
app.listen(3001, () => console.log('ok') );