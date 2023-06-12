const apibutton = document.getElementById("getapi");
const allmodelsbutton = document.getElementById("showmodels");
const refreshmodels = document.getElementById("refresh");
const table = document.getElementById("tablemodels");
let apikey;

async function postAPIKey() {
    const username = document.getElementById('username').value;
    if (username.length!=0){
        const response = await fetch('/router/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": `${username}` })
        });
        
        if (response.ok) {
            const userapikey = await response.json();
            document.getElementById('gotapikey').innerText = `This user has next apikey: ${userapikey}`;
            console.log(response);
            apikey = userapikey;
        } else {
            const error = await response.text();
            document.getElementById('gotapikey').innerText = error;
            console.log(response);
        }
    } else {
        document.getElementById('gotapikey').innerText = "Please enter name";
    }
}

function getAllModels() {
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
            if (table.getElementsByTagName('tr').length != data.length){
                //очищаем таблицу перед заполнением новыми данными
                var rows = table.getElementsByTagName("tr");
                // Удаляем каждую строку таблицы
                while (rows.length > 0) {
                    table.deleteRow(0);
                }

                data.forEach((element) => {
                    const tr = document.createElement("tr");
                    const td1 = document.createElement("td");
                    const td2 = document.createElement("td");
                    const td3 = document.createElement("td");
                    //инфа о модели
                    td1.innerText = "Name: " + element.modelname;
                    td2.innerText = "ID: " + element._id;
                    //кнопки
                    const showbutton = document.createElement("button");
                    showbutton.innerText = "Show";
                    showbutton.dataset.id = element._id;
                    showbutton.classList.add("showbutt");
                    const delbutton = document.createElement("button");
                    delbutton.innerHTML = "Delete";
                    delbutton.dataset.id = element._id;
                    delbutton.classList.add("delbutt");
                    td3.appendChild(showbutton);
                    td3.appendChild(delbutton);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    table.appendChild(tr);
                });
            }
        })
        .catch((err) => {
            console.log("err:", err);
            alert("Something wrong: couldn't get model's info (");
        });
}

function OneModelInfo(id){
    const modelheader = document.getElementById("onemodel");
    modelheader.innerText = "Information about model";

    const modeltext = document.getElementById("modelinfo");

    modelheader.style.display = "flex";
    modeltext.style.display = "flex";

    //отправляем запрос и вставляем текст о модели
    fetch(`/router/model/${id}`)
        .then((response)=>{
            console.log(response);
            return response.json();
        })
        .then((data)=>{
            if (!data){
                modeltext.innerText = "There is no information about this model";
                return;
            }
            if(data){
                //кнопка чтоб спрятать содерживое раздела
                const divbutt = document.getElementById("forhidebutton");
                let hidebutton = document.createElement("button");
                hidebutton.innerText = "Hide";
                divbutt.appendChild(hidebutton);
                hidebutton.addEventListener("click", (event) => {
                    hidebutton.style.display = "none";
                    modeltext.style.display = "none";
                    modelheader.style.display = "none";
                })
                //текст о модели
                modeltext.innerText = "ID : " + data._id + "\n" + 
                                    "Username : " + data.username + "\n" + 
                                    "Model's name : " + data.modelname + "\n" +
                                    "Type of model : " + data.modeltype + "\n" +
                                    "Description : " + data.description + "\n" +
                                    "Comments : " + data.comments + "\n" + 
                                    "Creation date : " + data.creationdate + "\n" +
                                    "Last change : " + data.lastchange;
            }
        })
        .catch((err) => {
            console.log("err:", err);
            alert("Something wrong: couldn't get models (");
        });
}

async function DeleteModel(id, apikey){
    if (apikey){
        if (confirm("Are you sure you want to delete the model?")){
            console.log("ready for del");
            try {
                const response = await fetch(`/router/delmodel/${id}?APIkey=${apikey}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    const deltext = await response.text();
                    alert(deltext);
                    getAllModels();
                }
            } catch (err) {
                console.error(err);
                alert("Could not delete the model");
        }
    }}else {
        alert("Please authorise first");
    }
}

allmodelsbutton.addEventListener("click", (event) => {
    getAllModels();
})

refreshmodels.addEventListener("click", (event) => {
    getAllModels();
})

apibutton.addEventListener("click", (event) => {
    event.preventDefault();
    postAPIKey();
})


table.addEventListener("click", (event) => {
    const showmodel = event.target.closest(".showbutt");
    if (showmodel){
        OneModelInfo(showmodel.dataset.id);
    }
    const delmodel = event.target.closest(".delbutt");
    if (delmodel){
        DeleteModel(delmodel.dataset.id, apikey);
    }
});