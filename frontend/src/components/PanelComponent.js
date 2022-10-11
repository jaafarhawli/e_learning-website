import React from 'react';

const PanelComponent = ({text, icon}) => {
  return (
    <div className='panel-component-container flex pointer'>
      {icon}
      <p className="panel-admin-name">{text}</p>
    </div>
  );
}

export default PanelComponent;
