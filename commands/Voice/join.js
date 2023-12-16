const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const { getVoiceConnection, joinVoiceChannel } = require('@discordjs/voice');

const lang = require('../../lang');
const config = require('../../config.json');
const package = require('../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join Voice Channel')
        .setDescriptionLocalizations({
            th: 'เข้าห้องเสียง',
        }),
    async execute(interaction) {
        let connection = getVoiceConnection(interaction.guild.id);

        if (!interaction.member.voice.channel) {
            return await interaction.reply({ embeds: [new EmbedBuilder().setTitle(`:warning: ${lang(interaction.locale, "commands.play.plase_join_vc_before_use_bot")}`).setColor("Yellow")] });
        }

        if (!connection) {
            connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
                selfDeaf: true,
                selfMute: false
            });

            await interaction.reply({ embeds: [new EmbedBuilder().setColor(config.Color).setTitle(`🟢 ${lang(interaction.locale, "commands.joib.excute.success")}`)]});
        } else {
            await interaction.reply({ embeds: [new EmbedBuilder().setColor(config.Color).setTitle(`🟢 ${lang(interaction.locale, "commands.joib.excute.already_join")}`)]});
        }

        await interaction.guild.members.me.edit({
            deaf: true,
            mute: false,
        });
    },
};
