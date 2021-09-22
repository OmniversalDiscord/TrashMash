"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCard = void 0;
const discord_js_1 = require("discord.js");
class UserCard extends discord_js_1.MessageEmbed {
    constructor(entires, user, operation) {
        super();
        this.setColor('#0303ff');
        let description = `${operation} ${user.displayName}\n\n**All entrants**\n`;
        for (let [i, entry] of entires.entries()) {
            description += `${entry.user.displayName}`;
            if (i + 1 !== entires.length) {
                description += "\n";
            }
        }
        this.setDescription(description);
    }
}
exports.UserCard = UserCard;
//# sourceMappingURL=user-card.js.map