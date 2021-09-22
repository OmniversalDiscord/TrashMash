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
exports.RerollCommand = void 0;
const discord_js_commando_1 = require("discord.js-commando");
const models_1 = require("../models");
class RerollCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "skip",
            group: "trashmash",
            memberName: "skip",
            description: "Skips a currently playing mash",
            examples: ["skip"],
        });
        this.roles = ["Coffee Crew", "Mod Squad", "Host"];
    }
    hasPermission(msg) {
        return msg.member.roles.cache.some((role) => this.roles.includes(role.name));
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = this.client.findGameByServer(msg.guild);
            if (game && game.isStarted()) {
                if (msg.member.voice.channel) {
                    const dispatcher = this.client.dispatchers.get(msg.guild.id);
                    if (dispatcher) {
                        dispatcher.end();
                        return msg.say("Mash skipped");
                    }
                    return msg.embed(new models_1.ErrorCard("Nothing is currently playing"));
                }
                return msg.embed(new models_1.ErrorCard("You must be in a voice channel to use this command"));
            }
            return msg.embed(new models_1.ErrorCard("No game has been started or created"));
        });
    }
}
exports.RerollCommand = RerollCommand;
//# sourceMappingURL=skip.js.map