"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
const models_1 = require("./models");
const client = new models_1.GameClient({
    commandPrefix: '>',
    owner: '131859790593785856',
});
client.registry
    .registerDefaultTypes()
    .registerGroups([
    ['trashmash', 'Commands for running trashmash games'],
])
    .registerDefaultGroups()
    .registerDefaultCommands({
    unknownCommand: false,
})
    .registerCommandsIn(path_1.default.join(__dirname, 'commands'));
client.once('ready', () => {
    console.log(chalk_1.default.green('[Global]') + ` Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('high quality mashes');
    if ((0, fs_1.existsSync)(client.dir)) {
        console.log(chalk_1.default.green('[Global]') + ' Trashmash folder found');
    }
    else {
        console.log(chalk_1.default.red('[Global] Trashmash folder not found, exiting'));
        process.exit(1);
    }
});
client.on('error', console.error);
require('dotenv').config();
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=bot.js.map