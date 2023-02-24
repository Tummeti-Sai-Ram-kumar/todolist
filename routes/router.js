const express = require('express')
const router = express.Router()

const {getTodo , setTodo , updateTodo , deleteTodo} = require('../controller/controller') 

router.get('/',getTodo)

router.post('/',setTodo)

router.patch('/:todoID',updateTodo)

router.delete('/:todoID',deleteTodo)

module.exports = router