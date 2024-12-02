import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function CheckBox({ ethnicity, onClick, label, color }){
return (
    <FormControlLabel
        control={
            <Checkbox
                id={ethnicity.ethnicity}
                checked={ethnicity.selected}
                onChange={(event) => {
                    onClick({
                            ...ethnicity,
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

export default function Ethnicity( { activeEthnicity, onEthnicityClick } ) {
    const x = activeEthnicity.map((ethnicity, index, arr) => {
        const prevGroup = arr[index - 1];
        if(prevGroup == null || (prevGroup?.ethnicity_group && ethnicity.ethnicity_group !== prevGroup.ethnicity_group)) {
            return(
            <div> 
            <CheckBox 
            key={ethnicity.ethnicity} 
            ethnicity={ethnicity} 
            ethnicity_group={ethnicity.ethnicity_group}
            label={ethnicity.ethnicity} 
            color={ethnicity.color} 
            onClick={onEthnicityClick}
        />
        <CheckBox 
            key={ethnicity.ethnicity} 
            ethnicity={ethnicity} 
            ethnicity_group={ethnicity.ethnicity_group}
            label={ethnicity.ethnicity} 
            color={ethnicity.color} 
            onClick={onEthnicityClick}
        />
         </div>
        )
        }
        else { 
return (
        <CheckBox 
            key={ethnicity.ethnicity} 
            ethnicity={ethnicity} 
            ethnicity_group={ethnicity.ethnicity_group}
            label={ethnicity.ethnicity} 
            color={ethnicity.color} 
            onClick={onEthnicityClick}
        />)
        }
        })
    return (
        <div>
            {x}
        {/* {activeEthnicity.map((ethnicity) => (
            <CheckBox 
                key={ethnicity.ethnicity} 
                ethnicity={ethnicity} 
                ethnicity_grouping={ethnicity.ethnicity_grouping}
                label={ethnicity.ethnicity} 
                color={ethnicity.color} 
                onClick={onEthnicityClick}
            />
        ))} */}
        </div>
  );
}