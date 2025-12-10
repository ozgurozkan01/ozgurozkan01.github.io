fetch("../html/navbar.html")
    .then(res => res.text())
    .then(data => { document.getElementById("include-navbar").innerHTML = data; });

const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

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
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.node');
    const panel = document.getElementById('nodeDetailPanel');
    const pSubtitle = document.getElementById('ndSubtitle');
    const pTitle = document.getElementById('ndTitle');
    const pIcon = document.getElementById('ndIcon');
    const pDesc = document.getElementById('ndDesc');
    const pFeatures = document.getElementById('ndFeatures');
    const pTags = document.getElementById('ndTags');

    const nodeDetails = {
        opnsense: {
            type: "Perimeter Security",
            title: "OPNsense Firewall",
            icon: "fas fa-shield-alt",
            desc: "",
            features: [],
            tags: [],
            color: "#f39c12"
        },
        win10: {
            type: "Endpoint",
            title: "Windows 10 Client",
            icon: "fas fa-desktop",
            desc: "",
            features: [],
            tags: ["Wazuh Agent", "Sysmon"],
            color: "#2980b9"
        },
        ubuntu: {
            type: "Endpoint",
            title: "Ubuntu Client",
            icon: "fab fa-linux",
            desc: "",
            features: [],
            tags: ["Wazuh Agent", "Auditd"],
            color: "#f1c40f"
        },
        wazuh: {
            type: "SIEM",
            title: "Wazuh Manager",
            icon: "fas fa-eye",
            desc: "The brain of the security lab. It aggregates logs, correlates events, and generates alerts based on custom detection rules.",
            features: ["Wrote custom rules to improve security", "Advanced log analyzer with Auditd, Sysmon, AD GPO"],
            tags: [],
            color: "#3498db"
        },
        ad: {
            type: "Domain Controller",
            title: "Active Directory",
            icon: "fab fa-windows",
            desc: "Windows Server 2022 acting as the Domain Controller. It manages authentication, authorization, and network policy enforcement.",
            features: ["Designed better hierarchical OU skeleton", "Created OUs: HR, IT", "Improved Login/logoff Policy", "Created GPO for Advanced Log System"],
            tags: ["Kerberos", "LDAP", "GPO", "DNS/DHCP"],
            color: "#27ae60"
        }
    };

    nodes.forEach(node => {
        node.addEventListener('mouseenter', (e) => {
            const id = node.getAttribute('data-id');
            if (nodeDetails[id]) {
                const data = nodeDetails[id];

                pSubtitle.textContent = data.type;
                pTitle.textContent = data.title;
                pIcon.className = `${data.icon} nd-icon`;
                pIcon.style.color = data.color || '#cbd5e0';
                pDesc.textContent = data.desc;

                panel.style.borderLeftColor = data.color || '#4a5568';
                const fsTitle = document.querySelector('.nd-fs-title');
                if (fsTitle) fsTitle.style.color = data.color || '#a0aec0';

                pFeatures.innerHTML = '';
                if (data.features && data.features.length > 0) {
                    data.features.forEach(feat => {
                        const li = document.createElement('li');
                        li.textContent = feat;
                        pFeatures.appendChild(li);
                    });
                    const styleSheet = document.createElement("style");
                    styleSheet.innerText = `#ndFeatures li::before { color: ${data.color || '#4a5568'}; }`;
                    pFeatures.appendChild(styleSheet);
                }

                pTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'nd-tag';
                    span.textContent = tag;
                    span.style.borderColor = data.color ? data.color + '40' : '#2d3748';
                    pTags.appendChild(span);
                });

                const rect = node.getBoundingClientRect();
                const panelWidth = 600;
                const gap = 30;
                const screenPadding = 100;

                let leftPos = rect.right + gap;

                if (leftPos + panelWidth > window.innerWidth - screenPadding) {
                    leftPos = rect.left - gap - panelWidth;
                }

                if (leftPos < screenPadding) {
                    leftPos = screenPadding;
                } else if (leftPos + panelWidth > window.innerWidth - screenPadding) {
                    leftPos = window.innerWidth - panelWidth - screenPadding;
                }

                let topPos = rect.top - 20;
                const estimatedHeight = 450;

                if (topPos + estimatedHeight > window.innerHeight - screenPadding) {
                    topPos = window.innerHeight - estimatedHeight - screenPadding;
                }
                if (topPos < screenPadding) {
                    topPos = screenPadding;
                }

                panel.style.left = `${leftPos}px`;
                panel.style.top = `${topPos}px`;
                panel.classList.add('active');

            }
        });

        node.addEventListener('mouseleave', () => {
            panel.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        panel.classList.remove('active');
    });

    const sliders = document.querySelectorAll('.slider-wrapper');

    sliders.forEach(slider => {
        const track = slider.querySelector('.slider-track');
        const images = track.querySelectorAll('img');
        const nextBtn = slider.querySelector('.next-btn');
        const prevBtn = slider.querySelector('.prev-btn');

        if (!track || images.length === 0) return;

        let currentIndex = 0;
        const totalImages = images.length;

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault(); 
                if (currentIndex < totalImages - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = totalImages - 1;
                }
                updateSlider();
            });
        }
    });
});