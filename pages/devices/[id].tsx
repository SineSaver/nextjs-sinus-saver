import React from "react";
import get from "../../api/devices/get";
import {IDevice} from "../../model/device";
import DeviceInfo from "../../src/components/device_info";
import {AdminLayout} from "@layout";
import all from "../../api/devices/all";
import nookies from "nookies";
import {firebaseAdmin} from "../../utils/firebaseAdmin";

interface IProps {
    device: IDevice | null;
    devices: IDevice[];
}

const DevicePage = (props: IProps) => {
    if (!props.device) {
        return <div>Device not found</div>;
    }

    return (
        <AdminLayout devices={props.devices}>
            <DeviceInfo device={props.device} />
        </AdminLayout>
    )
}

export default DevicePage;

export async function getServerSideProps(context: any): Promise<{ props: IProps }> {
    try {
        const cookies = nookies.get(context);
        await firebaseAdmin.auth().verifyIdToken(cookies.firebase_id_token);

        const device = await get(context.query.id);
        const devices = await all();

        return {props: {device, devices}};
    } catch (error) {
        context.res.writeHead(302, {Location: '/login'});
        context.res.end();

        return {props: {} as never};
    }
}
