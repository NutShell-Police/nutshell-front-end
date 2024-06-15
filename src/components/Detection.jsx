import { padding } from '@mui/system';
import React from 'react';

const StreamlitComponent = () => {
  return (
    <div s>
      <iframe 
        title="Streamlit Component"
        width="100%" 
        height="800px" 
        src="https://nutshell-embed.azurewebsites.net/?embed=true" 
        frameborder="0" 
        allowfullscreen
        
      ></iframe>
    </div>
  );
}

export default StreamlitComponent;