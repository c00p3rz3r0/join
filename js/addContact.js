let allContacts = [];

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


// Close addContactsOverlay and show contact-window
function closeAddContactOverlay() {
    let contactDiv = document.getElementById('overlay-add-contact');
    let headerTemplate = document.getElementById('header-figma');
    let sidebarTemplate = document.getElementById('sidebar');
    let generalContacts = document.getElementById('generalcontacts');
    /*let allContactDiv = document.getElementById('allContact');*/
    contactDiv.classList.add('d-none');
    headerTemplate.classList.remove('d-none');
    sidebarTemplate.classList.remove('d-none');
    generalContacts.classList.remove('d-none');
    /*allContactDiv.classList.add('d-none');*/
}

async function initContact() {
    await loadAllContacts();
    loadgeneralContacts();
    loadDetail(0);
}

function initAddContact() {
    let contactDiv = document.getElementById('overlay-add-contact');
    let headerTemplate = document.getElementById('header-figma');
    let sidebarTemplate = document.getElementById('sidebar');
    let generalContacts = document.getElementById('generalcontacts');
    /*let allContactDiv = document.getElementById('allContact');*/
    contactDiv.classList.remove('d-none');
    headerTemplate.classList.add('d-none');
    sidebarTemplate.classList.add('d-none');
    generalContacts.classList.add('d-none');
    /*allContactDiv.classList.add('d-none');*/
}

async function addContact() {
    let firstName = document.getElementById('nameInputField');
    /*let lastName = document.getElementById('lastnameInputField');*/
    let email = document.getElementById('mailInputField');
    let phone = document.getElementById('phoneInputField');
    allContacts.push({
        firstname: firstName.value,
        /*lastname: lastName.value,*/
        mail: email.value,
        phone: phone.value,
    })
    await setItem('contact', JSON.stringify(allContacts));
    /*cancleNewContact();*/
    initContact();
    deleteInputFields(firstName, email, phone);
    console.log(allContacts);
}


function deleteInputFields(firstName, email, phone) {
    firstName.value = ``;
    email.value = ``;
    phone.value = ``;
}


// Load all Contacts
async function loadAllContacts() {
    try {
        allContacts = JSON.parse(await getItem('contact'));
    } catch (e) {
        console.error('Loading error: ', e);
    }

}

function cancleNewContact() {
    let contactDiv = document.getElementById('newContact');
    let allContactDiv = document.getElementById('allContact');
    document.getElementById('firstnameInputField').value = '';
    document.getElementById('lastnameInputField').value = '';
    document.getElementById('mailInputField').value = '';
    document.getElementById('phoneInputField').value = '';
    contactDiv.classList.add('d-none');
    allContactDiv.classList.remove('d-none');
}

function loadgeneralContacts() {
    getFirstLetters();
    createLetterDivs();
    loadNames();
    //displayLetters();
}

function getFirstLetters() {
    for (let i = 0; i < allContacts.length; i++) {
        const firstLetter = allContacts[i].firstname.charAt(0).toUpperCase();
        alphabet.push(firstLetter);
    }
    // Remove duplicates from the 'alphabet' array
    alphabet = Array.from(new Set(alphabet));
    // Sort the 'alphabet' array
    alphabet.sort();
}

function createLetterDivs() {
    let contactsDiv = document.getElementById('contacts');
    //contactsDiv.innerHTML = ``;
    for (let letterIndex = 0; letterIndex < alphabet.length; letterIndex++) {
        const letter = alphabet[letterIndex];

        document.getElementById('contacts').innerHTML += /*html*/`
            <div id="div${letterIndex}" class="d-none">
            <div class="contact-letter-frame-119"> ${letter} </div>
            <img src="assed/svg/contact-imgs/Vector 10.svg" alt="" class="vector-10">

                <div id="namedivs${letterIndex}"></div>


                
            </div>
        `;
    }
}

function loadNames() {
    for (let index = 0; index < allContacts.length; index++) {
        const element = allContacts[index];
        const name = element['firstname'];
        const mail = element['mail'];
        let nameIcon = getShortIcon(index);

        const firstLetter = name.charAt(0).toUpperCase(); // Get the first letter of the name

        // Find the index of the corresponding letter in the 'letters' array
        const letterIndex = alphabet.indexOf(firstLetter);
        console.log(letterIndex);

        // Append the name to the corresponding 'namedivs' element
        document.getElementById(`namedivs${letterIndex}`).innerHTML += /*html*/`
            <div onClick="loadDetail(${letterIndex})" class="contact-name">
                <div class="contact-name-circle" id="nameIcon${letterIndex}">
                    <img class="contact-circle" src="assed/svg/contact-imgs/Ellipse 5.svg" alt="" />
                    <div class="contact-name-circle-txt" id="nameIcons${letterIndex}" >${nameIcon}</div>
                </div>
                <div class="name-mail-div-frame81">
                    <div class="contact-name-txt">${name}</div>
                    <div class="contact-email">${mail}</div>
                </div>
            </div>
        `;
        document.getElementById(`div${letterIndex}`).classList.remove('d-none');
    }
}

function displayLetters() {
    for (let letterIndex = 0; letterIndex < alphabet.length; letterIndex++) {
        const letter = alphabet[letterIndex];
        // Show the corresponding letter div
        document.getElementById(`div${letterIndex}`).classList.remove('d-none');
    }
}






/*
function aA() { }    //sortFirstnames();
console.log('generalConatacts loaded');
let contactsDiv = document.getElementById('contacts');
contactsDiv.innerHTML = ``;
for (let index = 0; index < allContacts.length; index++) {
    const element = allContacts[index];
    let firstName = element['firstname'];
    //let lastname = element['lastname'];
    let email = element['mail'];
    let nameIcon = getShortIcon(index);
    contactsDiv.innerHTML += `
        <div onClick="loadDetail(${index})" class="contact-name">
        <div class="contact-name-circle" id="nameIcon${index}">
            <img class="contact-circle" src="assed/svg/contact-imgs/Ellipse 5.svg" alt="" />
            <div class="contact-name-circle-txt" id="nameIcons${index}" >${nameIcon}</div>
        </div>
        <div class="name-mail-div-frame81">
             <div class="contact-name-txt">${firstName}</div>
             <div class="contact-email">${email}</div>
        </div>
        </div>
        `;
}*/



function sortFirstnames() {
    allContacts.sort((a, b) => {
        const nameA = a.firstname.toUpperCase(); // den Namen in Großbuchstaben umwandeln
        const nameB = b.firstname.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

function loadDetail(index) {
    element = allContacts[index];
    document.getElementById('nameContact').innerHTML = `${element['firstname']}`;
    document.getElementById('emailContact').innerHTML = element['mail'];
    document.getElementById('phoneNumer').innerHTML = element['phone'];
    document.getElementById('iconDetail').innerHTML = getShortIcon(index);
    document.getElementById('contactNumber').innerHTML = index;
}

function getShortIcon(index) {
    element = allContacts[index];
    let firstName = element['firstname'];
    //et lastname = element['lastname'];
    let nameIcon = `${firstName.at(0)}`;
    return nameIcon;
}

/*${lastname.at(0)}*/

async function removeContact() {
    let IDnumber = document.getElementById('contactNumber').innerHTML;
    allContacts.splice(IDnumber, 1);
    await setItem('contact', JSON.stringify(allContacts));
    initContact();
}