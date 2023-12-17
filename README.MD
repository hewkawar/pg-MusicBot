# Music Bot - Playground

Try this code on [Playground's Server](https://discord.gg/Zw4SEkd5mr) Music Bot.

## Installation Steps

### 1. Getting Started

Create a `config.json` file with the following data:

```json
{
    "Color": "Blue",
    "InviteURL": "INVITE_BOT_URL",
    "Token": "BOT_TOKEN",
    "Client": {
        "Id": "CLIENT_ID",
        "Secret": "CLIENT_SECRET"
    },
    "Presence": {
        "activities": [
            {
                "name": "CUSTOM_PRESENCE_NAME",
                "type": 0
            }
        ],
        "afk": false,
        "status": "online"
    },
    "Helps": {
        "Commands": [
            {
                "id": "COMMAND_ID",
                "name": "COMMAND_NAME",
                "value": "COMMAND_LANG_VALUE"
            }
        ]
    }
}
```

Additionally, create a `spotify.json` file with the following data:

```json
{
    "Client": {
        "Id": "SPOTIFY_APPLICATION_CLIENT_ID",
        "Secret": "SPOTIFY_APPLICATION_CLIENT_SECRET"
    }
}
```
> Note: Replace the placeholder values with the actual information:

* INVITE_BOT_URL: [Invite your bot here](https://discordapi.com/permissions.html)

* BOT_TOKEN: Obtain your bot token [here](https://discord.com/developers/applications)

* CLIENT_ID: Find your bot's client ID [here](https://discord.com/developers/applications)

* CLIENT_SECRET: Retrieve your bot's client secret [here](https://discord.com/developers/applications)

* CUSTOM_PRESENCE_NAME: Set your desired status name

* COMMAND_ID & COMMAND_NAME: Set these values after running the bot for the first time

* COMMAND_LANG_VALUE: Example: "commands.help.execute.title"

* SPOTIFY_APPLICATION_CLIENT_ID & SPOTIFY_APPLICATION_CLIENT_SECRET: Get these from your [Spotify Developer Dashboard](https://developer.spotify.com/)

Feel free to join [Playground's Server](https://discord.gg/Zw4SEkd5mr) for additional support.