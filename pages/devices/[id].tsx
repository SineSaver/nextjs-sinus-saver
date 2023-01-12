import React from "react";
import get from "../../api/devices/get";
import {IDevice} from "../../model/device";
import DeviceInfo from "../../src/components/device_info";
import {AdminLayout} from "@layout";

interface IProps {
    device: IDevice | null;
}

const DevicePage = (props: IProps) => {
    if (!props.device) {
        return <div>Device not found</div>;
    }

    return (
        <AdminLayout>
            <DeviceInfo device={props.device} />;
        </AdminLayout>
    )
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
