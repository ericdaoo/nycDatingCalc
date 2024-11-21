import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';



function CheckBox({ onClick, label }){
return (
    <Checkbox
    defaultChecked
    onClick={onClick}
    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
    label={label}
     />
    )
}

export default function Race() {

    const [label, setLabel] = useState({
        asian: false,
        black: true,
        hispanic: true,
        native: true,
        pacific: true,
        mixed: true,
        white: true,
      });
    
      const handleClick = (event) => {
        setLabel({ ...label, [event.target.name]: event.target.checked });
      };
      
  return (
    <div>
      <CheckBox label={label.asian} checked={label.asian} onClick={handleClick} />
      <CheckBox {...label} defaultChecked onClick={handleClick} color="secondary" />
      <CheckBox {...label} defaultChecked onClick={handleClick} color="success" />
      <CheckBox {...label} defaultChecked onClick={handleClick} color="default" />
      <CheckBox
        {...label}
        defaultChecked
        onClick={handleClick}
        // sx={{
        //   color: pink[800],
        //   '&.Mui-checked': {
        //     color: pink[600],
        //   },
        // }}
      />
    </div>
  );
}