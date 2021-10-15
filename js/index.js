const logOutBtn = document.querySelector('#logout');
const listPlace = document.querySelector('#list');
const template = document.querySelector('#temp');

const token = JSON.parse(window.localStorage.getItem('__auth_token__'))

if(!token?.token){
    window.location.replace('login.html')
}

logOutBtn.addEventListener('click', () =>{
    window.localStorage.removeItem('__auth_token__');
    location.reload();
})

function getPerson(person) {
    person.forEach(per => {
        const clTemp = template.content.cloneNode(true);
        const userName = clTemp.getElementById('user-name');
        const userEmail = clTemp.getElementById('user-email');
        const userImage = clTemp.getElementById('user-image');

        userName.textContent = per.first_name + per.last_name;
        userEmail.textContent = per.email;
        userImage.setAttribute('src', per.avatar);

        listPlace.appendChild(clTemp);
    })
}


async function fetchLogin() {
    const response = await fetch('https://reqres.in/api/users?page=2');
    const data = await response.json();
    const fullData = data.data;

    getPerson(fullData);
}
fetchLogin();
