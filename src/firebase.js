import firebase from 'firebase/app'
import 'firebase/firebase-messaging'
const envJSON = require("../env.json");

var firebaseConfig = {
    apiKey: envJSON.apiKey,
    authDomain: envJSON.authDomain,
    projectId: envJSON.projectId,
    storageBucket: envJSON.storageBucket,
    messagingSenderId: envJSON.messagingSenderId,
    appId: envJSON.appId,
    measurementId: envJSON.measurementId
}

firebase.initializeApp(firebaseConfig)

export default firebase.messaging()