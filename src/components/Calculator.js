import React, { useEffect, useState } from 'react';

import DataPull from "./DataPull"
import GenderButtons from "./Gender"
import AgeSlider from "./Age"
import Race from "./Race"

import Test from "./test"


export default function Calculator() {
    // States are used to both assign values to UI elements in child components and for calculating dating pool size in parent component.
    const [ageData, setAgeData] = useState(false);
    function handlePull(newAgeData) {
        setAgeData(newAgeData)
};
    const [gender, setGender] = useState(3);
    function handleGender(newGender) {
        setGender(newGender)
};
    const [ageRange, setAgeRange] = useState([26,32]);
    function handleAge(newAgeRange) {
        setAgeRange(newAgeRange)
};


    // Dating pool calculation logic
    const test = []
    let datingPoolCountTemp = 0
    const [datingPoolCount, setDatingPoolCount] = useState(0)
    function handleCount(newDatingPoolCount) {
        setDatingPoolCount(newDatingPoolCount)
    };

    useEffect(() => {
        if(ageData != false) { 
        if(gender > 0) {
            ageData[0].map(ageCount => {
                if(ageCount.age >= ageRange[0] && ageCount.age <= ageRange[1]){
                    test.push(Object.values(ageCount)[gender].replace(",", ""))
                    datingPoolCountTemp += parseInt(Object.values(ageCount)[gender].replace(",", ""))
                }
            })
            setDatingPoolCount(datingPoolCountTemp.toLocaleString('en-US'))
            }
        }
        else {
            datingPoolCountTemp = 0
            setDatingPoolCount(datingPoolCountTemp)
        }
    }, [ ageData, gender, ageRange])




    return (
        <div className="main-container">
        <p>{datingPoolCount} </p>

            <DataPull onPull={handlePull}/>
            <GenderButtons 
            activeGender={gender} onGenderClick={handleGender}
            />
            <AgeSlider activeGender={gender} ageRange={ageRange} onSlide={handleAge}/>
            {/* <Race /> */}
            {/* <Test /> */}

            
        </div>
)



// const test = <DataPull />
// const test2 = test.map(row => <li>{row.age}, {row.total_count}, {row.male_count}, {row.female_count}</li>)
// console.log(test2)
};