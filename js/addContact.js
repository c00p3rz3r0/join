let allContacts = [];

async function initContact(){
    await loadAllContacts();
    loadgeneralContacts();
    loadDetail(0);
}

function initAddContact(){
    let contactDiv = document.getElementById('newContact');
    let allContactDiv = document.getElementById('allContact');
    contactDiv.classList.remove('d-none');
    allContactDiv.classList.add('d-none');
}

async function addContact() {
    let firstName = document.getElementById('firstnameInputField');
    let lastName = document.getElementById('lastnameInputField');
    let email = document.getElementById('mailInputField');
    let phone = document.getElementById('phoneInputField');

    allContacts.push({
        firstname: firstName.value,
        lastname: lastName.value,
        mail: email.value,
        phone: phone.value,
    })
    await setItem('contact', JSON.stringify(allContacts));
    cancleNewContact();
    initContact();
}


function deleteInputFields(contactName, contactMail, contactPhone) {
    contactName.value = ``;
    contactMail.value = ``;
    contactPhone.value = ``;
}


// Load all Contacts
async function loadAllContacts() {
    try{
        allContacts = JSON.parse(await getItem('contact'));
    } catch(e){
        console.error('Loading error: ', e);
    }
    
}
 function cancleNewContact(){
    let contactDiv = document.getElementById('newContact');
    let allContactDiv = document.getElementById('allContact');
    document.getElementById('firstnameInputField').value='';
    document.getElementById('lastnameInputField').value='';
    document.getElementById('mailInputField').value='';
    document.getElementById('phoneInputField').value='';
    contactDiv.classList.add('d-none');
    allContactDiv.classList.remove('d-none');
 }
 function loadgeneralContacts(){
    let contactsDiv = document.getElementById('contacts');
    contactsDiv.innerHTML = '';
    for (let index = 0; index < allContacts.length; index++) {
        const element = allContacts[index];
            let firstName = element['firstname'];
            let lastname = element['lastname'];
            let email = element['mail'];
            let nameIcon = getShortIcon(index);
        contactsDiv.innerHTML += `
        <div onClick="loadDetail(${index})" class="contact-name">
        <div class="contact-name-circle" id="nameIcon${index}">
            <img src="assed/svg/contact-imgs/Ellipse 5.svg" alt="" />
            <div class="contact-name-circle-txt" id="nameIcons${index}" >${nameIcon}</div>
        </div>
        <div class="name-mail-div-frame81">
             <div class="contact-name-txt">${firstName} ${lastname}</div>
             <div class="contact-email">${email}</div>
        </div>
        </div>
        `;
    }
 }

 function loadDetail(index){
    element = allContacts[index];
    document.getElementById('nameContact').innerHTML = `${element['firstname']} ${element['lastname']}`;
    document.getElementById('emailContact').innerHTML = element['mail'];
    document.getElementById('phoneNumer').innerHTML = element['phone'];
    document.getElementById('iconDetail').innerHTML = getShortIcon(index);
 }

 function getShortIcon(index){
    element = allContacts[index];
    let firstName = element['firstname'];
    let lastname = element['lastname'];
    let nameIcon = `${firstName.at(0)}${lastname.at(0)}`;
    return nameIcon;
 }