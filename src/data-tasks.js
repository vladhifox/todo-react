// const tasksArr = [
//     {
//         "id": 1,
//         "name": "New task 1",
//         "list_id": 1,
//         "description": "Description New task 1",
//         "done": false,
//         "due_date": "23-08-2022"
//     },
//     {
//         "id": 2,
//         "name": "New task 2",
//         "list_id": 2,
//         "description": "Description New task 2",
//         "done": true,
//         "due_date": "24-08-2022"
//     },
//     {
//         "id": 3,
//         "name": "New task 3",
//         "list_id": 1,
//         "description": "Description New task 3",
//         "done": false,
//         "due_date": "26-08-2022"
//     },
//     {
//         "id": 4,
//         "name": "New task 4",
//         "list_id": 2,
//         "description": "Description New task 4",
//         "done": true,
//         "due_date": "27-08-2022"
//     }
// ]

import axios from "axios";

const tasksArr = [];
const apiGetTasks = 'http://localhost:3000/api/tasks/';

async function getAllTasks() {
    return await axios.get(apiGetTasks)
}

function handelTasksFromServer(tasksObj) {

    const { id, list_id, name, description, done, due_date } = tasksObj;

    const container = {};

    container.id = id;
    container.name = name;
    container.list_id = list_id;
    container.description = description

    if (done) container.done = 1;
    else container.done = 0;

    container.due_date = due_date;

    tasksArr.push(container);
}

getAllTasks().then(task => {
    task.data.forEach(handelTasksFromServer);
});

export default tasksArr;