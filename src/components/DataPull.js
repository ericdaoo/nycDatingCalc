import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from "papaparse";

export default function DataPull({ onPull }) {

    useEffect(() => {
        fetchCSVData();    // Fetch the CSV data when the component mounts
    }, []); 

    const fetchCSVData = () => {
        const mainUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSpv7UUr6qtM7jktt5xWw4jafylhYZeoG6SZgo3kc21mvWNNqgKNsMMlwSiZXZ2vq9oh0qXYk7rqUvb/pub?gid=';
        const endUrl = '&single=true&output=csv';
        const sheetIDs = [
                        '1845772824' // Gender & Age
                        ,'776831969' // Race
                        ,'1378955350' // Ethnicity
                        // ,'1191707471' // Height
                        // ,'481252969' // Income
                        ,'1439753027' // Ancestry
        ]

        const responses = [];
        const dataSet = [];
        
        const fetchData = async () => {
            try {
                for (const sheet of sheetIDs) {
                const response = await axios(mainUrl + sheet + endUrl);
                responses.push(response);
                }
            // return(responses)
            }
            catch (error) {
                console.error(error);
            }
        };

        const parseData = async () => {
            try {
                responses.map((p) => 
                    Papa.parse(p.data, {
                    header: true,
                    skipEmptyLines: 'greedy',
                    complete: (results) => {
                        const data = results.data;
                        dataSet.push(data)
                        }
                    })
                )
            }
            catch (error) {
                console.error(error);
            }
            // return(dataSet)
            };

            const execute = async () => {
                try {
                    const fetch = await fetchData()
                    const parse = await parseData()
                    onPull(dataSet)
                }
                catch (error) {
                    console.error(error);
                }
            };
            execute()
        };
}



// const test = []
// const promise1 = ((resolve, reject) => {
//     for (let i = 1; i < 4; i++) {
//         test.push(i)
//     }
//     resolve(test)
//   });



    // Promise.all(promises).then(() => console.log(requests))
    // fetchPromise ()
//   return(console.log(responses))

    // return new Promise(promise1)
    //     .then((p) => p)
        // .then((p) => Promise.all(p))
            // .then((request) => {console.log(request)})
    //     Promise.all(promises)
        //   .then((requests) => {requests.map((p) => p)})
    //       requests.map((p) => 

    //             dataSet.push(p)
    //         //     Papa.parse(p.data, {
    //         //     header: true,
    //         //     skipEmptyLines: true,
    //         //     complete: (results) => {
    //         //         const data = results.data;
    //         //         dataSet.push(data)
    //         //     }}
    //         )
    //       )
    //       .then(() => resolve(dataSet));
    //   );


    //   return new Promise((resolve) => {
    //     Promise.all(promises)
    //       .then((requests) =>
    //       requests.map((p) => 

    //             dataSet.push(p)
    //         //     Papa.parse(p.data, {
    //         //     header: true,
    //         //     skipEmptyLines: true,
    //         //     complete: (results) => {
    //         //         const data = results.data;
    //         //         dataSet.push(data)
    //         //     }}
    //         )
    //       )
    //       .then(() => resolve(dataSet));
    //   });
    
                    



// console.log(dataSet)
// return (
//     <div>
//       {dataSet.map(item => (
//         <p> {item}</p>
//       ))}
//     </div>
// )
// console.log(requests[0])


