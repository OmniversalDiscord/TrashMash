import { Command, CommandoMessage } from 'discord.js-commando';

import { GameClient, ErrorCard, UserCard } from '../models';
import { GuildMember } from 'discord.js';

export class AddCommand extends Command {
  private roles = ["Coffee Crew", "Mod Squad", "Host"];

  constructor(client: GameClient) {
    super(client, {
      name: "remove",
      group: "trashmash",
      memberName: "remove",
      description: "Removes a user from the game",
      examples: ["remove <user>"],
      args: [
        {
          key: "user",
          prompt: "User to add",
          type: "member",
        },
      ],
    });
  }

  hasPermission(msg: CommandoMessage): boolean {
    return msg.member!.roles.cache.some((role) =>
      this.roles.includes(role.name)
    );
  }

  run(msg: CommandoMessage, { user }: { user: GuildMember }) {
    const game = this.client.findGameByServer(msg.guild);

    if (game) {
      if (game.removeUser(user)) {
        return msg.embed(new UserCard(game.getAllEntries(), user, "Removed"));
      }

      return msg.embed(new ErrorCard(`${user.displayName} is not in`));
    }

    return msg.embed(new ErrorCard("No game has been created"));
  }
}