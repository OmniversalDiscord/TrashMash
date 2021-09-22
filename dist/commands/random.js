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
exports.RandomCommand = void 0;
const discord_js_commando_1 = require("discord.js-commando");
const services_1 = require("../services");
const models_1 = require("../models");
class RandomCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: 'random',
            group: 'commands',
            memberName: 'random',
            description: 'Returns a random mash',
            examples: ['random', 'random 3'],
            args: [
                {
                    key: 'count',
                    prompt: 'Number of tracks to return (default of 2)',
                    type: 'integer',
                    default: 2
                }
            ]
        });
        this.tracksSerivce = new services_1.TracksService();
    }
    run(msg, { count }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tracks = yield this.tracksSerivce.getTracks(count);
            const mashCard = new models_1.MashCard(tracks);
            return msg.embed(mashCard);
        });
    }
}
exports.RandomCommand = RandomCommand;
//# sourceMappingURL=random.js.map