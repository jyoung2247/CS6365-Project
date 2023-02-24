//import logo from './logo.svg';
import './App.css';
import Checkbox from 'muicss/lib/react/checkbox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
                          <Checkbox name="g1" label="lorem"/>
                          <Checkbox name="g2" label="ipsum"/>
                          <Checkbox name="g3" label="dolor"/>
                          <Checkbox name="g4" label="sit"/>
                          <Checkbox name="g5" label="amet"/>
                          <Checkbox name="g6" label="consectetur"/>
                          <Checkbox name="g7" label="adipiscing"/>
                          <Checkbox name="g8" label="elit"/>
                          <Checkbox name="g9" label="sed"/>
                          <Checkbox name="g10" label="do"/>
                          <Checkbox name="g11" label="eiusmod"/>
                          <Checkbox name="g12" label="tempor"/>
                          <Checkbox name="g13" label="incididunt"/>
                          <Checkbox name="g14" label="ut"/>
                          <Checkbox name="g15" label="labore"/>
                          <Checkbox name="g16" label="et"/>
                          <Checkbox name="g17" label="dolore"/>
                          <Checkbox name="g18" label="magna"/>
                          <Checkbox name="g19" label="aliqua"/>
                      </div>
                  </div>
              </div>
          </div>
          <button className="next">Next</button>
      </header>
    </div>
  );
}

export default App;
