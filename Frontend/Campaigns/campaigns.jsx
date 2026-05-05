import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import './campaigns.css'
import axios from "axios"

export default function campaigns() {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const [formValues, setFormValues] = useState({
        campaignName: "",
        characterName: "",
        meetTime: "",
        started: false,
        completed: false,
        isDM: false
    });

    const handleInput = (e) => {
        const {name, value, type, checked } = e.target;

        setFormValues({
            ...formValues,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const newCampaign = async () => {
        try {
            const response = await axios.post('http://localhost:3000/Campaigns', formValues);
        
            setCampaigns(prev => [...prev, formValues]);
            setFormValues({campaignName:"", characterName:"", meetTime:""});
            setShowPopup(false);
        } catch (error) {
            console.error("Error submitting campaign:", error);
        }        
    };

    const closePopup = () => {
        setShowPopup(false);
    }

    useEffect(() => {
        axios.get("http://localhost:3000/Campaigns").then(res => {
            setCampaigns(res.data);
        })
        .catch(err => {
            console.error("Error fetching campaigns:", err);
        });
    }, []);
     
return(
<>
<div className="page">
        <title>Campaigns</title>
        <div className="nav-bar">
            <h4 onClick={() => navigate('/Profile')}>Profile</h4>
            <h4 onClick={() => navigate('/Characters')}>Characters</h4>
            <h4 onClick={() => navigate('/Campaigns')}>Campaigns</h4>
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
                <h2>Campaign Name:</h2>
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
                <h2>Completed:</h2>
            </div>
            <div className="campaign-header-item">
                <h2>Is DM?:</h2>
            </div>
            
        </div>


        <div>
            {campaigns.map((c, i) => (
                <div key={c.id} className="campaign-item-container container">
                    <div className="campaign-item">{c.campaignName}</div>
                    <div className="campaign-item">{c.characterName}</div>
                    <div className="campaign-item">{c.meetTime}</div>
                    
                    <div className="campaign-item">
                        <input type="checkbox" name="started" checked={c.started} onChange={handleInput}/>
                    </div>
                    
                    <div className="campaign-item">
                        <input type="checkbox" name="completed" checked={c.completed} onChange={handleInput}/>
                    </div>

                    <div className="campaign-item">
                        <input type="checkbox" name="isDM" checked={c.isDM} onChange={handleInput}/>
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

            <h3>Enter in Your Campaign Name:</h3>
            <input name="campaignName" value={formValues.campaignName} onChange={handleInput} type="text" />

            <h3>Enter Your Character Name:</h3>
            <input name="characterName" value={formValues.characterName} onChange={handleInput} type="text" />

            <h3>Enter in the Meet Time:</h3>
            <input name="meetTime" value={formValues.meetTime} onChange={handleInput} type="datetime-local" />

            <br />

            <button onClick={newCampaign}>Submit</button>
        </div>
    </div>
        )}
    
</>
);
}