const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const spotify = require('../../spotify.json');
const ytsr = require('ytsr')
const utils = require('../../utils/musicpl');

const lang = require('../../lang');
const config = require('../../config.json');
const package = require('../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play or add to queue')
        .setDescriptionLocalizations({
            th: 'เล่นเพลง / เพิ่มคิว',
        })
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Search term or URL')
                .setRequired(true)
                .setDescriptionLocalizations({
                    th: 'ชื่อ หรือ ลิ้งก์',
                }))
        .addStringOption(option =>
            option.setName('platform')
                .setDescription('Default (Spotify)')
                .setDescriptionLocalizations({
                    th: 'ค่าเริ่มต้น (Spotify)',
                })
                .setRequired(false)
                .addChoices(
                    { name: 'Spotify', value: 'spotify' },
                    { name: 'Youtube', value: 'youtube' },
                    { name: 'SoundCloud', value: 'soundcloud' },
                )),
    async execute(interaction, client) {
        const query = interaction.options.getString('query');
        const platform = interaction.options.getString('platform');

        if (!interaction.member.voice.channel) {
            return await interaction.reply({ embeds: [new EmbedBuilder().setTitle(`:warning: ${lang(interaction.locale, "commands.play.plase_join_vc_before_use_bot")}`).setColor("Yellow")] });
        }

        const pl = utils.autoPlatfrom(query);

        if (pl === 'spotify') {
            const ac_token = await utils.makeAccessToken(interaction, spotify.Client.Id, spotify.Client.Secret);

            const spotify_id = utils.extractSpotifyTrackId(query);
            await utils.playSpotify(interaction, spotify_id, ac_token, config, spotify.Client.Id, spotify.Client.Secret);
        } else if (pl === 'youtube') {
            const onriginal = await interaction.reply({ embeds: [new EmbedBuilder().setTitle('<:youtube_error:1185497737664397392> Loading Video').setColor(config.Color).setDescription('Wait a moment...')] });
            await utils.playYoutube(interaction, query, config, onriginal);
        } else if (pl === 'search') {
            if (platform) {
                if (platform === 'spotify') {
                    const ac_token = await utils.makeAccessToken(interaction, spotify.Client.Id, spotify.Client.Secret);

                    const spotify_id = await utils.searchTracks(query, ac_token);
                    await utils.playSpotify(interaction, spotify_id, ac_token, config, spotify.Client.Id, spotify.Client.Secret);
                } else if (platform === 'youtube') {
                    const onriginal = await interaction.reply({ embeds: [new EmbedBuilder().setTitle('<:youtube_error:1185497737664397392> Loading Video').setColor(config.Color).setDescription('Wait a moment...')] });
                    const searchResults = await ytsr(query);
                    await utils.playYoutube(interaction, searchResults.items[0].url, config, onriginal);
                } else if (platform === 'soundcloud') {

                }
            } else {
                const ac_token = await utils.makeAccessToken(interaction, spotify.Client.Id, spotify.Client.Secret);

                const spotify_id = await utils.searchTracks(query, ac_token);
                await utils.playSpotify(interaction, spotify_id, ac_token, config, spotify.Client.Id, spotify.Client.Secret);
            }
        } else {
            return await interaction.reply({ embeds: [new EmbedBuilder().setTitle(`:no_entry:: ${lang(interaction.locale, "commands.play.excute.cant_process_query")}`).setColor('Red').setDescription(`\`\`\`${query}\`\`\``)] });
        }

    },
};