import {collection, getDocs, QuerySnapshot} from "@firebase/firestore";
import {database} from "../../utils/firebaseConfig";
import Device, {IDevice} from "../../model/device";

const all = async (): Promise<IDevice[]> => {
    try {
        // Save firestore requests and use fixture data
        //return fixtureData;

        const sineSaverSnapshot = await getDocs(collection(database, 'SineSaver')) as QuerySnapshot;
        return sineSaverSnapshot.docs
            .map(doc => Device.fromFirebaseDoc(doc))
            .filter((device: Device | null): device is Device => !!device)
            .map(device => device.toJSON())
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default all;
