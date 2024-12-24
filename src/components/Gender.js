import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function GenderButton({ gender, onClick, backgroundColor }) {
    return (
        <div className="genderButton">
            <Button
                onClick={(event) => {
                    onClick({
                        ...gender
                    });
                }}
                id={gender.gender}
                className="button"
                sx={{
                    minWidth: "130px",
                    height: "50px"
                    , color: "white"
                    , background: backgroundColor
                    , borderRadius: 28
                    , boxShadow: '0 2px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.02)'
                    , margin: "5px"
                }}
            >
                {gender.gender}
            </Button>
        </div>
    );
};

function SexualityButton({ sexuality, onClick, backgroundColor }) {
    return (
        <div className="genderButton">
            <Button
                onClick={(event) => {
                    onClick({
                        ...sexuality
                    });
                }}
                id={sexuality.sexuality}
                className="button"
                sx={{
                    minWidth: "130px",
                    height: "50px"
                    , color: "white"
                    , background: backgroundColor
                    , borderRadius: 28
                    , boxShadow: '0 2px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.02)'
                    , margin: "5px"
                }}
            >
                {sexuality.sexuality}
            </Button>
        </div>
    );
};

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


export default function Gender({ activeGender, onGenderClick, activeSexuality, onSexualityClick, activeMarriage, onMarriageClick }) {

    return (
        <div className="wrapperScroll">

        <div className="checkBoxContainerParent">

            <div className="genderContainer">
                <p className="description">I'm interested in</p>

                <div className="genderButtons">

                    {activeGender.map((gender) => (
                        <GenderButton key={gender.gender} gender={gender} onClick={onGenderClick} backgroundColor={gender.selected ? gender.color : "linear-gradient(.100turn, #212121, #808080)"}
                        />
                    ))}
                </div>
                <div>
                    <p className="source">Source: U.S. Census Bureau, 2021 Household Pulse Survey</p>
                </div>
            </div>


            <div className="genderContainer">
                <p className="description">...who identify as</p>
                <div className="genderButtons">

                    {activeSexuality.map((sexuality) => (
                        <SexualityButton key={sexuality.sexuality} sexuality={sexuality} onClick={onSexualityClick} backgroundColor={sexuality.selected ? sexuality.color : "linear-gradient(.100turn, #212121, #808080)"}
                        />
                    ))}
                </div>
                <div>
                    <p className="source">Source: U.S. Census Bureau, 2021 Household Pulse Survey</p>
                </div>
            </div>


            <div className="genderContainer">
            <p className="description">...whose marital status is</p>

            <div className="genderButtons">

                {activeMarriage.map((marriage) => (
                    <MarriageButton key={marriage.marriage} marriage={marriage} onClick={onMarriageClick} backgroundColor={marriage.selected ? marriage.color : "linear-gradient(.100turn, #212121, #808080)"}
                        />
                 ))}
            </div>
            <div>
                    <p className="source">Source: U.S. Census Bureau, 2019-2023 American Community Survey</p>
                </div>
        </div>


        </div>

       </div>

    );
}