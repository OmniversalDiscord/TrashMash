"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MashCard = void 0;
const discord_js_1 = require("discord.js");
class MashCard extends discord_js_1.MessageEmbed {
    constructor(tracks, user) {
        var _a;
        super();
        if (user) {
            this.setAuthor(`${user.displayName}`, (_a = user.user.avatarURL()) !== null && _a !== void 0 ? _a : undefined);
        }
        this.setColor('#0303ff');
        let description = '';
        for (let [i, track] of tracks.entries()) {
            description += (`
                [${track.artist} - ${track.song}](https://www.monstercat.com/release/${track.id})
                ${track.bpm} BPM • ${track.key} • ${track.genre}
                `);
            if (i + 1 !== tracks.length) {
                description += "\nvs.\n";
            }
        }
        this.setDescription(description);
    }
}
exports.MashCard = MashCard;
//# sourceMappingURL=mash-card.js.map