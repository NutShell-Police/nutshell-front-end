import React from 'react';

const StreamlitComponent = () => {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}> 
      <iframe
        title="Streamlit Component"
        style={{
          width: '100%',
          height: '80vh',
          border: 'none',
        }}
        src="https://nutshell-embed.azurewebsites.net/?embed=true&embed_options=light_theme"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default StreamlitComponent;
