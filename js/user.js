let users = [];
let actualUser = [];


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
    let uname = document.getElementById('userName').value;
    let uemail = document.getElementById('userEmail').value;
    let upassword = document.getElementById('userpassword').value;
    let upasswordconfirm = document.getElementById('userpasswordconfirm').value;
    if (upassword == upasswordconfirm){
        users.push({
            name : uname,
            email : uemail,
            password : upassword,
        })
        await setItem('users', JSON.stringify(users));
        resetForm();
    }else{
        alert('Passwörter stimmen nicht überein!')
    }
;

}
function resetForm() {
    window.location.href='summary.html';
}
function loginUser(){
    let useremail = document.getElementById('userEmail');
    let userpassword = document.getElementById('userpassword');
    let user = users.find(u => u.email == useremail.value && u.password == userpassword.value)
    if(user){
        localStorage.setItem('user', useremail.value);
        window.location.href='summary.html'
    }else{
        alert('Bitte registrieren');
    }
}