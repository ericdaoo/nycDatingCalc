import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function CheckBox({ race, onClick, label, color }){
return (
    <FormControlLabel
        control=
            {<Checkbox
                checked={race.selected}
                onChange={(event) => {
                    onClick({
                            ...race,
                            selected: event.target.checked,
                        });
                    }}
                sx={{
                    padding: "2px"
                    ,transition: "box-shadow .2s",
                        '&:hover': {
                            boxShadow: '0 0 0 10px rgba(145, 145, 145, 0.16)',
                          },
                          '&:before': {
                            boxShadow:
                              '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
                          }
                    ,"& .MuiSvgIcon-root": { 
                            fontSize: 28,
                            color: {color},
                        }
                    // ,backgroundColor: "transparent"
                    // ,"&.MuiButtonBase-root": {
                    //     disableRipple: false
                    // }
                    // ,"&.MuiCheckbox-root": {
                    // }
                }}
            />}
         label={label}
    >
     </FormControlLabel>
    )
}

export default function Race( { activeRace, onRaceClick } ) {
  return (
        <FormGroup>
        {activeRace.map((race) => (
            <CheckBox key={race.race} race={race} label={race.race} color={race.color} onClick={onRaceClick}
                />
        ))}
        </FormGroup>
  );
}