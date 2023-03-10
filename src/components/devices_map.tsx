import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import React from "react";
import {IDevice} from "../../model/device";
import DeviceInfo from "./device_info";
import {OpenStreetMapProvider} from 'leaflet-geosearch';
import SearchControl from "./geo_search_control";
import {LatLng} from "leaflet";
import {SearchResult} from "leaflet-geosearch/lib/providers/provider";

const DevicesMap = (props: { devices: IDevice[] }) => {
    const provider = new OpenStreetMapProvider();

    const renderMarker = (device: IDevice) => {
        const position = new LatLng(device.location.latitude, device.location.longitude);

        return <Marker position={position} key={device.id}>
            <Popup><DeviceInfo device={device}/></Popup>
        </Marker>
    }

    if (props.devices.length === 0) {
        return <div>Loading...</div>;
    }

    const centerDeviceLocation = props.devices[0].location;

    return (
        <MapContainer center={[centerDeviceLocation.latitude, centerDeviceLocation.longitude]} zoom={15}
                      scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <SearchControl
                provider={provider}
                showMarker={true}
                showPopup={false}
                maxMarkers={3}
                retainZoomLevel={false}
                animateZoom={true}
                autoClose={false}
                searchLabel={"Addresse eingeben"}
                keepResult={true}
                popupFormat={(value: {query: Object, result: SearchResult}) => value.result.label}
            />
            {props.devices.map((device) => renderMarker(device))}
        </MapContainer>
    );
}
export default DevicesMap;


