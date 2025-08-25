
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useContext } from 'react';
import { TabContext } from '../contexts/tabContext';

export default function ToggleButtons() {
    const {currentTab , updateTab}=useContext(TabContext)
  const [alignment, setAlignment] = React.useState('all');
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    updateTab(newAlignment)
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="done">done</ToggleButton>
      <ToggleButton value="task">Tasks</ToggleButton>
    </ToggleButtonGroup>
  );
}
