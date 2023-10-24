let users = [];

async function init(){
    loadUsers();
}
async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}
async function register() {
    registerBtn.disabled = true;
    users.push({
        email: email.value,
        password: password.value,
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
}
function resetForm() {
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}
function loginUser(){
    let useremail = document.getElementById('userEmail');
    let userpassword = document.getElementById('userpassword');
    let user = users.find(u => u.email == useremail.value && u.password == userpassword.value)
    if(user){
        window.location.href='Summary.html'
    }else{
        alert('Bitte registrieren');
    }
}