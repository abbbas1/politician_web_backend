import "dotenv/config";
import Session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import express from "express";
import allRoutes from "./router/index.js";
// import AuthenticateMiddleware from "./middleware/authenticate.js";
import sequelize, { connectdb } from "./db/config.js";
import initdb from "./db/init.js";
const app = express();
app.use(express.json());
connectdb();

const envdata = process.env;

const mySequelizeStore = SequelizeStore(Session.Store);
const mySequelizeStore1 = new mySequelizeStore({
  db: sequelize,
});
console
app.use(
  Session({
    secret: envdata.SESSION_SECRET,
    store: mySequelizeStore1,
    saveUninitialized: false,
    resave: true,
    proxy: false,
  }),
  );
mySequelizeStore1.sync();
initdb()
  .then(() => console.log("db is sync"))
  .catch((err) => console.log("error in db" + err));
app.use("/", allRoutes);

// app.post("/", AuthenticateMiddleware, (req, res) => {
//     return res.json({
//         message: "Hello world1",
//     });
//   });

app.listen(envdata.PORT, (err) => {
  if (err) {
    console.log("server not started.", err);
  } else {
    console.log(`sever is listening at http://localhost:${envdata.PORT}`);
  }
});
