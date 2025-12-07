
fetch("../html/navbar.html")
    .then(res => res.text())
    .then(data => { document.getElementById("include-navbar").innerHTML = data; });

const terminalBox = document.getElementById('console-output');
const bootSequence = [
    { text: "./mindset.sh", type: 'cmd', delay: 500 },
    { text: "+ Lifelong learner with a passionate mindset", type: 'log', delay: 200 },
    { text: "+ Crazy about building projects", type: 'log', delay: 800 },
    { text: "+ Loves to remain original", type: 'log', delay: 800 },
    { text: "./current_mission.sh", type: 'cmd', delay: 1000 },
    { text: "+ Improving mini local SIEM based on linux.", type: 'log', delay: 800 },
    { text: "+ Creating a corporate company security system lab.", type: 'log', delay: 800 },
    { text: "+ Learning python, linux and sometimes C++", type: 'log', delay: 800 },
    { text: "_", type: 'cursor' }
];

async function runBootSequence() {
    terminalBox.innerHTML = '<div class="scanline"></div>';

    for (const line of bootSequence) {
        const oldCursor = document.getElementById('active-cursor');
        if (oldCursor) oldCursor.remove();

        await new Promise(r => setTimeout(r, line.delay));

        const div = document.createElement('div');
        div.className = 'log-line';

        if (line.type === 'cmd') {
            div.innerHTML = `<span class="txt-green">➜</span> <span class="txt-cyan">~</span> <span class="txt-cmd"></span>`;
            terminalBox.appendChild(div);
            await typeEffect(div.querySelector('.txt-cmd'), line.text);
        } else if (line.type === 'cursor') {
            div.id = 'active-cursor';
            div.innerHTML = `<span class="txt-green">➜</span> <span class="txt-cyan">~</span> <span class="blink-cursor">_</span>`;
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

runBootSequence();

const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

let particles = [];
let symbols = [];
const symbolList = ['0', '1', 'root', '🛡️', '🔒', '$_', '</>', 'TCP', 'UDP', '🐧'];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5; this.size = 2;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.fillStyle = '#00f2ff'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

class SymbolParticle {
    constructor() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3;
        this.text = symbolList[Math.floor(Math.random() * symbolList.length)];
        this.size = Math.floor(Math.random() * 15) + 10;
        this.opacity = (Math.random() * 0.2) + 0.05;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.font = `${this.size}px 'JetBrains Mono'`;
        ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

function initParticles() {
    particles = []; symbols = [];
    for (let i = 0; i < 60; i++) particles.push(new Particle());
    for (let i = 0; i < 20; i++) symbols.push(new SymbolParticle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let s of symbols) { s.update(); s.draw(); }
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(); particles[i].draw();
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.strokeStyle = `rgba(0, 242, 255, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles(); animateParticles();
window.addEventListener('resize', () => { initParticles(); });
