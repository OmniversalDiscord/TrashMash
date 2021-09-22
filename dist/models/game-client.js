"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameClient = void 0;
const discord_js_commando_1 = require("discord.js-commando");
const _1 = require("./");
const discord_js_1 = require("discord.js");
const chalk_1 = __importDefault(require("chalk"));
const rimraf_1 = __importDefault(require("rimraf"));
class GameClient extends discord_js_commando_1.CommandoClient {
    constructor() {
        super(...arguments);
        this.dispatchers = new Map();
        this.queue = new Map();
        this.dir = '/trashmash';
        this.games = new Map();
    }
    // private votes: Map<string, PollEntry[]> = new Map();
    log(server, message, error = false) {
        console.log(chalk_1.default.yellow(`[${server.name}]`) + ` ${message}`);
    }
    isGameCreated(server) {
        return this.games.has(server.id);
    }
    findGameByServer(server) {
        return this.games.get(server.id);
    }
    createGame(server, count) {
        if (!this.isGameCreated(server)) {
            this.games.set(server.id, new _1.Game(count));
            return true;
        }
        return false;
    }
    // TODO: Finish voting
    /*
    sendPollCard(entry: Entry, pollEntries: PollEntry[]): EventEmitter {
        const voted = new EventEmitter();

        const voteableEntries = pollEntries.filter((pEntry) => pEntry.entry.user !== entry.user);
        const pollCard = new MessageEmbed().setColor('#0303ff').setTitle("Trashmash").setDescription("**Vote Time!**\n\nChoose **one** entry for each category by reacting to the message with the associated emoji. You **cannot** change your vote, so choose carefully!")

        for (let vEntry of voteableEntries) {
            let mashName = ""
            for (let [i, track] of vEntry.entry.getMash().entries()) {
                mashName += `${track.artist} - ${track.song}`

                if (i + 1 !== vEntry.entry.getMash().length) { mashName += "\nvs.\n" }
            }

            pollCard.addField(`${vEntry.emoji} ${vEntry.entry.user.displayName}`, mashName);
        }

        entry.user.sendEmbed(pollCard).then(async (message) => {
            for (let vEntry of voteableEntries) {
                await message.react(vEntry.emoji);
            }

            while (message.reactions.filter((reaction) => reaction.users.))
        })

        return voted;
    }

    createPoll(server: Guild, msg: CommandMessage) {
        const game = this.games.get(server.id);

        if (game) {
            const entries = game.getAllEntries();
            const submitted = entries.filter((entry) => entry.isSubmitted());

            const pollEntries: PollEntry[] = [];
            const usedEmojis: string[] = [];
            for (let entry of submitted) {
                let emoji: string;

                do {
                    emoji = randomEmoji.random();
                } while (!usedEmojis.includes(emoji))

                usedEmojis.push(emoji);
                pollEntries.push(
                    {
                        emoji,
                        entry,
                        votes: {best: 0, effort: 0, funny: 0}
                    }
                )
            }

            for (let entry in entries) {

            }
        }
    }
    */
    playFromQueue(server, connection, msg) {
        const queue = this.queue.get(server.id);
        if (queue) {
            const entry = queue[0];
            const file = `${this.dir}/${server.id}/${entry.user.id}.mp3`;
            msg.channel.send("**Now Playing: **", entry.displayMash());
            const dispatcher = connection.play(file, { bitrate: 192000 });
            this.dispatchers.set(server.id, dispatcher);
            dispatcher.on('end', (reason) => {
                if (queue.length <= 1) {
                    this.dispatchers.delete(server.id);
                    this.queue.delete(server.id);
                    msg.member.voice.channel.leave();
                    if (reason !== 'cancelled') {
                        rimraf_1.default.sync(this.dir + `/${msg.guild.id}`);
                        this.log(msg.guild, 'Game finished, folder deleted');
                        if (dispatcher) {
                            this.queue.delete(msg.guild.id);
                            dispatcher.end('cancelled');
                        }
                        msg.channel.send(new discord_js_1.MessageEmbed().setColor('#0303ff').setTitle("Trashmash").setDescription("All mashes played, thanks for playing!"));
                    }
                }
                else {
                    queue.shift();
                    this.queue.set(server.id, queue);
                    this.playFromQueue(server, connection, msg);
                }
            });
        }
    }
    deleteGame(server) {
        if (this.isGameCreated(server)) {
            this.games.delete(server.id);
            return true;
        }
        return false;
    }
}
exports.GameClient = GameClient;
//# sourceMappingURL=game-client.js.map