import { useState, useEffect } from 'react';
import Task from './Task';
import axios from "axios";
//import data from '../../data-tasks'

let tasks;

const apiGetTasks = 'http://localhost:3000/api/tasks/';
const apiGetLists = 'http://localhost:3000/api/lists/';
const apiCollectionTasksToday = 'http://localhost:3000/api/collection/today/';

async function getAllTasks() {
    return await axios.get(apiGetTasks).then(res => res.data);
}

async function getAllLists(id) {
    return await axios.get(apiGetLists + id).then(res => res.data[0])
}

async function getTasksByListId(list_id) {
    return await axios.get(apiGetLists + list_id + '/tasks?all=true').then(res => res.data)
}

async function getCollectionToday() {
    return await axios.get(apiCollectionTasksToday).then(res => res.data)
}

async function postTaskToServer(formObj) {
    return await axios
        .post(apiGetTasks, formObj)
        .then((res) => {
            console.log(res.data, res.status);
        });
}

async function patchTaskToServer(id, formObj) {
    return await axios
        .patch(apiGetTasks + id, formObj)
        .then((res) => {
            console.log(res.data, res.status);
        });
}

async function delTask(id) {
    return await axios.delete(apiGetTasks + id);
}

const Tasks = ({ getTabStatus, getForm, getFormStatus, listIdFromURL, isToday }) => {

    const [taskArr, setTaskArr] = useState([]);

    const [tabStatus, setTabStatus] = useState(-2);
    const [formStatus, setFormStatus] = useState(getForm);
    const [currentList, setCurrenList] = useState();

    useEffect(() => {
        if (getForm) {
            setFormStatus(getForm);

            postTaskToServer(getForm)
            .then(getFormStatus(true))
            .catch(err => alert(err));

            //getFormStatus(getForm);
        }

    }, [getForm]);

    useEffect(() => {
        if (listIdFromURL) {
            getTasksByListId(listIdFromURL).then(res => setTaskArr(res));

        } if (isToday && !listIdFromURL) {
            getCollectionToday().then(res => setTaskArr(res));

        } else if (!isToday && !listIdFromURL) {
            getAllTasks().then(res => setTaskArr(res));
        }

        setTabStatus(getTabStatus);
    }, [formStatus, getTabStatus, listIdFromURL, isToday]);

    const delTaskButton = (id) => {
        console.log(`Task ID ${id} was del...`);

        delTask(id);

        setTaskArr((taskArr) => taskArr.filter((task) => id !== task.id));
    }

    const handleCheckBoxStatus = (id) => {

        taskArr.map((task) => {
            if (task.id === id) {
                task.done = !task.done;

                patchTaskToServer(id, task);
            }

            return taskArr;
        });
    }

    if (taskArr) {
        if (tabStatus === 1) {
            tasks = taskArr.filter((task) => task.done === true);
        } else if (tabStatus === 0) {
            tasks = taskArr.filter((task) => task.done === false);
        } else tasks = taskArr;

        let curTasksArr = tasks
            .map((task) => {
                return (<Task task={task} key={task.id} changeCheckBox={handleCheckBoxStatus} delTask={delTaskButton} />)
            });

        return (
            <div className="tasks">
                <div className="task-list-name">{listIdFromURL}</div >

                {curTasksArr}
            </div>
        );
    }

}

export default Tasks;