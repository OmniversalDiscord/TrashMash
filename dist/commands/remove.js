"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCommand = void 0;
const discord_js_commando_1 = require("discord.js-commando");
const models_1 = require("../models");
class AddCommand extends discord_js_commando_1.Command {
    constructor(client) {
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
        this.roles = ["Coffee Crew", "Mod Squad", "Host"];
    }
    hasPermission(msg) {
        return msg.member.roles.cache.some((role) => this.roles.includes(role.name));
    }
    run(msg, { user }) {
        const game = this.client.findGameByServer(msg.guild);
        if (game) {
            if (game.removeUser(user)) {
                return msg.embed(new models_1.UserCard(game.getAllEntries(), user, "Removed"));
            }
            return msg.embed(new models_1.ErrorCard(`${user.displayName} is not in`));
        }
        return msg.embed(new models_1.ErrorCard("No game has been created"));
    }
}
exports.AddCommand = AddCommand;
//# sourceMappingURL=remove.js.map