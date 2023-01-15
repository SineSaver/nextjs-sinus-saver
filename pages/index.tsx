import React from "react";
import all from "../api/devices/all";
import {IDevice} from "../model/device";
import {AdminLayout} from '../src/layout';
import nookies from 'nookies';
import 'firebase/auth';
import {firebaseAdmin} from "../utils/firebaseAdmin";

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

export async function getServerSideProps(context: any): Promise<{ props: IProps }> {
    try {
        const cookies = nookies.get(context);
        await firebaseAdmin.auth().verifyIdToken(cookies.firebase_id_token);
        const devices = await all();
        return {props: {devices}};
    } catch (error) {
        context.res.writeHead(302, {Location: '/login'});
        context.res.end();

        return {props: {} as never};
    }
}
