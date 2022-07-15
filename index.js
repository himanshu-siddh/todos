const express=require('express');
 const mongoose = require("mongoose");
 const uri='mongodb+srv://himanshu:mPii2jKVtXOHt2aE@cluster0.nt5qg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
 mongoose.connect(uri, { useNewUrlParser: true }).then(() => console.log("MongoDB connected")) .catch((err) => console.log(err));

 var Schema = mongoose.Schema;

 var SomeModelSchema = new Schema({
  
   todos:String,
   created_at: { type: Date, required: true, default: Date.now },
   updatedAt: {type: Date, default: Date.now}
 });
 
 // Compile model from schema
 var Todos = mongoose.model('Todos', SomeModelSchema,'Todos' );

const app=express();
app.use(express.json());
app.get('/details', (req, res) => {
  Todos.find().then((result)=>{
     res.send(result)  
    }).catch((err)=>{
   console.log(err)
    })
 //   res.send("Hey guys this our new project!");

});

app.post('/create', (req, res) => {
    var Data={}
    Data.todos=req.body.todos;
    if(!req.body.todos)
    {
       return res.send("todos is missing")
    }
    Todos.create(Data).then((result)=>{
      res.send("todos created successuly")
    }).catch((error)=>{
     res.send(error)
    }) 
  });

  app.post('/edit', (req, res) => {
    var Data={}
    id=req.body.id;
    Data.todos=req.body.todos;

    if(!req.body.todos)
    {
       return res.send("todos is missing")
    }
    if(!req.body.id)
    {
       return res.send("id is missing")
    }
    Todos.findByIdAndUpdate(id,Data).then((result)=>{
      res.send("todos updated successuly")
    }).catch((error)=>{
     res.send(error)
    }) 
  });
  
  app.post('/delete', (req, res) => {
    var Data={}
    id=req.body.id;
    if(!req.body.id)
    {
       return res.send("id is missing")
    }
    Todos.findByIdAndDelete(id).then((result)=>{
      res.send("todos deleted successuly")
    }).catch((error)=>{
     res.send(error)
    }) 
  });
  

app.listen(3000, () => {

    console.log('Server is up on PORT 3000');

})