import * as firebase from 'firebase'
import FirebaseConfiguration from '../Constants/firebaseConfiguration';

const firebaseConfig = {
    apiKey: FirebaseConfiguration.apiKey,
    authDomain: FirebaseConfiguration.authDomain,
    databaseURL: FirebaseConfiguration.databaseURL,
    storageBucket: FirebaseConfiguration.storageBucket,
    messagingSenderId: FirebaseConfiguration.messagingSenderId,
    projectId: FirebaseConfiguration.projectId
}

class FirebaseService {
    private static instance: FirebaseService | undefined | null;
    private static listeningPath: string;

    private constructor() {
        firebase.initializeApp(firebaseConfig);
        //FirebaseService.listeningPath = "";
    }

    public static initializeInstance(): FirebaseService {
        if (FirebaseService.instance === null || FirebaseService.instance === undefined) {

            FirebaseService.instance = new FirebaseService();
        }

        return FirebaseService.instance;
    }

    public static disconnectFirebase() {
        if(FirebaseService.listeningPath === null || FirebaseService.listeningPath === undefined || FirebaseService.listeningPath === "")
            return;
        firebase.database().ref(FirebaseService.listeningPath).off();
    }

    public static insertIntoFirebase(path: string, value: any): void {
        FirebaseService.initializeInstance();
        firebase
            .database()
            .ref(path)
            .set(value);
    }

    public static listenToFirebase(path: string, callback: (value: any) => void): void {
        if(path === null || path === undefined || path === "")
            return;
        FirebaseService.initializeInstance();
        firebase
            .database()
            .ref(path)
            .on('value', (snapshot) => {
                    callback(snapshot.val());
                }
            );

    }

    public static storeNewOwnMessage(userId: string, message: string): void {
        const path: string = `imageMessages/${userId}`;
        FirebaseService.insertIntoFirebase(path, {
            lastOne: message
        });

    }

    public static listenNewPartnerMessage(partnerId: string, callback: (value: any) => void): void {
        const path: string = 'imageMessages/' + partnerId;
        FirebaseService.listeningPath = path;
        FirebaseService.listenToFirebase(path, callback);
    }
}


export {FirebaseService}