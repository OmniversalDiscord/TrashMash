"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const discord_js_commando_1 = require("discord.js-commando");
const models_1 = require("../models");
const util_1 = require("util");
const discord_js_1 = require("discord.js");
let sleep = require('util').promisify(setTimeout);
class StartCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'start',
            group: 'trashmash',
            memberName: 'start',
            description: 'Start a trashmash',
            examples: ['start']
        });
        this.roles = ["Coffee Crew", "Mod Squad", "Host"];
    }
    hasPermission(msg) {
        return msg.member.roles.cache.some((role) => this.roles.includes(role.name));
    }
    fmtCmd(command) {
        return "`" + this.client.commandPrefix + command + "`";
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = this.client.findGameByServer(msg.guild);
            if (game) {
                if (game.start()) {
                    this.client.log(msg.guild, "Game started");
                    for (let entry of game.getAllEntries()) {
                        let message = yield msg.say("*Rolling...*");
                        yield sleep(0);
                        if ((0, util_1.isArray)(message)) {
                            yield message[0].edit(`<@${entry.user.id}>`, yield entry.roll());
                        }
                        else {
                            yield message.edit(`<@${entry.user.id}>`, yield entry.roll());
                        }
                    }
                    return msg.embed(new discord_js_1.MessageEmbed()
                        .setColor('#0303ff')
                        .setDescription(`
                    **Game started, good luck!**

                    ${this.fmtCmd("reroll")} to reroll a user
                    ${this.fmtCmd("remove")} to remove a user
                    ${this.fmtCmd("submit")} to submit your mash
                    ${this.fmtCmd("play")} to play mashes
                    ${this.fmtCmd("cancel")} to cancel the game
                    `));
                }
                else {
                    return msg.embed(new models_1.ErrorCard("No users addded or game already started"));
                }
            }
            return msg.embed(new models_1.ErrorCard("No game has been created"));
        });
    }
}
exports.StartCommand = StartCommand;
//# sourceMappingURL=start-game.js.map