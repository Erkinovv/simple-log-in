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

function renderUsers(renderArr, element) {
    element.innerHTML = null;
    window.localStorage.setItem('users', JSON.stringify(renderArr))
    renderArr.forEach(elem => {
        let cloneTemplate = template.content.cloneNode(true);
        
        cloneTemplate.querySelector('#user-image').setAttribute('src', elem.avatar)
        cloneTemplate.querySelector('#user-name').textContent = elem.first_name;
        cloneTemplate.querySelector('#user-email').textContent = elem.email
        cloneTemplate.querySelector('#delete').dataset.uuid = elem.id;
        
        
        
        element.appendChild(cloneTemplate);
    })
}

try {
    fetch('https://reqres.in/api/users?page=2')
    .then(res => res.json())
    .then(data => {
        renderUsers(data.data, listPlace)
    })
} catch (e) {
    console.error(e.message)
}

listPlace.addEventListener('click', (e) => {
    if (e.target.matches('#delete')) {
        let { uuid } = e.target.dataset;
        
        const users = JSON.parse(window.localStorage.getItem('users'));
        const foundUserIndex = users.findIndex((row) => row.id == uuid);
        
        fetch('https://reqres.in/api/users/2' + foundUserIndex, {
        method: "DELETE"
    }).then(res => {
        if (res.status == 204) {
            users.splice(foundUserIndex, 1);
            renderUsers(users, listPlace);
        }
    })
}
})

