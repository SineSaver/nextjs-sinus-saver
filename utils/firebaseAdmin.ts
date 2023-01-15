import * as firebaseAdmin from 'firebase-admin';

import serviceAccount from '../ils-login-firebase-adminsdk-halrg-b288ca9bce.json';

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        // @ts-ignore
        credential: firebaseAdmin.credential.cert(serviceAccount)
    });
}

export { firebaseAdmin };
