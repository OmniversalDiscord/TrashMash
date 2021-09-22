"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitCommand = void 0;
const discord_js_commando_1 = require("discord.js-commando");
const chokidar_1 = __importDefault(require("chokidar"));
const models_1 = require("../models");
const discord_js_1 = require("discord.js");
class SubmitCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "submit",
            group: "trashmash",
            memberName: "submit",
            description: "Responds with your submission link",
            examples: ["submit"],
        });
    }
    run(msg, { user }) {
        var _a;
        const game = this.client.findGameByServer(msg.guild);
        if (game && game.isStarted()) {
            const entry = game.getEntryByUser(user);
            if (entry) {
                const watcher = chokidar_1.default.watch(`${this.client.dir}/${msg.guild.id}/${entry.user.id}.mp3`);
                watcher.on("add", () => {
                    var _a;
                    entry.submit();
                    let unsubmitted = game
                        .getAllEntries()
                        .filter((entry) => !entry.isSubmitted());
                    let description = `${entry.user.displayName} has submitted!\n\n`;
                    if (unsubmitted.length === 0) {
                        description += "**Everyone submitted!**";
                    }
                    else {
                        description += "**Left to submit**\n";
                        for (let [i, entry] of unsubmitted.entries()) {
                            description += `${entry.user.displayName}`;
                            if (i + 1 !== unsubmitted.length) {
                                description += "\n";
                            }
                        }
                    }
                    msg.channel.send(new discord_js_1.MessageEmbed()
                        .setAuthor(`${msg.member.displayName}`, (_a = msg.member.user.avatarURL()) !== null && _a !== void 0 ? _a : undefined)
                        .setColor("#0303ff")
                        .setDescription(description));
                });
                return msg.reply(new discord_js_1.MessageEmbed()
                    .setAuthor(`${entry.user.displayName}`, (_a = msg.member.user.avatarURL()) !== null && _a !== void 0 ? _a : undefined)
                    .setColor("#0303ff")
                    .setDescription(`[Please submit your mash here](https://trashmash.io/${msg.guild.id}/${entry.user.id})`));
            }
            else {
                return msg.embed(new models_1.ErrorCard(`You are not in!`));
            }
        }
        return msg.embed(new models_1.ErrorCard("No game has been started or created"));
    }
}
exports.SubmitCommand = SubmitCommand;
//# sourceMappingURL=submit.js.map