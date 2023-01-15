import {auth} from "../utils/firebaseConfig";
import nookies from "nookies";

const Logout = () => {
    const logout = async () => {
        try {
            nookies.destroy(null, 'firebase_id_token');
            await auth.signOut();
        } catch (error: string | any) {
            console.log(error);
        }
    }

    logout();

    return <div>Logged out</div>;
}

export default Logout
