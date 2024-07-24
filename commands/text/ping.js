const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')),
	async execute(interaction) {
        let msg = "Pong"
        if(interaction.options.getString('input')) {
            msg = interaction.options.getString('input')
        }
		await interaction.reply(msg);
	},
};