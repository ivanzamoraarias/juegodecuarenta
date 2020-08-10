import * as firebase from 'firebase'
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: FirebaseConfiguration.apiKey,
    authDomain: FirebaseConfiguration.authDomain,
    databaseURL: FirebaseConfiguration.databaseURL,
    storageBucket: FirebaseConfiguration.storageBucket,
    messagingSenderId:FirebaseConfiguration.messagingSenderId,
    projectId:FirebaseConfiguration.projectId
}

//todo make a singleton class for firebase initialization
firebase.initializeApp(firebaseConfig);

/*
const dbh = firebase.firestore();

dbh.collection("characters").doc("mario").set({
    employment: "plumber",
    outfitColor: "red",
    specialAttack: "fireball"
})*/
function storeNewOwnMessage(userId: string, message: string): void {
    const currentTime: string = new Date().getTime().toString();
    const path: string = `imageMessages/${userId}/${currentTime}`;
    firebase.database().ref(path).set({
        message: message
    });
}

function listenNewPartnerMessage(partnerId: string): void {
    firebase
        .database()
        .ref('imageMessages/' + partnerId)
        .on('value', (snapshot) => {
                const partnerMessage =
                    snapshot.val().message;
                console.log("New message: " + partnerMessage);
            }
        );
}

export {storeNewOwnMessage, listenNewPartnerMessage}