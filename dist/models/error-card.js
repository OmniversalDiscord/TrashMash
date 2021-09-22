"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCard = void 0;
const discord_js_1 = require("discord.js");
class ErrorCard extends discord_js_1.MessageEmbed {
    constructor(error) {
        super();
        this.setColor('#f54242');
        this.setTitle("Error");
        this.setDescription(error);
    }
}
exports.ErrorCard = ErrorCard;
//# sourceMappingURL=error-card.js.map