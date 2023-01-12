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
        <AdminLayout devices={props.devices}>
            Hallo :)
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
