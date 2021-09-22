import { Command, CommandoMessage } from 'discord.js-commando';

import { GameClient, ErrorCard } from '../models';

export class RerollCommand extends Command {
  private roles = ["Coffee Crew", "Mod Squad", "Host"];

  constructor(client: GameClient) {
    super(client, {
      name: "skip",
      group: "trashmash",
      memberName: "skip",
      description: "Skips a currently playing mash",
      examples: ["skip"],
    });
  }

  hasPermission(msg: CommandoMessage): boolean {
    return msg.member!.roles.cache.some((role) =>
      this.roles.includes(role.name)
    );
  }

  async run(msg: CommandoMessage) {
    const game = this.client.findGameByServer(msg.guild);

    if (game && game.isStarted()) {
      if (msg.member!.voice.channel) {
        const dispatcher = this.client.dispatchers.get(msg.guild.id);

        if (dispatcher) {
          dispatcher.end();
          return msg.say("Mash skipped");
        }

        return msg.embed(new ErrorCard("Nothing is currently playing"));
      }

      return msg.embed(
        new ErrorCard("You must be in a voice channel to use this command")
      );
    }

    return msg.embed(new ErrorCard("No game has been started or created"));
  }
}