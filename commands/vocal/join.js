const { SlashCommandBuilder, Guild } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Join a channel'),
	async execute(interaction, client) {
		await join(interaction, client)
	},
};

async function getUserVoiceChannel(userId, client) {
    // Récupérez toutes les guildes (serveurs) auxquels le bot est connecté
    const guilds = client.guilds.cache;

    for (const guild of guilds.values()) {
        // Récupérez les états vocaux des membres du serveur
        const voiceStates = guild.voiceStates.cache;
        
        // Cherchez l'état vocal de l'utilisateur avec l'ID spécifié
        const voiceState = voiceStates.get(userId);
        
        // Si l'utilisateur est trouvé dans un canal vocal, retournez l'ID du canal vocal
        if (voiceState && voiceState.channelId) {
            return voiceState.channelId;
        }
    }
    
    // Si l'utilisateur n'est pas trouvé dans un canal vocal, retournez null
    return null;
}


async function join(interaction, client) {
	const channelId = await getUserVoiceChannel(interaction.user.id, client)
	if(channelId == null) {
		await interaction.reply('Not in a voice channel');
		return
	}

	const guilds = client.guilds.cache;
	let adapterCreator = undefined
    for (const guild of guilds.values()) {
        // Récupérez les états vocaux des membres du serveur
        const voiceStates = guild.voiceStates.cache;
        
        // Cherchez l'état vocal de l'utilisateur avec l'ID spécifié
        const voiceState = voiceStates.get(interaction.user.id);
        
        // Si l'utilisateur est trouvé dans un canal vocal, retournez l'ID du canal vocal
        if (voiceState && voiceState.channelId) {
            adapterCreator = guild.voiceAdapterCreator;
        }
    }


	const connection = joinVoiceChannel({
		channelId: channelId,
		guildId: interaction.guildId,
		adapterCreator: adapterCreator,
	});

	await interaction.reply('Joined your channel');

}