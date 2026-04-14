import { useNavigate } from "react-router-dom";
import './campaigns.css'
export default function campaigns() {

    const navigate = useNavigate();

return(
<>
<div class="page">
        <title>Campaigns</title>
    <div className="main-header">
        <div className="spacer" /><h1>My Campaigns</h1>
        <br></br>
        <br></br>
        <div className="add-campaign-menu">
            <input type="button" id="add-campaign-button" />
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
        </div>
  </div>
  </div>
</>
);
}