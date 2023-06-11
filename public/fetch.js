const apibutton = document.getElementById("getapi");

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

apibutton.addEventListener("click", (event) => {
    event.preventDefault();
    postAPIKey();
})