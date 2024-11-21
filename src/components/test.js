import { useState } from 'react';
import Button from '@mui/material/Button';


export default function MyApp() {


    const fetchPokemon = function() {
        const pokemons = [];
        const requests = [];
        for (let i = 1; i <= 150; i++) {
          const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          const prom = fetch(url).then((r) => r.json());
      
          requests.push(prom);
        }
        return new Promise((resolve) => {
          Promise.all(requests)
            .then((proms) =>
              proms.forEach((p) => pokemons.push({
                name: p.name,
                id: p.id
              }))
            )
            .then(() => resolve(pokemons));
        });
      };
      
      fetchPokemon().then(console.log);
}

