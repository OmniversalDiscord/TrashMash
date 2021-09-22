import { Command, CommandoMessage } from 'discord.js-commando';

import { GameClient, ErrorCard, UserCard } from '../models';
import { GuildMember } from 'discord.js';

export class PingCommand extends Command {
    constructor(client: GameClient) {
        super(client, {
            name: 'yping',
            group: 'trashmash',
            memberName: 'yping',
            description: 'Pings your mom',
            examples: ['yping'],
            args: []
        });
    }	

    async run(msg: CommandoMessage) {
    	return msg.say("You're good!");
    }
}
