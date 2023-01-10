import "leaflet/dist/leaflet.css";
import React from "react";
import {IDevice} from "../../model/device";
import all from "../../api/devices/all";
import dynamic from "next/dynamic";

const DevicesMap = dynamic(() => import("../../components/devices_map"), {
    ssr: false
});

interface IProps {
    devices: IDevice[];
}

const MapPage = (props: IProps) => {
    return (
        <DevicesMap devices={props.devices}/>
    );
}

export async function getServerSideProps(): Promise<{ props: IProps }> {
    try {
        const devices = await all();
        return {props: {devices}};
    } catch (error) {
        throw error;
    }
}

export default MapPage;


