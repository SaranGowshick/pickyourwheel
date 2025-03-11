import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from "crypto-js";

const api_base="http://localhost:3001";
export const  PickerWheel=()=> {
    const [text, setText] = useState("");
    const [entries, setEntries] = useState([])
    console.log('entries',entries)

    const handleAddEntry = () => {
        if (text.trim() !== "") {
            setEntries([...entries, { id: entries.length + 1, text }]);
            setText(""); // Clear input field after adding
        }
    };

    const handleRemoveEntry = (id) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    const decrypt = async(payload) => {
        const bytes = CryptoJS.AES.decrypt(payload?.data,  "secret-key");
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        console.log('payload', decryptedText);
    }
    const handleSave = async (value) => {

        if(entries.length === 0){
            window.alert("Kindly add the entries...");
            return
        }
        const jsonData = {
            USER_ID: "1234",
            TRANS_ID: "8389229",
            DATE: new Date().toISOString(),
            ENTRIES: entries.map((entry, index) => ({
                ID: entry.id,
                POSITION: index + 1,
                TEXT: entry.text,
            })),
            mode:value,
        };

        let payload = {
                encrypted: true,
                data: CryptoJS.AES.encrypt(JSON.stringify(jsonData), "secret-key").toString(),
            };
        
        // await decrypt(payload)
        

            await fetch(api_base+`/pickwheels/savepickerwheel`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }).then(alert("Data Added SuccessFully"))
    };
  
    return (
        <div className='employee'>
        <div className="employee-form">
            <div className="employee-align">
                <div>Picker Wheel</div>
                <div className="input-container">
                    <input 
                        type='text' 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        placeholder="Enter text..."
                    />
                    <button className="add-btn" onClick={handleAddEntry}>+</button>
                </div>

                <div className="entries-list">
                    {entries.map((entry) => (
                        <div key={entry.id} className="entry" >
                            <span>{entry.text}</span>
                            <button className="remove-btn" onClick={() => handleRemoveEntry(entry.id)}>×</button>
                        </div>
                    ))}
                </div>
                <div className="pick-wheel-btn">
                <button className="add-btn" onClick={()=>handleSave("SAVE")}>Save</button>
                <button className="add-btn" onClick={()=>handleSave("UPDATE")}>Update</button>
                </div>
            </div>
        </div>
    </div>
    
    
    );
}
