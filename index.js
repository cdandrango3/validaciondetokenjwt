const express = require("express");
const validateJwt = require("./service/validator");
const app = express();
const port = 3000;
app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.post('/validateJwt', async (req, res) => {
    const {jwt} = req.body;
    if (!jwt) {
        res.status(400).send("token no encontrado");
    }
    try{
    const result = await validateJwt(jwt);
    if (result.validate) {
        res.status(200).send(result);
    }
    else{
        res.status(401).send(result);
    }
    }catch(err){
        res.status(500).send("token invalido");   
    }
  });
  app.listen(port, () => {
    console.log(`API escuchando en el puerto ${port}`);
  });
 
  
  
  
  