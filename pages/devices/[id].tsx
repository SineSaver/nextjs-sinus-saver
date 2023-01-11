import React from "react";
import get from "../../api/devices/get";
import {IDevice} from "../../model/device";
import DeviceInfo from "../../components/device_info";

interface IProps {
    device: IDevice | null;
}

const DevicePage = (props: IProps) => {
    if (!props.device) {
        return <div>Device not found</div>;
    }

    return <DeviceInfo device={props.device} />;
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
