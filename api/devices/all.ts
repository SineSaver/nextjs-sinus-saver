import {collection, getDocs, QuerySnapshot} from "@firebase/firestore";
import {database} from "../../utils/firebaseConfig";
import Device, {IDevice} from "../../model/device";
import fixtureData from "../../fixtureData";

const all = async (): Promise<IDevice[]> => {
    try {
        // Save firestore requests and use fixture data
        /**
        const sineSaverSnapshot = await getDocs(collection(database, 'SineSaver')) as QuerySnapshot;
        return sineSaverSnapshot.docs
            .map(doc => Device.fromFirebaseDoc(doc))
            .filter(device => device)
            .map(device => device.toJSON())
         **/

        return fixtureData;
    } catch (error) {
        throw error;
    }
}

export default all;
