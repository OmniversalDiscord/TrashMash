import { Command, CommandoMessage } from 'discord.js-commando';

import { GameClient, ErrorCard } from '../models';
import { isArray } from 'util';
import { MessageEmbed } from 'discord.js';
let sleep = require('util').promisify(setTimeout);

export class StartCommand extends Command {
    private roles = ["Coffee Crew", "Mod Squad", "Host"];

    constructor(client: GameClient) {
        super(client, {
            name: 'start',
            group: 'trashmash',
            memberName: 'start',
            description: 'Start a trashmash',
            examples: ['start']
        });
    }
    
    hasPermission(msg: CommandoMessage): boolean {
        return msg.member!.roles.cache.some((role) => this.roles.includes(role.name));
    }

    fmtCmd(command: string): string {
        return "`" + this.client.commandPrefix + command + "`";
    }

    async run(msg: CommandoMessage) {
        const game = this.client.findGameByServer(msg.guild)

        if (game) {
            if (game.start()) {
                this.client.log(msg.guild, "Game started");
                
                for (let entry of game.getAllEntries()) {
                    let message = await msg.say("*Rolling...*");
                    await sleep(0);
                    if (Array.isArray(message)) {
                        await message[0].edit(`<@${entry.user.id}>`, await entry.roll());
                    } else {
                        await message.edit(`<@${entry.user.id}>`, await entry.roll());
                    }
                }

                return msg.embed(new MessageEmbed()
                .setColor('#0303ff')
                .setDescription(
                    `
                    **Game started, good luck!**

                    ${this.fmtCmd("reroll")} to reroll a user
                    ${this.fmtCmd("remove")} to remove a user
                    ${this.fmtCmd("submit")} to submit your mash
                    ${this.fmtCmd("play")} to play mashes
                    ${this.fmtCmd("cancel")} to cancel the game
                    `
                ));
            } else {
                return msg.embed(new ErrorCard("No users addded or game already started"));
            }
        }

        return msg.embed(new ErrorCard("No game has been created"));
    }
}
