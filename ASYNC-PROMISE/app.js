function getUsers (callback) {
    setTimeout(() => {
        const users = [
            { name: "Cristian", years: 20 },
            { name: "Andrea", years: 20 }
        ];
        callback(users);
    }, 2000);
}

function getUsersWithPromise() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = [
                { name: "Cristian", years: 20 },
                { name: "Andrea", years: 20 }
            ];
            resolve(users);
        }, 2000);
    });
    return promise;
}


function getInfo (name, callback) {
    setTimeout(() => {
        let error = null
        const saludo = "Hello " + name +", how are yoy?";
        
        if ( name === "Cristian") {
            error = new Error ("He is not a real person")
        }

        callback(saludo, error);
    }, 5000);
}

function getInfoWithPromise (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const saludo = "Hello" + name +", how are you?";
            if ( name === "Cristian") {
                reject( new Error ("He is not a real person") );
            } else {
                resolve(saludo);
            }
        }, 5000);
    });

}

getUsers((users) => {
    for (let i =0; i < users.length; i++) {
        getInfo( users[i].name, (saludo, error) => {
            if  (error !== null) {
                console.log("There is ", error);
            } else {
                console.log(saludo);
            }
        });
    }
})

getUsersWithPromise()
    .then((users) => {
        let newRespromises=[];
        for (let i=0; i< users.length; i++) {
            newRespromises.push(getInfoWithPromise(users[i].name))
        }
        return Promise.all(newRespromises);
    })
    .then((info) =>{
        console.log(info);
    })
    .catch((error) =>{
        console.log(error);
    }); 
    
    async function main(){
        let users = await getUsersWithPromise();
        for (let i=0; i< users.length; i++) {
            try {
                let saludo = await getInfoWithPromise()
                console.log(saludo);        
            }catch (error) {
                console.log(error);
            }
        }
    }

    main();