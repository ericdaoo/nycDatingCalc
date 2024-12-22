import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function MarriageButton({ marriage, onClick, backgroundColor }) {
    return(
        <div className="genderButton">
    <Button 
        onClick={(event) => {
            onClick({
                    ...marriage
                });
            }}
        id={marriage.marriage}
        className="button"
        sx={{ 
            minWidth:"130px",
            height: "50px"
            ,color: "white"
            ,background: backgroundColor
            ,borderRadius: 28
            ,boxShadow: '0 2px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.02)'
            ,margin: "5px"
        }}
    >
            {marriage.marriage}
    </Button>
    </div>
    );
};


export default function Marriage({ activeMarriage, onMarriageClick }) {

    return (
        <div className="checkBoxContainerParent"> 
            
            <div className="genderContainer">
            <p className="description">I'm interested in</p>

            <div className="genderButtons">

                {activeMarriage.map((marriage) => (
                    <MarriageButton key={marriage.marriage} marriage={marriage} onClick={onMarriageClick} backgroundColor={marriage.selected ? marriage.color : "linear-gradient(.100turn, #212121, #808080)"}
                        />
                 ))}
            </div>
        </div>

        </div>

    );
  }
