const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const lang = require('../../lang');
const config = require('../../config.json');
const package = require('../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Discord API Latency")
        .setDescriptionLocalizations({
            th: "เช็ตปิง",
        }),
    async execute(interaction, client) {
        const mainEmbed = new EmbedBuilder()
            .setColor(config.Color)
            .setDescription(`🏓 ${lang(interaction.locale, "commands.ping.excute.reply")}! ${lang(interaction.locale, "commands.ping.excute.discord.ping")}: \`${client.ws.ping}\` ${lang(interaction.locale, "common.ms")}`)
            .setFooter({
                text: `${client.user.displayName} | ${lang(interaction.locale, "common.version")}: ${package.version}`,
                iconURL: client.user.displayAvatarURL({ extension: "png" })
            });

        await interaction.reply({
            embeds: [
                mainEmbed
            ]
        });
    },
};
