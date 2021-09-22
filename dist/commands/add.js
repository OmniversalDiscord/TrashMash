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
exports.AddCommand = void 0;
const discord_js_commando_1 = require("discord.js-commando");
const models_1 = require("../models");
class AddCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "add",
            group: "trashmash",
            memberName: "add",
            description: "Adds a user to the game",
            examples: ["add <user>"],
            args: [
                {
                    key: "user",
                    prompt: "User to add",
                    type: "member",
                },
            ],
        });
        this.roles = ["Coffee Crew", "Mod Squad", "Host"];
    }
    hasPermission(msg) {
        return msg.member.roles.cache.some((role) => this.roles.includes(role.name));
    }
    run(msg, { user }) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = this.client.findGameByServer(msg.guild);
            if (game) {
                if (game.addUser(user)) {
                    if (game.isStarted()) {
                        const entry = game.getEntryByUser(user);
                        if (entry) {
                            return msg.say(yield entry.roll());
                        }
                        else {
                            return msg.embed(new models_1.ErrorCard("AAAAA WTF THIS SHOULDN'T HAPPEN"));
                        }
                    }
                    return msg.embed(new models_1.UserCard(game.getAllEntries(), user, "Added"));
                }
                return msg.embed(new models_1.ErrorCard(`${user.displayName} is already in`));
            }
            return msg.embed(new models_1.ErrorCard("No game has been created"));
        });
    }
}
exports.AddCommand = AddCommand;
//# sourceMappingURL=add.js.map