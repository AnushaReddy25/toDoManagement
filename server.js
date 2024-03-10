const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');

const app = express();//Initialise the applictaion

app.use(express.json());
app.use(cors({
    origin:'*'
}))

mongoose.connect('mongodb+srv://AnushaReddy_52:AnushaReddy52@cluster2.d38ki70.mongodb.net/?retryWrites=true&w=majority')
    .then(()=> console.log('DB connected')
)//takes script to connect mongoDB

//To display content in server, we need to use routers, every method takes 2 arguments , 1st for url and 2nd for arrow funt or normal func in 2nd , req amd res

app.post('/addTask', async (req, res) => {//user will send the value in this todo enclosed in {}
    const { todo } = req.body;
    try {
        const newData = new TaskSchema({
            todo: todo//from user, left side is our application variable
        });
        await newData.save()

    }
    catch (error){
        console.log(error);
    }
})

app.get('/getTask', async (req, res) => {
    try {
        return res.json(await TaskSchema.find());
    }
    catch (error){
        consolele.log(error);
    }
}) 

app.delete('/delete/:id', async (req, res) => {
    try {
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find())
    }   
    catch (error) {
        console.log(error);
    }
})



app.listen(4003, () => console.log("Server running"));