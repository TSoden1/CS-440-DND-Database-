import { useNavigate } from "react-router-dom";
import {useState} from "react";
import './campaigns.css'
export default function campaigns() {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("meetTime");
    const [sortOrder, setSortOrder] = useState("asc");

    const [formValues, setFormValues] = useState({
        userName: "",
        charName: "",
        meetTime: ""
    });

    const handleInput = (e) => {
        const {name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const newCampaign = () => {
        setCampaigns([...campaigns, formValues]);

        setFormValues({userName:"", charName:"", meetTime:""});

        setShowPopup(false);
    }

    const closePopup = () => {
        setShowPopup(false);
    }


    const filteredCampaigns = campaigns
    .filter(c =>
        c.charName.toLowerCase().includes(search.toLowerCase()) ||
        c.userName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
        if (sortBy === "meetTime") {
        // Assume meetTime is a string like "2026-05-03 19:00:00" or similar
        const aTime = new Date(a.meetTime);
        const bTime = new Date(b.meetTime);
        return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
        }
        if (sortBy === "completed") {
        // If you add a completed field (true/false), sort by it
        const aVal = a.completed ? 1 : 0;
        const bVal = b.completed ? 1 : 0;
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }
        return 0;
    });
   
        
return(
<>
<div class="page">
        <title>Campaigns</title>
        <div className="nav-bar">
            <h4>Profile</h4>
            <h4>Characters</h4>
            <h4>Campaigns</h4>
        </div>
    <div className="main-header">
        <div className="spacer" /><h1>My Campaigns</h1>
        <br></br>
        <br></br>

        <div className="add-campaign-menu">
            <button onClick={() => setShowPopup(true)}>+</button>
        </div>
    </div>

    <div className="campaign-background-container">
        {/*Change to grid so that everything can line up properly*/}
        <div className="campaign-header-container container">
            <div className="campaign-header-item">
                <h2>Name:</h2>
            </div>    
            <div className="campaign-header-item">
                <h2>My Character:</h2>
            </div>
            <div className="campaign-header-item">
                <h2>Meet Time:</h2>
            </div>
            <div className="campaign-header-item">
                <h2>Started:</h2>
            </div>
            <div className="campaign-header-item">
                <h2>Finished:</h2>
            </div>
        </div>
{/* 
        <div className="campaign-item-container container">
            <div className="campaign-item">Frank</div>
            <div className="campaign-item">Ricky</div>
            <div className="campaign-item">12:00 Monday</div>
            <div className="campaign-item">
                <input type="checkbox" id="started-checkbox" name="started-checkbox" />
            </div>
            
            <div className="campaign-item">
                <input type="checkbox" id="finsihed-checkbox" name="finished-checkbox"/>
            </div>
        </div> */}

    <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
        <input
            type="text"
            placeholder="Search by campaign name"
            value={search}
            onChange={e => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="meetTime">Meet Time</option>
            <option value="completed">Completed</option>
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </div> 

        <div>
            {filteredCampaigns.map((c, i) => (
                <div key={i} className="campaign-item-container container">
                    <div className="campaign-item">{c.userName}</div>
                    <div className="campaign-item">{c.charName}</div>
                    <div className="campaign-item">{c.meetTime}</div>
                    
                    <div className="campaign-item">
                        <input type="checkbox" name="started-checkbox" />
                    </div>
                    
                    <div className="campaign-item">
                        <input type="checkbox" name="finished-checkbox"/>
                    </div>
                </div>            
            ))}
        </div>
  </div>
  </div>

{showPopup && (
    <div className="pop-up-overlay">
        <div className="pop-up-menu">
            <div className="closeBtn">
                <button onClick={closePopup}>X</button>
            </div>

            <h3>Enter in Your Name:</h3>
            <input name="userName" value={FormData.userName} onChange={handleInput} type="text" />

            <h3>Enter Your Character Name:</h3>
            <input name="charName" value={FormData.charName} onChange={handleInput} type="text" />

            <h3>Enter in the Meet Time:</h3>
            <input name="meetTime" value={FormData.meetTime} onChange={handleInput} type="text" />

            <br />

            <button onClick={newCampaign}>Submit</button>
        </div>
    </div>
        )}
    
</>
);
}