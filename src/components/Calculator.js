import React, { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
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
import genderSupport from "../support_files/genderSupport.json"
import GenderButtons from "./Gender"
import AgeSlider from "./Age"
import Race from "./Race"
import raceSupport from "../support_files/raceSupport.json"
import Ethnicity from "./Ethnicity"
import ethnicitySupport from "../support_files/ethnicitySupport.json"
import ethnicityGroupSupport from "../support_files/ethnicityGroupSupport.json"
import Ancestry from "./Ancestry"
import ancestrySupport from "../support_files/ancestrySupport.json"
import ancestryGroupSupport from "../support_files/ancestryGroupSupport.json"

import Test from "./test"


export default function Calculator() {

    // States are used to both assign values to UI elements in child components and for calculating dating pool size in parent component.
    const [ageData, setAgeData] = useState(false);
    const [genderIdentityData, setGenderIdentityData] = useState();
    const [raceData, setRaceData] = useState();
    const [ethnicityData, setEthnicityData] = useState();
    const [ancestryData, setAncestryData] = useState();
    function handlePull(newData) {
        setAgeData(newData[0])
        setGenderIdentityData(newData[4])
        setRaceData(newData[1])
        setEthnicityData(newData[2])
        setAncestryData(newData[3])
    };

    const [gender, setGender] = useState(genderSupport);
    function handleGender(newGender) {
        const genderTemp = 
            gender.map((g) => {
                    if (g.gender === newGender.gender) {
                        return {...newGender, selected: !newGender.selected};
                    } else {
                        return g;
                    }
                })
        setGender(genderTemp)
    };

    // function handleGenderIdentity(newGenderIdentity) {
    //     setGenderIdentity(newGenderIdentity)
    // };

    const [ageRange, setAgeRange] = useState([26,32]);
    function handleAge(newAgeRange) {
        setAgeRange(newAgeRange)
    };

    const [activeEthnicityTab, setActiveEthnicityTab] = useState(1)
    //👥👥👥
    const [raceAll, setRaceAll] = useState(true);
    const [race, setRace] = useState(raceSupport);
    function handleRace(newRace) {
        setActiveEthnicityTab(1)
        const raceTemp = 
            race.map((r) => {
                if (r.race === newRace.race) {
                    return newRace;
                } else {
                    return r;
                }
            })
        setRace(raceTemp)

        if(raceTemp.every((e) => e.selected === true)) {setRaceAll(true)}
        else {setRaceAll(false)}
    };
    //🌎🌎🌎
    const [ethnicityAll, setEthnicityAll] = useState(true);
    const [ethnicity, setEthnicity] = useState(ethnicitySupport);
    function handleEthnicity(newEthnicity) {
        setActiveEthnicityTab(2)
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

        if(ethnicityTemp.every((e) => e.selected === true)) {setEthnicityAll(true)}
        else {setEthnicityAll(false)}

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
        setActiveEthnicityTab(2)
        setEthnicityGroup(
            ethnicityGroup.map((g) => {
                if (g.ethnicity_group === newEthnicityGroup.ethnicity_group) {
                    return newEthnicityGroup;
                } else {
                    return g;
                }
            })
        )
        const ethnicityTemp = 
            ethnicity.map((e) => {
                if (e.ethnicity_group === newEthnicityGroup.ethnicity_group) {
                    e.selected = newEthnicityGroup.selected ? true:false
                    return e;
                } else {
                    return e;
                }
            })
        setEthnicity(ethnicityTemp)

        if(ethnicityTemp.every((e) => e.selected === true)) {setEthnicityAll(true)}
        else {setEthnicityAll(false)}
    };

    //🌻🌻🌻
    const [ancestryAll, setAncestryAll] = useState(true);
    const [ancestry, setAncestry] = useState(ancestrySupport);
    function handleAncestry(newAncestry) {
        setActiveEthnicityTab(3)
        // First update selected ancestry checkbox.
        // Note 1
        const ancestryTemp = 
            ancestry.map((e) => {
                if (e.ancestry === newAncestry.ancestry) {
                    return newAncestry;
                } else {
                    return e;
                }
            })
        setAncestry(ancestryTemp)

        if(ancestryTemp.every((e) => e.selected === true)) {setAncestryAll(true)}
        else {setAncestryAll(false)}

        // Obtain only ethnicities in ancestry group of interest.
        const ancestryGroupTemp = [] 
            ancestryTemp.map((e) => {
                if (e.ancestry_group === newAncestry.ancestry_group) {
                    return ancestryGroupTemp.push(e);
                }
            })
        // Determine whether all, none, or some ancestry check boxes of an ancestry group are selected.
        const allChildrenSelected = () => {
            if(ancestryGroupTemp.every((e) => e.selected === true)) {return true}
            else if(ancestryGroupTemp.every((e) => e.selected === false)) {return false}
            else {return "indeterminate"}
        }
        // Update ancestryGroup selected value based on if the ancestry that was just selected made it so that all, none, or some of the ancestry group's ancestry boxes were selected.
        setAncestryGroup(
            ancestryGroup.map((g) => {
                if (g.ancestry_group === newAncestry.ancestry_group) {
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

    const [ancestryGroup, setAncestryGroup] = useState(ancestryGroupSupport);
    function handleAncestryGroup(newAncestryGroup) {
        setActiveEthnicityTab(3)
        setAncestryGroup(
            ancestryGroup.map((g) => {
                if (g.ancestry_group === newAncestryGroup.ancestry_group) {
                    return newAncestryGroup;
                } else {
                    return g;
                }
            })
        )
        const ancestryTemp = 
            ancestry.map((e) => {
                if (e.ancestry_group === newAncestryGroup.ancestry_group) {
                    e.selected = newAncestryGroup.selected ? true:false
                    return e;
                } else {
                    return e;
                }
            })
        setAncestry(ancestryTemp)

        if(ancestryTemp.every((e) => e.selected === true)) {setAncestryAll(true)}
        else {setAncestryAll(false)}
    };


    // Helper Functions
    function resetter (formName, active) {
        if(formName === 'race') {
            setActiveEthnicityTab(1)
            setRaceAll(active)
            setRace(
                race.map((r) => {
                    return {...r, selected: active}
                })
            )
        }
        else if(formName === 'ethnicity') {
            setActiveEthnicityTab(2)
            setEthnicityAll(active)
            setEthnicityGroup(
                ethnicityGroup.map((e) => {
                    return {...e, selected: active, indeterminate: false}
                })
            )
            setEthnicity(
                ethnicity.map((e) => {
                    return {...e, selected: active, indeterminate: false}
                })
            )
        }
        else if(formName === 'ancestry') {
            setActiveEthnicityTab(3)
            setAncestryAll(active)
            setAncestryGroup(
                ancestryGroup.map((e) => {
                    return {...e, selected: active, indeterminate: false}
                })
            )
            setAncestry(
                ancestry.map((e) => {
                    return {...e, selected: active, indeterminate: false}
                })
            )
        }

    }


    // Dating pool calculation logic
    const [datingPoolCount, setDatingPoolCount] = useState(0)
    const [genderPercent, setGenderPercent] = useState(0)
    const [agePercent, setAgePercent] = useState(0)
    const [racePercent, setRacePercent] = useState(0)
    const [ethnicityPercent, setEthnicityPercent] = useState(0)
    const [ancestryPercent, setAncestryPercent] = useState(0)
    function handleCount(newDatingPoolCount) {
        setDatingPoolCount(newDatingPoolCount)
    };

  
    useEffect(() => {
        let totalAgePop = 0; // Population size for all genders and entire age range.

        let datingPoolCountMenTemp = 0 // Selected gender and age range.
        let datingPoolCountWomenTemp = 0 // Selected gender and age range.
        let datingPoolCountBothTemp = 0; // Population size for selected age range and both genders.

        let datingPoolCountTemp = 0;


        let bothGenderPop = 0;
        let menPop = 0;
        let womenPop = 0;
        let racePercent = 0;
        let ethnicityPercent = 0;
        let ancestryPercent = 0;


        if(ageData != false) { // Wait for DataPull Component to finish first.
            if(!gender.every((g) => g.selected === false)) {
                console.log("on")
                genderIdentityData.map(genderCount => {
                    gender.map(g => {
                        if(g.selected === true && g.gender === genderCount.gender) {
                            if(g.column === 1) {bothGenderPop += parseFloat(genderCount["pop_decimal"])}
                            else if(g.column === 2) {menPop += parseFloat(genderCount["pop_decimal"])}
                            else if(g.column === 3) {womenPop += parseFloat(genderCount["pop_decimal"])}
                        }
                    })
                })

                ageData.map(ageCount => {
                    totalAgePop += parseInt(Object.values(ageCount)[1].replace(",", ""))
                    if(ageCount.age >= ageRange[0] && ageCount.age <= ageRange[1]){
                        datingPoolCountMenTemp += parseInt(Object.values(ageCount)[3].replace(",", ""))
                        datingPoolCountWomenTemp += parseInt(Object.values(ageCount)[2].replace(",", ""))
                        datingPoolCountBothTemp += parseInt(Object.values(ageCount)[1].replace(",", ""))
                        
                    }
                })

                datingPoolCountTemp = (
                    (datingPoolCountMenTemp * menPop)
                    + (datingPoolCountWomenTemp * womenPop)
                    + (datingPoolCountBothTemp * bothGenderPop)
                )

                setGenderPercent(((datingPoolCountTemp/datingPoolCountBothTemp) * 100 ).toFixed(0) + '%')
                setAgePercent(((datingPoolCountBothTemp/totalAgePop) * 100 ).toFixed(0) + '%')
                if (activeEthnicityTab === 1) { // Race tab active
                    setEthnicityPercent('-')
                    setAncestryPercent('-')
                    raceData.map(raceCount => {
                        race.map(r => {
                            if(r.selected === true && r.race === raceCount.race) {
                                racePercent += parseFloat(raceCount["decimal"])
                            }
                        })
                    })
                    datingPoolCountTemp *= racePercent
                    setDatingPoolCount(parseInt(datingPoolCountTemp).toLocaleString('en-US'))
                    setRacePercent((racePercent * 100).toFixed(0) + '%')
                    }
                else if (activeEthnicityTab === 2) { // Ethnicity tab active
                    setRacePercent('-')
                    setAncestryPercent('-')
                    ethnicityData.map(ethnicityCount => {
                        ethnicity.map(e => {
                            if(e.selected === true && e.ethnicity === ethnicityCount.ethnicity) {
                                ethnicityPercent += parseFloat(ethnicityCount["decimal"])
                            }
                        })
                    })
                        datingPoolCountTemp *= ethnicityPercent
                        setDatingPoolCount(parseInt(datingPoolCountTemp).toLocaleString('en-US'))
                    setEthnicityPercent((ethnicityPercent * 100).toFixed(0) + '%')
                }
                else if (activeEthnicityTab === 3) { // Ancestry tab active
                    setRacePercent('-')
                    setEthnicityPercent('-')
                    ancestryData.map(ancestryCount => {
                        ancestry.map(a => {
                            if(a.selected === true && a.ancestry === ancestryCount.ancestry) {
                                ancestryPercent += parseFloat(ancestryCount["decimal"])
                            }
                        })
                    })
                        datingPoolCountTemp *= ancestryPercent
                        setDatingPoolCount(parseInt(datingPoolCountTemp).toLocaleString('en-US'))
                    setAncestryPercent((ancestryPercent * 100).toFixed(0) + '%')
                }
            }
            else {
                console.log("test")
                datingPoolCountTemp = 0
                setDatingPoolCount(datingPoolCountTemp)
                setAgePercent(0);
                setGenderPercent(0);
                setRacePercent(0);
                setEthnicityPercent(0);
                setAncestryPercent(0);
            }
        }
        else {
            datingPoolCountTemp = 0
            setDatingPoolCount(datingPoolCountTemp)
        }
    }, [ ageData, gender, ageRange, race, ethnicity, ancestry])


    // This state is used by the TabContext component that controls the menu tabs
    const [tabValue, setTabValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    }

    return (
        <div className="wrapper">
        <div className="main-container">
        <h1>{datingPoolCount} </h1>

            <DataPull onPull={handlePull}/>

            <TabContext value={tabValue} >
                
            <Box sx={{ width: "100%", borderBottom: 1, borderColor: 'divider', display:"flex", justifyContent:"center" }}>
                <TabList 
                    onChange={handleChange} style={{ overflow: "hidden" }}
                    variant="scrollable" scrollButtons={true} allowScrollButtonsMobile={true}  
                    //TabIndicatorProps={{style: {background:'#89F0DD'}}}
                    >
                    <Tab value="1" icon={<WcIcon />} style={{ minWidth: 50
                    // ,color:'#89F0DD'
                }}label={
                    <div>
                    <p className="tabNameSmall">Orientation</p>
                    <p className="kpiPercent">{genderPercent}</p>
                    </div>
                } />
                    {/* <Tab label="Orientation" value="1" icon={<WcIcon />}/> */}
                    <Tab value="2" icon={<CakeIcon />} style={{ minWidth: 50 }}
                    label={
                        <div>
                        <p className="tabName">Age</p>
                        <p className="kpiPercent">{agePercent}</p>
                        </div>
                    } />
                    <Tab label="Height" value="3" icon={<HeightIcon />} style={{ minWidth: 50 }}/>
                    <Tab value="4" icon={<GroupsIcon />} style={{ minWidth: 50 }}
                        label={
                            <div>
                            <p className="tabName"> Race </p>
                            <p className="kpiPercent">{racePercent}</p>
                            </div>
                        } />
            
                    <Tab value="5" icon={<PublicIcon />} style={{ minWidth: 50 }}
                        label={
                            <div>
                            <p className="tabName"> Ethnicity </p>
                            <p className="kpiPercent">{ethnicityPercent}</p>
                            </div>}
                            />
                    <Tab value="6" icon={<FilterVintageIcon />} style={{ minWidth: 50 }}label={
                            <div>
                            <p className="tabName"> Ancestry </p>
                            <p className="kpiPercent">{ancestryPercent}</p>
                            </div>}
                            />
                    <Tab icon={<FilterVintageIcon />} label={
                        <div style={{whiteSpace:"pre-line"}}>
   <Typography style={{ }} variant="caption"> 
          test
        </Typography>
        <br />
        <Typography variant="title">
          ❌🟩
        </Typography>
                        </div>
                    }
                     value="10" component="pre" style={{ minWidth: 50, whiteSpace: "pre-line" }}/>
                </TabList>
            </Box>

                <TabPanel value="1" sx={{padding:"0"}}>
                    <GenderButtons activeGender={gender} onGenderClick={handleGender} 
                    />
                </TabPanel>
                <TabPanel value="2">
                    <AgeSlider activeGender={gender} ageRange={ageRange} onSlide={handleAge}/>
                </TabPanel>
                <TabPanel value="4" sx={{padding:"0"}}>            
                    <Race activeRace={race} onRaceClick={handleRace} activeRaceAll={raceAll} resetter={resetter}/>
                </TabPanel>
                <TabPanel value="5" sx={{padding:"0"}}    >        
                    <Ethnicity 
                        activeEthnicity={ethnicity} onEthnicityClick={handleEthnicity} 
                        activeEthnicityGroup={ethnicityGroup} onEthnicityGroupClick={handleEthnicityGroup} 
                        activeEthnicityAll={ethnicityAll} resetter={resetter}
                        />
                </TabPanel>
                <TabPanel value="6" sx={{padding:"0"}}    >        
                    <Ancestry 
                        activeAncestry={ancestry} onAncestryClick={handleAncestry} 
                        activeAncestryGroup={ancestryGroup} onAncestryGroupClick={handleAncestryGroup} 
                        activeAncestryAll={ancestryAll} resetter={resetter}
                        />
                </TabPanel>
                <TabPanel value="10">            
                    <Test activeGender={gender} onGenderClick={handleGender}/>
                </TabPanel>
                
            </TabContext>
            

            </div>
        </div>
)

};


//Note1: The reason we need this ethnicityTemp value is because, before, I was calling setEthnicity directly and then trying to access that updated ethnicity field in the function below that checks to see if every ethnicity in a particuar ethnicityGroup was selected. Since states are update immediately, the second function wasn't working because it was still receiving the old ethnicity state before the update. By using this ethnicityTemp value, we can immediately use it in the second function since the assignment is sychronously defined first before the function uses it.