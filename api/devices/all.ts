import {collection, getDocs, QuerySnapshot} from "@firebase/firestore";
import {database} from "../../utils/firebaseConfig";
import Device, {IDevice} from "../../model/device";
import nookies from "nookies";
import {firebaseAdmin} from "../../utils/firebaseAdmin";

const getAllDevices = async () => {
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

const all = async (context: any): Promise<IDevice[]> => {
    try {
        const cookies = nookies.get(context);
        console.log("Authentication attempt: " + cookies.__session);
        await firebaseAdmin.auth().verifyIdToken(cookies.__session);

        return await getAllDevices();
    } catch (error) {
        console.error("Authentication error: " + error);
        context.res.writeHead(302, {Location: '/login'});
        context.res.end();

        return [];
    }
}

export default all;
