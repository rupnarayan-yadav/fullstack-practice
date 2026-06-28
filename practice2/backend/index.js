const express=require("express");
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

let students=[
    {id:1, name:"Rahul", subject:"Math", marks:85},
    {id:2, name:"priya", subject:"Science", marks:92}
];


app.get("/api/students", (req,res)=>{
    res.json(students);
});


app.post("/api/students",(req,res)=>{
    const {name,subject,marks}= req.body;
    const newStudent={
        id:students.length+1,
        name,
        subject,
        marks:parseInt(marks)
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});


app.delete("/api/students/:id",(req,res)=>{
    students=students.filter(s=>s.id !==parseInt(req.params.id));
    res.json({message:"Student deleted"});
});

app.listen(5000, ()=> console.log("Backend on port 5000"))