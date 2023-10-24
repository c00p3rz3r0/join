

let allContacts = [];

function addContact() {
    let contactName = document.getElementById('nameInputField');
    let contactMail = document.getElementById('mailInputField');
    let contactPhone = document.getElementById('phoneInputField');

    let contact = {
        'name': contactName.value,
        'mail': contactMail.value,
        'phone': contactPhone.value,
        'contactCreatedAt': new Date().getTime()  // brauchen wir das bei den Kontakten?
    }

    allContacts.push(contact);

    let allContactsAsString = JSON.stringify(allContacts);
    localStorage.setItem('allContacts', allContactsAsString);

    deleteInputFields(contactName, contactMail, contactPhone);
}


function deleteInputFields(contactName, contactMail, contactPhone) {
    contactName.value = ``;
    contactMail.value = ``;
    contactPhone.value = ``;
}


// Load all Contacts
function loadAllContacts() {
    let allContactsAsString = localStorage.getItem('allContacts');
    allContacts = JSON.parse(allContactsAsString);
}
