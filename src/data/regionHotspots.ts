// src/data/regionHotspots.ts
export interface Hotspot {
    id: number;
    name: string;
    style: {
        left: string;
        top: string;
        width: string;
        height: string;
    };
}

const regionHotspots: Hotspot[] = [
    {
        id: 1,
        name: 'Glendor Grove',
        style: { left: '5%', top: '5%', width: '30%', height: '30%' },
    },
    {
        id: 2,
        name: 'Willowshade Woods',
        style: { left: '35%', top: '5%', width: '30%', height: '30%' },
    },
    {
        id: 3,
        name: 'Sparkspire Zone',
        style: { left: '65%', top: '5%', width: '30%', height: '30%' },
    },
    {
        id: 4,
        name: 'Glyphstone Ruins',
        style: { left: '5%', top: '35%', width: '30%', height: '30%' },
    },
    {
        id: 5,
        name: 'Whispering Woods',
        style: { left: '35%', top: '35%', width: '30%', height: '30%' },
    },
    {
        id: 6,
        name: 'Sandy Shoals',
        style: { left: '65%', top: '35%', width: '30%', height: '30%' },
    },
    {
        id: 7,
        name: 'Ember Crag',
        style: { left: '5%', top: '65%', width: '30%', height: '30%' },
    },
    {
        id: 8,
        name: 'Sunnybrush Fields',
        style: { left: '35%', top: '65%', width: '30%', height: '30%' },
    },
    {
        id: 9,
        name: 'Fable Fern Grotto',
        style: { left: '65%', top: '65%', width: '30%', height: '30%' },
    },
];

export default regionHotspots;
