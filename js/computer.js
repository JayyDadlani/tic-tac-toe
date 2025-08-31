// Get the URL query string
const url_params = new URLSearchParams(window.location.search);

// Retrieve the level parameter
const level = url_params.get('level');

if(level === "easy") {
    document.getElementById('script-for-level').src = "../js/easy.js";
} else if(level === "medium") {
    document.getElementById('script-for-level').src = "../js/medium.js";
} else if(level === "hard") {
    document.getElementById('script-for-level').src = "../js/hard.js";
}

setTimeout(function(){
    document.getElementById('main-script').src = "../js/main.js";
}, 250);