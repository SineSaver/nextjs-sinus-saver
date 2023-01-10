import {doc, getDoc} from "@firebase/firestore";
import {database} from "../../utils/firebaseConfig";
import Device, {IDevice} from "../../model/device";
import fixtureData from "../../fixtureData";

const get = async (id: string): Promise<IDevice|null> => {
    try {
        // Save firestore requests and use fixture data
        /**
        const sineSaverSnapshot = await getDoc(doc(database, "SineSaver", id));
        const device = Device.fromFirebaseDoc(sineSaverSnapshot);
         return device ? device.toJSON() : null;
         **/

        return fixtureData.find(device => device.id === id) ?? null;
    } catch (error) {
        throw error;
    }
}

export default get;
