import { MCatalogService } from './mcatalog-service';
import { Track } from '../models';

export class TracksService {
    private song_blacklist = [
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
    private brand_blacklist = [
        "S",
        "M"
    ];
    private genre_blacklist = [
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
    private artist_blacklist = [
        "Aero Chord",
        "Razihel & Aero Chord",
        "Aero Chord & Nevve",
        "Aero Chord & Klaypex",
        "Snails & Pegboard Nerds",
        "Dirtyphonics & Bassnectar"
    ];
    private bpm_blacklist = [
	"Freetime",
	"N/A"
	];
    private key_blacklist = [
	"mix",
	"Various",
	"N/A"
    ];
    private validTrack(raw_track: string[]): boolean {
        if (this.genre_blacklist.includes(raw_track[4])) {
            return false;
        } else if (this.song_blacklist.includes(raw_track[6])) {
            return false;
        } else if (this.artist_blacklist.includes(raw_track[5])) {
            return false;
        } else if (this.bpm_blacklist.includes(raw_track[9])) {
            return false;
        } else if (this.key_blacklist.includes(raw_track[10])) {
            return false;
        } else if (raw_track[0].startsWith("SILK")) {
            return false;
        } else if (this.brand_blacklist.includes(raw_track[3])) {
            return false;
        }
        return true;
    }

    private async getMCatalogTracks(count: number): Promise<Track[]> {
        const res = await MCatalogService.getCatalog();
        const values = res.values;
        let tracks: Track[] = [];
        let indexes: number[] = [];
        console.log(indexes)

        for (let _ = 0; _ < count; _++) {
            let i: number;
            
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
            })
        }
        return tracks;
    }

    async getTracks(count: number): Promise<Track[]> {
        return await this.getMCatalogTracks(count);
    }
}
