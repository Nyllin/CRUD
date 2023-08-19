const express = require("express")
const app = express()
const cors = require('cors')
const mysql = require("mysql")
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud'
})

app.get('/',(req,res)=>{
   const sql= "select * from students";
   db.query(sql,(err,data)=>{
    if(err) return res.json("error");
    return res.json(data);
   })
})

app.post('/create',(req,res)=>{
    const sql = "insert into students (Name,Email) VALUES (?)"
    const values = [...Object.values(req.body)];
    db.query(sql,[values],(err,data)=>{
        if(err) return res.json("Error");
        return res.json({data})
    })

})

app.put('/update/:id',(req,res)=>{
    const sql ="update students set Name=?,Email=? where ID=?";
    const id = req.params.id;
    const values = [req.body.name,req.body.email]
    db.query(sql,[...values,id],(err,data)=>{
        if(err) return res.json("Error")
        return res.json(data)
    })
})


app.delete('/student/:id',(req,res)=>{
    const id = req.params.id
    const sql = "delete from students where ID=?";
    db.query(sql,[id],(err,data)=>{
        if(err) return res.json("Error");
        return res.json({data})
    })

})



app.listen(8081,()=>{
    console.log("listening");
})