import { Command, CommandoMessage } from 'discord.js-commando';
import chokidar from 'chokidar';

import { GameClient, ErrorCard } from '../models';
import { GuildMember, MessageEmbed } from 'discord.js';

export class SubmitCommand extends Command {
  constructor(client: GameClient) {
    super(client, {
      name: "submit",
      group: "trashmash",
      memberName: "submit",
      description: "Responds with your submission link",
      examples: ["submit"],
    });
  }

  run(msg: CommandoMessage, { user }: { user: GuildMember }) {
    const game = this.client.findGameByServer(msg.guild);

    if (game && game.isStarted()) {
      const entry = game.getEntryByUser(user);

      if (entry) {
        const watcher = chokidar.watch(
          `${this.client.dir}/${msg.guild.id}/${entry.user.id}.mp3`
        );

        watcher.on("add", () => {
          entry.submit();

          let unsubmitted = game
            .getAllEntries()
            .filter((entry) => !entry.isSubmitted());

          let description = `${entry.user.displayName} has submitted!\n\n`;
          if (unsubmitted.length === 0) {
            description += "**Everyone submitted!**";
          } else {
            description += "**Left to submit**\n";

            for (let [i, entry] of unsubmitted.entries()) {
              description += `${entry.user.displayName}`;
              if (i + 1 !== unsubmitted.length) {
                description += "\n";
              }
            }
          }

          msg.channel.send(
            new MessageEmbed()
              .setAuthor(
                `${msg.member!.displayName}`,
                msg.member!.user.avatarURL() ?? undefined
              )
              .setColor("#0303ff")
              .setDescription(description)
          );
        });

        return msg.reply(
          new MessageEmbed()
            .setAuthor(
              `${entry.user.displayName}`,
              msg.member!.user.avatarURL() ?? undefined
            )
            .setColor("#0303ff")
            .setDescription(
              `[Please submit your mash here](https://trashmash.io/${msg.guild.id}/${entry.user.id})`
            )
        );
      } else {
        return msg.embed(new ErrorCard(`You are not in!`));
      }
    }

    return msg.embed(new ErrorCard("No game has been started or created"));
  }
}