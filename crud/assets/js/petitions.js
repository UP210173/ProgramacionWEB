export async function getAllUsers() {
    const resp = await fetch("/api/getUsers.php");
    const json = await resp.json();
    return json;
  }
  
  export async function getTasks(idUsuario) {
    const resp = await fetch(`/api/getTasks.php?id=${idUsuario}`);
    const json = await resp.json();
    return json;
  }
  
  export async function createTask(formdata) {
    const res = await fetch(`/api/createTask.php`, {
      method: "POST",
      body: formdata
    });
    const json = await res.json();
    return json;
  }
  
  export async function deleteTask(taskId) {
    const res = await fetch(`/api/deleteTask.php?id=${taskId}`);
    const json = await res.json();
    return json;
  }
  
  export async function getTask(taskId) {
    const res = await fetch(`/api/getTask.php?id=${taskId}`);
    const json = await res.json();
    return json;
  }
  
  export async function updateTask(formdata, taskId) {
    const res = await fetch(`/api/updateTask.php?id=${taskId}`, {
      method: "POST",
      body: formdata
    });
    const json = await res.json();
    return json;
  }
  