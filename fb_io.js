/**************************************************************/
// fb_io.js
// Written by Aiden Brown 2022
/**************************************************************/

/**************************************************************/
 fb_initialise()
// Called by setup
// Initialize firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_initialise() {
  console.log('fb_initialise: ');

  var firebaseConfig = {
  apiKey: "AIzaSyBbaBnefF1pU5jGF7XFMxYOGK8YU5PUlWo",
  authDomain: "comp-b84df.firebaseapp.com",
  databaseURL: "https://comp-b84df-default-rtdb.firebaseio.com",
  projectId: "comp-b84df",
  storageBucket: "comp-b84df.appspot.com",
  messagingSenderId: "189703140224",
  appId: "1:189703140224:web:dccaa73c0c790ada514765",
  measurementId: "G-CFNP28FS11"
};


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // database = firebase.database();
}

/**************************************************************/
// fb_login(_dataRec)
// Login to Firebase
// Input:  to store user info in
// Return: n/a
/**************************************************************/
login()

//signs the user in

function login() {
  firebase.auth().onAuthStateChanged(signIn);
  
  function signIn(_user) {

    //redirects the user to a sign in page
    
    if (_user){
      console.log(_user)
    }else{
    var provider = new firebase.auth.GoogleAuthProvider();
     firebase.auth().signInWithRedirect(provider);
  }
 }
}



// function fb_login(_dataRec) {
//   console.log('fb_login: dataRec= ' + _dataRec);
//   firebase.auth().onAuthStateChanged(newLogin);

//   function newLogin(user) {
//     if (user) {
//       // user is signed in
//       _dataRec.uid = user.uid;
//       _dataRec.email = user.email;
//       _dataRec.name = user.displayName;
//       _dataRec.photoURL = user.photoURL;
//       loginStatus = 'logged in';
//     }
//     else {
//       // user NOT logged in, so redirect to Google login
//       _dataRec = {};
//       loginStatus = 'logged out';
//       console.log('fb_login: status = ' + loginStatus);

//       var provider = new firebase.auth.GoogleAuthProvider();
//       firebase.auth().signInWithRedirect(provider);
//     }
//   }
// }

/**************************************************************/
// fb_logout()
// Logout of Firebase
// Input:  n/a
// Return: n/a
/**************************************************************/
// function fb_logout() {
//   console.log('fb_logout: ');
//   firebase.auth().signOut();
// }

/**************************************************************/
// fb_writeRec(_path, _key, _data)
// Write a specific record & key to the DB
// Input:  path to write to, the key, data to write
// Return: 
/**************************************************************/
function fb_writeRec(_path, _key, _data) {

  writeStatus = 'waiting';
  firebase.database().ref(_path + '/' + _key).set(_data,

    function error(error) {
      if (error) {
        writeStatus = 'failure';
        console.log(error);
      }
      else {
        writeStatus = 'OK';
      }
    }

  );
}


function readErr (error){
    console.log (error);
  }

function runOnReturn(_path, _key, _func){
  firebase.database().ref(_path + '/' + _key).once("value", _func, readErr)
}

//runOnReturn("userDetails", userdetails.uid + "/wins", displayThing); 

 function displayThing(_snapshot) {
   var data = _snapshot.val();

   document.getElementById("p1_Wins").innerHTML = "wins " + data; 
 }
function runOnUpdate(_path, _key, _func){
  firebase.database().ref(_path + '/' + _key).on("value", _func, readErr)
}

async function readRec(_path, _key){
  var data;

  function returnRec(_snap){
    data = _snap.val();
  }
  
  await firebase.database().ref(_path + '/' + _key).once("value", returnRec, readErr)

  return(data);
}
/**************************************************************/
//    END OF MODULE
/**************************************************************/