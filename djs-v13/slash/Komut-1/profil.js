const config = require("../../config.js")
const { MessageEmbed, MessageActionRow, MessageButton, Message } = require("discord.js")
const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase({
    databasePath: "./database.json"
});
module.exports = {

    name: 'profil',
    description: 'Kullanıcının profiline bakarsınız',
    category: 'Kullanıcı',
    options: [
        {
            name: 'kullanici',
            type: 'USER',
            description: 'Profiline bakacağınız kullanıcı',
            required: false,
        },
     ],

    requiredPermissions: [],
    requiredPermissionsMe: [],

    disabled: false,
    developerOnly: false,

    run: async (client, interaction) => {
let user = interaction.options.getUser("kullanici") || interaction.user
if(!db.get(`profil_${user.id}.ad`)) return interaction.reply({embeds: [client.errorEmbed.setDescription(`Kullanıcının profili yok.`)]})
   await interaction.reply({embeds: [new MessageEmbed().setTitle(`${user.username} Kullanıcısının Profili`).setColor("#00CCFF")
   .setDescription(`

:id: \`ID:\` \`${user.id}\`
:id: \`Ad:\` \`${db.get(`profil_${user.id}.ad`)}\`
:id: \`Soyad:\` \`${db.get(`profil_${user.id}.soyad`)}\`
:birthday:  \`Yaş:\` \`${db.get(`profil_${user.id}.yas`)}\`
:straight_ruler: \`Boy:\` \`${db.get(`profil_${user.id}.boy`)}\`
:scales: \`Kilo\`: \`${db.get(`profil_${user.id}.kilo`)}\`
:place_of_worship: \`Din:\` \`${db.get(`profil_${user.id}.din`)}\`
:bust_in_silhouette: \`Cinsiyet:\` \`${db.get(`profil_${user.id}.cinsiyet`)}\`
:couple_with_heart_woman_man: \`Cinsel Yönelimi:\` \`${db.get(`profil_${user.id}.yonelim`)}\`
:bust_in_silhouette: \`Kişisel Özellikler:\` \`${db.get(`profil_${user.id}.kisiselozellikler`)}\`
   `)
]})
    },
};

