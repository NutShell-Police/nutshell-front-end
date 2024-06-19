import { Margin } from '@mui/icons-material';
import { padding } from '@mui/system';
import React from 'react';

const StreamlitComponent = () => {
  return (
    <div> 
      <iframe
        padding="none"
        title="Streamlit Component"
        height="800vh"
        width = "1650px"
        style={{ border: "none", padding: "0", marginLeft: "-250px" }}
        src="https://nutshell-embed.azurewebsites.net/?embed=true&embed_options=light_theme"
        frameborder="0"
        allowfullscreen></iframe>
    </div>
  );
}

export default StreamlitComponent;