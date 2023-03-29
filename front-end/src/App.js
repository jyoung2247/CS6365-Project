import './App.css';
import { Link } from "react-router-dom";
import { useState, CSSProperties } from "react";
import BarLoader from "react-spinners/BarLoader";
import link from "./link.png";

let list = [];
export function App() {

    const url = `http://localhost:8888/getRecs?steam_id=%20`;
    const [id, setId] = useState('');
    let [loading, setLoading] = useState(false);

    const override: CSSProperties = {
        border: "1px solid #66c0f4",
        borderRadius: "5px"
    };

    const handleClick = async () => {
        try {
            //alert("Please close this dialog and wait for the 'Steam Data Acquired' message before pressing Next")
            setLoading(true)
            const response = await (await fetch(url+id)).json()
            setLoading(false)
            //alert("Steam Data Acquired!")
            list = response.top_titles_ratings
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
                    <div className="title">
                        Welcome to the Steam Game Recommender!
                    </div>
                    <div className="welcome">
                        Input your Steam ID, press Submit, wait for
                        recommendations to be generated, then click Next to view them.
                    </div>
                    <div className="profile-link">
                        My Steam Public Profile Link
                        <div className="link-profile">
                            <input className="profile" type="text" placeholder="  Paste Steam ID here" value={id} onChange={e => setId(e.target.value)}/>
                            <button className="submit" onClick={handleClick}>Submit</button>
                        </div>
                    </div>
                    <BarLoader
                        cssOverride={override}
                        marginTop={100}
                        loading={loading}
                        height={25}
                        width={1000}
                        color={"#2a475e"}
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
                                <Checkbox name="g12" label="BattleBlock Theater"/>
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
        <div className="recs">
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
                    <button className="filter">Length</button>
                    <button className="filter">Price</button>
                    <button className="filter">Developer</button>
                    <button className="filter">Publisher</button>
                    {/*<button className="filter">Content Rating</button>
                    <button className="filter">User Rating</button>
                    <button className="filter">Critic Rating</button>*/}

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
                            {/*<div className="game"> {list[0][0]} </div>
                            <div className="game"> {list[1][0]} </div>
                            <div className="game"> {list[2][0]} </div>
                            <div className="game"> {list[3][0]} </div>
                            <div className="game"> {list[4][0]} </div>
                            <div className="game"> {list[5][0]} </div>
                            <div className="game"> {list[6][0]} </div>
                            <div className="game"> {list[7][0]} </div>
                            <div className="game"> {list[8][0]} </div>
                            <div className="game"> {list[9][0]} </div>
                            <div className="game"> {list[10][0]} </div>
                            <div className="game"> {list[11][0]} </div>
                            <div className="game"> {list[12][0]} </div>
                            <div className="game"> {list[13][0]} </div>
                            <div className="game"> {list[14][0]} </div>
                            <div className="game"> {list[15][0]} </div>
                            <div className="game"> {list[16][0]} </div>
                            <div className="game"> {list[17][0]} </div>
                            <div className="game"> {list[18][0]} </div>
                            <div className="game"> {list[19][0]} </div>
                            <div className="game"> {list[20][0]} </div>
                            <div className="game"> {list[21][0]} </div>
                            <div className="game"> {list[22][0]} </div>
                            <div className="game"> {list[23][0]} </div>
                            <div className="game"> {list[24][0]} </div>
                            <div className="game"> {list[25][0]} </div>
                            <div className="game"> {list[26][0]} </div>
                            <div className="game"> {list[27][0]} </div>
                            <div className="game"> {list[28][0]} </div>
                            <div className="game"> {list[29][0]} </div>
                            <div className="game"> {list[30][0]} </div>
                            <div className="game"> {list[31][0]} </div>
                            <div className="game"> {list[32][0]} </div>
                            <div className="game"> {list[33][0]} </div>
                            <div className="game"> {list[34][0]} </div>
                            <div className="game"> {list[35][0]} </div>
                            <div className="game"> {list[36][0]} </div>
                            <div className="game"> {list[37][0]} </div>
                            <div className="game"> {list[38][0]} </div>
                            <div className="game"> {list[39][0]} </div>
                            <div className="game"> {list[40][0]} </div>
                            <div className="game"> {list[41][0]} </div>
                            <div className="game"> {list[42][0]} </div>
                            <div className="game"> {list[43][0]} </div>
                            <div className="game"> {list[44][0]} </div>
                            <div className="game"> {list[45][0]} </div>
                            <div className="game"> {list[46][0]} </div>
                            <div className="game"> {list[47][0]} </div>
                            <div className="game"> {list[48][0]} </div>
                            <div className="game"> {list[49][0]} </div>*/}
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                            <div className="game"> Pathfinder: Wrath of the Righteous - Enhanced Edition </div>
                        </div>
                        <div className="ranks">
                            <div className="game"> 1 </div>
                            <div className="game"> 2 </div>
                            <div className="game"> 3 </div>
                            <div className="game"> 4 </div>
                            <div className="game"> 5 </div>
                            <div className="game"> 6 </div>
                            <div className="game"> 7 </div>
                            <div className="game"> 8 </div>
                            <div className="game"> 9 </div>
                            <div className="game"> 10 </div>
                            <div className="game"> 11 </div>
                            <div className="game"> 12 </div>
                            <div className="game"> 13 </div>
                            <div className="game"> 14 </div>
                            <div className="game"> 15 </div>
                            <div className="game"> 16 </div>
                            <div className="game"> 17 </div>
                            <div className="game"> 18 </div>
                            <div className="game"> 19 </div>
                            <div className="game"> 20 </div>
                            <div className="game"> 21 </div>
                            <div className="game"> 22 </div>
                            <div className="game"> 23 </div>
                            <div className="game"> 24 </div>
                            <div className="game"> 25 </div>
                            <div className="game"> 26 </div>
                            <div className="game"> 27 </div>
                            <div className="game"> 28 </div>
                            <div className="game"> 29 </div>
                            <div className="game"> 30 </div>
                            <div className="game"> 31 </div>
                            <div className="game"> 32 </div>
                            <div className="game"> 33 </div>
                            <div className="game"> 34 </div>
                            <div className="game"> 35 </div>
                            <div className="game"> 36 </div>
                            <div className="game"> 37 </div>
                            <div className="game"> 38 </div>
                            <div className="game"> 39 </div>
                            <div className="game"> 40 </div>
                            <div className="game"> 41 </div>
                            <div className="game"> 42 </div>
                            <div className="game"> 43 </div>
                            <div className="game"> 44 </div>
                            <div className="game"> 45 </div>
                            <div className="game"> 46 </div>
                            <div className="game"> 47 </div>
                            <div className="game"> 48 </div>
                            <div className="game"> 49 </div>
                            <div className="game"> 50 </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}