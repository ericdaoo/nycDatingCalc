import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';



function createArray(n, m) {
  const result = [];
  for (let i = n; i <= m; i++) {
    result.push(i);
  }
  return result;
}

const testData = createArray(20, 60);
const range = [Math.min(...testData), Math.max(...testData)];
// const range = [20,60]

const marks = [
  {
    value: range[0],
    label: range[0],
  },
  {
    value: range[1],
    label: range[1],
  },
];




function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const CustomAgeSlider = styled(Slider)(({ theme, activegender }) => ({
  height: 8,
  padding: '20px 0',
  '& .MuiSlider-thumb': {
    height: 28,
    width: 28,
    boxShadow: '0 2px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.02)',
    // backgroundColor: '#212121',
    '&:hover': {
      boxShadow: '0 0 0 10px rgba(58, 133, 137, 0.16)',
    },
    '&:before': {
      boxShadow:
        '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
    },
  },
  '& .MuiSlider-thumb[data-index="0"]': {
    backgroundImage: "radial-gradient(circle, #ff835e 40%, #000000 0%,#ff835e 99%)"
  },
  '& .MuiSlider-thumb[data-index="1"]': {
    backgroundImage: "radial-gradient(circle, #3dbce3 40%, #000000 0%,#3dbce3 99%)"
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: 0,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&::before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: '#000',
      ...theme.applyStyles('dark', {
        color: '#fff',
      }),
    },
  },
  '& .MuiSlider-markLabel[data-index="0"]': {
    top: "15px",
    margin: "0 -20px"
  },
  '& .MuiSlider-markLabel[data-index="1"]': {
    top: "15px",
    margin: "0 0 0 20px"
  },
  '& .MuiSlider-track': {
    border: 'none',
    // backgroundColor: '#1976D1',
    backgroundImage: "linear-gradient(.25turn, #ff835e, #3dbce3)",
    height: 10,
  },
  '& .MuiSlider-rail': {
    // opacity: 0.5,
    boxShadow: 'inset 0px 0px 4px -2px #000',
    backgroundColor: '#29292D',
    height: 10,
  },
  // ...theme.applyStyles('dark', {
  //   color: '#0a84ff',
  // }),
}));

export default function AgeSlider({ ageRange, onSlide, activeGender }) {
  const value = ageRange.slice()
  // const [value, setValue] = React.useState(ageRange);
  const minDistance = 2;

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        onSlide([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        onSlide([clamped - minDistance, clamped]);
      }
    } else {
      onSlide(newValue);
    }
  };

  return (
    <Box sx={{ width: 300, margin: 5 }}>
      <CustomAgeSlider
        // aria-label="ios slider"
        // getAriaLabel={() => 'Age range'}
        value={value}
        min={range[0]}
        max={range[1]}
        marks={marks}
        onChange={handleChange}
        valueLabelDisplay="on"
        disableSwap
        activegender={activeGender}
      />

{/* <DatingEconomy /> */}

    </Box>
    
  );
}
