"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelCommand = void 0;
const discord_js_commando_1 = require("discord.js-commando");
const rimraf_1 = __importDefault(require("rimraf"));
const models_1 = require("../models");
const discord_js_1 = require("discord.js");
class CancelCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "cancel",
            group: "trashmash",
            memberName: "cancel",
            description: "Cancel a trashmash early",
            examples: ["cancel"],
        });
        this.roles = ["Coffee Crew", "Mod Squad", "Host"];
    }
    hasPermission(msg) {
        return msg.member.roles.cache.some((role) => this.roles.includes(role.name));
    }
    run(msg) {
        if (this.client.deleteGame(msg.guild)) {
            rimraf_1.default.sync(this.client.dir + `/${msg.guild.id}`);
            this.client.log(msg.guild, "Game cancelled, folder deleted");
            const dispatcher = this.client.dispatchers.get(msg.guild.id);
            if (dispatcher) {
                this.client.queue.delete(msg.guild.id);
                dispatcher.end("cancelled");
            }
            return msg.embed(new discord_js_1.MessageEmbed()
                .setTitle("Trashmash")
                .setColor("#0303ff")
                .setDescription("Game cancelled"));
        }
        return msg.embed(new models_1.ErrorCard("No game has been created"));
    }
}
exports.CancelCommand = CancelCommand;
//# sourceMappingURL=cancel-game.js.map