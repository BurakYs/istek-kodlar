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
        let member = interaction.guild.members.cache.get(user.id)
        member.roles.remove("Yargıç Rol ID")
        member.roles.remove("Doktor Rol ID")
        member.roles.remove("Psikolog Rol ID")
        member.roles.remove("Hemşire Rol ID")
        member.roles.remove("Mafya Rol ID")
        member.roles.remove("Çete Rol ID")
        member.roles.remove("Eskort Rol ID")
        member.roles.remove("Hetero Rol ID")
        member.roles.remove("Homo Rol ID")
        member.roles.remove("Bi Rol ID")
        member.roles.remove("Aseksüel Rol ID")
        member.roles.remove("Erkek Rol ID")
        member.roles.remove("Kadın Rol ID")
        member.roles.remove("Hristiyan Rol ID")
        member.roles.remove("Müslüman Rol ID")
        member.roles.remove("Ateist Rol ID")
        member.roles.remove("Yahudi Rol ID")
        member.roles.remove("Ateist Rol ID")
        member.roles.remove("Kayıtlı Rol ID")
        member.roles.add("Kayıtsız Rol ID")
        await interaction.reply({ embeds: [client.successEmbed.setDescription(`${user} kullanıcısının profili silindi`)] })
        db.findAndDelete((element, db) => {
            return element.ID.includes(`profil_${user.id}`);
        });
    },
};
	
