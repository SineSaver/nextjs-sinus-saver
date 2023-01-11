import {IDevice} from "./model/device";

export default [{
    id: 'sinussaver1',
    ip: '99.23.42.11',
    config: {},
    doorOpen: false,
    location: {
        latitude: 49.01345303603201,
        longitude: 12.083036969415687,
    }
}, {
    id: 'sinussaver2',
    ip: '99.23.42.11',
    doorOpen: true,
    config: {},
    location: {
        latitude: 49.01851830978849,
        longitude: 12.096896014598602,
    }
}, {
    id: 'sinussaver3',
    ip: '99.23.42.11',
    doorOpen: true,
    config: {},
    location: {
        latitude: 49.01627991207507,
        longitude: 12.092840796415814,
    }
}, {
    id: 'sinussaver4',
    ip: '99.23.42.11',
    doorOpen: false,
    config: {},
    location: {
        latitude: 49.018601880728205,
        longitude: 12.089748634898054,
    }
}] as IDevice[];
