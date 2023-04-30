const express = require("express");

const {
  getUserDeUnaAll,
  getUserByPhone,
} = require("./controller/userController");
const{getCustomerHandler,validateTokenJwt}=require("./controller/authorizacionController");
const app = express();
const port = 3000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post("/validateJwt",validateTokenJwt );
app.post("/getCostumer", getCustomerHandler);
app.get("/allUser", getUserDeUnaAll);
app.post("/getUserByPhone", getUserByPhone);

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
