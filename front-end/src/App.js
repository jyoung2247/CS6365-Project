import './App.css';
//import Checkbox from 'muicss/lib/react/checkbox';
import { Link } from "react-router-dom";
import {useState} from "react";
import {trackPromise} from "react-promise-tracker";
import BarLoader from "react-spinners/BarLoader";
import link from "./link.png";

let glist = [];
export function App() {

    const url = `http://localhost:8888/getRecs?steam_id=%20`;
    const [id, setId] = useState('');
    let [loading, setLoading] = useState(false);

    const handleClick = async () => {
        try {
            //alert("Please close this dialog and wait for the 'Steam Data Acquired' message before pressing Next")
            setLoading(true)
            const response = await (await fetch(url+id)).json()
            setLoading(false)
            //alert("Steam Data Acquired!")
            glist = response.top_titles_ratings
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="circle1">
                    <img className="img" src={link} alt=""/>
                </div>
                {/*<div className="circle2">2</div>*/}
                <div className="contain">
                    <div className="welcome">
                        Welcome to the Steam Game Recommender! {'\n'}{'\n'} Input your Steam ID below, press Submit, wait for your
                        recommendations to be generated, and then click Next to view them.
                    </div>
                    <div className="profile-link">
                        My Steam Public Profile Link
                        <div className="link-profile">
                            <input className="profile" type="text" placeholder="Paste Steam ID here" value={id} onChange={e => setId(e.target.value)}/>
                            <button className="submit" onClick={handleClick}>Submit</button>
                        </div>
                    </div>
                    <BarLoader
                        //color={blue}
                        marginTop={100}
                        loading={loading}
                        height={25}
                        width={1000}
                    />
                    {/*OR
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
                    </div>*/}
                    <div className="link">
                        <Link to="/list">
                            <button className="next">Next</button>
                        </Link>
                    </div>
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
            <div className="results">
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
                            <div> {glist[0][0]} </div>
                            <div> {glist[1][0]} </div>
                            <div> {glist[2][0]} </div>
                            <div> {glist[3][0]} </div>
                            <div> {glist[4][0]} </div>
                            <div> {glist[5][0]} </div>
                            <div> {glist[6][0]} </div>
                            <div> {glist[7][0]} </div>
                            <div> {glist[8][0]} </div>
                            <div> {glist[9][0]} </div>
                            <div> {glist[10][0]} </div>
                            <div> {glist[11][0]} </div>
                            <div> {glist[12][0]} </div>
                            <div> {glist[13][0]} </div>
                            <div> {glist[14][0]} </div>
                            <div> {glist[15][0]} </div>
                            <div> {glist[16][0]} </div>
                            <div> {glist[17][0]} </div>
                            <div> {glist[18][0]} </div>
                            <div> {glist[19][0]} </div>
                            <div> {glist[20][0]} </div>
                            <div> {glist[21][0]} </div>
                            <div> {glist[22][0]} </div>
                            <div> {glist[23][0]} </div>
                            <div> {glist[24][0]} </div>
                            <div> {glist[25][0]} </div>
                            <div> {glist[26][0]} </div>
                            <div> {glist[27][0]} </div>
                            <div> {glist[28][0]} </div>
                            <div> {glist[29][0]} </div>
                            <div> {glist[30][0]} </div>
                            <div> {glist[31][0]} </div>
                            <div> {glist[32][0]} </div>
                            <div> {glist[33][0]} </div>
                            <div> {glist[34][0]} </div>
                            <div> {glist[35][0]} </div>
                            <div> {glist[36][0]} </div>
                            <div> {glist[37][0]} </div>
                            <div> {glist[38][0]} </div>
                            <div> {glist[39][0]} </div>
                            <div> {glist[40][0]} </div>
                            <div> {glist[41][0]} </div>
                            <div> {glist[42][0]} </div>
                            <div> {glist[43][0]} </div>
                            <div> {glist[44][0]} </div>
                            <div> {glist[45][0]} </div>
                            <div> {glist[46][0]} </div>
                            <div> {glist[47][0]} </div>
                            <div> {glist[48][0]} </div>
                            <div> {glist[49][0]} </div>
                            {/*<div> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>*/}
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
                            <div> 16 </div>
                            <div> 17 </div>
                            <div> 18 </div>
                            <div> 19 </div>
                            <div> 20 </div>
                            <div> 21 </div>
                            <div> 22 </div>
                            <div> 23 </div>
                            <div> 24 </div>
                            <div> 25 </div>
                            <div> 26 </div>
                            <div> 27 </div>
                            <div> 28 </div>
                            <div> 29 </div>
                            <div> 30 </div>
                            <div> 31 </div>
                            <div> 32 </div>
                            <div> 33 </div>
                            <div> 34 </div>
                            <div> 35 </div>
                            <div> 36 </div>
                            <div> 37 </div>
                            <div> 38 </div>
                            <div> 39 </div>
                            <div> 40 </div>
                            <div> 41 </div>
                            <div> 42 </div>
                            <div> 43 </div>
                            <div> 44 </div>
                            <div> 45 </div>
                            <div> 46 </div>
                            <div> 47 </div>
                            <div> 48 </div>
                            <div> 49 </div>
                            <div> 50 </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}