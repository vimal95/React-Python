import * as firebase from 'firebase';
import firebaseConfig from './firebaseconfig';


firebase.initializeApp(firebaseConfig);
var db =firebase.firestore();

const writeUserData = (data) => {
    let {userId, name, email, imageUrl} = data;

    db.collection("users").doc().set({
      username: userId,
      name:name,
      email: email,
      avator : imageUrl

    }
    )
}


export default writeUserData;