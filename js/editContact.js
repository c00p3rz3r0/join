let currentName;
let currentEmail;
let currentPhone;



function initEditContact(globalIndexVariable) {
    console.log(globalIndexVariable);

    //initAddContact();  // open AddContact-Overlay 
    displayNone('overlay-add-contact', 'remove');
    displayNone('cancel-create-contact', 'add');
    displayNone('edit-contact', 'remove');

    //adjustAddContactOverlayForEditContacts();
    getCurrentNameMailPhone();
    insertNameMailPhoneIntoInputfields();
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
