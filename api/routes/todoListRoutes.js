'use strict'
//Setting up the routes
module.exports = function(app) {
    var todoList = require('../controllers/todoListController');

    //todolist Routes
    app.route('/tasks')
        //fetching data from the database
        .get(todoList.list_all_tasks)
        //posting data to the database
        .post(todoList.create_a_task);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};