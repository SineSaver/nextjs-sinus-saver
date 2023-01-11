import {IDevice} from "../model/device";
import Link from "next/link";
import React from "react";

const DeviceInfo = (props: {device: IDevice}) => {
    return (
        <div>
            <div>ID: <Link href={`/devices/${props.device.id}`}>{props.device.id}</Link></div>
            <div>IP: {props.device.ip}</div>
            <div>Config: -</div>
            <div>Location: Lon {props.device.location.longitude} Lat {props.device.location.latitude}</div>
            <div>Door {props.device.doorOpen ? "open" : "closed"}</div>
        </div>
    )
}

export default DeviceInfo;
