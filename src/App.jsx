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
		<div>
			{/* Sidebar Tabs */}
			<div style={{ flexDirection: 'row', flexGap: 20 }} >
				{Object.keys(examples).map((key) => (
					<button
						style={{ marginRight: 10, color: key === activeTab ? 'blue' : undefined, borderColor: key === activeTab ? 'blue' : undefined, cursor: 'pointer' }}
						key={key}
						onClick={() => setActiveTab(key)}
					>
						{key}
					</button>
				))}
			</div>

			{/* Main Content */}
			<div>
				{examples[activeTab]}
			</div>
		</div>
	);
}

export default App;
