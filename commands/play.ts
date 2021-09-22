import { MessageEmbed } from 'discord.js';
import { Command, CommandoMessage } from 'discord.js-commando';

import { GameClient, ErrorCard } from '../models';

export class RerollCommand extends Command {
  private roles = ["Coffee Crew", "Mod Squad", "Host"];

  constructor(client: GameClient) {
    super(client, {
      name: "play",
      group: "trashmash",
      memberName: "play",
      description: "Joins the channel and plays the mashes",
      examples: ["play"],
    });
  }

  hasPermission(msg: CommandoMessage): boolean {
    return msg.member!.roles.cache.some((role) =>
      this.roles.includes(role.name)
    );
  }

  fmtCmd(command: string): string {
    return "`" + this.client.commandPrefix + command + "`";
  }

  async run(msg: CommandoMessage) {
    const game = this.client.findGameByServer(msg.guild);

    if (game && game.isStarted()) {
      if (msg.member!.voice.channel) {
        if (!this.client.queue.get(msg.guild.id)) {
          const submissions = game.getAllSubmissions();
          if (submissions.length !== 0) {
            this.client.log(msg.guild, "Playing mashes");
            this.client.queue.set(msg.guild.id, submissions);

            msg.member!.voice.channel.join().then((connection) => {
              this.client.playFromQueue(msg.guild, connection, msg);
            });

            return msg.embed(
              new MessageEmbed().setColor("#0303ff").setDescription(
                `
                            **Playing mashes**

                            ${this.fmtCmd("pause")} to pause/resume playback
                            ${this.fmtCmd("skip")} to skip
                            `
              )
            );
          }

          return msg.embed(new ErrorCard("No one has submitted!"));
        }

        return msg.embed(new ErrorCard("Mashes are already playing!"));
      }

      return msg.embed(
        new ErrorCard("You must be in a voice channel to use this command")
      );
    }

    return msg.embed(new ErrorCard("No game has been started or created"));
  }
}