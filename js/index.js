// Navigation Bar Logic
fetch("html/navbar.html?v=3")
    .then(res => res.text())
    .then(data => { document.getElementById("include-navbar").innerHTML = data; });

// Particles canvas is entirely removed in this brutalist design iteration.
// This empty JS ensures it doesn't try to draw on a non-existent canvas.

// We can add simple brutalist JS interactions here, such as text scramblers 
// or custom cursors if desired. For now, we will lean entirely into pure CSS
// for the interactions to keep it blazing fast and authentically minimal.

console.log("Welcome to Ozgur OZKAN's digital workspace.");