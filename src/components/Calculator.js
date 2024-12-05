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
import FilterVintageIcon from '@mui/icons-material/FilterVintage';

import DataPull from "./DataPull"
import GenderButtons from "./Gender"
import AgeSlider from "./Age"
import Race from "./Race"
import raceSupport from "../support_files/raceSupport.json"
import Ethnicity from "./Ethnicity"
import ethnicitySupport from "../support_files/ethnicitySupport.json"
import ethnicityGroupSupport from "../support_files/ethnicityGroupSupport.json"

import Test from "./test"


export default function Calculator() {

    // States are used to both assign values to UI elements in child components and for calculating dating pool size in parent component.
    const [ageData, setAgeData] = useState(false);
    const [raceData, setRaceData] = useState(false);
    const [ethnicityData, setEthnicityData] = useState(false);
    function handlePull(newData) {
        setAgeData(newData[0])
        setRaceData(newData[1])
        setEthnicityData(newData[2])
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

    const [ethnicity, setEthnicity] = useState(ethnicitySupport);
    function handleEthnicity(newEthnicity) {
        // First update selected ethnicity checkbox.
        // Note 1
        const ethnicityTemp = 
            ethnicity.map((e) => {
                if (e.ethnicity === newEthnicity.ethnicity) {
                    return newEthnicity;
                } else {
                    return e;
                }
            })
        setEthnicity(ethnicityTemp)
        // Obtain only ethnicities in ethnicity group of interest.
        const ethnicityGroupTemp = [] 
            ethnicityTemp.map((e) => {
                if (e.ethnicity_group === newEthnicity.ethnicity_group) {
                    return ethnicityGroupTemp.push(e);
                }
            })
        // Determine whether all, none, or some ethnicity check boxes of an ethnicity group are selected.
        const allChildrenSelected = () => {
            if(ethnicityGroupTemp.every((e) => e.selected === true)) {return true}
            else if(ethnicityGroupTemp.every((e) => e.selected === false)) {return false}
            else {return "indeterminate"}
        }
        // Update ethnicityGroup selected value based on if the ethnicity that was just selected made it so that all, none, or some of the ethnicity group's ethnicity boxes were selected.
        setEthnicityGroup(
            ethnicityGroup.map((g) => {
                if (g.ethnicity_group === newEthnicity.ethnicity_group) {
                    if(allChildrenSelected() === true || allChildrenSelected() === false)  
                        {return {...g
                        ,selected: allChildrenSelected()
                        ,indeterminate: false};
                        }
                    else {return {...g
                        ,indeterminate: true}
                    }
                } else {
                    return g;
                }
            })
        )
    }

    const [ethnicityGroup, setEthnicityGroup] = useState(ethnicityGroupSupport);
    function handleEthnicityGroup(newEthnicityGroup) {
        setEthnicityGroup(
            ethnicityGroup.map((g) => {
                if (g.ethnicity_group === newEthnicityGroup.ethnicity_group) {
                    return newEthnicityGroup;
                } else {
                    return g;
                }
            })
        )
        setEthnicity(
            ethnicity.map((e) => {
                if (e.ethnicity_group === newEthnicityGroup.ethnicity_group) {
                    e.selected = newEthnicityGroup.selected ? true:false
                    return e;
                } else {
                    return e;
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


    // This state is used by the TabContext component that controls the menu tabs
    const [tabValue, setTabValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    }

    return (
        <div className="main-container">
        <h1>{datingPoolCount} </h1>

            <DataPull onPull={handlePull}/>

            <TabContext value={tabValue} >
                
            <Box sx={{ width: "120%", borderBottom: 1, borderColor: 'divider', display:"flex", justifyContent:"center" }}>
                <TabList 
                    onChange={handleChange} style={{ overflow: "hidden" }}
                    variant="scrollable" scrollButtons={true} allowScrollButtonsMobile={true}  
                    //TabIndicatorProps={{style: {background:'#89F0DD'}}}
                    >

                    <Tab label="Gender" value="1" icon={<WcIcon />} style={{ minWidth: 50 }}/>
                    {/* <Tab label="Orientation" value="1" icon={<WcIcon />}/> */}
                    <Tab label="Age" value="2" icon={<CakeIcon />} style={{ minWidth: 50 }}/>
                    <Tab label="Height" value="3" icon={<HeightIcon />} style={{ minWidth: 50 }}/>
                    <Tab label="Race" value="4" icon={<GroupsIcon />} style={{ minWidth: 50 }}/>
            
                    <Tab label="Ethnicity" value="5" icon={<PublicIcon />} style={{ minWidth: 50 }}/>
                    <Tab label="Ancestry" value="6" icon={<FilterVintageIcon />} style={{ minWidth: 50 }}/>
                    <Tab label="Test" value="10"style={{ minWidth: 50 }}/>

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
                <TabPanel value="5">            
                    <Ethnicity 
                        activeEthnicity={ethnicity} onEthnicityClick={handleEthnicity} 
                        activeEthnicityGroup={ethnicityGroup} onEthnicityGroupClick={handleEthnicityGroup} />
                </TabPanel>
                <TabPanel value="10">            
                    <Test activeGender={gender} onGenderClick={handleGender}/>
                </TabPanel>
                

            </TabContext>
            

            
        </div>
)

};


//Note1: The reason we need this ethnicityTemp value is because, before, I was calling setEthnicity directly and then trying to access that updated ethnicity field in the function below that checks to see if every ethnicity in a particuar ethnicityGroup was selected. Since states are update immediately, the second function wasn't working because it was still receiving the old ethnicity state before the update. By using this ethnicityTemp value, we can immediately use it in the second function since the assignment is sychronously defined first before the function uses it.