


let allContacts = [];

let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let globalIndexVariable;  // Variable, um global auf den aktuellen Index zugreigen zu können. ie wird in der Funktion "loadDetail()" aktualisiert


// Close addContactsOverlay and show contact-window
function closeAddContactOverlay() {
    let contactDiv = document.getElementById('overlay-add-contact');
    let headerTemplate = document.getElementById('header-figma');
    let sidebarTemplate = document.getElementById('sidebar');
    let generalContacts = document.getElementById('generalcontacts');
    /*let allContactDiv = document.getElementById('allContact');*/
    contactDiv.classList.add('display-none');
    headerTemplate.classList.remove('d-none');
    sidebarTemplate.classList.remove('d-none');
    generalContacts.classList.remove('d-none');
    /*allContactDiv.classList.add('d-none');*/
}

async function initContact() {
    //testWindowWidth();
    actUser();
    await loadAllContacts();
    loadgeneralContacts();
    if (window.innerWidth > 700) {  // prüft, ob die Funktion "LoadDetail" ausgeführt werden muss (sie muss nur ausgeführt werden, wenn die Dektop-Ansicht vorliegt)
        loadDetail(0);
    }
    testWindowWidth();
   
}

/* function testWindowWidth() {
    if (window.innerWidth < 700) {
        displayNone('show-contact', 'add');
        console.log('ejksdghilsaerugdsrilthgtrhj');
        //displayNone('show-contact', 'remove');
        //document.getElementById('show-contact').classList.add('display-flex');
    } 
} */


function initAddContact() {
    let contactDiv = document.getElementById('overlay-add-contact');
    let headerTemplate = document.getElementById('header-figma');
    let sidebarTemplate = document.getElementById('sidebar');
    let generalContacts = document.getElementById('generalcontacts');
    /*let allContactDiv = document.getElementById('allContact');*/
    contactDiv.classList.remove('display-none');
    /*headerTemplate.classList.add('d-none');
    sidebarTemplate.classList.add('d-none');
    generalContacts.classList.add('d-none');*/
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
    contactsDiv.innerHTML = ``;
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
    allContacts.sort((a, b) => {
        const nameA = a.firstname.toUpperCase();
        const nameB = b.firstname.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    for (let index = 0; index < allContacts.length; index++) {
        const element = allContacts[index];
        const name = element['firstname'];
        const mail = element['mail'];
        let nameIcon = getShortIcon(index);

        const firstLetter = name.charAt(0).toUpperCase(); // Get the first letter of the name

        // Find the index of the corresponding letter in the 'letters' array
        let letterIndex = alphabet.indexOf(firstLetter);
        console.log(letterIndex);

        // Append the name to the corresponding 'namedivs' element
        document.getElementById(`namedivs${letterIndex}`).innerHTML += /*html*/`
            <div onclick="loadDetail(${index}), displayFlex('show-contact', 'add'), displayNoneEditContactImg(), highlight(${index})" id="contact-name${index}" class="contact-name">
                <div class="contact-name-circle" id="nameIcon${index}">
                    <img class="contact-circle" src="assed/svg/contact-imgs/Ellipse 5.svg" alt="" />
                    <div class="contact-name-circle-txt" id="nameIcons${index}" >${nameIcon}</div>
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

function loadDetail(index) {
    if (window.innerWidth < 700) {
        displayNone('contacts', 'add');
        //displayNone('show-contact', 'remove');
        displayNone('edit-contact-img-mobile-div', 'remove');
        /*document.getElementById('show-contact').classList.add('display-flex');*/
    }
    displayNone('add-contact-img-mobile-div', 'add'); // remove the add contact btn
    //document.getElementById('show-contact').classList.add('display-flex');
    
    console.log(index);
    element = allContacts[index];
    document.getElementById('nameContact').innerHTML = `${element['firstname']}`;
    document.getElementById('emailContact').innerHTML = element['mail'];
    document.getElementById('phoneNumer').innerHTML = element['phone'];
    document.getElementById('iconDetail').innerHTML = getShortIcon(index);
    document.getElementById('contactNumber').innerHTML = index;
    globalIndexVariable = index;
    /*let deleteDiv = document.getElementById('edit-name-sub');
    let deleteVariable = index;
    deleteDiv.textContent = deleteVariable;*/
}

function getShortIcon(index) {
    element = allContacts[index];
    let firstName = element['firstname'];



    let seperatedStrings = firstName.split(" ");  // das Leerzeichen zwischen den Anführungszeichen sorgt dasfür, dass die Wörter an der Stelle, an der sich das Leerzeichen befindet, getrennt werden. Entfernt man das Leerzeichen zwischen den Anführungszeichen, wird jeder Buchstabe einzeln separiert!
    console.log(seperatedStrings);
    console.log(seperatedStrings[0]);
    console.log(seperatedStrings[1]);

    const firstNameFirstLetter = seperatedStrings[0].charAt(0).toUpperCase();

    let lastNameFirstLetter;

    if (seperatedStrings[1]) {  // das if-Statement prüft, ob an "seperatedStrings[1]" (also beim Nachnamen) überhaupt etwas vorhanden ist, da wenn dort nichts vorhanden ist, es zu einem Fehler käme
        lastNameFirstLetter = seperatedStrings[1].charAt(0).toUpperCase();
        console.log(lastNameFirstLetter);
        let nameLetters = firstNameFirstLetter + lastNameFirstLetter;
        console.log(nameLetters);
        let nameIcon = `${nameLetters}`;
    return nameIcon;
    } else {
        console.log(firstNameFirstLetter);
        let nameIcon = `${firstNameFirstLetter}`;
        return nameIcon;
    }



    //let lastname = element['lastname'];
    /*let nameIcon = `${firstName.at(0)}`;
    return nameIcon;*/
}

/*${lastname.at(0)}*/

async function removeContact() {
    let IDnumber = document.getElementById('contactNumber').innerHTML;
    console.log(IDnumber);
    allContacts.splice(IDnumber, 1);
    await setItem('contact', JSON.stringify(allContacts));
    initContact();
}