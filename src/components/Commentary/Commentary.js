import React, { useEffect, useState } from 'react'

const Commentary = ({run, strike, nonstrike, bowler, ballCount, over}) => {
    const [text,setText] = useState('');
    const positions = [
        "slip",
        "first Slip",
        "second Slip",
        "third Slip",
        "gully",
        "point",
        "cover",
        "mid-off",
        "mid-on",
        "long-off",
        "long-on",
        "square Leg",
        "fine Leg",
        "third Man",
        "deep Backward Square Leg",
        "silly Point",
        "forward Short Leg",
        "short Fine Leg",
        "short Leg"
    ];

    const out = ["run out", "caught", "bold", "LBW"];
    useEffect(()=> {
        if(run===1){
            const comment = strike + " score one run. Putting " + nonstrike + " into the bat.";
            setText(comment);
        }
        else if(run === 2){
            const comment = strike + " score two run."
            setText(comment);
        }
        else if(run === 3){
            const comment = strike + " score one run. Putting " + nonstrike + " into the bat.";
            setText(comment);
        }
        else if(run === 4){
            const idx = Math.floor(Math.random() * positions.length);
            const comment = "What a gorgeous shot. " + strike + " pushes it to " + positions[idx] + " and score four run."
            setText(comment);
        }
        else if(run === 6){
            const idx = Math.floor(Math.random() * positions.length);
            const comment = "What a gorgeous shot. " + strike + " hit it into the " + positions[idx] + " and score six run."
            setText(comment);
        }
        else if(run === 'W'){
            const idx = Math.floor(Math.random() * out.length);
            const comment = "That's a " + out[idx] + ". " + bowler + " takes the wicket with a great delivery."
            setText(comment);
        }
    })
  return (
    <div>{text}</div>
  )
}

export default Commentary;