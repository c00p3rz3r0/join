let currentName;
let currentEmail;
let currentPhone;



function initEditContact(globalIndexVariable) {
    console.log(globalIndexVariable);

    initAddContact();  // open AddContact-Overlay 

    adjustAddContactOverlayForEditContacts();
    getCurrentNameMailPhone();
    insertNameMailPhoneIntoInputfields();
}

function displayNone(param1, param2) {
    document.getElementById(param1).classList[param2]('d-none');
}

function adjustAddContactOverlayForEditContacts() {
    displayNone('cancel-create-contact', 'add');
    displayNone('edit-contact', 'remove');
    displayNone('contact-sidebar-txt-add', 'add');
    displayNone('contact-sidebar-txt-edit', 'remove')
}

function showCreateContactBtns() {
    displayNone('cancel-create-contact', 'remove')
    displayNone('edit-contact', 'add');
    displayNone('contact-sidebar-txt-add', 'remove');
    displayNone('contact-sidebar-txt-edit', 'add');
}

function emptyInputfields() {
    document.getElementById('nameInputField').value = ``;
    document.getElementById('mailInputField').value = ``;
    document.getElementById('phoneInputField').value = ``;
}

function getCurrentNameMailPhone() {
    const currentContact = allContacts[globalIndexVariable];

    currentName = currentContact['firstname'];
    currentEmail = currentContact['mail'];
    currentPhone = currentContact['phone'];
}

function insertNameMailPhoneIntoInputfields() {
    document.getElementById('nameInputField').value = currentName;
    document.getElementById('mailInputField').value = currentEmail;
    document.getElementById('phoneInputField').value = currentPhone;
}
