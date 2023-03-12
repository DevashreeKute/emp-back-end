const express=require('express')
const app=express()

const students=require('./students')
//returns array

app.use(express.json())
//returns function which works before request handle

app.listen(3000,()=>
{
console.log('listening on port 3000')
})

app.get('/',(req,res)=>
{
    //res.send("hello world ")
    //pass students list
    res.json({message:"api working"})
    //res.json(students)
})

app.get('/students',(req,res)=>
{
    
    res.json(students)
})

app.post('/students',(req,res)=>
{   //console.log(req.body)
    //res.send("students post request")

    if(!req.body.email)
    {
        res.status(400)
        res.json({error:"email is required"})
    }
    
    const user={
        id:students.length+1,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    }

    students.push(user)
    res.json(user)

})

//put request

app.put('/students/:id',(req,res)=>
{
    let id=req.params.id
    let first_name=req.body.first_name
    let last_name=req.body.last_name
    let email=req.body.email

    let index=students.findIndex((student)=>
    {
        return(student.id==Number.parseInt(id))
    })

    if(index>=0)
    {
        let std=students[index]
        std.first_name=first_name
        std.last_name=last_name
        std.email=email

        res.json(std)
    }

    else{
        res.status(404)
        res.end
    }
})

app.delete("/students/:id",(req,res)=>
{
    let id=req.params.id
    let index=students.findIndex((student)=>
    {
       return(student.id==Number.parseInt(id))
    })

    if(index>=0)
    {
        let std=students[index]
        students.splice(index,1)
        res.json(std)

    }
    else
    {
        res.status(404)
    }
})

