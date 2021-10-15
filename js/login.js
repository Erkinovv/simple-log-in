const elForm = document.querySelector('#login-form');
const elInputEmail = elForm.querySelector('.input-email');
const elInputPassword = elForm.querySelector('.input-password');


elForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const elEmailValue = elInputEmail.value.trim();
    const elPasswordValue = elInputPassword.value.trim();
    
    async function fetchLogin(){
        const response = await fetch('https://reqres.in/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: elEmailValue,
                password: elPasswordValue
            })
        });
        const data = await response.json();
        if(data){
            window.localStorage.setItem('__auth_token__', JSON.stringify(data))
            window.location.replace('index.html')
        }
    }
    
    fetchLogin()
})