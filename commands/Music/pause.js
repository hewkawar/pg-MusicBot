const { SlashCommandBuilder } = require('@discordjs/builders');
const { AudioPlayerStatus, getVoiceConnection, createAudioPlayer } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause Current Track')
    .setDescriptionLocalizations({
      th: 'หยุดชั่วคราว',
  }),
  async execute(interaction, client) {
    const connection = getVoiceConnection(interaction.guild.id);
    const player = new createAudioPlayer();

    const isPause = await player.pause();
    connection.subscribe(player);

    console.log(isPause);

    if (!isPause) {
      await interaction.reply("Paused");
    }

    player.on(AudioPlayerStatus.Paused, (oldState, newState) => {
      console.log('Paused');
    });
  },
};
