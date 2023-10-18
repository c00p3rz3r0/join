//Backend Token:   ARDMCLXB91K6PF9WVXDW3EHU23UH2EEP86C5COAE

const STORAGE_TOKEN = 'ARDMCLXB91K6PF9WVXDW3EHU23UH2EEP86C5COAE';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value){
    const payload = {key, value, token:STORAGE_TOKEN};
    debugger;
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)});
}

async function getItem(key){
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    debugger;
    let response = await fetch(url);
    debugger
    allTasks = await response.json();
}
