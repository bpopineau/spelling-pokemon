export interface Hotspot {
    id: number;
    name: string;
    sceneId: number;
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
        sceneId: 1,
        style: { left: '5%', top: '5%', width: '30%', height: '30%' },
    },
    {
        id: 2,
        name: 'Willowshade Woods',
        sceneId: 2,
        style: { left: '35%', top: '5%', width: '30%', height: '30%' },
    },
    {
        id: 3,
        name: 'Sparkspire Zone',
        sceneId: 3,
        style: { left: '65%', top: '5%', width: '30%', height: '30%' },
    },
    {
        id: 4,
        name: 'Glyphstone Ruins',
        sceneId: 4,
        style: { left: '5%', top: '35%', width: '30%', height: '30%' },
    },
    {
        id: 5,
        name: 'Whispering Woods',
        sceneId: 5,
        style: { left: '35%', top: '35%', width: '30%', height: '30%' },
    },
    {
        id: 6,
        name: 'Sandy Shoals',
        sceneId: 6,
        style: { left: '65%', top: '35%', width: '30%', height: '30%' },
    },
    {
        id: 7,
        name: 'Ember Crag',
        sceneId: 7,
        style: { left: '5%', top: '65%', width: '30%', height: '30%' },
    },
    {
        id: 8,
        name: 'Sunnybrush Fields',
        sceneId: 8,
        style: { left: '35%', top: '65%', width: '30%', height: '30%' },
    },
    {
        id: 9,
        name: 'Fable Fern Grotto',
        sceneId: 9,
        style: { left: '65%', top: '65%', width: '30%', height: '30%' },
    },
];

export default regionHotspots;