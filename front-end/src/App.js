import './App.css';
import Checkbox from 'muicss/lib/react/checkbox';
import { Link } from "react-router-dom";
import {useState} from "react";
//import papa from 'papaparse';
//import { readString } from 'react-papaparse';
//import file from './Games-HLTB.csv';

let glist = [];
export function App() {

    const [id, setId] = useState('');
    const [data, setData] = useState(null);

    const handleClick = async () => {
        try {
            const response = await (await fetch(`http://localhost:8888/getGamesList?steam_id=%2076561198064813625`)).json()
            setData(response.games)
            glist = data;
            console.log(data[0].name)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="circle1">1</div>
                <div className="circle2">2</div>
                <div className="contain">
                    <div className="profile-link">
                        My Steam Public Profile Link
                        <input className="profile" type="text" placeholder="Paste Steam ID here" value={id} onChange={e => setId(e.target.value)}/>
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
                    <button onClick={handleClick} className="next">Go</button>
                    <Link to="/list">
                        <button onClick={handleClick} className="next">Next</button>
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
                        <div className="header1">
                            Name
                        </div>
                        <div className="header2">
                            Rank
                        </div>
                    </div>
                    <div className="rec-list">
                        <div className="names">
                            <div> {glist[0].name} </div>
                            <div> {glist[1].name} </div>
                            <div> {glist[2].name} </div>
                            <div> {glist[3].name} </div>
                            <div> {glist[4].name} </div>
                            <div> {glist[5].name} </div>
                            <div> {glist[6].name} </div>
                            <div> {glist[7].name} </div>
                            <div> {glist[8].name} </div>
                            <div> {glist[9].name} </div>
                            <div> {glist[11].name} </div>
                            <div> {glist[12].name} </div>
                            <div> {glist[13].name} </div>
                            <div> {glist[14].name} </div>
                            <div> {glist[15].name} </div>
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