import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import GroupsIcon from '@mui/icons-material/Groups';
import HeightIcon from '@mui/icons-material/Height';
import PublicIcon from '@mui/icons-material/Public';
import ExtensionIcon from '@mui/icons-material/Extension';

import DataPull from "./DataPull"
import GenderButtons from "./Gender"
import AgeSlider from "./Age"
import Race from "./Race"
import raceSupport from "../support_files/race.json"

import Test from "./test"


export default function Calculator() {


    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }

    // States are used to both assign values to UI elements in child components and for calculating dating pool size in parent component.
    const [ageData, setAgeData] = useState(false);
    const [raceData, setRaceData] = useState(false);
    function handlePull(newData) {
        setAgeData(newData[0])
        setRaceData(newData[1])
    };
    const [gender, setGender] = useState(3);
    function handleGender(newGender) {
        setGender(newGender)
    };
    const [ageRange, setAgeRange] = useState([26,32]);
    function handleAge(newAgeRange) {
        setAgeRange(newAgeRange)
    };
    const [race, setRace] = useState(raceSupport);
    function handleRace(newRace) {
        setRace(
            race.map((r) => {
                if (r.race === newRace.race) {
                    return newRace;
                } else {
                    return r;
                }
            })
        )
    };


    // Dating pool calculation logic
    const [datingPoolCount, setDatingPoolCount] = useState(0)
    function handleCount(newDatingPoolCount) {
        setDatingPoolCount(newDatingPoolCount)
    };
  
    useEffect(() => {
        const test = []
        let datingPoolCountTemp = 0
        let racePercent = 0;

        if(ageData != false) { 
        if(gender > 0) {
            ageData.map(ageCount => {
                if(ageCount.age >= ageRange[0] && ageCount.age <= ageRange[1]){
                    test.push(Object.values(ageCount)[gender].replace(",", ""))
                    datingPoolCountTemp += parseInt(Object.values(ageCount)[gender].replace(",", ""))
                }
            })
            raceData.map(raceCount => {
                race.map(r => {
                    if(r.selected === true && r.race === raceCount.race) {
                        racePercent += parseFloat(raceCount["decimal"])
                    }
                })
            })
            if (racePercent > 1) {racePercent = 1}
            datingPoolCountTemp *= racePercent
            setDatingPoolCount(parseInt(datingPoolCountTemp).toLocaleString('en-US'))
            }
            else {
                datingPoolCountTemp = 0
                setDatingPoolCount(datingPoolCountTemp)
            }
        }
        else {
            datingPoolCountTemp = 0
            setDatingPoolCount(datingPoolCountTemp)
        }
    }, [ ageData, gender, ageRange, race])




    return (
        <div className="main-container">
        <p>{datingPoolCount} </p>

            <DataPull onPull={handlePull}/>

            <TabContext value={value} >
                
            <Box sx={{ width: 1, borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} style={{ overflow: "hidden" }}variant="scrollable" scrollButtons={true}  >
                <Tab label="Gender" value="1" icon={<WcIcon />}/>
                {/* <Tab label="Orientation" value="1" icon={<WcIcon />}/> */}
                <Tab label="Age" value="2" icon={<CakeIcon />}/>
                <Tab label="Height" value="3" icon={<HeightIcon />}/>
                <Tab label="Race" value="4" icon={<GroupsIcon />}/>
                <Tab label="Ethnicity" value="5" icon={<PublicIcon />}/>
                <Tab label="Ancestry" value="6" icon={<ExtensionIcon />}/>
                <Tab label="Test" value="10"/>

            </TabList>
            </Box>

                <TabPanel value="1">
                    <GenderButtons activeGender={gender} onGenderClick={handleGender}/>
                </TabPanel>
                <TabPanel value="2">
                    <AgeSlider activeGender={gender} ageRange={ageRange} onSlide={handleAge}/>
                </TabPanel>
                <TabPanel value="4">            
                    <Race activeRace={race} onRaceClick={handleRace}/>
                </TabPanel>
                <TabPanel value="10">            
                    <Test activeGender={gender} onGenderClick={handleGender}/>
                </TabPanel>
                

            </TabContext>
            

            
        </div>
)



// const test = <DataPull />
// const test2 = test.map(row => <li>{row.age}, {row.total_count}, {row.male_count}, {row.female_count}</li>)
// console.log(test2)
};