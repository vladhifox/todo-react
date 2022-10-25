const apiGetTasks = 'http://localhost:3000/api/tasks/';

class TasksModel {

  postTaskToServer(formObj) {
    return axios
      .post(apiGetTasks, formObj)
      .then((response) => {
        console.log(response);
      });
  }
}    

export default new TasksModel();