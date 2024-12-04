import express from "express"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import schoolRouter from "./routes/schools.js"

dotenv.config()
const app = express()
app.get("/addSchool",(req,res)=>{
    res.send("server")
})

app.use(bodyParser.json());
app.use("/school",schoolRouter)

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=> console.log(`Server running on http://localhost:${PORT}`));