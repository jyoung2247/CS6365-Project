import './App.css';
import {Link} from "react-router-dom";
import {CSSProperties, useReducer, useState} from "react";
import BarLoader from "react-spinners/BarLoader";
import link from "./link.png";

let models = ["SVD", "KNN_WM", "KNN_WZ", "SVDpp", "CoClustering", "SlopeOne"];
let list = [];
let og_list = [];
const features = ["Steam Achievements", "Full controller support", "Steam Trading Cards", "Steam Workshop", "Partial Controller Support", "Steam Cloud", "Stats", "Steam Leaderboards", "Includes level editor", "Remote Play on Phone", "Remote Play on Tablet", "Remote Play on TV", "Remote Play Together"].sort();
const multiplayer = ["Single-player", "Multi-player", "MMO", "PvP", "Online PvP", "Co-op", "Online Co-op", "Shared/Split Screen Co-op", "Shared/Split Screen PvP", "Shared/Split Screen", "Cross-Platform Multiplayer"].sort();
let genres = [];
let developers = [];
let publishers = [];
let price = [];
let length = [];
export function App() {

    const url = `http://localhost:8888/getRecs?steam_id=`;
    const [id, setId] = useState('');
    const [model, setModel] = useState('SVD');
    let [loading, setLoading] = useState(false);

    const override: CSSProperties = {
        border: "1px solid #66c0f4",
        borderRadius: "5px",
        marginTop: "65px"
    };

    function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
    }

    const handleClick = async () => {
        try {
            setLoading(true);
            og_list = await (await fetch(url + id + "?model_type=" + model)).json();
            og_list = list.filter(g => g.genres !== "Unknown" && g.developer !== "Unknown" && g.publisher !== "Unknown" && g.main_story !== "Unknown");
            og_list.forEach((g)=>{
                g.price = g.price.replace(" ", "");
                if (g.price === "Unknown") {
                    g.price = "$0.00"
                }
                g.price = g.price.replace("$","");
                g.price = parseFloat(g.price);
                if (g.genres.split(',').length > 2 && g.genres.split(',')[0] === "Action") {
                    g.genres = g.genres.replace("Action,", "");
                }
                g.genres = g.genres.split(',');
                if (g.genres[0] === "Massively Multiplayer") {
                    g.genres[0] = "MMO";
                }
                g.main_story = Number(g.main_story.toFixed(3));

                if (g.developer.includes(", Inc.")) {
                    g.developer = g.developer.replace(", Inc.", "");
                } else if (g.developer.includes(", LLC.")) {
                    g.developer = g.developer.replace(", LLC.", "");
                } else if (g.developer.includes(", Inc")) {
                    g.developer = g.developer.replace(", Inc", "");
                } else if (g.developer.includes(", LLC")) {
                    g.developer = g.developer.replace(", LLC", "");
                } else if (g.developer.includes(", LTD.")) {
                    g.developer = g.developer.replace(", LTD.", "");
                } else if (g.developer.includes(", Ltd.")) {
                    g.developer = g.developer.replace(", Ltd.", "");
                } else if (g.developer.includes(" Ltd.")) {
                    g.developer = g.developer.replace(" Ltd.", "");
                } else if (g.developer.includes(", LTD")) {
                    g.developer = g.developer.replace(", LTD", "");
                } else if (g.developer.includes(", Ltd")) {
                    g.developer = g.developer.replace(", Ltd", "");
                } else if (g.developer.includes(", INC.")) {
                    g.developer = g.developer.replace(", INC.", "");
                }

                if (g.developer.includes("FromSoftware")) {
                    g.developer = "FromSoftware";
                    g.publisher = "FromSoftware";
                } else if (g.publisher.includes("Eidos Montreal")) {
                    g.developer = "Eidos Montreal";
                    g.publisher = "Eidos Interactive";
                } else if (g.publisher.includes("Warner Bros.")) {
                    g.publisher = "Warner Bros.";
                } else if (g.developer.includes("Wangyuan Shengtang Entertainment Technology")) {
                    g.developer = "Wangyuan Shengtang Entertainment Technology";
                } else if (g.developer.includes("Ubisoft")) {
                    g.developer = "Ubisoft";
                } else if (g.developer.includes(", a Ubisoft Studio")) {
                    g.developer = g.developer.replace(", a Ubisoft Studio", "(a Ubisoft Studio)")
                } else if (g.publisher.includes("Raiser Games")) {
                    g.publisher = "Raiser Games";
                }

                if (g.publisher.includes(", Inc.")) {
                    g.publisher = g.publisher.replace(", Inc.", "");
                } else if (g.publisher.includes(", LLC.")) {
                    g.publisher = g.publisher.replace(", LLC.", "");
                } else if (g.publisher.includes(", Inc")) {
                    g.publisher = g.publisher.replace(", Inc", "");
                } else if (g.publisher.includes(", LLC")) {
                    g.publisher = g.publisher.replace(", LLC", "");
                } else if (g.publisher.includes(", LTD.")) {
                    g.publisher = g.publisher.replace(", LTD.", "");
                } else if (g.publisher.includes(", Ltd.")) {
                g.publisher = g.publisher.replace(", Ltd.", "");
                } else if (g.publisher.includes(", LTD")) {
                    g.publisher = g.publisher.replace(", LTD", "");
                } else if (g.publisher.includes(", Ltd")) {
                    g.publisher = g.publisher.replace(", Ltd", "");
                } else if (g.publisher.includes(", INC.")) {
                    g.publisher = g.publisher.replace(", INC.", "");
                }

                if (g.title.includes("龙崖")) {
                    g.title.replace("龙崖", "");
                } else if (g.title.includes("Hamlet")) {
                    g.title = "Hamlet";
                }

                let devs = g.developer.split(',');
                let d = devs.length;
                let pubs = g.publisher.split(',');
                let p = pubs.length;
                if (d >= 3) {
                    g.developer = devs[0];
                }
                if (p >= 3) {
                    g.publisher = pubs[0];
                }

                price.push(g.price);
                length.push(g.main_story);
                genres = [...genres, ...g.genres];
                developers = [...developers, ...devs];
                publishers = [...publishers, ...pubs];
            });
            price = price.sort((a, b) => (a.price > b.price) ? 1 : -1)
            price = removeDuplicates(price);
            length = length.sort((a, b) => (a.main_story > b.main_story) ? 1 : -1)
            length = removeDuplicates(length);
            genres = removeDuplicates(genres.sort());
            developers = removeDuplicates(developers.sort());
            publishers = removeDuplicates(publishers.sort());

            console.log(og_list);
            list = og_list.slice(0,99);
            setLoading(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="contain">
                    <div className="title">
                        Welcome to the Steam Game Recommender!
                    </div>
                    <div className="welcome">
                        Select a model, input Steam ID, press Submit, generate recommendations,
                        and click Next to view them.
                    </div>
                    <div className="radio">
                        Model:
                        {models.map((m) => (<label key={m} className="model"> <input type="radio" value={m} checked={model === m} onChange={() => setModel(m)}/>{m}</label>))}
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
                    <div className="link">
                        <Link to="/list">
                            <button disabled={loading} className="next">Next</button>
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
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);

    const prices = price.sort(function(a, b){
        return a - b;
    });
    const lengths = length.sort(function(a, b){
        return a - b;
    });

    const handleOpen = (num) => {
        switch (num) {
            case 1:
                setOpen1(!open1);
                break;
            case 2:
                setOpen2(!open2);
                break;
            case 3:
                setOpen3(!open3);
                break;
            case 4:
                setOpen4(!open4);
                break;
            case 5:
                setOpen5(!open5);
                break;
            case 6:
                setOpen6(!open6);
                break;
            default:
                break;
        }
    };

    function handleSort(term){
        switch (term) {
            case "ranks":
                list = og_list.sort((a, b) => (parseFloat(a.est*100000) < parseFloat(b.est*100000)) ? 1 : -1).slice(0,99);
                forceUpdate();
                break;
            case "title":
                list = og_list.sort((a, b) => (a.title > b.title) ? 1 : -1).slice(0,99).slice(0,99);
                forceUpdate();
                break;
            case "genre":
                list = og_list.sort((a, b) => (a.genres[0] > b.genres[0]) ? 1 : -1).slice(0,99);
                forceUpdate();
                break;
            case "price":
                list = og_list.sort((a, b) => (a.price > b.price) ? 1 : -1).slice(0,99);
                forceUpdate();
                break;
            case "length":
                list = og_list.sort((a, b) => (a.main_story > b.main_story) ? 1 : -1).slice(0,99);
                forceUpdate();
                break;
            case "devs":
                list = og_list.sort((a, b) => (a.developer > b.developer) ? 1 : -1).slice(0,99);
                forceUpdate();
                break;
            case "pubs":
                list = og_list.sort((a, b) => (a.publisher > b.publisher) ? 1 : -1).slice(0,99);
                forceUpdate();
                break;
            default:
                if (ignored) {
                    forceUpdate();
                }
                break;
        }
    }

    function handleFilter(cat, term) {
        switch (cat) {
            case "genre":
                list = og_list.filter(g => g.genres.includes(term)).slice(0,99);
                forceUpdate();
                break;
            case "price":
                list = og_list.filter(g => g.price <= term).slice(0,99);
                forceUpdate();
                break;
            case "length":
                list = og_list.filter(g => g.main_story <= term).slice(0,99);
                forceUpdate();
                break;
            case "devs":
                list = og_list.filter(g => g.developer.includes(term)).slice(0,99);
                forceUpdate();
                break;
            case "pubs":
                list = og_list.filter(g => g.publisher.includes(term)).slice(0,99);
                forceUpdate();
                break;
            default:
                list = og_list.filter(g => g.categories.includes(term)).slice(0,99);
                forceUpdate();
                break;
        }
    }

    function handleClear() {
        list = og_list.slice(0,99);
        forceUpdate();
    }

    return (
        <div className="recs">
            <div className="top">
                <div className="link">
                    <Link to="/">
                        <button className="back">Back</button>
                    </Link>
                </div>
                <div className="result">Results</div>
            </div>
            <div className="results">
                <div>
                    Sort:
                    <button className="filter1" onClick={() => handleSort("ranks")}>Rank</button>
                    <button className="filter" onClick={() => handleSort("title")}>Title</button>
                    <button className="filter" onClick={() => handleSort("genre")}>Genre</button>
                    <button className="filter" onClick={() => handleSort("price")}>Price</button>
                    <button className="filter" onClick={() => handleSort("length")}>Length</button>
                    <button className="filter" onClick={() => handleSort("devs")}>Developer</button>
                    {/*<button className="filter" onClick={() => handleSort("pubs")}>Publisher</button>
                    <button className="filter" onClick={() => handleSort("content")}>Content Rating</button>
                    <button className="filter" onClick={() => handleSort("users")}>User Rating</button>
                    <button className="filter" onClick={() => handleSort("critic")}>Critic Rating</button>*/}
                </div>
                <div className="filters">
                    Filter:
                    <div>
                        <button className="filter" onClick={() => handleOpen(1)}>Features</button>
                        {open1 ? (
                            <ul className="menu">
                                {features.map((f) => (<li className="menu-item" key={f}> <button onClick={() => handleFilter("feats", f)}>{f}</button></li>))}
                            </ul>
                        ) : null}
                    </div>
                    <div>
                        <button className="filter" onClick={() => handleOpen(2)}>Multiplayer</button>
                        {open2 ? (
                            <ul className="menu">
                                {multiplayer.map((m) => (<li className="menu-item" key={(m)}> <button onClick={() => handleFilter("multi", m)}>{m}</button></li>))}
                            </ul>
                        ) : null}
                    </div>
                    <div>
                        <button className="filter" onClick={() => handleOpen(3)}>Genre</button>
                        {open3 ? (
                            <ul className="menu">
                                {genres.map((g) => (<li className="menu-item" key={(g)}> <button onClick={() => handleFilter("genre", g)}>{g}</button></li>))}
                            </ul>
                        ) : null}
                    </div>
                    <div>
                        <button className="filter" onClick={() => handleOpen(4)}>Price</button>
                        {open4 ? (
                            <ul className="menu">
                                {prices.map((p) => (<li className="menu-item" key={(p)}> <button onClick={() => handleFilter("price", p)}>{p}</button></li>))}
                            </ul>
                        ) : null}
                    </div>
                    <div>
                        <button className="filter" onClick={() => handleOpen(5)}>Length</button>
                        {open5 ? (
                            <ul className="menu">
                                {lengths.map((l) => (<li className="menu-item" key={(l)}> <button onClick={() => handleFilter("length", l)}>{l}</button></li>))}
                            </ul>
                        ) : null}
                    </div>
                    <div>
                        <button className="filter" onClick={() => handleOpen(6)}>Developer</button>
                        {open6 ? (
                            <ul className="menu">
                                {developers.map((d) => (<li className="menu-item" key={(d)}> <button onClick={() => handleFilter("devs", d)}>{d}</button></li>))}
                            </ul>
                        ) : null}
                    </div>
                    {/*<button className="filter">Publisher</button>
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
                            {list.map((g) => (<div className="game" key={og_list.indexOf(g)}>{og_list.indexOf(g)+1}</div>))}
                        </div>
                        <div className="titles">
                            <div className="header"> Title </div>
                            {list.map((g) => (<div className="game" key={list.indexOf(g)}>{g.title}</div>))}
                        </div>
                        <div className="prices">
                            <div className="header"> Price ($) </div>
                            {list.map((g) => (<div className="game" key={list.indexOf(g)}>{g.price}</div>))}
                        </div>
                        <div className="length">
                            <div className="header"> Length (H) </div>
                            {list.map((g) => (<div className="game" key={list.indexOf(g)}>{g.main_story}</div>))}
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