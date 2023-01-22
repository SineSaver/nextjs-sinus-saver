import "leaflet/dist/leaflet.css";
import React from "react";
import {IDevice} from "../../model/device";
import all from "../../api/devices/all";
import dynamic from "next/dynamic";
import {AdminLayout} from "@layout";

const DevicesMap = dynamic(() => import("../../src/components/devices_map"), {
    ssr: false
});

interface IProps {
    devices: IDevice[];
}

const MapPage = (props: IProps) => {
    return (
        <AdminLayout devices={props.devices}>
            <DevicesMap devices={props.devices}/>
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any): Promise<{ props: IProps }> {
    const devices = await all(context);

    return {props: {devices}};
}

export default MapPage;


