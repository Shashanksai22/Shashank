document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chat-toggle');
    const closeBtn = document.getElementById('chat-close');
    const chatBox = document.getElementById('chat-box');
    const messages = document.getElementById('chat-messages');
    const suggestionsBox = document.getElementById('chat-suggestions');

    const qaData = {
        'ARM & Industry Exp': 'At Eximietas Design (Client: ARM), I built a UVM environment with UVM RAL and a predictive scoreboard for a DSP datapath IP, and verified top-level interconnect & power handshakes on ARM SCPSS.',
        'PCIe 2.0 Project': 'Designed a 9-module full-duplex PCIe 2.0 Data Link Layer and verified it with an IEEE 1800.2 UVM testbench achieving 100% functional coverage (51 bins) and 94.8% RTL line coverage.',
        'EDA Tools': 'Synopsys VCS, Siemens QuestaSim, SpyGlass (Lint/CDC), Synopsys Design Compiler, Verilator, Yosys, Vivado, and GTKWave.',
        'Contact & Availability': 'Available immediately for DV/ASIC roles in Bengaluru or Hyderabad. Email: shashanksaivalasa@gmail.com | Phone: +91 8501853459.'
    };

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = sender === 'bot' ? 'msg-bot' : 'msg-user';
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    toggleBtn.addEventListener('click', () => {
        chatBox.classList.remove('hidden');
        toggleBtn.classList.add('hidden');
        if (messages.children.length === 0) {
            addMessage('Hi! Ask me about Shashank’s ARM verification work, PCIe 2.0 project, or EDA stack.', 'bot');
        }
    });

    closeBtn.addEventListener('click', () => {
        chatBox.classList.add('hidden');
        toggleBtn.classList.remove('hidden');
    });

    Object.keys(qaData).forEach(topic => {
        const btn = document.createElement('button');
        btn.className = 'sug-btn';
        btn.textContent = topic;
        btn.addEventListener('click', () => {
            addMessage(topic, 'user');
            setTimeout(() => addMessage(qaData[topic], 'bot'), 250);
        });
        suggestionsBox.appendChild(btn);
    });
});
