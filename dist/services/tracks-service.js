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
exports.TracksService = void 0;
const mcatalog_service_1 = require("./mcatalog-service");
class TracksService {
    constructor() {
        this.song_blacklist = [
            "Stickup (feat. Juliette Lewis)",
            "Queen Of Your Heart (feat. Augustus Ghost)",
            "Shrooms",
            "Drowning (feat. Ehiorobo)",
            "A Walk To The Gallows",
            "Goodbye (Winter Chords)",
            "Intermission",
            "Veterstift",
            "Truth And Malice",
            "New Dawn",
            "Losing You",
            "Once Again",
            "Another Night (feat. Nevve)",
            "Constellations (feat. Jessi Mason)",
            "Scorpion Pit VIP",
            "The Munsta (Aero Chord Remix)",
            "Old Skool (Aero Chord Remix)",
            "URCA (feat. Olivia Grace)",
            "Bring the Madness (feat. Mayor Apeshit) (Aero Chord Remix)",
            "Thundergun (Apashe Remix)",
            "Get On Up (graves Remix)",
            "All for Nothing (Acoustic)",
            "Butterfly Effect (Acoustic)",
            "Gold (Acoustic)",
            "Good Enough (Acoustic)",
            "Speaking Through Smoke Detectors (Acoustic)",
            "Stars (Acoustic)",
            "Worlds Collide (Acoustic)",
            "Light Up (Acoustic)",
            "Numb (Acoustic)"
        ];
        this.genre_blacklist = [
            "Label",
            "Miscellaneous",
            "Ambient",
            "Traditional",
            "?",
            "EP",
            "Album",
            "Compilation",
            "Chillout"
        ];
        this.artist_blacklist = [
            "Aero Chord",
            "Razihel & Aero Chord",
            "Aero Chord & Nevve",
            "Aero Chord & Klaypex",
            "Snails & Pegboard Nerds",
            "Dirtyphonics & Bassnectar"
        ];
        this.bpm_blacklist = [
            "Freetime",
            "N/A"
        ];
        this.key_blacklist = [
            "mix",
            "Various",
            "N/A"
        ];
    }
    validTrack(raw_track) {
        if (this.genre_blacklist.includes(raw_track[4])) {
            return false;
        }
        else if (this.song_blacklist.includes(raw_track[6])) {
            return false;
        }
        else if (this.artist_blacklist.includes(raw_track[5])) {
            return false;
        }
        else if (this.bpm_blacklist.includes(raw_track[9])) {
            return false;
        }
        else if (this.key_blacklist.includes(raw_track[10])) {
            return false;
        }
        else if (raw_track[0].startsWith("SILK")) {
            return false;
        }
        return true;
    }
    getMCatalogTracks(count) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield mcatalog_service_1.MCatalogService.getCatalog();
            const values = res.values;
            let tracks = [];
            let indexes = [];
            console.log(indexes);
            for (let _ = 0; _ < count; _++) {
                let i;
                do {
                    i = Math.floor(Math.random() * values.length);
                } while (!this.validTrack(values[i]) && !indexes.includes(i));
                indexes.push(i);
                tracks.push({
                    id: values[i][0],
                    song: values[i][6],
                    artist: values[i][5],
                    key: values[i][10],
                    bpm: values[i][9],
                    genre: values[i][4]
                });
            }
            return tracks;
        });
    }
    getTracks(count) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getMCatalogTracks(count);
        });
    }
}
exports.TracksService = TracksService;
//# sourceMappingURL=tracks-service.js.map