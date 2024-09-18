const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "helps", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
❂━━══❖ *${s.BOT}* ❖══━━❂
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
❂━━━━════❖═══━━━━❂
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
  ╭──━━━━══➻══━━━━✣
  ┃➳ *my owner* : ${s.OWNER_NAME}
  ┃➳ *commander* : ${nomAuteurMessage} 
  ┃➳ *date *: ${date}
  ┃➳ *prefix* : ${s.PREFIXE}
  ┃➳ *worktype* : ${mode} mode
  ┃➳ *plugin* : ${cm.length} 
  ┃➳ *rom* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
  ┃➳ *running on* : ${os.platform()}
  ┃➳ *theme* : *FELIX*
  ╰──━━━━══➻══━━━━✣
  
 ❂━━━━═════❖════━━━━❂
  ╭──━━━━══➻══━━━━❂
  ┃⦿ _*FELIX -MD 2024*_
  ╰──━━━━══➻══━━━━❂`;
    
let menuMsg = `

❂━━━━═════❖════━━━━❂
 ▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓▒▓
 ╭──━━━━══⊷══━━━━➻
 ┃▓ *FELIX -MD COMMADS*
 ╰──━━━━══⊷══━━━━➻
`;

    for (const cat in coms) {
        menuMsg += `╭─━━══❖ _*${cat}*_ ❖══━━━➻`;
        for (const c-MD of coms[cat]) {
            menuMsg += `
┃➻ *${c-MD}*`;
        }
        menuMsg += `
╰─━━═════━━⊷⊷➳➻➳
✣━━━━═══•∞•═══━━━━✣
 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʜᴀɴs ᴛᴇᴄʜ
❖━━━━═══•∞•═══━━━━❖ \n`
    }
    
    menuMsg += `  ✣━━═══⦿•∞•❂═══━━━❖
    ┃▓ *powered by hanstz Tech*
    ❖━━═══❂•∞•⦿═══━━━✣

    > _®hansTech info_
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *FELIX-MD*, déveloper hanstz Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *FELIX-MD*, déveloper hans Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
