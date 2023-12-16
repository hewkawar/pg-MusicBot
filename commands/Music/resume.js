const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection, createAudioPlayer } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume Current Track')
    .setDescriptionLocalizations({
      th: 'เล่นเพลงต่อ',
    }),
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guild.id);
    const player = new createAudioPlayer();

    connection.subscribe(player);
    if (player.unpause()) {
      await interaction.reply("Resumed");
    }
  },
};
