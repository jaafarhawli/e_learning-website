import React from 'react';
import { useState } from 'react';

const PanelComponent = ({text, icon}) => {
  const [panelComponenet, setPanelComponent] = useState();
  
  return (
    <div className='panel-component-container flex pointer'>
      {icon}
      <p className="panel-admin-name">{text}</p>
    </div>
  );
}

export default PanelComponent;
