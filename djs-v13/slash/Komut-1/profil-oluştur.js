const config = require("../../config.js")
const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js")
const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase({
  databasePath: "./database.json"
});
module.exports = {

  name: 'profil-oluştur',
  description: 'Profil oluşturursun',
  category: 'Kullanıcı',
  options: [
    {
      name: 'ad',
      type: 'STRING',
      description: 'Ad',
      required: true,
    },
    {
      name: 'soyad',
      type: 'STRING',
      description: 'Soyad',
      required: true,
    },
    {
      name: 'yaş',
      type: 'NUMBER',
      description: 'Yaş',
      required: true,
    },
    {
      name: 'boy',
      type: 'NUMBER',
      description: 'Santimetre cinsinden boy',
      required: true,
    },
    {
      name: 'kilo',
      type: 'NUMBER',
      description: 'Kilo',
      required: true,
    },
    {
      name: 'cinsiyet',
      type: 'STRING',
      description: 'Cinsiyet',
      required: true,
    },
    {
      name: 'din',
      type: 'STRING',
      description: 'Dininiz Müslüman/Ateist/Hristiyan/Yahudi',
      required: true,
    },
    {
      name: 'kisisel-ozellikler',
      type: 'STRING',
      description: 'Kişisel özellikler',
      required: true,
    },
    {
      name: 'yonelim',
      type: 'STRING',
      description: 'Yöneliminiz Hetero/Homo/Bi/Aseksüel',
      required: true,
    },
    {
      name: 'meslek',
      type: 'STRING',
      description: 'Mesleğiniz Polis Memuru/Avukat/Savcı/Yargıç/Doktor/Psikolog/Hemşire/Mafya/Çete',
      required: true,
    },
  ],

  requiredPermissions: ["ADMINISTRATOR"],
  requiredPermissionsMe: [],

  disabled: false,
  developerOnly: false,

  run: async (client, interaction) => {
    if (!["Hetero", "Homo", "Bi", "Aseksüel"].includes(interaction.options.getString("yonelim"))) return interaction.reply({ ephemeral: true, embeds: [client.errorEmbed.setDescription("Lütfen şu seçeneklerden birini girin: Hetero/Homo/Bi/Aseksüel")] })
    if (!["Müslüman", "Ateist", "Yahudi", "Hristiyan"].includes(interaction.options.getString("din")))) return interaction.reply({ ephemeral: true, embeds: [client.errorEmbed.setDescription("Lütfen şu seçeneklerden birini girin: Müslüman/Ateist/Hristiyan/Yahudi")] })
    if (!["Erkek", "Kadın"].includes(interaction.options.getString("cinsiyet"))) return interaction.reply({ ephemeral: true, embeds: [client.errorEmbed.setDescription("Lütfen şu seçeneklerden birini girin: Erkek/Kadın")] })
    if (!["Polis Memuru", "Avukat", "Savcı", "Yargıç", "Doktor", "Psikolog", "Hemşire", "Mafya", "Çete"].includes(interaction.options.getString("meslek"))) return interaction.reply({ ephemeral: true, embeds: [client.errorEmbed.setDescription("Lütfen şu seçeneklerden birini girin: Erkek/Kadın")] })
    if(db.get(`profil_${interaction.user.id}.ad`)) return interaction.reply({embeds: [client.errorEmbed.setDescription(`Zaten profilin var.`)]})

    db.set(`profil_${interaction.user.id}`, {
      ad: interaction.options.getString("ad"),
      soyad: interaction.options.getString("soyad"),
      yas: interaction.options.getNumber("yaş"),
      boy: interaction.options.getNumber("boy"),
      kilo: interaction.options.getNumber("kilo"),
      cinsiyet: interaction.options.getString("cinsiyet"),
      din: interaction.options.getString("din"),
      yonelim: interaction.options.getString("yonelim"),
      kisiselozellikler: interaction.options.getString("kisisel-ozellikler"),
    })
    let din = interaction.options.getString("din")
    let yonelim = interaction.options.getString("yonelim")
    let cins = interaction.options.getString("cins")
    let meslek = interaction.options.getString("meslek")
    const filter = m => m.customId === "kabul" || "red"
    const collector = interaction.guild.channels.cache.get("Profil Kontrol Kanal ID").createMessageComponentCollector({filter, max: 1, time: 120000})
    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('kabul')
					.setLabel('Kabul Et')
					.setStyle('SUCCESS'),
			).addComponents(
				new MessageButton()
					.setCustomId('red')
					.setLabel('Reddet')
					.setStyle('DANGER'),
			);
      interaction.reply({embeds: [client.defaultEmbed.setDescription(`Profiliniz yetkililere gönderildi. Kabul edildiğinde size dm'den ulaşılacak.`)]})
    interaction.guild.channels.cache.get("Profil Kontrol Kanal ID").send({embeds: [client.defaultEmbed.setDescription(`
**<@&Profil Kontrol Yetkili Rol ID> ${interaction.user} profilini tamamlamak istiyor. Kabul ediyor musunuz?**

:id: \`ID:\` \`${interaction.user.id}\`
:id: \`Ad:\` \`${db.get(`profil_${interaction.user.id}.ad`)}\`
:id: \`Soyad:\` \`${db.get(`profil_${interaction.user.id}.soyad`)}\`
:birthday:  \`Yaş:\` \`${db.get(`profil_${interaction.user.id}.yas`)}\`
:straight_ruler: \`Boy:\` \`${db.get(`profil_${interaction.user.id}.boy`)}\`
:scales: \`Kilo\`: \`${db.get(`profil_${interaction.user.id}.kilo`)}\`
:place_of_worship: \`Din:\` \`${db.get(`profil_${interaction.user.id}.din`)}\`
:bust_in_silhouette: \`Cinsiyet:\` \`${db.get(`profil_${interaction.user.id}.cinsiyet`)}\`
:couple_with_heart_woman_man: \`Cinsel Yönelimi:\` \`${db.get(`profil_${interaction.user.id}.yonelim`)}\`
:bust_in_silhouette: \`Kişisel Özellikler:\` \`${db.get(`profil_${interaction.user.id}.kisiselozellikler`)}\`
    `)], components:[row]})

    collector.on('collect', async (m) => {
      if (m.customId === 'kabul') {
        interaction.guild.channels.cache.get("989449275425562644").send({embeds: [client.successEmbed.setDescription("Kabul edildi")]})
        interaction.user.send({ embeds: [client.defaultEmbed.setDescription("Profiliniz kabul edildi.")]});
        if (meslek === "Polis Memuru") { interaction.member.roles.add("Polis Memuru Rol ID") }
        if (meslek === "Avukat") { interaction.member.roles.add("Avukat Rol ID") }
        if (meslek === "Savcı") { interaction.member.roles.add("Savcı Rol ID") }
        if (meslek === "Yargıç") { interaction.member.roles.add("Yargıç Rol ID") }
        if (meslek === "Doktor") { interaction.member.roles.add("Doktor Rol ID") }
        if (meslek === "Psikolog") { interaction.member.roles.add("Psikolog Rol ID") }
        if (meslek === "Hemşire") { interaction.member.roles.add("Hemşire Rol ID") }
        if (meslek === "Mafya") { interaction.member.roles.add("Mafya Rol ID") }
        if (meslek === "Çete") { interaction.member.roles.add("Çete Rol ID") }
        if (meslek === "Eskort") { interaction.member.roles.add("Eskort Rol ID") }
        if (yonelim === "Heteroseksüel") { interaction.member.roles.add("Hetero Rol ID") }
        if (yonelim === "Homoseksüel") { interaction.member.roles.add("Homo Rol ID") }
        if (yonelim === "Biseksüel") { interaction.member.roles.add("Bi Rol ID") }
        if (yonelim === "Aseksüel") { interaction.member.roles.add("Aseksüel Rol ID") }
        if (cins === "Erkek") { interaction.member.roles.add("Erkek Rol ID") }
        if (cins === "Kadın") { interaction.member.roles.add("Kadın Rol ID") }
        if (din === "Hristiyan") { interaction.member.roles.add("Hristiyan Rol ID") }
        if (din === "Müslüman") { interaction.member.roles.add("Müslüman") }
        if (din === "Yahudi") { interaction.member.roles.add("Yahudi") }
        if (din === "Ateist") { interaction.member.roles.add("Ateist") }
        interaction.member.roles.add("Kayıtlı Rol ID")
        interaction.member.roles.remove("Kayıtsız Rol ID")

        
      } else if (m.customId === 'red') {
        db.findAndDelete((element,db) => {
          return element.ID.includes(`profil_${interaction.user.id}`);
          
      });
      interaction.guild.channels.cache.get("Profil Kontrol Kanal ID").send({embeds: [client.successEmbed.setDescription("Reddedildi")]})
      interaction.user.send({ embeds: [client.defaultEmbed.setDescription("Profiliniz reddedildi.")]});
   
      }
  });

  }
};

