import React, {useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../utils/firebaseConfig";
import { setCookie } from 'nookies';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async (e: any) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: string | any) {
            setError(error.message);
        }
    }

    const handleSignIn = async (e: any) => {
        e.preventDefault();
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            const idToken = await user.getIdToken();
            setCookie(null, 'firebase_id_token', idToken, {
                maxAge: 30 * 24 * 60 * 60, // 30 days
                path: '/',
            });
        } catch (error: string | any) {
            setError(error.message);
        }
    }

    return (
        <div>
            <form>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/><br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"/><br />
                <button type="submit" onClick={handleSignIn}>Einloggen</button>
            </form>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Auth;
