import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



function CheckBoxChild({ ethnicity, onClick, label, color }){
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


function CheckBoxParent({ group, onClick, label, color, children, onClickChild }){
    // console.log(group)
    // console.log(group.children.map((child) => (child)))
return (
    <div>
    <FormControlLabel
        control={
            <Checkbox
                id={group.ethnicity_group}
                checked={group.selected}
                indeterminate={(group.selected === "indeterminate") ? true:false }
                onChange={(event) => {
                    onClick({
                            ethnicity_group: group.ethnicity_group,
                            color: group.color,
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

     <div>
            {children.map((child) => (
            <CheckBoxChild 
                key={child.ethnicity} 
                ethnicity={child} 
                // ethnicity_group={child.ethnicity_group}
                label={child.ethnicity} 
                color={child.color} 
                onClick={onClickChild}
            />
        ))}
        </div>
     </div>


    )
}

export default function Ethnicity( { activeEthnicity, onEthnicityClick, activeEthnicityGroup, onEthnicityGroupClick } ) {

    const organizedEthnicity = []
    const ethnicityOrganizer = activeEthnicityGroup.map((group) => {
        const ethnicityChildren = []
        activeEthnicity.map((ethnicity) => {
            if(ethnicity.ethnicity_group === group.ethnicity_group) {
                ethnicityChildren.push(ethnicity)
            }
        })
        organizedEthnicity.push({...group, "children": ethnicityChildren})
    }
    );
    // console.log(organizedEthnicity)

    return (
        <div>
            {organizedEthnicity.map((group) => (
            <CheckBoxParent 
                key={group.ethnicity_group} 
                group={group} 
                label={group.ethnicity_group} 
                color={group.color} 
                onClick={onEthnicityGroupClick}

                children={group.children}
                // keyChild={ethnicity.ethnicity} 
                // ethnicity={ethnicity} 
                // labelChild={ethnicity.ethnicity} 
                // colorChild={ethnicity.color} 
                onClickChild={onEthnicityClick}
            />
        ))}
        {/* {activeEthnicity.map((ethnicity) => (
            <CheckBox 
                key={ethnicity.ethnicity} 
                ethnicity={ethnicity} 
                ethnicity_group={ethnicity.ethnicity_group}
                label={ethnicity.ethnicity} 
                color={ethnicity.color} 
                onClick={onEthnicityClick}
            />
        ))} */}
        {/* {activeEthnicity.map((ethnicity) => (
            <CheckBox 
                key={ethnicity.ethnicity} 
                ethnicity={ethnicity} 
                ethnicity_group={ethnicity.ethnicity_group}
                label={ethnicity.ethnicity} 
                color={ethnicity.color} 
                onClick={onEthnicityClick}
            />
        ))} */}
        </div>
  );
}




// <FormControlLabel
// control={
//     <Checkbox
//         id={ethnicity.ethnicity}
//         checked={ethnicity.selected}
//         onChange={(event) => {
//             onClick({
//                     ...ethnicity,
//                     selected: event.target.checked,
//                 });
//             }}
//         sx={{
//             padding: "2px"
//             ,transition: "box-shadow .2s",
//                 '&:hover': {
//                     boxShadow: '0 0 0 10px rgba(145, 145, 145, 0.16)',
//                   },
//                   '&:before': {
//                     boxShadow:
//                       '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
//                   }
//             ,"& .MuiSvgIcon-root": { 
//                     fontSize: 28,
//                     color: {color},
//                 }
//             // ,backgroundColor: "transparent"
//             // ,"&.MuiButtonBase-root": {
//             //     disableRipple: false
//             // }
//             // ,"&.MuiCheckbox-root": {
//             // }
//         }}
//     />}
//  label={label}
// >
// </FormControlLabel>