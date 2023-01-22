import React from "react";
import all from "../api/devices/all";
import {IDevice} from "../model/device";
import {AdminLayout} from '../src/layout';
import 'firebase/auth';

interface IProps {
    devices: IDevice[]
}

export default function Home(props: IProps) {
    return (
        <AdminLayout devices={props.devices}>
            <div>Home</div>
        </AdminLayout>
    )
}

export async function getServerSideProps(context: any): Promise<{ props: IProps }> {
    const devices = await all(context);

    return {props: {devices}};
}
