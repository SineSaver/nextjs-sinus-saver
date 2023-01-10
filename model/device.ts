import {DocumentSnapshot, GeoPoint} from "@firebase/firestore";

export interface IDevice {
    id: string;
    ip: string;
    config: Object;
    location: {
        latitude: number;
        longitude: number;
    };
}

export default class Device implements IDevice {
    config: Object;
    id: string;
    ip: string;
    location: { latitude: number; longitude: number };

    private constructor(
        id: string,
        ip: string,
        config: Object,
        location: { latitude: number; longitude: number }
    ) {
        this.id = id;
        this.ip = ip;
        this.config = config;
        this.location = location
    }

    public static fromFirebaseDoc(doc: DocumentSnapshot): Device|null {
        const data = doc.data();

        if (!data) {
            return null;
        }

        const location = data.standort as GeoPoint | undefined;

        if (!location) {
            return null;
        }

        return new Device(
            doc.id,
            data.ip ?? '',
            data.config ?? {},
            {
                latitude: location.latitude,
                longitude: location.longitude,
            }
        );
    }

    toJSON(): IDevice {
        return {
            id: this.id,
            ip: this.ip,
            config: this.config,
            location: this.location
        }
    }
}
