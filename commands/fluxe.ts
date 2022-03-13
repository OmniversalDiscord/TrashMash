import { Command, CommandoMessage } from 'discord.js-commando';

import { GameClient, ErrorCard, UserCard } from '../models';
import { GuildMember } from 'discord.js';

export class PingCommand extends Command {
    constructor(client: GameClient) {
        super(client, {
            name: 'cringer',
            group: 'trashmash',
            memberName: 'cringer',
            description: 'Pings the cringer',
            examples: ['cringer'],
            args: []
        });
    }	

    async run(msg: CommandoMessage) {
    	return msg.say("<@131859790593785856>");
    }
}
