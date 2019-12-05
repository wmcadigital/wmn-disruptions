export const BTN_SEARCH = "Go";
export const SEARCH_PLACEHOLDER = 'Search for a service or stop';

export const BUS = 'bus';
export const TRAM = 'tram';
export const TRAIN = 'train';
export const ROADS = 'roads';
export const DISRUPTIONS = 'disruptions';

export const FAV_CLASS = 'fav'

export const SR_BUS = [
    {
        id: '000001',
        mode: "bus",
        operatorCode: "NXWM",
        operatorName: "National Express West Midlands",
        routeDesc: "Longbridge - Birmingham via Pershore Road",
        serviceNumber: "47",
        currentlyDisrupted: true 
    },
    {
        id: '000002',
        mode: "bus",
        operatorCode: "NXWM",
        operatorName: "National Express West Midlands",
        routeDesc: "Birmingham - Longbridge via Pershore Road",
        serviceNumber: "47A",
        currentlyDisrupted: false 
    },
];

export const SR_TRAM = [
    {
        id: '000003', 
        stopName: "Jewellery Quarter",
        routeDesc: "Towards Grand Central",
        currentlyDisrupted: true
    },
    {
        id: '000004',
        stopName: "Jewellery Quarter",
        routeDesc: "Towards Wolverhampton",
        currentlyDisrupted: false
    },
];

export const SR_TRAIN = [
    {
        id: '000005',
        stationName: "Birmingham New Street"
    },
    {
        id: '000006',
        stationName: "Birmingham International"
    },
]; 

export const SR_ROADS = [];

export const SR_DISRUPTIONS = [
    {
        id: '000007',
        mode: "bus",
        disruptionStart: "2019-10-23T15:30:59",
        disruptionEnd: "2019-10-25T16:00:00",
        disruptionSeverity: "Major",
        disruptionTitle: "Resurficing works at Broad Street, Wolvehampton City Centre",
        disruptionDescription: "<strong>Wednesday 23rd October</strong><br /><strong>09.30 - 15.30&nbsp;</strong><br /><br />Ivyhouse Lane will be closed at the junction of Birmingham New Road for resurfacing works.<br /><br /><strong>NXWM Wolverhampton 81</strong>",
        disruptionLatLng: [52.4785592,-1.8909537],
        servicesAffected: [
            {
                id: '000008',
                operatorCode: "NXWM",
                operatorName: "National Express West Midlands",
                routeDesc: "Birmingham - Longbridge via Pershore Road",
                serviceNumber: "47A"
            },
            {
                id: '000009',
                operatorCode: "NXWM",
                operatorName: "National Express West Midlands",
                routeDesc: "Birmingham - Coventry via Solihull",
                serviceNumber: "154"
            }
        ],
        twitterHashtag: null
    },
]