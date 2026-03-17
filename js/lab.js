// Navigation Logic
fetch("../html/navbar.html?v=3")
    .then(res => res.text())
    .then(data => { document.getElementById("include-navbar").innerHTML = data; });

// NOTE: The previous network-canvas particle system has been removed for the brutalist design.

document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.node-box');
    const panel = document.getElementById('nodeDetailPanel');
    const pSubtitle = document.getElementById('ndSubtitle');
    const pTitle = document.getElementById('ndTitle');
    const pIcon = document.getElementById('ndIcon');
    const pDesc = document.getElementById('ndDesc');
    const pFeatures = document.getElementById('ndFeatures');
    const pTags = document.getElementById('ndTags');

    const nodeDetails = {
        internet: {
            type: "Perimeter",
            title: "WAN INTERNET",
            icon: "fas fa-globe",
            desc: "The entry point for remote simulation. Acts as the zero-trust boundary for external requests.",
            features: ["Cloudflare Tunneling", "GEO-IP Blocking"],
            tags: ["WAN", "ISP"],
            color: "#111111"
        },
        opnsense: {
            type: "Security Core",
            title: "OPNsense FW",
            icon: "fas fa-shield-alt",
            desc: "A hardened perimeter gateway performing deep packet inspection and traffic isolation.",
            features: ["HAProxy Overlays", "WireGuard Tunnel", "Zenarmor IDS"],
            tags: ["BSD", "PF", "NGFW"],
            color: "#ff4500"
        },
        win10: {
            type: "Endpoint Unit",
            title: "WINDOWS CLIENT",
            icon: "fab fa-windows",
            desc: "Standard corporate workstation instrumented for telemetry gathering.",
            features: ["Wazuh Monitoring", "Sysmon Logging"],
            tags: ["E8", "Instrumented"],
            color: "#2980b9"
        },
        ubuntu: {
            type: "Endpoint Unit",
            title: "UBUNTU LINUX",
            icon: "fab fa-linux",
            desc: "Linux-based host used for internal automation and secure administration.",
            features: ["Auditd Hardening", "SSH-Key Auth Only"],
            tags: ["LTS", "Admin"],
            color: "#333333"
        },
        wazuh: {
            type: "SIEM Controller",
            title: "WAZUH ANALYTICS",
            icon: "fas fa-eye",
            desc: "Centralized threat detection engine managing log correlation and file integrity checks.",
            features: ["FIM Enabled", "Rootkit Detection", "Vulnerability Audit"],
            tags: ["ELK", "XDR"],
            color: "#ff4500"
        },
        ad: {
            type: "Identity Source",
            title: "ACTIVE DIRECTORY",
            icon: "fab fa-windows",
            desc: "Windows Server 2022 instance managing the Lab domain, GPOs, and Kerberos tickets.",
            features: ["LDAP Auth Source", "Hierarchical OU Structure", "GPO Hardening"],
            tags: ["DC", "IAM"],
            color: "#111111"
        }
    };

    nodes.forEach(node => {
        node.addEventListener('mouseenter', (e) => {
            const id = node.getAttribute('data-id');
            const data = nodeDetails[id];
            
            if (data) {
                pSubtitle.textContent = data.type;
                pTitle.textContent = data.title;
                pIcon.className = `${data.icon} nd-icon`;
                pDesc.textContent = data.desc;

                // Populate Features
                pFeatures.innerHTML = '';
                data.features.forEach(feat => {
                    const li = document.createElement('li');
                    li.textContent = feat;
                    pFeatures.appendChild(li);
                });

                // Populate Tags
                pTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'nd-tag';
                    span.textContent = tag;
                    pTags.appendChild(span);
                });

                // Positioning logic (relative to node)
                const rect = node.getBoundingClientRect();
                const panelWidth = 450;
                
                let leftPos = rect.right + 20;
                if (leftPos + panelWidth > window.innerWidth) {
                    leftPos = rect.left - panelWidth - 20;
                }

                panel.style.left = `${leftPos}px`;
                panel.style.top = `${rect.top}px`;
                panel.classList.add('active');
            }
        });

        node.addEventListener('mouseleave', () => {
            panel.classList.remove('active');
        });
    });

    // Close panel on scroll to avoid alignment issues
    window.addEventListener('scroll', () => {
        panel.classList.remove('active');
    });
});