const getPersonas = () => {
    fetch("https://reqres.in/api/users?page=2").then((response) => {
        response.json().then((response) => {
            console.log(response);
            const{data} = response
            console.log(data.length);
            
            for (let index = 0; index < data.length; index++) {
                const { id, avatar,email, first_name, last_name } = data[index]
                document.getElementById("tablita").innerHTML += `<tr>
                <td><img src="${avatar}"></td>
                <td>${email}</td>
                <td>${first_name}</td>
                <td>${last_name}</td>
                <td><button class="btn btn-warning" onclick="abrirModalModificar(${id},'${first_name}','${last_name}')">Editar</button>
                <button class="btn btn-danger" onclick="eliminarPersona(${id})">Eliminar</button></td>
            </tr>`
                
            }
            
            
        });
    }).catch((err) => {
        console.log("Ha ocurrido un error: " + err);
    });
}
getPersonas()

async function crear(name, job) {
    const url = 'https://reqres.in/api/users';
    const datos = {
        name: name,
        job: job
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const respuestaJson = await response.json();
        
        console.log('Respuesta:', respuestaJson);
        alert("Registro exitoso")
        
    } catch (error) {
        console.log('Ocurrió un error:', error);
        alert("Registro NO exitoso")
    }
}

function abrirModalModificar(id, name, job) {
    $('#exampleModal').modal('show')
    document.getElementById("idModificar").value = id;
    document.getElementById("nameModificar").value = name;
    document.getElementById("jobModificar").value = job;
}


async function modificarDatosPersona() {
    
    const id = document.getElementById("idModificar").value
    const name = document.getElementById("nameModificar").value;
    const job = document.getElementById("jobModificar").value;
    const urlM = `https://reqres.in/api/users/${id}`
    const modificarP = {"name": name,"job": job}

    try {
        const response = await fetch(urlM, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modificarP)
        });

        const respuestaJsonM = await response.json();
        
        console.log('Respuesta:', respuestaJsonM);
        alert("Actualización exitosa")
        $('#exampleModal').modal('hide')
        
    } catch (error) {
        console.log('Ocurrió un error:', error);
        alert("Actualización NO exitosa")
        $('#exampleModal').modal('hide')
    }
}

function eliminarPersona(id){
    fetch(`https://reqres.in/api/users/${id}`,{method:"DELETE"})
   .then(response => console.log(response.status))
   alert("Eliminado correctamente")
}


