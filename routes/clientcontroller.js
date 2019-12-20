const express = require ('express');
const Client = require('../Models/Client');

const router = express.Router();

router.post('/client', async (req,res) => {  // ROTA DE REGISTRO, VER 'ASYNC'. PAA USUARIO
 
  const parsed = req.body;
  const { nome, fone, cabelo, pele, olhos } = parsed;  
  
  try {
    if (await Client.findOne({ nome })) {  
        return res.status(400).send({error: 'Ja existe esse nome'});    
    }

    const newClient = new Client({
      nome,
      fone,
      cabelo,
      pele,
      olhos
    });
    
    await newClient.save();

    res.status(200).send({ 
      msg: 'Registrado com sucesso'
    }); // RETORNO DOS DADOS
  } catch (err) {// CONTROLE DE ERRO
    return res.status(400).send(err);
    }
});

//router.post('/cadastro', async (req,res) => {
  //res.send(path.join(__dirname, 'public', 'name.html'));
//});

module.exports = router; // passo para o app a rota 
//module.exports = app.use({router}); // passo para o app a rota