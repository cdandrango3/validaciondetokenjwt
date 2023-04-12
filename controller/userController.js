const {getUserCreditor} = require("../service/getListDeUnaUser");
const {getallListUserDeUna} = require("../service/getListDeUnaUser");
const {getClient} = require("../service/getuser");	
const validateJwt = require("../service/validator");

const getUserDeUnaAll= async (req, res) => {
    const jwt = req.headers["authorization"];
    if (!jwt) {
      res.status(400).send({ validate: false });
    }
    console.log(jwt.startsWith("Bearer "))
    try {
      if (jwt.startsWith("Bearer ")) {
        const token = jwt.slice(7, jwt.length);
        const result = await validateJwt(token);
        console.log(result)
        if (result.validate) {
        try{
         const userData=await getallListUserDeUna()
         res.status(200).send(userData)
        }
        catch{
            res.status(500).send("Error con el servicio")
        }
        } else {
            console.log("aqui")
          res.status(401).send(result);
        }
      }
    } catch (err) {
        console.log(err)
      res.status(401).send({ validate: false });
    }
  };

const getUserByPhone= async (req, res) => {
    const jwt = req.headers["authorization"];
    const {phone}=req.body
    if (!jwt || !phone) {
      res.status(400).send({ validate: false});
    }
    try {
      if (jwt.startsWith("Bearer ")) {
        const token = jwt.slice(7, jwt.length);
        const result = await validateJwt(token);
        console.log(result)
        if (result.validate) {
        try{
         const userData=await getUserCreditor(phone)
         if(userData){
          console.log(userData.Cif)
          const dataUser = await getClient(userData.Cif);
          res.status(200).send(dataUser);
         }
         else{
          res.status(404).send("No existe el usuario")
         }
        }
        catch{
            res.status(500).send("Error con el servicio")
        }
        } else {
            
          res.status(401).send(result);
        }
      }
    } catch (err) {
        console.log(err)
      res.status(401).send({ validate: false });
    }
  };

  module.exports={getUserDeUnaAll,getUserByPhone}