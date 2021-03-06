import { MessageEmbed, GuildMember } from 'discord.js';

import { Entry } from './game';

export class UserCard extends MessageEmbed {
    constructor(entires: Entry[], user: GuildMember, operation: string) {
        super();
        this.setColor('#0303ff');
        let description = `${operation} ${user.displayName}\n\n**All entrants**\n`;
        for (let [i, entry] of entires.entries()) {
            description += `${entry.user.displayName}`
            if (i + 1 !== entires.length) { description += "\n" }
        }

        this.setDescription(description);
    }
}