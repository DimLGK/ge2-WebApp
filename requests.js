// Configuration Firebase
var firebaseConfig = {
      apiKey: "AIzaSyD_xg06CLNiORbmfVO-6vURoADclO1g2eo",
      authDomain: "tourexploration.firebaseapp.com",
      databaseURL: "https://tourexploration.firebaseio.com",
      projectId: "tourexploration",
      storageBucket: "tourexploration.appspot.com",
      messagingSenderId: "115899410318",
      appId: "1:115899410318:web:49b5df20824212d6d6a6df",
      measurementId: "G-EMZ6NWJ72Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
   
// Populate table body with requests
$(document).ready(function () {
      var markersRef = firebase.database().ref('requests'); 
      markersRef.on('value', snapshot => {
        clearTableContents();
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();

          tr = $('<tr id=childData.uid/>');
          tr.append("<td>" + childData.name + "</td>");
          tr.append("<td>" + childData.tourType + "</td>");
          tr.append("<td>" + childData.date + "</td>");
          tr.append("<td>" + childData.payment + "</td>");
          tr.append("<td>" + childData.meetingPlace + "</td>");
          tr.append('<td><button type="button" class="btn btn-danger" onclick="deleteGuideFromDb(\'' + childData.uid + '\')">X</button></td>');
          $('table').append(tr);
       });     
     });
});
    
function clearTableContents() {
      var node = document.getElementById("tablebody");
      while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
      }
}
    
// Open Chat Popup
function showChat() {
      document.getElementById("chat").style.display = "block";
}

// Close Chat Popup
function closeChat() {
      document.getElementById("chat").style.display = "none";
}

// Save a new Request to DB
function saveRequestToDb(name, tourType, date, payment, meetingPlace) {
  var requestId = firebase.database().ref().child('requests').push().key;
  updateRequest(requestId, name, tourType, date, payment, meetingPlace);
}

// Update the Database View
function updateRequest(requestId, name, tourType, date, payment, meetingPlace) {
  var request = {
    uid: requestId,
    name: name,
    tourType: tourType,
    date: date,
    payment: payment,
    meetingPlace: meetingPlace
  };
  updateDb(requestId, request);
}

// Delete a Request from DB and update
function deleteRequestFromDb(requestId) {
  updateDb(requestId, null);
}

// Live Update of Database
function updateDb(uid, request) {
  var updates = {};
  updates['/requests/' + uid] = request;
  return firebase.database().ref().update(updates);
}


// Reminder for chat Popup - NOT WORKING YET
var pmData = [
      {
        "name": "Χριστίνα Βασιλειάδη",
        "message": "Ο πελάτης θα περιμένει στην Καμάρα στις 10:00."
      }
];
