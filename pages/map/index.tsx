import "leaflet/dist/leaflet.css";
import React from "react";
import {IDevice} from "../../model/device";
import all from "../../api/devices/all";
import dynamic from "next/dynamic";
import {AdminLayout} from "@layout";
import nookies from "nookies";
import {firebaseAdmin} from "../../utils/firebaseAdmin";

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

export default MapPage;


