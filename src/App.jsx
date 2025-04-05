import * as React from 'react';
import WidgetEncodingBasic from './components/WidgetEncodingBasic';
import WidgetEncoding from './components/WidgetEncoding';

const examples = {
  'Linked View': <WidgetEncoding />,
  'Basic View': <WidgetEncodingBasic />,
};

function App() {
  const [activeTab, setActiveTab] = React.useState(Object.keys(examples)[0]);

  return (
    <div
      style={{ paddingLeft: 20, fontFamily: 'sans-serif', margin: '0 auto' }}
    >
      <p style={{ position: 'absolute', fontWeight: 700, left: 20, top: 0 }}>Gosling ATAC 🐤</p>
      {/* Header Title and Tabs */}
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <div style={{ display: 'flex', gap: 10, margin: '0 auto', marginTop: 10, transform: "translateX(-20px)" }}>
          {Object.keys(examples).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: key === activeTab ? '#00008Baa' : '#e0e0e0',
                color: key === activeTab ? 'white' : 'black',
                fontWeight: 700,
              }}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Centered Main Content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          margin: '0 auto',
		  marginTop: 50
        }}
      >
        {examples[activeTab]}
      </div>
    </div>
  );
}

export default App;
