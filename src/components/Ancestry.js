import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function CheckBoxChild({ ancestry, onClick, label, color }){
    return (
        <FormControlLabel
    control={
        <Checkbox
            id={ancestry.ancestry}
            checked={ancestry.selected}
            onChange={(event) => {
                onClick({
                        ...ancestry,
                        selected: event.target.checked,
                    });
                }}
            sx={{
                padding: "0px 0 0 0"
                ,"& .MuiSvgIcon-root": { 
                        fontSize: 28,
                        color: {color},
                    }
            }}
        />}
        sx={{
            padding: "12px 0 0 0",
        "& .MuiTypography-root": {
            lineHeight: "1.3"
          }
        }}
    label={label}
    >
    </FormControlLabel>
    )
}


function CheckBoxParent({ group, onClick, label, color, children, onClickChild }){
return (
    <div className="checkBoxParent">
    <FormControlLabel sx={{
                "& .MuiTypography-root": {
                    fontWeight: "550"
                    }}}
        control={
            <Checkbox
                id={group.ancestry_group}
                checked={group.selected}
                indeterminate={group.indeterminate}
                onChange={(event) => {
                    onClick({
                            ancestry_group: group.ancestry_group,
                            color: group.color,
                            selected: event.target.checked,
                        });
                    }}
                sx={{
                    padding: "2px"
                    ,fontWeight: "bold"
                    ,"& .MuiSvgIcon-root": { 
                            fontSize: 28,
                            color: {color},
                        }
                    ,"& .MuiTypography-root": {
                    padding: "20px"
                    ,fontWeight: "bold"
                    }
                }}
            />}
         label={label}
    >
     </FormControlLabel>

     <div className="checkBoxChild">
            {children.map((child) => (
            <CheckBoxChild 
                key={child.ancestry} 
                ancestry={child} 
                // ancestry_group={child.ancestry_group}
                label={child.ancestry} 
                color={child.color} 
                onClick={onClickChild}
            />
        ))}
        </div>
     </div>
    )
}

function ResetBox({ select, onClick }){
    return(
        <div className="openToAllBox">
        <FormControlLabel
            control=
            {<Checkbox
                id="open_to_all"
                checked={select}
                // {...select === "indeterminate" && {indeterminate:true}}
                onChange={(event) => {
                    onClick("ancestry", event.target.checked);
                    }}
                    sx={{
                        padding: "2px"
                        ,"& .MuiSvgIcon-root": { 
                                fontSize: 28,
                                color: "#D8D8D8",
                            }
                    }}
            ></Checkbox>}
            label="Open to All"
            >
                </FormControlLabel>
                </div>
    )
}

export default function Ancestry( { activeAncestry, onAncestryClick, activeAncestryGroup, onAncestryGroupClick, activeAncestryAll, resetter } ) {
    // Prepare data by organizing ethnicities into respective groups and inserting those nested objects into an array.
    const organizedAncestry = []
    const ancestryOrganizer = activeAncestryGroup.map((group) => {
        const ancestryChildren = []
        activeAncestry.map((ancestry) => {
            if(ancestry.ancestry_group === group.ancestry_group) {
                ancestryChildren.push(ancestry)
            }
        })
        organizedAncestry.push({...group, "children": ancestryChildren})
    }
    );
    // First we loop through each ancestry group and provide both ancestry group props and the ancestry children props.
    return (
        <div className="checkBoxContainerParent"> 
            <div className="ethnicityHeader">
                <ResetBox key="open_to_all" select={activeAncestryAll} onClick={resetter}/>

                <div className="scrollHUD">
                <p style={{color:"#cccccc", fontSize:"16px",fontWeight:"500"}}>Scroll</p>
                <ArrowForwardIcon sx={{color:"#cccccc"}}/>
            {/* <NavigateNextIcon sx={{color:"#D8D8D8", margin:"0 -5px 0 0"}}/>
            <NavigateNextIcon sx={{color:"#D8D8D8", margin:"0 -5px 0 0"}}/> */}
            </div>

        </div>
        <div className="checkBoxContainer">
            {organizedAncestry.map((group) => (
            <CheckBoxParent 
                key={group.ancestry_group} 
                group={group} 
                label={group.ancestry_group} 
                color={group.color} 
                onClick={onAncestryGroupClick}

                children={group.children}
                onClickChild={onAncestryClick}
            />
        ))}
        </div>
        </div>
  );
}