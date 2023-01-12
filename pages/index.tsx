import React from "react";
import all from "../api/devices/all";
import {IDevice} from "../model/device";
import {AdminLayout} from '../src/layout';
import Link from "next/link";

interface IProps {
    devices: IDevice[]
}

export default function Home(props: IProps) {
    return (
        <AdminLayout>
            <div>
                <ul>
                    {props.devices.map(device => <li key={device.id}><Link
                        href={`/devices/${device.id}`}>Device {device.id}</Link></li>)}
                </ul>
                <div>
                    <Link href={`/map`}>Map</Link>
                </div>
            </div>
        </AdminLayout>
    )
}

export async function getServerSideProps(): Promise<{ props: IProps }> {
    try {
        const devices = await all();
        return {props: {devices}};
    } catch (error) {
        throw error;
    }
}
