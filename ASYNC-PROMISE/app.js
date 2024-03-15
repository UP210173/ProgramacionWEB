function getUsers(callback){
    setTimeout(()=> {
        const users = [
            {name: "Rogelio", years: 22},
            {name: "Cristian", years: 20}
        ];
        callback(users);
    },200)      
}

function getInfo(name,callback){
    setTimeout(() => {
        const saludo = "Que tranza " + name + " , ¿Como esta?";

    })
}
  
function getUserWithPromise(){
    const promise 
}