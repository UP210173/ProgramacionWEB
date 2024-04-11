import { createTask, getAllUsers, getTask, getTasks, deleteTask, updateTask } from './petitions.js';

const table = document.getElementById('table');
const completedTask = document.getElementById('completed');
const taskForm = document.getElementById('form-task');
const formTitle = document.getElementById('form-title');
const userList = document.getElementById('users');
const submitButton = document.getElementById('submitbutton');
let isUpdating = false;
let editingId;

document.addEventListener('DOMContentLoaded', async () => {
  const users = await getAllUsers();

  let template = userList.innerHTML;
  for (const user of users) {
    template += `
      <option value="${user.id}">${user.fullname}</option>
    `;
  }

  userList.innerHTML = template;
});

userList.addEventListener('change', async () => {
  let template = '';
  const tasks = await getTasks(userList.value);
  console.log(tasks);
  tasks.forEach((task) => {
    template += `
      <tr id=row${task.id}>
        <td>${task.id}</td>
        <td>${userList.options[userList.value].innerText}</td>
        <td>${task.title}</td>
        <td>${task.completed ? '1' : '0'}</td>
        <td>
          <button class="btn btn-secondary btn-sm updateBtn" id="updateBtn${task.id}">
            <span>Update</span> <i class="nf nf-md-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${task.id}">
            <span>Delete</span> <i class="nf nf-cod-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
  table.innerHTML = template;

  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      console.log('Deleting');
      const taskId = button.id.replace('deleteBtn', '');
      console.log(taskId);
      const row = document.getElementById(`row${taskId}`);
      row.remove();
      await deleteTask(taskId);
    });
  });

  const updateButtons = document.querySelectorAll('.updateBtn');
  updateButtons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      console.log('Updating');
      const taskId = button.id.replace('updateBtn', '');
      const taskInfo = await getTask(taskId);
      let taskCheck;
      editingId = taskId;
      taskInfo.completed === true ? (taskCheck = 'true') : (taskCheck = '');
      console.log(taskInfo);
      taskForm.querySelector('#title').value = `${taskInfo.title}`;
      formTitle.innerText = 'Modify Task';
      completedTask.checked = taskCheck;
      submitButton.innerText = 'UPDATE';
      submitButton.setAttribute('id', 'update');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      isUpdating = true;
    });
  });
});

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(taskForm);
  const completedValue = completedTask.checked ? 1 : 0;
  formData.append('completed', completedValue);

  if (isUpdating && editingId) {
    try {
      const response = await updateTask(formData, editingId);
      if (response.success) {
        const taskInfo = await getTask(editingId);
        let taskCompleted = '0';
        if (taskInfo.completed) {
          taskCompleted = '1';
        }
        const rowToUpdate = document.getElementById(`row${editingId}`);
        rowToUpdate.children[2].innerText = taskInfo.title;
        rowToUpdate.children[3].innerText = taskCompleted;
        formTitle.innerText = 'Insert Task';
        submitButton.innerText = 'SAVE';
        submitButton.setAttribute('id', 'insert');
        taskForm.reset();
        isUpdating = false;
        editingId = null;
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  } else {
    try {
      const response = await createTask(formData);
      if (response.success) {
        const taskInfo = await getTask(response.taskId);
        let taskCompleted = '0';
        if (taskInfo.completed) {
          taskCompleted = '1';
        }
        const newRow = document.createElement('tr');
        newRow.setAttribute('id', `row${taskInfo.id}`);
        newRow.innerHTML = `
          <td>${taskInfo.id}</td>
          <td>${userList.options[userList.value].innerText}</td>
          <td>${taskInfo.title}</td>
          <td>${taskCompleted}</td>
          <td>
            <button class="btn btn-secondary btn-sm updateBtn" id="updateBtn${taskInfo.id}">
              <span>Update</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${taskInfo.id}">
              <span>Delete</span> <i class="nf nf-cod-trash"></i>
            </button>
          </td>
        `;
        table.appendChild(newRow);
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
});
