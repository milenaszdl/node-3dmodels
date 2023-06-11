const apibutton = document.getElementById("getapi");
const allmodelsbutton = document.getElementById("showmodels");

async function postAPIKey() {
    const username = document.getElementById('username').value;
    const response = await fetch('/router/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "username": `${username}` })
    });
    
    if (response.ok) {
        const data = await response.text();
        document.getElementById('gotapikey').innerText = data;
        console.log(response);
    } else {
        const error = await response.text();
        document.getElementById('gotapikey').innerText = error;
        console.log(response);
    }
}

function getAllModels() {
    const table = document.getElementById("tablemodels");
    fetch('/router/allmodels')
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log("models", data);
            if (data.length == 0) {
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                td.innerText = "No models in database yet";
                tr.appendChild(td);
                table.appendChild(tr);
                return;
            }
            if (table.getElementsByTagName('tr').length < data.length){
                data.forEach((element) => {
                    const tr = document.createElement("tr");
                    const td1 = document.createElement("td");
                    const td2 = document.createElement("td");
                    td1.innerText = "Name: " + element.modelname;
                    td2.innerText = "ID: " + element._id;
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    table.appendChild(tr);
                });
            }
        })
        .catch((err) => {
            console.log("err:", err);
            alert("Something wrong: couldn't get models (");
        });
}

allmodelsbutton.addEventListener("click", (event) => {
    getAllModels();
})

apibutton.addEventListener("click", (event) => {
    event.preventDefault();
    postAPIKey();
})