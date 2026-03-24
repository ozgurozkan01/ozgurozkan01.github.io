// Pull the global navbar (with cache bust to ensure light theme style)
fetch("../html/navbar.html?v=3")
    .then(res => res.text())
    .then(data => { document.getElementById("include-navbar").innerHTML = data; });

// NOTE: Canvas particle system removed entirely for the clean brutalist aesthetic.
// Any previous video hover logic from the old design has also been purged.