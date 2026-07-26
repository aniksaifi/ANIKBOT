const settings = require('../settings');

module.exports = async function(sock, chatId, msg, args) {
    const sendMsg = async (text) => {
        return await sock.sendMessage(chatId, {
            text: text,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
            }
        }, { quoted: msg });
    };

    try {
        await sock.sendMessage(chatId, { react: { text: "🔗", key: msg.key } });

        const response = `
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  💀  *ANIK BOT — REPOSITORY*  💀  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  🔗 *GitHub Repository*                   ┃
┃  ➤ https://github.com/aniksaifi/ANIKBOT ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  📱 *Pairing Guide*                      ┃
┃  ➤ Use the dashboard to pair your number ┃
┃  ➤ Scan QR or enter code in WhatsApp    ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  👑 *Version*   : ${settings?.version || '3.0.0'}  ┃
┃  🔐 *Security*  : Premium Encrypted      ┃
┃  ☠️ *Powered by* : ANIK TEAM          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
        `;

        await sendMsg(response);

    } catch (error) {
        console.error("❌ Repo command error:", error);
        await sendMsg("⚠️ Error processing command.");
    }
};
