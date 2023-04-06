import './App.css';
import {Link} from "react-router-dom";
import {CSSProperties, useReducer, useState} from "react";
import BarLoader from "react-spinners/BarLoader";
import link from "./link.png";

let list = [];
let og_list = [];
export function App() {

    const url = `http://localhost:8888/getRecs?steam_id=%20`;
    const [id, setId] = useState('');
    let [loading, setLoading] = useState(false);

    const override: CSSProperties = {
        border: "1px solid #66c0f4",
        borderRadius: "5px",
        marginTop: "90px"
    };
    const handleClick = async () => {
        try {
            setLoading(true);
            list = await (await fetch(url + id)).json();
            list.forEach((g)=>{
                if (g.genres.split(',').length > 2 && g.genres.split(',')[0] === "Action") {
                    g.genres = g.genres.replace("Action,", "");
                }
                g.genres = g.genres.split(',');
                if (g.genres[0] === "Massively Multiplayer") {
                    g.genres[0] = "MMO";
                }
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
                } else if (g.title.includes("Hamlet")) {
                    g.title = "Hamlet";
                }
            });
            list = list.filter(g => g.price !== "Unknown" && g.genres !== "Unknown" && g.developer !== "Unknown" && g.publisher !== "Unknown").slice(0,99);
            og_list = list;
            setLoading(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                {/*<div className="circle2">2</div>*/}
                <div className="contain">
                    <div className="title">
                        Welcome to the Steam Game Recommender!
                    </div>
                    <div className="welcome">
                        Input your Steam ID, press Submit, wait for
                        recommendations to be generated, then click Next to view them.
                    </div>
                    <div className="results">
                        <div className="circle1">
                            <img className="img" src={link} alt=""/>
                        </div>
                        My Steam Public Profile Link
                        <div className="link-profile">
                            <input className="profile" type="text" placeholder="  Paste Steam ID here" value={id} onChange={e => setId(e.target.value)}/>
                            <button className="submit" onClick={handleClick}>Submit</button>
                        </div>
                    </div>
                    <BarLoader
                        cssOverride={override}
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
            case "ranks":
                list = list.sort((a, b) => (parseFloat(a.est*100000) < parseFloat(b.est*100000)) ? 1 : -1);
                forceUpdate();
                break;
            case "title":
                list = list.sort((a, b) => (a.title > b.title) ? 1 : -1);
                forceUpdate();
                break;
            case "genre":
                list = list.sort((a, b) => (a.genres[0] > b.genres[0]) ? 1 : -1);
                forceUpdate();
                break;
            case "price":
                list = list.sort((a, b) => (a.price > b.price) ? 1 : -1);
                forceUpdate();
                break;
            case "devs":
                list = list.sort((a, b) => (a.developer > b.developer) ? 1 : -1);
                forceUpdate();
                break;
            case "pubs":
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

    //List of Features: [Steam Achievements,Full controller support,Steam Trading Cards,Steam Workshop,Partial Controller Support,Steam Cloud,Stats,Steam Leaderboards,Includes level editor,Remote Play on Phone,Remote Play on Tablet,Remote Play on TV,Remote Play Together]
    //List of Multiplayer: [Single-player,Multi-player,PvP,Online PvP,Co-op,Online Co-op,Shared/Split Screen PvP,Shared/Split Screen,Cross-Platform Multiplayer]
    //List of Genres: []

    function handleFilter(term) {
        switch (term) {
            case "feats":
                list = list.filter(g => g.categories.includes("Full controller support"));
                forceUpdate();
                break;
            case "multi":
                forceUpdate();
                break;
            case "genre":
                forceUpdate();
                break;
            case "price":
                forceUpdate();
                break;
            case "devs":
                forceUpdate();
                break;
            case "pubs":
                forceUpdate();
                break;
            default:
                break;
        }
    }

    function handleClear() {
        list = og_list;
        forceUpdate();
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
                <div>
                    Sort:
                    <button className="filter1" onClick={() => handleSort("ranks")}>Rank</button>
                    <button className="filter" onClick={() => handleSort("title")}>Title</button>
                    <button className="filter" onClick={() => handleSort("genre")}>Genre</button>
                    <button className="filter" onClick={() => handleSort("price")}>Price</button>
                    <button className="filter" onClick={() => handleSort("devs")}>Developer</button>
                    <button className="filter" onClick={() => handleSort("pubs")}>Publisher</button>
                    {/*<button className="filter">Multiplayer</button>
                    <button className="filter">Length</button>
                    <button className="filter">Content Rating</button>
                    <button className="filter">User Rating</button>
                    <button className="filter">Critic Rating</button>*/}
                </div>
                <div>
                    Filter:
                    <button className="filter" onClick={() => handleFilter("feats")}>Features</button>
                    <button className="filter" onClick={() => handleFilter("multi")}>Multiplayer</button>
                    <button className="filter" onClick={() => handleFilter("genre")}>Genre</button>
                    <button className="filter" onClick={() => handleFilter("price")}>Price</button>
                    <button className="filter" onClick={() => handleFilter("devs")}>Developer</button>
                    <button className="filter" onClick={() => handleFilter("pubs")}>Publisher</button>
                    {/*<button className="filter">Length</button>
                    <button className="filter">Content Rating</button>
                    <button className="filter">User Rating</button>
                    <button className="filter">Critic Rating</button>*/}
                </div>
                <div>
                    Clear:
                    <button className="filter" onClick={() => handleClear()}>CLEAR</button>
                </div>
                <div className="rec-box">
                    <div className="rec-list">
                        <div className="games">
                            <div className="header"> Rank </div>
                            {list.map((g) => (<div className="game" key={list.indexOf(g)}>{list.indexOf(g)+1}</div>))}
                        </div>
                        <div className="titles">
                            <div className="header"> Title </div>
                            {list.map((g) => (<div className="game" key={list.indexOf(g)}>{g.title}</div>))}
                        </div>
                        <div className="prices">
                            <div className="header"> Price </div>
                            {list.map((g) => (<div className="game" key={list.indexOf(g)}>{g.price}</div>))}
                        </div>
                        <div className="genres">
                            <div className="header"> Genre </div>
                            {list.map((g) => (<div className="game" key={list.indexOf(g)}>{g.genres[0]}</div>))}
                        </div>
                        <div className="devs">
                            <div className="header"> Developer </div>
                            {list.map((g) => (<div className="game" key={list.indexOf(g)}>{g.developer}</div>))}
                        </div>
                        <div className="pubs">
                            <div className="header"> Publisher </div>
                            {list.map((g) => (<div className="game" key={list.indexOf(g)}>{g.publisher}</div>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}