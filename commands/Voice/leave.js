const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const { getVoiceConnection } = require('@discordjs/voice');

const lang = require('../../lang');
const config = require('../../config.json');
const package = require('../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave from Voice Channel')
        .setDescriptionLocalizations({
            th: 'ออกจากห้องเสียง',
        }),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);

        if (connection) {
            connection.destroy();
            await interaction.reply({ embeds: [new EmbedBuilder().setColor(config.Color).setTitle(`🔴 ${lang(interaction.locale, "commands.leave.excute.success")}`)] });
        } else {
            await interaction.reply({ embeds: [new EmbedBuilder().setColor(config.Color).setTitle(`🔴 ${lang(interaction.locale, "commands.leave.excute.not_in_voice_channel")}`)] });
        }
        
    },
};
