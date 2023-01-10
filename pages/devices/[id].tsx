import React from "react";
import get from "../../api/devices/get";
import {IDevice} from "../../model/device";

interface IProps {
    device: IDevice | null;
}

const DevicePage = (props: IProps) => {
    if (!props.device) {
        return <div>Device not found</div>;
    }

    return (
        <div>
            <div>ID: {props.device.id}</div>
            <div>IP: {props.device.ip}</div>
            <div>Config: -</div>
            <div>Location: Lon {props.device.location.longitude} Lat {props.device.location.latitude}</div>
        </div>
    );
}

export default DevicePage;

export async function getServerSideProps(context: any): Promise<{ props: IProps }> {
    try {
        const device = await get(context.query.id);

        return {props: {device}};
    } catch (error) {
        throw error;
    }
}
