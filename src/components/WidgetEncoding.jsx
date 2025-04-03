import React, { useState, useRef } from 'react';
import { GoslingComponent } from 'gosling.js';

const MARK_OPTIONS = ['point', 'bar', 'line', 'area'];
const LAYOUT_OPTIONS = ['linear', 'circular'];

const goslingSpec = (mark, layout, binSize) => {
  return {
    arrangement: 'vertical',
    // Only include centerRadius if the layout is circular
    style: {
      select: { color: 'black', stroke: 'black', strokeWidth: 6, arrange: 'behind', opacity: 0.1 }
    },
    views: [
      // Overview view with brushing
      {
        static: true,
        layout, // uses the selected layout (linear or circular)
        alignment: 'stack',
        tracks: [
          {
            alignment: 'overlay',
            data: {
              url: 'https://raw.githubusercontent.com/avrillfy/gosling-atac-viz/refs/heads/main/ACC_peakCalls.csv',
              type: 'csv',
              delimiter: ',',
              chromosomeField: 'seqnames',
              genomicFields: ['start', 'end']
            },
            // basic encoding for the overview track
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
            // add an overlay of your chosen mark and two brush marks for linking
            tracks: [
              { mark },
              {
                mark: 'brush',
                x: { linkingId: 'detail-1' },
                color: { value: 'blue' }
              },
              {
                mark: 'brush',
                x: { linkingId: 'detail-2' },
                color: { value: 'red' }
              }
            ],
            style: { outlineWidth: 0 },
            width: 500,
            height: 100
          }
        ]
      },
      // Detail views showing linked regions from the overview brushes
      {
        spacing: 10,
        layout: 'linear',
        arrangement: 'horizontal',
        views: [
          {
            tracks: [
              {
                data: {
                  url: 'https://raw.githubusercontent.com/avrillfy/gosling-atac-viz/refs/heads/main/ACC_peakCalls.csv',
                  type: 'csv',
                  delimiter: ',',
                  chromosomeField: 'seqnames',
                  genomicFields: ['start', 'end']
                },
                mark,
                x: {
                  field: 'start',
                  type: 'genomic',
                  linkingId: 'detail-1',
                  "domain": {"chromosome": "chr16"},
                },
                xe: { field: 'end', type: 'genomic' },
                y: { field: 'score', type: 'quantitative' },
                row: { field: 'cancer', type: 'nominal' },
                color: { field: 'cancer', type: 'nominal', legend: true },
                tooltip: [
                  { field: 'start', type: 'genomic', alt: 'Start Position' },
                  { field: 'end', type: 'genomic', alt: 'End Position' },
                  { field: 'score', type: 'quantitative', alt: 'Peak Score', format: '.2' },
                  { field: 'name', type: 'nominal', alt: 'Peak Name' },
                  { field: 'annotation', type: 'nominal', alt: 'Annotation' }
                ],
                width: 245,
                height: 150,
                "style": {"background": "blue"},
              }
            ]
          },
          {
            layout: 'linear',
            tracks: [
              {
                data: {
                  url: 'https://raw.githubusercontent.com/avrillfy/gosling-atac-viz/refs/heads/main/ACC_peakCalls.csv',
                  type: 'csv',
                  delimiter: ',',
                  chromosomeField: 'seqnames',
                  genomicFields: ['start', 'end']
                },
                mark,
                x: {
                  field: 'start',
                  type: 'genomic',
                  linkingId: 'detail-2',
                  "domain": {"chromosome": "chrX"},
                },
                xe: { field: 'end', type: 'genomic' },
                y: { field: 'score', type: 'quantitative' },
                row: { field: 'cancer', type: 'nominal' },
                color: { field: 'cancer', type: 'nominal', legend: true },
                tooltip: [
                  { field: 'start', type: 'genomic', alt: 'Start Position' },
                  { field: 'end', type: 'genomic', alt: 'End Position' },
                  { field: 'score', type: 'quantitative', alt: 'Peak Score', format: '.2' },
                  { field: 'name', type: 'nominal', alt: 'Peak Name' },
                  { field: 'annotation', type: 'nominal', alt: 'Annotation' }
                ],
                width: 245,
                height: 150,
                "style": {"background": "red"},
              }
            ]
          }
        ],
        style: { backgroundOpacity: 0.1 }
      }
    ]
  };
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
          <select onChange={(e) => setMark(e.currentTarget.value)} value={mark}>
            {MARK_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
      </div>
      <div style={{ margin: '30px 80px 0 80px' }}>
        <label>
          {'Layout: '}
          <select onChange={(e) => setLayout(e.currentTarget.value)} value={layout}>
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
