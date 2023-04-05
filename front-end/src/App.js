import './App.css';
import { Link } from "react-router-dom";
import {useState, CSSProperties, useReducer} from "react";
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
            setLoading(true);
            const response = await (await fetch(url+id)).json();
            list = response;
            list.forEach((g)=>{
                if (g.genres.split(',').length > 2 && g.genres.split(',')[0] === "Action") {
                    g.genres = g.genres.replace("Action,", "");
                }
                g.genres = g.genres.split(',');
                let devs = g.developer.split(',').length;
                let pubs = g.publisher.split(',').length;
                if (devs >= 3) {
                    g.developer = devs[0];
                }
                if (pubs >= 3) {
                    g.publisher = pubs[0];
                } else if (g.publisher.includes("FromSoftware")) {
                    g.publisher = "FromSoftware";
                } else if (g.publisher.includes("Eidos Montreal")) {
                    g.developer = "Eidos Montreal";
                    g.publisher = "Eidos Interactive";
                } else if (g.publisher.includes("Warner Bros.")) {
                    g.publisher = "Warner Bros.";
                }
                if (g.title.includes("龙崖")) {
                    g.title.replace("龙崖", "");
                }
            });
            list = list.filter(g => g.price !== "Unknown" && g.genre !== "Unknown" && g.developer !== "Unknown" && g.publisher !== "Unknown");
            console.log(list.size);
            console.log(list);
            setLoading(false);
        } catch (err) {
            console.log(err.message);
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
                        margintop={100}
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

    //create your forceUpdate hook
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    function handleSort(term){
        switch (term) {
            case "ran":
                list = list.sort((a, b) => (parseFloat(a.est*100000) < parseFloat(b.est*100000)) ? 1 : -1);
                forceUpdate();
                break;
            case "tit":
                list = list.sort((a, b) => (a.title > b.title) ? 1 : -1);
                forceUpdate();
                break;
            case "gen":
                list = list.sort((a, b) => (a.genres[0] > b.genres[0]) ? 1 : -1);
                forceUpdate();
                break;
            case "pri":
                list = list.sort((a, b) => (a.price > b.price) ? 1 : -1);
                forceUpdate();
                break;
            case "dev":
                list = list.sort((a, b) => (a.developer > b.developer) ? 1 : -1);
                forceUpdate();
                break;
            case "pub":
                list = list.sort((a, b) => (a.publisher > b.publisher) ? 1 : -1);
                forceUpdate();
                break;
            default:
                if (ignored) {
                    forceUpdate();
                }
                break;
        }
    }

    return (
        <div className="recs">
            <div className="top">
                <Link to="/">
                    <button className="back">Back</button>
                </Link>
                Results
            </div>
            <div className="results">
                <div className="Sort">
                    Sort:
                    <button className="filter" onClick={() => handleSort("ran")}>Rank</button>
                    <button className="filter" onClick={() => handleSort("tit")}>Title</button>
                    <button className="filter" onClick={() => handleSort("gen")}>Genre</button>
                    <button className="filter" onClick={() => handleSort("pri")}>Price</button>
                    <button className="filter" onClick={() => handleSort("dev")}>Developer</button>
                    <button className="filter" onClick={() => handleSort("pub")}>Publisher</button>
                    {/*<button className="filter">Multiplayer</button>
                    <button className="filter">Length</button>
                    <button className="filter">Content Rating</button>
                    <button className="filter">User Rating</button>
                    <button className="filter">Critic Rating</button>*/}
                </div>
                <div className="Filter">
                    Filter:
                    <button className="filter">Multiplayer</button>
                    <button className="filter">Genre</button>
                    <button className="filter">Price</button>
                    <button className="filter">Developer</button>
                    <button className="filter">Publisher</button>
                    {/*<button className="filter">Length</button>
                    <button className="filter">Content Rating</button>
                    <button className="filter">User Rating</button>
                    <button className="filter">Critic Rating</button>*/}
                </div>
                <div className="rec-box">
                    <div className="rec-list">
                        <div className="games">
                            <div className="header"> Rank </div>
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
                            <div className="game"> 51 </div>
                            <div className="game"> 52 </div>
                            <div className="game"> 53 </div>
                            <div className="game"> 54 </div>
                            <div className="game"> 55 </div>
                            <div className="game"> 56 </div>
                            <div className="game"> 57 </div>
                            <div className="game"> 58 </div>
                            <div className="game"> 59 </div>
                            <div className="game"> 60 </div>
                            <div className="game"> 61 </div>
                            <div className="game"> 62 </div>
                            <div className="game"> 63 </div>
                            <div className="game"> 64 </div>
                            <div className="game"> 65 </div>
                            <div className="game"> 66 </div>
                            <div className="game"> 67 </div>
                            <div className="game"> 68 </div>
                            <div className="game"> 69 </div>
                            <div className="game"> 70 </div>
                            <div className="game"> 71 </div>
                            <div className="game"> 72 </div>
                            <div className="game"> 73 </div>
                            <div className="game"> 74 </div>
                            <div className="game"> 75 </div>
                            <div className="game"> 76 </div>
                            <div className="game"> 77 </div>
                            <div className="game"> 78 </div>
                            <div className="game"> 79 </div>
                            <div className="game"> 80 </div>
                            <div className="game"> 81 </div>
                            <div className="game"> 82 </div>
                            <div className="game"> 83 </div>
                            <div className="game"> 84 </div>
                            <div className="game"> 85 </div>
                            <div className="game"> 86 </div>
                            <div className="game"> 87 </div>
                            <div className="game"> 88 </div>
                            <div className="game"> 89 </div>
                            <div className="game"> 90 </div>
                            <div className="game"> 91 </div>
                            <div className="game"> 92 </div>
                            <div className="game"> 93 </div>
                            <div className="game"> 94 </div>
                            <div className="game"> 95 </div>
                            <div className="game"> 96 </div>
                            <div className="game"> 97 </div>
                            <div className="game"> 98 </div>
                            <div className="game"> 99 </div>
                        </div>
                        <div className="titles">
                            <div className="header"> Title </div>
                            <div className="game"> {list[0].title} </div>
                            <div className="game"> {list[1].title} </div>
                            <div className="game"> {list[2].title} </div>
                            <div className="game"> {list[3].title} </div>
                            <div className="game"> {list[4].title} </div>
                            <div className="game"> {list[5].title} </div>
                            <div className="game"> {list[6].title} </div>
                            <div className="game"> {list[7].title} </div>
                            <div className="game"> {list[8].title} </div>
                            <div className="game"> {list[9].title} </div>
                            <div className="game"> {list[10].title} </div>
                            <div className="game"> {list[11].title} </div>
                            <div className="game"> {list[12].title} </div>
                            <div className="game"> {list[13].title} </div>
                            <div className="game"> {list[14].title} </div>
                            <div className="game"> {list[15].title} </div>
                            <div className="game"> {list[16].title} </div>
                            <div className="game"> {list[17].title} </div>
                            <div className="game"> {list[18].title} </div>
                            <div className="game"> {list[19].title} </div>
                            <div className="game"> {list[20].title} </div>
                            <div className="game"> {list[21].title} </div>
                            <div className="game"> {list[22].title} </div>
                            <div className="game"> {list[23].title} </div>
                            <div className="game"> {list[24].title} </div>
                            <div className="game"> {list[25].title} </div>
                            <div className="game"> {list[26].title} </div>
                            <div className="game"> {list[27].title} </div>
                            <div className="game"> {list[28].title} </div>
                            <div className="game"> {list[29].title} </div>
                            <div className="game"> {list[30].title} </div>
                            <div className="game"> {list[31].title} </div>
                            <div className="game"> {list[32].title} </div>
                            <div className="game"> {list[33].title} </div>
                            <div className="game"> {list[34].title} </div>
                            <div className="game"> {list[35].title} </div>
                            <div className="game"> {list[36].title} </div>
                            <div className="game"> {list[37].title} </div>
                            <div className="game"> {list[38].title} </div>
                            <div className="game"> {list[39].title} </div>
                            <div className="game"> {list[40].title} </div>
                            <div className="game"> {list[41].title} </div>
                            <div className="game"> {list[42].title} </div>
                            <div className="game"> {list[43].title} </div>
                            <div className="game"> {list[44].title} </div>
                            <div className="game"> {list[45].title} </div>
                            <div className="game"> {list[46].title} </div>
                            <div className="game"> {list[47].title} </div>
                            <div className="game"> {list[48].title} </div>
                            <div className="game"> {list[49].title} </div>
                            <div className="game"> {list[50].title} </div>
                            <div className="game"> {list[51].title} </div>
                            <div className="game"> {list[52].title} </div>
                            <div className="game"> {list[53].title} </div>
                            <div className="game"> {list[54].title} </div>
                            <div className="game"> {list[55].title} </div>
                            <div className="game"> {list[56].title} </div>
                            <div className="game"> {list[57].title} </div>
                            <div className="game"> {list[58].title} </div>
                            <div className="game"> {list[59].title} </div>
                            <div className="game"> {list[60].title} </div>
                            <div className="game"> {list[61].title} </div>
                            <div className="game"> {list[62].title} </div>
                            <div className="game"> {list[63].title} </div>
                            <div className="game"> {list[64].title} </div>
                            <div className="game"> {list[65].title} </div>
                            <div className="game"> {list[66].title} </div>
                            <div className="game"> {list[67].title} </div>
                            <div className="game"> {list[68].title} </div>
                            <div className="game"> {list[69].title} </div>
                            <div className="game"> {list[70].title} </div>
                            <div className="game"> {list[71].title} </div>
                            <div className="game"> {list[72].title} </div>
                            <div className="game"> {list[73].title} </div>
                            <div className="game"> {list[74].title} </div>
                            <div className="game"> {list[75].title} </div>
                            <div className="game"> {list[76].title} </div>
                            <div className="game"> {list[77].title} </div>
                            <div className="game"> {list[78].title} </div>
                            <div className="game"> {list[79].title} </div>
                            <div className="game"> {list[80].title} </div>
                            <div className="game"> {list[81].title} </div>
                            <div className="game"> {list[82].title} </div>
                            <div className="game"> {list[83].title} </div>
                            <div className="game"> {list[84].title} </div>
                            <div className="game"> {list[85].title} </div>
                            <div className="game"> {list[86].title} </div>
                            <div className="game"> {list[87].title} </div>
                            <div className="game"> {list[88].title} </div>
                            <div className="game"> {list[89].title} </div>
                            <div className="game"> {list[90].title} </div>
                            <div className="game"> {list[91].title} </div>
                            <div className="game"> {list[92].title} </div>
                            <div className="game"> {list[93].title} </div>
                            <div className="game"> {list[94].title} </div>
                            <div className="game"> {list[95].title} </div>
                            <div className="game"> {list[96].title} </div>
                            <div className="game"> {list[97].title} </div>
                            <div className="game"> {list[98].title} </div>
                        </div>
                        <div className="prices">
                            <div className="header"> Price </div>
                            <div className="game"> {list[0].price} </div>
                            <div className="game"> {list[1].price} </div>
                            <div className="game"> {list[2].price} </div>
                            <div className="game"> {list[3].price} </div>
                            <div className="game"> {list[4].price} </div>
                            <div className="game"> {list[5].price} </div>
                            <div className="game"> {list[6].price} </div>
                            <div className="game"> {list[7].price} </div>
                            <div className="game"> {list[8].price} </div>
                            <div className="game"> {list[9].price} </div>
                            <div className="game"> {list[10].price} </div>
                            <div className="game"> {list[11].price} </div>
                            <div className="game"> {list[12].price} </div>
                            <div className="game"> {list[13].price} </div>
                            <div className="game"> {list[14].price} </div>
                            <div className="game"> {list[15].price} </div>
                            <div className="game"> {list[16].price} </div>
                            <div className="game"> {list[17].price} </div>
                            <div className="game"> {list[18].price} </div>
                            <div className="game"> {list[19].price} </div>
                            <div className="game"> {list[20].price} </div>
                            <div className="game"> {list[21].price} </div>
                            <div className="game"> {list[22].price} </div>
                            <div className="game"> {list[23].price} </div>
                            <div className="game"> {list[24].price} </div>
                            <div className="game"> {list[25].price} </div>
                            <div className="game"> {list[26].price} </div>
                            <div className="game"> {list[27].price} </div>
                            <div className="game"> {list[28].price} </div>
                            <div className="game"> {list[29].price} </div>
                            <div className="game"> {list[30].price} </div>
                            <div className="game"> {list[31].price} </div>
                            <div className="game"> {list[32].price} </div>
                            <div className="game"> {list[33].price} </div>
                            <div className="game"> {list[34].price} </div>
                            <div className="game"> {list[35].price} </div>
                            <div className="game"> {list[36].price} </div>
                            <div className="game"> {list[37].price} </div>
                            <div className="game"> {list[38].price} </div>
                            <div className="game"> {list[39].price} </div>
                            <div className="game"> {list[40].price} </div>
                            <div className="game"> {list[41].price} </div>
                            <div className="game"> {list[42].price} </div>
                            <div className="game"> {list[43].price} </div>
                            <div className="game"> {list[44].price} </div>
                            <div className="game"> {list[45].price} </div>
                            <div className="game"> {list[46].price} </div>
                            <div className="game"> {list[47].price} </div>
                            <div className="game"> {list[48].price} </div>
                            <div className="game"> {list[49].price} </div>
                            <div className="game"> {list[50].price} </div>
                            <div className="game"> {list[51].price} </div>
                            <div className="game"> {list[52].price} </div>
                            <div className="game"> {list[53].price} </div>
                            <div className="game"> {list[54].price} </div>
                            <div className="game"> {list[55].price} </div>
                            <div className="game"> {list[56].price} </div>
                            <div className="game"> {list[57].price} </div>
                            <div className="game"> {list[58].price} </div>
                            <div className="game"> {list[59].price} </div>
                            <div className="game"> {list[60].price} </div>
                            <div className="game"> {list[61].price} </div>
                            <div className="game"> {list[62].price} </div>
                            <div className="game"> {list[63].price} </div>
                            <div className="game"> {list[64].price} </div>
                            <div className="game"> {list[65].price} </div>
                            <div className="game"> {list[66].price} </div>
                            <div className="game"> {list[67].price} </div>
                            <div className="game"> {list[68].price} </div>
                            <div className="game"> {list[69].price} </div>
                            <div className="game"> {list[70].price} </div>
                            <div className="game"> {list[71].price} </div>
                            <div className="game"> {list[72].price} </div>
                            <div className="game"> {list[73].price} </div>
                            <div className="game"> {list[74].price} </div>
                            <div className="game"> {list[75].price} </div>
                            <div className="game"> {list[76].price} </div>
                            <div className="game"> {list[77].price} </div>
                            <div className="game"> {list[78].price} </div>
                            <div className="game"> {list[79].price} </div>
                            <div className="game"> {list[80].price} </div>
                            <div className="game"> {list[81].price} </div>
                            <div className="game"> {list[82].price} </div>
                            <div className="game"> {list[83].price} </div>
                            <div className="game"> {list[84].price} </div>
                            <div className="game"> {list[85].price} </div>
                            <div className="game"> {list[86].price} </div>
                            <div className="game"> {list[87].price} </div>
                            <div className="game"> {list[88].price} </div>
                            <div className="game"> {list[89].price} </div>
                            <div className="game"> {list[90].price} </div>
                            <div className="game"> {list[91].price} </div>
                            <div className="game"> {list[92].price} </div>
                            <div className="game"> {list[93].price} </div>
                            <div className="game"> {list[94].price} </div>
                            <div className="game"> {list[95].price} </div>
                            <div className="game"> {list[96].price} </div>
                            <div className="game"> {list[97].price} </div>
                            <div className="game"> {list[98].price} </div>
                        </div>
                        <div className="genres">
                            <div className="header"> Genre </div>
                            <div className="game"> {list[0].genres[0]} </div>
                            <div className="game"> {list[1].genres[0]} </div>
                            <div className="game"> {list[2].genres[0]} </div>
                            <div className="game"> {list[3].genres[0]} </div>
                            <div className="game"> {list[4].genres[0]} </div>
                            <div className="game"> {list[5].genres[0]} </div>
                            <div className="game"> {list[6].genres[0]} </div>
                            <div className="game"> {list[7].genres[0]} </div>
                            <div className="game"> {list[8].genres[0]} </div>
                            <div className="game"> {list[9].genres[0]} </div>
                            <div className="game"> {list[10].genres[0]} </div>
                            <div className="game"> {list[11].genres[0]} </div>
                            <div className="game"> {list[12].genres[0]} </div>
                            <div className="game"> {list[13].genres[0]} </div>
                            <div className="game"> {list[14].genres[0]} </div>
                            <div className="game"> {list[15].genres[0]} </div>
                            <div className="game"> {list[16].genres[0]} </div>
                            <div className="game"> {list[17].genres[0]} </div>
                            <div className="game"> {list[18].genres[0]} </div>
                            <div className="game"> {list[19].genres[0]} </div>
                            <div className="game"> {list[20].genres[0]} </div>
                            <div className="game"> {list[21].genres[0]} </div>
                            <div className="game"> {list[22].genres[0]} </div>
                            <div className="game"> {list[23].genres[0]} </div>
                            <div className="game"> {list[24].genres[0]} </div>
                            <div className="game"> {list[25].genres[0]} </div>
                            <div className="game"> {list[26].genres[0]} </div>
                            <div className="game"> {list[27].genres[0]} </div>
                            <div className="game"> {list[28].genres[0]} </div>
                            <div className="game"> {list[29].genres[0]} </div>
                            <div className="game"> {list[30].genres[0]} </div>
                            <div className="game"> {list[31].genres[0]} </div>
                            <div className="game"> {list[32].genres[0]} </div>
                            <div className="game"> {list[33].genres[0]} </div>
                            <div className="game"> {list[34].genres[0]} </div>
                            <div className="game"> {list[35].genres[0]} </div>
                            <div className="game"> {list[36].genres[0]} </div>
                            <div className="game"> {list[37].genres[0]} </div>
                            <div className="game"> {list[38].genres[0]} </div>
                            <div className="game"> {list[39].genres[0]} </div>
                            <div className="game"> {list[40].genres[0]} </div>
                            <div className="game"> {list[41].genres[0]} </div>
                            <div className="game"> {list[42].genres[0]} </div>
                            <div className="game"> {list[43].genres[0]} </div>
                            <div className="game"> {list[44].genres[0]} </div>
                            <div className="game"> {list[45].genres[0]} </div>
                            <div className="game"> {list[46].genres[0]} </div>
                            <div className="game"> {list[47].genres[0]} </div>
                            <div className="game"> {list[48].genres[0]} </div>
                            <div className="game"> {list[49].genres[0]} </div>
                            <div className="game"> {list[50].genres[0]} </div>
                            <div className="game"> {list[51].genres[0]} </div>
                            <div className="game"> {list[52].genres[0]} </div>
                            <div className="game"> {list[53].genres[0]} </div>
                            <div className="game"> {list[54].genres[0]} </div>
                            <div className="game"> {list[55].genres[0]} </div>
                            <div className="game"> {list[56].genres[0]} </div>
                            <div className="game"> {list[57].genres[0]} </div>
                            <div className="game"> {list[58].genres[0]} </div>
                            <div className="game"> {list[59].genres[0]} </div>
                            <div className="game"> {list[60].genres[0]} </div>
                            <div className="game"> {list[61].genres[0]} </div>
                            <div className="game"> {list[62].genres[0]} </div>
                            <div className="game"> {list[63].genres[0]} </div>
                            <div className="game"> {list[64].genres[0]} </div>
                            <div className="game"> {list[65].genres[0]} </div>
                            <div className="game"> {list[66].genres[0]} </div>
                            <div className="game"> {list[67].genres[0]} </div>
                            <div className="game"> {list[68].genres[0]} </div>
                            <div className="game"> {list[69].genres[0]} </div>
                            <div className="game"> {list[70].genres[0]} </div>
                            <div className="game"> {list[71].genres[0]} </div>
                            <div className="game"> {list[72].genres[0]} </div>
                            <div className="game"> {list[73].genres[0]} </div>
                            <div className="game"> {list[74].genres[0]} </div>
                            <div className="game"> {list[75].genres[0]} </div>
                            <div className="game"> {list[76].genres[0]} </div>
                            <div className="game"> {list[77].genres[0]} </div>
                            <div className="game"> {list[78].genres[0]} </div>
                            <div className="game"> {list[79].genres[0]} </div>
                            <div className="game"> {list[80].genres[0]} </div>
                            <div className="game"> {list[81].genres[0]} </div>
                            <div className="game"> {list[82].genres[0]} </div>
                            <div className="game"> {list[83].genres[0]} </div>
                            <div className="game"> {list[84].genres[0]} </div>
                            <div className="game"> {list[85].genres[0]} </div>
                            <div className="game"> {list[86].genres[0]} </div>
                            <div className="game"> {list[87].genres[0]} </div>
                            <div className="game"> {list[88].genres[0]} </div>
                            <div className="game"> {list[89].genres[0]} </div>
                            <div className="game"> {list[90].genres[0]} </div>
                            <div className="game"> {list[91].genres[0]} </div>
                            <div className="game"> {list[92].genres[0]} </div>
                            <div className="game"> {list[93].genres[0]} </div>
                            <div className="game"> {list[94].genres[0]} </div>
                            <div className="game"> {list[95].genres[0]} </div>
                            <div className="game"> {list[96].genres[0]} </div>
                            <div className="game"> {list[97].genres[0]} </div>
                            <div className="game"> {list[98].genres[0]} </div>
                        </div>
                        <div className="devs">
                            <div className="header"> Developer </div>
                            <div className="game"> {list[0].developer} </div>
                            <div className="game"> {list[1].developer} </div>
                            <div className="game"> {list[2].developer} </div>
                            <div className="game"> {list[3].developer} </div>
                            <div className="game"> {list[4].developer} </div>
                            <div className="game"> {list[5].developer} </div>
                            <div className="game"> {list[6].developer} </div>
                            <div className="game"> {list[7].developer} </div>
                            <div className="game"> {list[8].developer} </div>
                            <div className="game"> {list[9].developer} </div>
                            <div className="game"> {list[10].developer} </div>
                            <div className="game"> {list[11].developer} </div>
                            <div className="game"> {list[12].developer} </div>
                            <div className="game"> {list[13].developer} </div>
                            <div className="game"> {list[14].developer} </div>
                            <div className="game"> {list[15].developer} </div>
                            <div className="game"> {list[16].developer} </div>
                            <div className="game"> {list[17].developer} </div>
                            <div className="game"> {list[18].developer} </div>
                            <div className="game"> {list[19].developer} </div>
                            <div className="game"> {list[20].developer} </div>
                            <div className="game"> {list[21].developer} </div>
                            <div className="game"> {list[22].developer} </div>
                            <div className="game"> {list[23].developer} </div>
                            <div className="game"> {list[24].developer} </div>
                            <div className="game"> {list[25].developer} </div>
                            <div className="game"> {list[26].developer} </div>
                            <div className="game"> {list[27].developer} </div>
                            <div className="game"> {list[28].developer} </div>
                            <div className="game"> {list[29].developer} </div>
                            <div className="game"> {list[30].developer} </div>
                            <div className="game"> {list[31].developer} </div>
                            <div className="game"> {list[32].developer} </div>
                            <div className="game"> {list[33].developer} </div>
                            <div className="game"> {list[34].developer} </div>
                            <div className="game"> {list[35].developer} </div>
                            <div className="game"> {list[36].developer} </div>
                            <div className="game"> {list[37].developer} </div>
                            <div className="game"> {list[38].developer} </div>
                            <div className="game"> {list[39].developer} </div>
                            <div className="game"> {list[40].developer} </div>
                            <div className="game"> {list[41].developer} </div>
                            <div className="game"> {list[42].developer} </div>
                            <div className="game"> {list[43].developer} </div>
                            <div className="game"> {list[44].developer} </div>
                            <div className="game"> {list[45].developer} </div>
                            <div className="game"> {list[46].developer} </div>
                            <div className="game"> {list[47].developer} </div>
                            <div className="game"> {list[48].developer} </div>
                            <div className="game"> {list[49].developer} </div>
                            <div className="game"> {list[50].developer} </div>
                            <div className="game"> {list[51].developer} </div>
                            <div className="game"> {list[52].developer} </div>
                            <div className="game"> {list[53].developer} </div>
                            <div className="game"> {list[54].developer} </div>
                            <div className="game"> {list[55].developer} </div>
                            <div className="game"> {list[56].developer} </div>
                            <div className="game"> {list[57].developer} </div>
                            <div className="game"> {list[58].developer} </div>
                            <div className="game"> {list[59].developer} </div>
                            <div className="game"> {list[60].developer} </div>
                            <div className="game"> {list[61].developer} </div>
                            <div className="game"> {list[62].developer} </div>
                            <div className="game"> {list[63].developer} </div>
                            <div className="game"> {list[64].developer} </div>
                            <div className="game"> {list[65].developer} </div>
                            <div className="game"> {list[66].developer} </div>
                            <div className="game"> {list[67].developer} </div>
                            <div className="game"> {list[68].developer} </div>
                            <div className="game"> {list[69].developer} </div>
                            <div className="game"> {list[70].developer} </div>
                            <div className="game"> {list[71].developer} </div>
                            <div className="game"> {list[72].developer} </div>
                            <div className="game"> {list[73].developer} </div>
                            <div className="game"> {list[74].developer} </div>
                            <div className="game"> {list[75].developer} </div>
                            <div className="game"> {list[76].developer} </div>
                            <div className="game"> {list[77].developer} </div>
                            <div className="game"> {list[78].developer} </div>
                            <div className="game"> {list[79].developer} </div>
                            <div className="game"> {list[80].developer} </div>
                            <div className="game"> {list[81].developer} </div>
                            <div className="game"> {list[82].developer} </div>
                            <div className="game"> {list[83].developer} </div>
                            <div className="game"> {list[84].developer} </div>
                            <div className="game"> {list[85].developer} </div>
                            <div className="game"> {list[86].developer} </div>
                            <div className="game"> {list[87].developer} </div>
                            <div className="game"> {list[88].developer} </div>
                            <div className="game"> {list[89].developer} </div>
                            <div className="game"> {list[90].developer} </div>
                            <div className="game"> {list[91].developer} </div>
                            <div className="game"> {list[92].developer} </div>
                            <div className="game"> {list[93].developer} </div>
                            <div className="game"> {list[94].developer} </div>
                            <div className="game"> {list[95].developer} </div>
                            <div className="game"> {list[96].developer} </div>
                            <div className="game"> {list[97].developer} </div>
                            <div className="game"> {list[98].developer} </div>
                        </div>
                        <div className="pubs">
                            <div className="header"> Publisher </div>
                            <div className="game"> {list[0].publisher} </div>
                            <div className="game"> {list[1].publisher} </div>
                            <div className="game"> {list[2].publisher} </div>
                            <div className="game"> {list[3].publisher} </div>
                            <div className="game"> {list[4].publisher} </div>
                            <div className="game"> {list[5].publisher} </div>
                            <div className="game"> {list[6].publisher} </div>
                            <div className="game"> {list[7].publisher} </div>
                            <div className="game"> {list[8].publisher} </div>
                            <div className="game"> {list[9].publisher} </div>
                            <div className="game"> {list[10].publisher} </div>
                            <div className="game"> {list[11].publisher} </div>
                            <div className="game"> {list[12].publisher} </div>
                            <div className="game"> {list[13].publisher} </div>
                            <div className="game"> {list[14].publisher} </div>
                            <div className="game"> {list[15].publisher} </div>
                            <div className="game"> {list[16].publisher} </div>
                            <div className="game"> {list[17].publisher} </div>
                            <div className="game"> {list[18].publisher} </div>
                            <div className="game"> {list[19].publisher} </div>
                            <div className="game"> {list[20].publisher} </div>
                            <div className="game"> {list[21].publisher} </div>
                            <div className="game"> {list[22].publisher} </div>
                            <div className="game"> {list[23].publisher} </div>
                            <div className="game"> {list[24].publisher} </div>
                            <div className="game"> {list[25].publisher} </div>
                            <div className="game"> {list[26].publisher} </div>
                            <div className="game"> {list[27].publisher} </div>
                            <div className="game"> {list[28].publisher} </div>
                            <div className="game"> {list[29].publisher} </div>
                            <div className="game"> {list[30].publisher} </div>
                            <div className="game"> {list[31].publisher} </div>
                            <div className="game"> {list[32].publisher} </div>
                            <div className="game"> {list[33].publisher} </div>
                            <div className="game"> {list[34].publisher} </div>
                            <div className="game"> {list[35].publisher} </div>
                            <div className="game"> {list[36].publisher} </div>
                            <div className="game"> {list[37].publisher} </div>
                            <div className="game"> {list[38].publisher} </div>
                            <div className="game"> {list[39].publisher} </div>
                            <div className="game"> {list[40].publisher} </div>
                            <div className="game"> {list[41].publisher} </div>
                            <div className="game"> {list[42].publisher} </div>
                            <div className="game"> {list[43].publisher} </div>
                            <div className="game"> {list[44].publisher} </div>
                            <div className="game"> {list[45].publisher} </div>
                            <div className="game"> {list[46].publisher} </div>
                            <div className="game"> {list[47].publisher} </div>
                            <div className="game"> {list[48].publisher} </div>
                            <div className="game"> {list[49].publisher} </div>
                            <div className="game"> {list[50].publisher} </div>
                            <div className="game"> {list[51].publisher} </div>
                            <div className="game"> {list[52].publisher} </div>
                            <div className="game"> {list[53].publisher} </div>
                            <div className="game"> {list[54].publisher} </div>
                            <div className="game"> {list[55].publisher} </div>
                            <div className="game"> {list[56].publisher} </div>
                            <div className="game"> {list[57].publisher} </div>
                            <div className="game"> {list[58].publisher} </div>
                            <div className="game"> {list[59].publisher} </div>
                            <div className="game"> {list[60].publisher} </div>
                            <div className="game"> {list[61].publisher} </div>
                            <div className="game"> {list[62].publisher} </div>
                            <div className="game"> {list[63].publisher} </div>
                            <div className="game"> {list[64].publisher} </div>
                            <div className="game"> {list[65].publisher} </div>
                            <div className="game"> {list[66].publisher} </div>
                            <div className="game"> {list[67].publisher} </div>
                            <div className="game"> {list[68].publisher} </div>
                            <div className="game"> {list[69].publisher} </div>
                            <div className="game"> {list[70].publisher} </div>
                            <div className="game"> {list[71].publisher} </div>
                            <div className="game"> {list[72].publisher} </div>
                            <div className="game"> {list[73].publisher} </div>
                            <div className="game"> {list[74].publisher} </div>
                            <div className="game"> {list[75].publisher} </div>
                            <div className="game"> {list[76].publisher} </div>
                            <div className="game"> {list[77].publisher} </div>
                            <div className="game"> {list[78].publisher} </div>
                            <div className="game"> {list[79].publisher} </div>
                            <div className="game"> {list[80].publisher} </div>
                            <div className="game"> {list[81].publisher} </div>
                            <div className="game"> {list[82].publisher} </div>
                            <div className="game"> {list[83].publisher} </div>
                            <div className="game"> {list[84].publisher} </div>
                            <div className="game"> {list[85].publisher} </div>
                            <div className="game"> {list[86].publisher} </div>
                            <div className="game"> {list[87].publisher} </div>
                            <div className="game"> {list[88].publisher} </div>
                            <div className="game"> {list[89].publisher} </div>
                            <div className="game"> {list[90].publisher} </div>
                            <div className="game"> {list[91].publisher} </div>
                            <div className="game"> {list[92].publisher} </div>
                            <div className="game"> {list[93].publisher} </div>
                            <div className="game"> {list[94].publisher} </div>
                            <div className="game"> {list[95].publisher} </div>
                            <div className="game"> {list[96].publisher} </div>
                            <div className="game"> {list[97].publisher} </div>
                            <div className="game"> {list[98].publisher} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}