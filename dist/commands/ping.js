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
exports.PingCommand = void 0;
const discord_js_commando_1 = require("discord.js-commando");
class PingCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'yping',
            group: 'trashmash',
            memberName: 'yping',
            description: 'Pings your mom',
            examples: ['yping'],
            args: []
        });
    }
    run(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return msg.say("You're good!");
        });
    }
}
exports.PingCommand = PingCommand;
//# sourceMappingURL=ping.js.map