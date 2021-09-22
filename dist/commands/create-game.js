"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommand = void 0;
const discord_js_commando_1 = require("discord.js-commando");
const fs_1 = require("fs");
const rimraf_1 = __importDefault(require("rimraf"));
const models_1 = require("../models");
const discord_js_1 = require("discord.js");
class CreateCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "create",
            group: "trashmash",
            memberName: "create",
            description: "Creates a trashmash",
            examples: ["create", "create 3"],
            args: [
                {
                    key: "count",
                    prompt: "Number of tracks in each mash (default of 2)",
                    type: "integer",
                    default: 2,
                },
            ],
        });
        this.roles = ["Coffee Crew", "Mod Squad", "Host"];
    }
    hasPermission(msg) {
        return msg.member.roles.cache.some((role) => this.roles.includes(role.name));
    }
    fmtCmd(command) {
        return "`" + this.client.commandPrefix + command + "`";
    }
    run(msg, { count }) {
        if (this.client.createGame(msg.guild, count)) {
            rimraf_1.default.sync(`${this.client.dir}/${msg.guild.id}`);
            (0, fs_1.mkdirSync)(`${this.client.dir}/${msg.guild.id}`);
            this.client.log(msg.guild, `New game created, created folder`);
            const embed = new discord_js_1.MessageEmbed().setColor("#0303ff").setDescription(`
                    **New Trashmash game created**

                    ${this.fmtCmd("add")} to add a user
                    ${this.fmtCmd("remove")} to remove a user
                    ${this.fmtCmd("start")} to start the game
                    ${this.fmtCmd("cancel")} to cancel the game
                    `);
            return msg.embed(embed);
        }
        return msg.embed(new models_1.ErrorCard("A game has already been created"));
    }
}
exports.CreateCommand = CreateCommand;
//# sourceMappingURL=create-game.js.map