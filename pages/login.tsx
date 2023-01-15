import Auth from "../src/components/auth";
import {AdminLayout} from "@layout";
import React from "react";

const Login = () => {
    return <AdminLayout devices={[]}>
        <Auth />
    </AdminLayout>
}

export default Login
