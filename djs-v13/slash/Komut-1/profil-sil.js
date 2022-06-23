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
if(interaction.member.roles.cache.has("Profil Kontrol Yetkili Rol ID")) return;

let member = interaction.guild.members.cache.get(user.id)
let meslek = db.get(`profil_${user.id}.meslek`)
let din = db.get(`profil_${user.id}.din`)
let cins = db.get(`profil_${user.id}.cins`)
let yonelim = db.get(`profil_${user.id}.yonelim`)


        if (meslek === "Polis Memuru") { member.roles.remove("Polis Memuru Rol ID") }
        if (meslek === "Avukat") { member.roles.remove("Avukat Rol ID")) }
        if (meslek === "Savcı") { member.roles.remove("Savcı Rol ID") }
        if (meslek === "Yargıç") { member.roles.remove("Yargıç Rol ID") }
        if (meslek === "Doktor") { member.roles.remove("Doktor Rol ID") }
        if (meslek === "Psikolog") { member.roles.remove("Psikolog Rol ID") }
        if (meslek === "Hemşire") { member.roles.remove("Hemşire Rol ID") }
        if (meslek === "Mafya") { member.roles.remove("Mafya Rol ID") }
        if (meslek === "Çete") { member.roles.remove("Çete Rol ID") }
        if (meslek === "Eskort") { member.roles.remove("Eskort Rol ID") }
        if (yonelim === "Hetero") { member.roles.remove("Hetero Rol ID") }
        if (yonelim === "Homo") { member.roles.remove("Homo Rol ID") }
        if (yonelim === "Bi") { member.roles.remove("Bi Rol ID") }
        if (yonelim === "Aseksüel") { member.roles.remove("Aseksüel Rol ID") }
        if (cins === "Erkek") { member.roles.remove("Erkek Rol ID") }
        if (cins === "Kadın") { member.roles.remove("Kadın Rol ID") }
        if (din === "Hristiyan") { member.roles.remove("Hristiyan Rol ID") }
        if (din === "Müslüman") { member.roles.remove("Müslüman Rol ID") }
        if (din === "Yahudi") { member.roles.remove("Yahudi Rol ID") }
        if (din === "Ateist") { member.roles.remove("Ateist Rol ID") }
        interaction.member.roles.remove("Kayıtlı Rol ID")
        interaction.member.roles.add("Kayıtsız Rol ID")
   await interaction.reply({embeds: [client.successEmbed.setDescription(`${user} kullanıcısının profili silindi`)]})
   db.findAndDelete((element,db) => {
    return element.ID.includes(`profil_${user.id}`);
});
    },
};

