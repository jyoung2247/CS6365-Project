import './App.css';
import Checkbox from 'muicss/lib/react/checkbox';
import { Link } from "react-router-dom";
import papa from 'papaparse';
import { readString } from 'react-papaparse';
import file from './Games-HLTB.csv';

export function App() {

    console.log("Console log not working");

    let record;
    let record_data;
    let result;
    let result_data;
    const games = file;

    papa.parse(games, {
        download: true,
        complete: function (input) {
            record = input;
            record_data = input.data;
            console.log("Records: " + record);
        }
    });

    const PapaConfig = {
        complete: (results, file) => {
            console.log('Parsing complete:', results, file);
            console.log("Results: " + results);
            console.log("Results Data: " + results.data);
            result = results;
            result_data = results.data;
        },
        download: true,
        error: (error, file) => {
            console.log('Error while parsing:', error, file);
        },
    };
    readString(games, PapaConfig);

    console.log("Console log still not working");

    return (
        <div className="App">
            <header className="App-header">
                <div className="data">{record}{record_data}{result}{result_data}</div>
                <div className="circle1">1</div>
                <div className="circle2">2</div>
                <div className="contain">
                    <div className="profile-link">
                        My Steam Public Profile Link
                        <input className="profile" type="text" placeholder="Paste profile link here"/>
                    </div>
                    OR
                    <div className="faves">
                        Select Favorite Games
                        <div className="fave-list">
                            My games:
                            <div className="checklist">
                                <Checkbox name="g1" label="God of War"/>
                                <Checkbox name="g2" label="Uncharted"/>
                                <Checkbox name="g3" label="Horizon Zero Dawn"/>
                                <Checkbox name="g4" label="Sly Cooper"/>
                                <Checkbox name="g5" label="Halo"/>
                                <Checkbox name="g6" label="Call of Duty"/>
                                <Checkbox name="g7" label="Just Cause"/>
                                <Checkbox name="g8" label="Mass Effect"/>
                                <Checkbox name="g9" label="Ratchet & Clank"/>
                                <Checkbox name="g10" label="Dragon Age"/>
                                <Checkbox name="g11" label="Deus Ex"/>
                                <Checkbox name="g12" label="Cuphead"/>
                                <Checkbox name="g13" label="Borderlands"/>
                                <Checkbox name="g14" label="Castle Crashers"/>
                                <Checkbox name="g15" label="Divinity: Original Sin"/>
                                <Checkbox name="g16" label="A Way Out"/>
                                <Checkbox name="g17" label="It Takes Two"/>
                                <Checkbox name="g18" label="Red Dead Redemption"/>
                                <Checkbox name="g19" label="Spider-Man"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="link">
                    <Link to="/list">
                        <button className="next">Next</button>
                    </Link>
                </div>
            </header>
        </div>
    );
}

export function List() {
    return (
        <div className="list">
            <div className="top">
                <Link to="/">
                    <button className="back">Back</button>
                </Link>
                Results
            </div>
            <div className="profile-link">
                <div className="filters">
                    Filter:
                    <button className="filter">Genre</button>
                    <button className="filter">Multiplayer</button>
                    <button className="filter">Time to Beat</button>
                </div>
                <div className="rec-box">
                    <div className="headers">
                        <div className="header">
                            Name
                        </div>
                        <div className="header">
                            Rank
                        </div>
                    </div>
                    <div className="rec-list">
                        <div className="names">
                            <div> Fortnite </div>
                            <div> Apex Legends </div>
                            <div> PUBG </div>
                            <div> Warzone </div>
                            <div> Super Smash Bros </div>
                            <div> Brawlhalla </div>
                            <div> Minecraft </div>
                            <div> Multiversus </div>
                            <div> Rainbow Six Siege </div>
                            <div> Elder Scrolls Online </div>
                            <div> Destiny 2 </div>
                            <div> World of Warcraft </div>
                            <div> League of Legends </div>
                            <div> For Honor </div>
                            <div> Overwatch 2 </div>
                        </div>
                        <div className="ranks">
                            <div> 1 </div>
                            <div> 2 </div>
                            <div> 3 </div>
                            <div> 4 </div>
                            <div> 5 </div>
                            <div> 6 </div>
                            <div> 7 </div>
                            <div> 8 </div>
                            <div> 9 </div>
                            <div> 10 </div>
                            <div> 11 </div>
                            <div> 12 </div>
                            <div> 13 </div>
                            <div> 14 </div>
                            <div> 15 </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}