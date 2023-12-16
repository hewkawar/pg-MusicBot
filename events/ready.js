const config = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`[${client.shard.ids}] Ready! Logged in as ${client.user.tag}`);

        await client.user.setPresence(config.Presence);
    },
};