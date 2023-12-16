const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const lang = require('../../lang');
const config = require('../../config.json');
const package = require('../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("Bot Manual")
        .setDescriptionLocalizations({
            th: "คู่มือการใช้งาน",
        }),
    async execute(interaction, client) {
        let helpText = "";
        config.Helps.Commands.forEach((command) => {
            helpText = helpText + "\n";
            helpText = helpText + `</${command.name}:${command.id}> - ${lang(interaction.locale, command.value)}`
        })

        const mainEmbed = new EmbedBuilder()
            .setColor(config.Color)
            .setTitle(`📕 ${lang(interaction.locale, "commands.help.excute.title")}`)
            .setDescription(helpText)
            .setFooter({
                text: `${client.user.displayName} | ${lang(interaction.locale, "common.version")}: ${package.version}`,
                iconURL: client.user.displayAvatarURL({ extension: "png" })
            });

        const inviteBtn = new ButtonBuilder()
            .setURL(config.InviteURL)
            .setLabel(lang(interaction.locale, "common.invitebot"))
            .setStyle(ButtonStyle.Link);

        const component = new ActionRowBuilder()
            .addComponents(inviteBtn);

        await interaction.reply({
            embeds: [
                mainEmbed
            ],
            components: [
                component
            ]
        });
    },
};
