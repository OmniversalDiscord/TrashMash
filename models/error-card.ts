import { MessageEmbed } from 'discord.js';

export class ErrorCard extends MessageEmbed {
    constructor(error: string) {
        super();
        this.setColor('#f54242');
        this.setTitle("Error");
        this.setDescription(error);
    }
}