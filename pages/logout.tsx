import {auth} from "../utils/firebaseConfig";
import nookies from "nookies";
import Router from 'next/router'
import {AdminLayout} from "@layout";
import Auth from "../src/components/auth";
import React from "react";

const Logout = () => {
    const logout = async () => {
        try {
            nookies.destroy(null, 'firebase_id_token');
            await auth.signOut();
            await Router.push('/login');
        } catch (error: string | any) {
            console.log(error);
        }
    }

    logout();

    return <AdminLayout devices={[]}>
        <div>Nutzer wird ausgeloggt</div>
    </AdminLayout>
}

export default Logout
