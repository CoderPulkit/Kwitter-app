//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyCN1a8RQK3JokUb1uOETsolwcwi2hiUDjY",
      authDomain: "social-media-8406d.firebaseapp.com",
      databaseURL: "https://social-media-8406d-default-rtdb.firebaseio.com",
      projectId: "social-media-8406d",
      storageBucket: "social-media-8406d.appspot.com",
      messagingSenderId: "464218930450",
      appId: "1:464218930450:web:d53d8ac2da5e71804407cb"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    function send() {
  msg=document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
 name:user_name,
 message:msg,
 like:0
  });
  document.getElementById("msg").value="";
    }

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location="index.html";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
     console.log(firebase_message_id);
     console.log(message_data);
     name= message_data['name'];
     message=message_data['message'];
     like=message_data['like'];
     name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
     msg_with_tag="<h4 class='message_h4'> "+message+"</h4>";
     like_button="<button class='btn btn-warning' id="+firebase_message_id+"value="+like+" onclick='update_Like(this.id)'>";
    span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>"+like+" </span></button><hr>";
    row=name_with_tag+msg_with_tag+like_button+span_with_tag;
    document.getElementById("output").innerHTML+=row;

     //End code
      } });  }); }
getData();


function update_Like(message_id) {
console.log("cliked on the like button-"+message_id);
button_id=message_id;
likes=document.getElementById(button_id).value;
updated_like=Number(likes)+1;
console.log(updated_like);
firebase.database().ref(room_name).child(message_id).update({
  like:updated_like
});
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}