const config = require("../../config.js")
const { MessageEmbed, MessageActionRow, MessageButton, Message } = require("discord.js")
const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase({
    databasePath: "./database.json"
});
module.exports = {

    name: 'profil-sil',
    description: 'Kullanıcının profilini silersiniz',
    category: 'Moderasyon',
    options: [
        {
            name: 'kullanici',
            type: 'USER',
            description: 'Profilini sileceğiniz kullanıcı',
            required: true,
        },
     ],

    requiredPermissions: [],
    requiredPermissionsMe: [],

    disabled: false,
    developerOnly: false,

    run: async (client, interaction) => {
    
let user = interaction.options.getUser("kullanici")
if(interaction.member.roles.cache.has("982715581964877917")) return;

let member = interaction.guild.members.cache.get(user)
let meslek = db.get(`profil_${user.id}.meslek`)
let din = db.get(`profil_${user.id}.din`)
let cins = db.get(`profil_${user.id}.cins`)
let yonelim = db.get(`profil_${user.id}.yonelim`)


        if (meslek === "Polis Memuru") { member.roles.remove("985463218975670272") }
        if (meslek === "Avukat") { member.roles.remove("985464105139851284") }
        if (meslek === "Savcı") { member.roles.remove("985464103256604713") }
        if (meslek === "Yargıç") { member.roles.remove("985464100446429245") }
        if (meslek === "Doktor") { member.roles.remove("982715581818085388") }
        if (meslek === "Psikolog") { member.roles.remove("982715581755162734") }
        if (meslek === "Hemşire") { member.roles.remove("982715581755162741") }
        if (meslek === "Mafya") { member.roles.remove("982715581818085393") }
        if (meslek === "Çete") { member.roles.remove("985465555123322930") }
        if (meslek === "Eskort") { member.roles.remove("988424451022536734") }
        if (yonelim === "Heteroseksüel") { member.roles.remove("987734380447412295") }
        if (yonelim === "Homoseksüel") { member.roles.remove("987734381026234428") }
        if (yonelim === "Biseksüel") { member.roles.remove("987734382989168721") }
        if (yonelim === "Aseksüel") { member.roles.remove("987734383354081310") }
        if (cins === "Erkek") { member.roles.remove("987734548928405604") }
        if (cins === "Kadın") { member.roles.remove("987734726666252348") }
        if (din === "Hristiyan") { member.roles.remove("987734976978096169") }
        if (din === "Müslüman") { member.roles.remove("987734980291596349") }
        if (din === "Yahudi") { member.roles.remove("987734981860274288") }
        if (din === "Ateist") { member.roles.remove("987734982950813696") }
        interaction.member.roles.remove("982715580895338561")
        interaction.member.roles.add("982715580895338558")
        interaction.member.roles.remove("982715581289595028")
   await interaction.reply({embeds: [client.successEmbed.setDescription(`${user} kullanıcısının profili silindi`)]})
   db.findAndDelete((element,db) => {
    return element.ID.includes(`profil_${user.id}`);
});
    },
};

