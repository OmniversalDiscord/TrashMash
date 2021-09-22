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
exports.Game = exports.Entry = void 0;
const _1 = require("./");
const services_1 = require("../services");
class Entry {
    constructor(user, count) {
        this.trackService = new services_1.TracksService();
        this.user = user;
        this.mash = [];
        this.submitted = false;
        this.count = count;
        this.voted = false;
    }
    vote() {
        this.voted = true;
    }
    hasVoted() {
        return this.voted;
    }
    displayMash() {
        return new _1.MashCard(this.mash, this.user);
    }
    getMash() {
        return this.mash;
    }
    roll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mash = yield this.trackService.getTracks(this.count);
            return this.displayMash();
        });
    }
    submit() {
        this.submitted = true;
    }
    isSubmitted() {
        return this.submitted;
    }
}
exports.Entry = Entry;
class Game {
    constructor(count) {
        this.started = false;
        this.entries = [];
        this.trackCount = count;
    }
    start() {
        if (this.entries.length !== 0 && !this.started) {
            this.started = true;
            return true;
        }
        return false;
    }
    isStarted() {
        return this.started;
    }
    isUserEntered(user) {
        return this.entries.filter((entry) => entry.user.id === user.id).length === 1;
    }
    addUser(user) {
        if (!this.isUserEntered(user)) {
            this.entries.push(new Entry(user, this.trackCount));
            return true;
        }
        return false;
    }
    removeUser(user) {
        if (this.isUserEntered(user)) {
            let filtered = this.entries.filter((entry) => entry.user.id !== user.id);
            this.entries = filtered;
            return true;
        }
        return false;
    }
    getEntryByUser(user) {
        return this.entries.filter((entry) => entry.user.id === user.id)[0];
    }
    getAllSubmissions() {
        return this.entries.filter((entry) => entry.isSubmitted());
    }
    getAllEntries() {
        return this.entries;
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map