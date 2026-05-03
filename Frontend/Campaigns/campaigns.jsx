import { useNavigate } from "react-router-dom";
import {useState} from "react";
import './campaigns.css'
export default function CampaignCreation({ onCreateCampaign, onClose, initial }) {
    const [submitting, setSubmitting] = useState(false);
    const [formValues, setFormValues] = useState(
        initial
            ? { name: initial.name || "", charName: initial.characters || "", meetTime: initial.meetingTime || "" }
            : { name: "", charName: "", meetTime: "" }
    );

    const handleInput = (e) => {
        const {name, value } = e.target;

        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formValues.name) return;
        setSubmitting(true);
        await onCreateCampaign(formValues);
        setSubmitting(false);
        onClose();
    };



return(
    <div className="pop-up-overlay">
        <div className="pop-up-menu">
            <div className="closeBtn">
                <button type ="button" onClick={onClose}>X</button>
            </div>

            {/*<h3>Enter in Your Name:</h3>
            <input name="userName" value={FormData.userName} onChange={handleInput} type="text" />
            */}
            <h3>Enter Your Campaign Name:</h3>
                <input name="name" value={formValues.name} onChange={handleInput} type="text" />

             <h3>Enter Your Character Name:</h3>
            <input name="charName" value={FormData.charName} onChange={handleInput} type="text" />

            <h3>Enter in the Meet Time:</h3>
            <input name="meetTime" value={formValues.meetTime} onChange={handleInput} type="text" />
            <br />

            <button onClick={handleSubmit} disabled={submitting}>
                    {submitting ? "Saving..." : "Submit"}
            </button>
        </div>
    </div>
        
    );
}    
{/*<div class="page">
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

    <div className="campaign-background-container">*/}
        {/*Change to grid so that everything can line up properly*/}
        {/*<div className="campaign-header-container container">
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
        </div>*/}
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

       {/* <div>
            {campaigns.map((c, i) => (
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
  </div>*/}

{/*showPopup && (*/}
