module.exports = async function(sock, from, msg, session, args) {
    try {
        const text = args.join(' ');
        
        // Correctly extract target from mention or quoted message (Baileys structure)
        let target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || 
                     msg.message?.extendedTextMessage?.contextInfo?.participant || 
                     null;
        
        let name = text ? text.trim().toLowerCase() : '';
        
        // If no target and no name, show usage
        if (!target && !name) {
            return await sock.sendMessage(from, { 
                text: "❌ Example: .gali name or .gali @user" 
            }, { quoted: msg });
        }

        // Add a reaction
        await sock.sendMessage(from, { react: { text: '🤬', key: msg.key } });

        // Get sender JID for blocked replies
        const sender = msg.key.participant || msg.key.remoteJid;

        // Blocked names (fixed syntax error: removed extra double quote)
        let blocked = ['anik', 'akki', 'aniksaifi'];
        if (blocked.includes(name) || (target && blocked.some(b => target.includes(b)))) {
            let blockedReplies = [
                `${(name || 'User').toUpperCase()} *_Tari maa ka sath soya tha? Laudy_*`,
                `${(name || 'User').toUpperCase()} *_Tari amma ka yaar ha...?_*`
            ];
            let randomBlocked = blockedReplies[Math.floor(Math.random() * blockedReplies.length)];
            return await sock.sendMessage(from, { 
                text: randomBlocked, 
                mentions: [sender] 
            }, { quoted: msg });
        }

        // List of insults
        let targetName = name || (target ? '@' + target.split('@')[0] : 'User');
        let galis = [
            `${targetName} - *_teri mkc bc laudy gando bsdk bkl 💀 (3 baar)_*`,
            `${targetName} - *_salay tata madarchod randwe gando mkc Tari 🤡 (2 baar)_*`,
            `${targetName} - *_bkl habshi ki paidaawar barhwy mkc tari😈 (4 baar)_*`,
            `${targetName} *_Teri MKC Randi K Bachy (7 baar)🤡🚮_*`,
            `${targetName} *_Idher a Teri Mama K Oper Charh kr Dance krun🤡🥹_*`,
            `${targetName} *_Hi YATEEM TATTY Idher A Lun pr Beth kr Jholly kha_*`,
            `${targetName} *_Teri Ama Dy Akha Vch Akha Paa k Ondy Mou Vch Lul🤡🚮_*`,
            `${targetName} *_Idher A O Pooli Bondd Aliya🥸🤡_*`
        ];

        let randomGali = galis[Math.floor(Math.random() * galis.length)];

        // Prepare send options, mention target if available
        let sendOptions = { text: randomGali };
        if (target) {
            sendOptions.mentions = [target];
        }

        await sock.sendMessage(from, sendOptions, { quoted: msg });
    } catch (e) {
        console.error("Gali Command Error:", e);
        // Silent fail or send error message
    }
};
