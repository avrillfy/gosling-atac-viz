import React, { useState, useRef } from 'react';
import { GoslingComponent } from 'gosling.js';

const MARK_OPTIONS = ['point', 'bar', 'line', 'area'];
const LAYOUT_OPTIONS = ['linear', 'circular'];

const goslingSpec = (mark, layout, binSize) => {
  return {
    layout,
    arrangement: 'vertical',
    centerRadius: 0.4,
    style: {
      select: { color: 'black', stroke: 'black', strokeWidth: 6, arrange: 'behind', opacity: 0.1 }
    },
    views: [
      {
        tracks: [
          {
            id: 'atac-peak-track',
            data: {
              url: 'https://raw.githubusercontent.com/avrillfy/gosling-atac-viz/refs/heads/main/public/data/ACC_peakCalls.csv',
              type: 'csv',
              delimiter: ',',
              chromosomeField: 'seqnames',
              genomicFields: ['start', 'end']
            },
            mark: mark,
            x: { field: 'start', type: 'genomic' },
            xe: { field: 'end', type: 'genomic' },
            row: { field: 'cancer', type: 'nominal', legend: true },
            y: { field: 'score', type: 'quantitative', axis: 'none' },
            color: { field: 'cancer', type: 'nominal', legend: true },
            tooltip: [
              { field: 'start', type: 'genomic', alt: 'Start Position' },
              { field: 'end', type: 'genomic', alt: 'End Position' },
              { field: 'score', type: 'quantitative', alt: 'Peak Score', format: '.2' },
              { field: 'name', type: 'nominal', alt: 'Peak Name' },
              { field: 'annotation', type: 'nominal', alt: 'Annotation' }
            ],
            width: 600,
            height: 230
          }
        ]
      }
    ]
  }
};

function WidgetEncoding() {
  const gosRef = useRef(null);

  const [mark, setMark] = useState('point');
  const [layout, setLayout] = useState('circular');
  const [binSize, setBinSize] = useState(8);

  return (
    <>
      <div style={{ margin: '30px 80px 0 80px' }}>
        <label>
          {'Bin Size: '}
          <input
            type="range"
            min={0}
            max={32}
            step={4}
            value={binSize}
            style={{ width: 100, margin: '0 10px' }}
            onChange={(e) => setBinSize(+e.currentTarget.value)}
          />
          {binSize === 0 ? 1 : binSize}
        </label>
      </div>
      <div style={{ margin: '30px 80px 0 80px' }}>
        <label>
          {'Mark: '}
          <select onChange={(e) => setMark(e.currentTarget.value)}>
            {MARK_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
      </div>
      <div style={{ margin: '30px 80px 0 80px' }}>
        <label>
          {'Layout: '}
          <select onChange={(e) => setLayout(e.currentTarget.value)}>
            {LAYOUT_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
      </div>

      <GoslingComponent
        ref={gosRef}
        spec={goslingSpec(mark, layout, binSize)}
        experimental={{ reactive: true }}
      />
    </>
  );
}

export default WidgetEncoding;

