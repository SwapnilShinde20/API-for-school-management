import express from "express"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import schoolRouter from "./routes/schools.js"

dotenv.config()
const app = express()
app.get("/",(req,res)=>{
    res.send("server started")
})

app.use(bodyParser.json());
app.use("/school",schoolRouter)

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=> console.log(`Server running`));