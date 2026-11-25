document.addEventListener('DOMContentLoaded', () => {
    // 1. Animated Silicon Interconnect & Packet Flow Canvas
    const canvas = document.getElementById('silicon-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, traces = [];

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initTraces();
        }

        function initTraces() {
            traces = [];
            const count = Math.min(26, Math.floor(width / 55));
            for (let i = 0; i < count; i++) {
                traces.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    len: 60 + Math.random() * 140,
                    speed: 0.35 + Math.random() * 0.75,
                    horiz: Math.random() > 0.45,
                    color: Math.random() > 0.35 ? 'rgba(56, 189, 248,' : 'rgba(16, 185, 129,'
                });
            }
        }

        function drawSilicon() {
            ctx.clearRect(0, 0, width, height);

            // Subtle circuit grid nodes
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.035)';
            ctx.lineWidth = 1;
            const step = 48;
            for (let x = 0; x < width; x += step) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += step) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Moving signal pulses along silicon tracks
            traces.forEach(t => {
                ctx.beginPath();
                ctx.strokeStyle = t.color + '0.22)';
                ctx.lineWidth = 1.5;
                if (t.horiz) {
                    ctx.moveTo(t.x, t.y);
                    ctx.lineTo(t.x + t.len, t.y);
                    ctx.stroke();

                    ctx.fillStyle = t.color + '0.65)';
                    ctx.beginPath();
                    ctx.arc(t.x + t.len, t.y, 2, 0, Math.PI * 2);
                    ctx.fill();

                    t.x += t.speed;
                    if (t.x > width + 50) t.x = -t.len;
                } else {
                    ctx.moveTo(t.x, t.y);
                    ctx.lineTo(t.x, t.y + t.len);
                    ctx.stroke();

                    ctx.fillStyle = t.color + '0.65)';
                    ctx.beginPath();
                    ctx.arc(t.x, t.y + t.len, 2, 0, Math.PI * 2);
                    ctx.fill();

                    t.y += t.speed;
                    if (t.y > height + 50) t.y = -t.len;
                }
            });

            requestAnimationFrame(drawSilicon);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawSilicon();
    }

    // 2. Interactive Telemetry HUD Switcher
    const hudTabs = document.querySelectorAll('.hud-tab');
    const hudPanels = {
        pcie: document.getElementById('hud-panel-pcie'),
        arm: document.getElementById('hud-panel-arm'),
        axi: document.getElementById('hud-panel-axi')
    };

    hudTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            hudTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const key = tab.dataset.hud;
            Object.keys(hudPanels).forEach(k => {
                if (hudPanels[k]) {
                    hudPanels[k].classList.toggle('hidden', k !== key);
                }
            });
        });
    });

    // 3. Mobile Nav Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    // 4. Copy Email Button
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('shashanksaivalasa@gmail.com');
            const orig = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = orig; }, 1800);
        });
    }

    // 5. Project Filter Bar
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                const tags = card.dataset.tags || '';
                card.classList.toggle('hide-card', filter !== 'all' && !tags.includes(filter));
            });
        });
    });

    // 6. Interactive Architecture & Waveform Lightbox
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    const modalData = {
        pcie: {
            title: 'PCIe 2.0 Data Link Layer (DLL) — UVM & Replay Waveform',
            html: `
                <div class="diagram-box">
                    <div class="diagram-caption">// Full-Duplex PCIe 2.0 DLL Block & UVM Verification Architecture</div>
                    <svg viewBox="0 0 720 210" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
                        <rect x="10" y="20" width="140" height="170" rx="8" fill="#131d31" stroke="#38bdf8" stroke-width="1.5"/>
                        <text x="80" y="45" fill="#38bdf8" font-size="11" text-anchor="middle" font-weight="bold">UVM TL Agent</text>
                        <text x="80" y="70" fill="#94a3b8" font-size="9.5" text-anchor="middle">TL Sequencer/Drv</text>
                        <text x="80" y="95" fill="#94a3b8" font-size="9.5" text-anchor="middle">TL Monitor</text>
                        <text x="80" y="145" fill="#10b981" font-size="9.5" text-anchor="middle">Virtual Sequencer</text>
                        <text x="80" y="165" fill="#10b981" font-size="9.5" text-anchor="middle">Predictive SB</text>

                        <rect x="200" y="20" width="320" height="75" rx="8" fill="#0d1422" stroke="#10b981" stroke-width="1.5"/>
                        <text x="360" y="40" fill="#10b981" font-size="11" text-anchor="middle" font-weight="bold">TX Path: SeqNum + LCRC32 + 8-Slot Replay</text>
                        <text x="360" y="62" fill="#e2e8f0" font-size="9.5" text-anchor="middle">TX Arbiter Priority: DLLP &gt; Replay TLP &gt; New TLP</text>
                        <text x="360" y="80" fill="#94a3b8" font-size="9" text-anchor="middle">Atomic Packet Lock until tlp_end</text>

                        <rect x="200" y="115" width="320" height="75" rx="8" fill="#0d1422" stroke="#f59e0b" stroke-width="1.5"/>
                        <text x="360" y="135" fill="#f59e0b" font-size="11" text-anchor="middle" font-weight="bold">RX Path: LCRC Check + Signed Seq Diff</text>
                        <text x="360" y="157" fill="#e2e8f0" font-size="9.5" text-anchor="middle">diff = rx_seq - next_rcv_seq (Modulo 4096)</text>
                        <text x="360" y="175" fill="#94a3b8" font-size="9" text-anchor="middle">0: Accept+ACK | &lt;0: Dup Drop | &gt;0: Schedule NAK</text>

                        <rect x="570" y="20" width="140" height="170" rx="8" fill="#131d31" stroke="#38bdf8" stroke-width="1.5"/>
                        <text x="640" y="45" fill="#38bdf8" font-size="11" text-anchor="middle" font-weight="bold">UVM PHY Agent</text>
                        <text x="640" y="75" fill="#94a3b8" font-size="9.5" text-anchor="middle">LCRC Error Inject</text>
                        <text x="640" y="100" fill="#94a3b8" font-size="9.5" text-anchor="middle">ACK/NAK DLLP Gen</text>
                        <text x="640" y="155" fill="#10b981" font-size="9.5" text-anchor="middle">8 Concurrent SVAs</text>
                        <text x="640" y="173" fill="#10b981" font-size="9.5" text-anchor="middle">51 Cov Bins (100%)</text>

                        <line x1="150" y1="58" x2="200" y2="58" stroke="#38bdf8" stroke-width="2"/>
                        <line x1="520" y1="58" x2="570" y2="58" stroke="#10b981" stroke-width="2"/>
                        <line x1="570" y1="152" x2="520" y2="152" stroke="#f59e0b" stroke-width="2"/>
                        <line x1="200" y1="152" x2="150" y2="152" stroke="#38bdf8" stroke-width="2"/>
                    </svg>
                </div>
                <div class="diagram-box">
                    <div class="diagram-caption">// Simulated GTKWave Trace: NAK Reception &rarr; Replay Pointer Rewind</div>
                    <svg viewBox="0 0 720 135" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace" font-size="10">
                        <text x="10" y="24" fill="#94a3b8">clk</text>
                        <polyline points="90,26 110,26 110,12 130,12 130,26 150,26 150,12 170,12 170,26 190,26 190,12 210,12 210,26 230,26 230,12 250,12 250,26 270,26 270,12 290,12 290,26 310,26 310,12 330,12 330,26 350,26 350,12 370,12 370,26 390,26 390,12 410,12 410,26 430,26 430,12 450,12 450,26 470,26 470,12 490,12 490,26 510,26 510,12 530,12 530,26 550,26 550,12 570,12 570,26 590,26 590,12 610,12 610,26 630,26 630,12 650,12 650,26" fill="none" stroke="#38bdf8" stroke-width="1.3"/>

                        <text x="10" y="54" fill="#94a3b8">rx_nak_pulse</text>
                        <polyline points="90,56 210,56 210,40 250,40 250,56 650,56" fill="none" stroke="#f59e0b" stroke-width="1.6"/>
                        <text x="230" y="36" fill="#f59e0b" font-size="9" text-anchor="middle">NAK(Seq=4)</text>

                        <text x="10" y="84" fill="#94a3b8">tl_ready</text>
                        <polyline points="90,70 250,70 250,86 530,86 530,70 650,70" fill="none" stroke="#ef4444" stroke-width="1.6"/>
                        <text x="390" y="81" fill="#ef4444" font-size="9" text-anchor="middle">Back-pressure Active During Replay</text>

                        <text x="10" y="114" fill="#94a3b8">phy_tx_seq</text>
                        <rect x="90" y="100" width="160" height="18" fill="#131d31" stroke="#38bdf8"/>
                        <text x="170" y="113" fill="#e2e8f0" text-anchor="middle">TLP #5 &rarr; TLP #6</text>
                        <rect x="250" y="100" width="280" height="18" fill="#131d31" stroke="#10b981"/>
                        <text x="390" y="113" fill="#10b981" text-anchor="middle">Rewind &amp; Replay: TLP #5 &rarr; TLP #6</text>
                        <rect x="530" y="100" width="120" height="18" fill="#131d31" stroke="#38bdf8"/>
                        <text x="590" y="113" fill="#e2e8f0" text-anchor="middle">TLP #7</text>
                    </svg>
                </div>
            `
        },
        bridge: {
            title: 'Asynchronous AXI4-to-APB4 Bridge — CDC & Gray-Code FIFOs',
            html: `
                <div class="diagram-box">
                    <div class="diagram-caption">// Multi-Clock Domain Architecture (ACLK &harr; PCLK)</div>
                    <svg viewBox="0 0 720 185" width="100%" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono, monospace">
                        <rect x="15" y="20" width="150" height="145" rx="8" fill="#131d31" stroke="#38bdf8" stroke-width="1.5"/>
                        <text x="90" y="45" fill="#38bdf8" font-size="11" text-anchor="middle" font-weight="bold">AXI4 Slave IF</text>
                        <text x="90" y="68" fill="#94a3b8" font-size="9.5" text-anchor="middle">Domain: ACLK</text>
                        <text x="90" y="95" fill="#e2e8f0" font-size="9.5" text-anchor="middle">AW / W / B</text>
                        <text x="90" y="118" fill="#e2e8f0" font-size="9.5" text-anchor="middle">AR / R Channels</text>

                        <rect x="225" y="20" width="260" height="145" rx="8" fill="#0d1422" stroke="#10b981" stroke-width="1.5"/>
                        <text x="355" y="45" fill="#10b981" font-size="11" text-anchor="middle" font-weight="bold">4x Gray-Code Async FIFOs</text>
                        <text x="355" y="70" fill="#e2e8f0" font-size="9.5" text-anchor="middle">Write Cmd FIFO &bull; Read Addr FIFO</text>
                        <text x="355" y="92" fill="#e2e8f0" font-size="9.5" text-anchor="middle">Write Resp FIFO &bull; Read Data FIFO</text>
                        <text x="355" y="122" fill="#f59e0b" font-size="9.5" text-anchor="middle">2-FF Pointer Synchronizers</text>
                        <text x="355" y="144" fill="#94a3b8" font-size="9" text-anchor="middle">SpyGlass Lint &amp; CDC Clean</text>

                        <rect x="545" y="20" width="160" height="145" rx="8" fill="#131d31" stroke="#38bdf8" stroke-width="1.5"/>
                        <text x="625" y="45" fill="#38bdf8" font-size="11" text-anchor="middle" font-weight="bold">APB4 Master &amp; Mux</text>
                        <text x="625" y="68" fill="#94a3b8" font-size="9.5" text-anchor="middle">Domain: PCLK</text>
                        <text x="625" y="95" fill="#e2e8f0" font-size="9.5" text-anchor="middle">10x PSEL Decoder</text>
                        <text x="625" y="118" fill="#e2e8f0" font-size="9.5" text-anchor="middle">PSTRB &amp; PSLVERR</text>
                        <text x="625" y="140" fill="#10b981" font-size="9" text-anchor="middle">INCR Burst Unrolling</text>

                        <line x1="165" y1="92" x2="225" y2="92" stroke="#38bdf8" stroke-width="2"/>
                        <line x1="485" y1="92" x2="545" y2="92" stroke="#10b981" stroke-width="2"/>
                    </svg>
                </div>
            `
        },
        axivip: {
            title: '5-Channel AXI4 UVM Verification IP (VIP)',
            html: `
                <div class="diagram-box">
                    <div class="diagram-caption">// Reusable Master/Slave UVM Agent & Out-of-Order Scoreboard</div>
                    <p style="color:#94a3b8;font-size:0.9rem;margin-bottom:0.75rem;">
                        Supports independent execution across <strong>AW, W, B, AR, and R</strong> channels via <code>fork...join_any</code> and semaphore synchronization, including early <code>WVALID</code> before <code>AWVALID</code>, <code>WRAP</code> boundary wrap-around math, and byte-lane <code>WSTRB</code> validation.
                    </p>
                    <ul style="color:#e2e8f0;font-size:0.88rem;padding-left:1.2rem;line-height:1.7;">
                        <li><strong>Burst Modes:</strong> FIXED, INCR, and WRAP bursts across 1-to-256 beat lengths.</li>
                        <li><strong>Coverage Closure:</strong> Cross-coverage of burst type &times; burst length &times; burst size &times; BRESP/RRESP status.</li>
                        <li><strong>Protocol Checks:</strong> Handshake stability assertions ensuring VALID/payload persistence until READY.</li>
                    </ul>
                </div>
            `
        },
        riscv: {
            title: 'RISC-V (RV32I) Pipelined Processor & UART SoC',
            html: `
                <div class="diagram-box">
                    <div class="diagram-caption">// 5-Stage RV32I Pipeline (IF &rarr; ID &rarr; EX &rarr; MEM &rarr; WB) + UART</div>
                    <p style="color:#94a3b8;font-size:0.9rem;margin-bottom:0.75rem;">
                        Implemented full RV32I base integer instruction set with EX/MEM and MEM/WB data forwarding, load-use stall hazard unit, branch flush control, and memory-mapped UART TX/RX peripheral verification.
                    </p>
                </div>
            `
        }
    };

    document.querySelectorAll('.btn-inspect').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.modal;
            if (modalData[key]) {
                modalTitle.textContent = modalData[key].title;
                modalBody.innerHTML = modalData[key].html;
                modal.classList.remove('hidden');
            }
        });
    });

    function closeModal() {
        modal.classList.add('hidden');
    }
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });

    // 7. Floating Recruiter Assistant Chatbot
    const toggleBtn = document.getElementById('chat-toggle');
    const closeBtn = document.getElementById('chat-close');
    const chatBox = document.getElementById('chat-box');
    const messages = document.getElementById('chat-messages');
    const suggestionsBox = document.getElementById('chat-suggestions');

    const qaData = {
        'ARM & Eximietas Exp': 'At Eximietas Design (Client: ARM, Apr–Sep 2026), I built a UVM testbench with UVM RAL and a predictive reference model for a DSP datapath IP, and verified top-level interconnect routing & power-control handshakes on ARM SCPSS.',
        'PCIe 2.0 DLL Project': 'Designed a 9-module full-duplex PCIe 2.0 DLL (12-bit SeqNum, LCRC-32, 8-slot Replay Buffer, ACK/NAK control) and verified it in IEEE 1800.2 UVM achieving 100% functional coverage (51 bins), 94.8% line coverage, and 0 failures across 8 SVAs.',
        'AXI4-APB4 & CDC': 'Built an asynchronous AXI4-to-APB4 bridge (1 master, 10 slaves) using 4 Gray-code async FIFOs and 2-FF synchronizers, signed off with SpyGlass Lint/CDC and Synopsys Design Compiler.',
        'EDA & Tool Stack': 'Synopsys VCS, Siemens QuestaSim, SpyGlass (Lint/CDC), Synopsys Design Compiler, Verilator, Yosys, Vivado, and GTKWave.',
        'Availability & Contact': 'Immediate joiner for DV / ASIC / SoC Verification roles in Bengaluru or Hyderabad. Email: shashanksaivalasa@gmail.com | Phone: +91 8501853459.'
    };

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = sender === 'bot' ? 'msg-bot' : 'msg-user';
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    if (toggleBtn && chatBox) {
        toggleBtn.addEventListener('click', () => {
            chatBox.classList.remove('hidden');
            toggleBtn.classList.add('hidden');
            if (messages.children.length === 0) {
                addMessage('Hi! Select a topic below to inspect Shashank’s ARM verification experience, PCIe 2.0 DLL metrics, or EDA stack.', 'bot');
            }
        });
    }

    if (closeBtn && chatBox) {
        closeBtn.addEventListener('click', () => {
            chatBox.classList.add('hidden');
            toggleBtn.classList.remove('hidden');
        });
    }

    if (suggestionsBox) {
        Object.keys(qaData).forEach(topic => {
            const btn = document.createElement('button');
            btn.className = 'sug-btn';
            btn.textContent = topic;
            btn.addEventListener('click', () => {
                addMessage(topic, 'user');
                setTimeout(() => addMessage(qaData[topic], 'bot'), 200);
            });
            suggestionsBox.appendChild(btn);
        });
    }
});
