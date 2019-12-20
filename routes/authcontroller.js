const express = require ('express');
const bcrypt = require ('bcryptjs');
const User = require('../Models/Client');

const router = express.Router();

router.post('/register', async (req,res) => {  // ROTA DE REGISTRO, VER 'ASYNC'. PAA USUARIO
  const { email, user, password } = req.body;  
  
  try {
    if (await User.findOne({ email })) {  
        return res.status(400).send({error: 'Ja existe esse email'});    
    }

    const newUser = new User();
    newUser.email = email;
    newUser.name = user;
    newUser.password = password; // REQ.BODY PARAMETROS QUE O  USUARIO CRIA E O USER.CREATE REPASSA PARA USER.CREATE

    await newUser.save();

    res.send({ 
      newUser,
      token: generateToken({ id: newUser.id }),
    }); // RETORNO DOS DADOS
  } catch (err) {// CONTROLE DE ERRO
    return res.status(400).send({ error: ' Registration failed '});
    }
});

router.post('/authenticate', async (req,res) => {
  const {email, password} = req.body;

  const user =await User.findOne({ email }).select('+password');

  if(!user)
    return res.status(400).send ({ error:'User not found'});

  if (!await bcrypt.compare(password, user.password))
  return res.status(400).send ({ error:'Invalid password'});

  user.password = undefined; //Nao devolve ao usuario a senha

  res.send({
    user,  
    token: generateToken({ id: user.id }),
  });
});

module.exports = app => { app.use('/auth', router)}; // passo para o app a rota 
//module.exports = app.use({router}); // passo para o app a rota