const listUsers = document.getElementById("users");
import {getAllUsers} from "./petitions.js";

document.addEventListener('DOMContentLoaded', async()=>{
    const users = await getAllUsers();
    let template = listUsers.innerHTML;
    for(const user of users){
        template += `
            <option value="${user.id}">${user.fullname}</option>
        `;
    }
    listUsers.innerHTML = template;
});