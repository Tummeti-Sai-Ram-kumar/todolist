
const Todo = require('../models/todoSchema')
const getTodo = async (req,res) => {
    try{
        const todos = await Todo.find()
        console.log(todos)
        res.status(200).json(todos)
    }
    catch(error){
        console.log(error)
        throw new Error("Cannot get details ")
    }
}

const setTodo = async (req,res) => {
    
    console.log(req.body)
    const todo = new Todo({
        id : req.body.id,
        todo : req.body.todo
    })
    await todo.save()
    .then(() => {
        console.log("Todo Added")
        res.status(201).json(todo)
    })
    .catch((e) => {
        console.log(e)
        throw new Error("Cannot add todo")
    })
}

const updateTodo = async(req,res) => {
    console.log(req.params)
    try{
        const todo = await Todo.findOneAndUpdate({id : req.params.todoID} , {todo : req.body.todo} , {new : true , upsert : true})
        console.log("Todo Updated")
        res.status(201).json(todo)
    }
    catch(error){
        console.log(error)
        res.status(404)
        throw new Error("cannot Update")
    }
}

const deleteTodo = async (req,res) => {
    try{
        const random = await Todo.find({id : req.params.todoID})
        console.log(random)
        const goal = await Todo.deleteOne({id : req.params.todoID})
        console.log(goal)

        res.status(201).send(random[0])
    }
    catch(e){
        console.log(e)
        throw new Error("Cannot delete")
    }
}

module.exports = {getTodo , setTodo , updateTodo , deleteTodo}