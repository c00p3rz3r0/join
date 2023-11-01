let allPages =['summary-content', 'contact-content', 'task-content', 'board-content','datenschutz-content'];

//On Load function to load HTML Templates
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};


function loadNextSite(name) {
  for (let i = 0; i < allPages.length; i++) {
    const element = allPages[i];
    if(element == name){
      document.getElementById(name).classList.remove('d-none');
    }else{
      document.getElementById(element).classList.add('d-none');
    }
  }
}

function actUser(){
  let name = localStorage.getItem('user');
  document.getElementById('actUser').innerHTML = name.charAt(0).toUpperCase();
}

function init(){
  initSummary();
  initusers();
  initBoard();
  initContact();
  initTask();
}