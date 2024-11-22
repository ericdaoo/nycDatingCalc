import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



function CheckBox({ onClick, label, checked }){
return (
    <FormControlLabel
    control={<Checkbox
        checked={checked}
        onClick={onClick}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
         />}
         label={label}
    >
     </FormControlLabel>
    )
}

export default function Race( { activeRace, onRaceClick } ) {
    console.log(activeRace[0]['race'])

      const handleClick = (event) => {
        onRaceClick({
            ...activeRace,
            selected: event.target.checked,
          });
      };
      
  return (
    // <div>
        <FormGroup>
      {activeRace.map((race) => (
          <CheckBox key={race.race} label={race.race} checked={race.selected} 
      onClick={handleClick}
       />
        // </li>
      ))}
    </FormGroup>
    //   <CheckBox label={activeRace[0].race} checked={activeRace[0].selected} 
    //   onClick={handleClick}
    //    />

  );
}