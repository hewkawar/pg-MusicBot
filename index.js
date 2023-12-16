const { ShardingManager } = require('discord.js');
const config = require('./config.json');

const manager = new ShardingManager('./bot.js', {
    token: config.Token,
});

manager.on('shardCreate', shard => {
    shard.on('death', () => {
        console.log(`[${shard.id}] is Death`);
        console.log(`[${shard.id}] Reswawning...`)
    })
    console.log(`Launched shard ${shard.id}`);
});

manager.spawn();