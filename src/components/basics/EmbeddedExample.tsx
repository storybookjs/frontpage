import React from 'react';

export const EmbeddedExample = ({ embeddedUrl, title }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '66.66%',
        border: '1px solid #D9E8F2',
        borderRadius: '5px',
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '5px',
          overflow: 'hidden',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
        }}
        title={title}
        src={embeddedUrl}
        allowFullScreen
      />
    </div>
  );
};
