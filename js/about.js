// Pull the global navbar (with cache bust to ensure light theme style)
fetch("../html/navbar.html?v=3")
    .then(res => res.text())
    .then(data => { document.getElementById("include-navbar").innerHTML = data; });

// Brutalist Terminal Logic
const terminalBox = document.getElementById('console-output');
const bootSequence = [
    { text: "./mindset.sh", type: 'cmd', delay: 500 },
    { text: ">> Lifelong learner with a passionate mindset", type: 'log', delay: 200 },
    { text: ">> Crazy about building projects", type: 'log', delay: 800 },
    { text: ">> Loves to remain original", type: 'log', delay: 800 },
    { text: "./current_mission.sh", type: 'cmd', delay: 1200 },
    { text: ">> Creating a corporate company security system lab.", type: 'log', delay: 800 },
    { text: ">> Learning C++, Python", type: 'log', delay: 800 },
    { text: "_", type: 'cursor' }
];

async function runBootSequence() {
    terminalBox.innerHTML = ''; // Start clean

    for (const line of bootSequence) {
        const oldCursor = document.getElementById('active-cursor');
        if (oldCursor) oldCursor.remove();

        await new Promise(r => setTimeout(r, line.delay));

        const div = document.createElement('div');
        div.className = 'log-line';

        if (line.type === 'cmd') {
            // New Brutalist coloring for the prompt
            div.innerHTML = `<span class="txt-green">root@ozgur</span><span class="txt-orange">:</span><span class="txt-green">~</span><span class="txt-orange">#</span> <span class="txt-cmd"></span>`;
            terminalBox.appendChild(div);
            await typeEffect(div.querySelector('.txt-cmd'), line.text);
        } else if (line.type === 'cursor') {
            div.id = 'active-cursor';
            div.innerHTML = `<span class="txt-green">root@ozgur</span><span class="txt-orange">:</span><span class="txt-green">~</span><span class="txt-orange">#</span> <span class="blink-cursor">_</span>`;
            terminalBox.appendChild(div);
        } else {
            div.innerHTML = line.text;
            div.classList.add('txt-dim');
            terminalBox.appendChild(div);
        }
        terminalBox.scrollTop = terminalBox.scrollHeight;
    }
}

function typeEffect(element, text) {
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            element.textContent += text.charAt(i); i++;
            terminalBox.scrollTop = terminalBox.scrollHeight;
            if (i === text.length) { clearInterval(interval); resolve(); }
        }, 30 + Math.random() * 40);
    });
}

// Start terminal sequence
runBootSequence();

// NOTE: Canvas particle system removed entirely for the clean brutalist aesthetic.
