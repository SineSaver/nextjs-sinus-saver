import React from "react";
import {IDevice} from "../../model/device";
import DeviceInfo from "../../src/components/device_info";
import {AdminLayout} from "@layout";
import all from "../../api/devices/all";

interface IProps {
    device: IDevice | null;
    devices: IDevice[];
}

const DevicePage = (props: IProps) => {
    return (
        <AdminLayout devices={props.devices}>
            {!props.device ? <div>Device not found</div> : <DeviceInfo device={props.device}/>}
        </AdminLayout>
    )
}

export default DevicePage;

export async function getServerSideProps(context: any): Promise<{ props: IProps }> {
    const devices = await all(context);
    const device = devices.find((device: IDevice) => device.id === context.query.id) as IDevice|undefined;

    return {props: {device: device ?? null, devices}};
}
