// Elementos HTML
const userSelect = document.getElementById("select-users");
const userContainer = document.getElementById("user-container");
const taskContainer = document.getElementById("task-container");
const buttonTask = document.getElementById("updateTask");
let userNameDisplay = document.getElementById("name");
let userEmailDisplay = document.getElementById("email");
let userTasksDisplay = document.getElementById("tasks");
let userId = '';

// Código necesario para mostrar información

userSelect.addEventListener("change", (event) => {
  getAllUsers().then((users) => {
    const selectedUserId = event.target.value;
    const selectedUser = users.find(user => user.id === selectedUserId);
    if (selectedUser) {
      userNameDisplay.innerText = selectedUser.firstname + " " + selectedUser.lastname;
      userEmailDisplay.innerText = selectedUser.email;
      userId = selectedUser.id;
    }
  });
});

buttonTask.addEventListener("click", () => {
  getAllTasks().then((tasks) => {
    let userTasks = '';
    tasks.forEach(task => {
      if (task.userId === userId) {
        userTasks += `<li><span>${task.title}</span><input type="checkbox" ${task.completed ? 'checked' : ''}></li>`;
      }
    });
    userTasksDisplay.innerHTML = userTasks;
  });
});

document.addEventListener("DOMContentLoaded", () =>{
  getAllUsers().then((users) => {
    users.forEach(user => {
      let option = document.createElement("option");
      option.text = user.firstname;
      option.value = user.id;
      userSelect.add(option);
    });
    if (users.length > 0) {
      userNameDisplay.innerText = users[0].firstname + " " + users[0].lastname;
      userEmailDisplay.innerText = users[0].email;
      userId = users[0].id;
    }
  });
});

// Funciones

/**
 * Obtiene una lista de todos los usuarios que pueden existir
 * @returns {Promise<User[]>}
 */
function getAllUsers() {
  return fetch('data/usuarios.json')
    .then(response => response.json());
}

/**
 * Obtiene una lista de todas las tareas que hay de todos los usuarios
 * @returns {Promise<Task[]>}
 */
function getAllTasks() {
  return fetch('data/tareas.json')
    .then(response => response.json());
}

/**
 * @typedef User Definición de un usuario
 * @property {number} id Identificador único del usuario
 * @property {string} firstname Primer nombre del usuario
 * @property {string} lastname Apellido del usuario
 * @property {string} email Correo electrónico del usuario
 */

/**
 * @typedef Task Definición de una tarea de usuario
 * @property {number} id Identificador único de la tarea
 * @property {number} userId Identificador del usuario a quien corresponde la tarea
 * @property {string} title Título de la tarea
 * @property {boolean} completed Estado de la tarea si está completada o no
 */
