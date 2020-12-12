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
   
// Populate table body with guides
$(document).ready(function () {
      var markersRef = firebase.database().ref('guides'); 
      markersRef.on('value', snapshot => {
        clearTableContents();
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();

          tr = $('<tr id=childData.uid/>');
          tr.append("<td>" + childData.name + "</td>");
          tr.append("<td>" + childData.specialization + "</td>");
          tr.append("<td>" + childData.languages + "</td>");
          tr.append("<td>" + childData.occupation + "</td>");
          tr.append("<td>" + childData.payrate + "</td>");
          tr.append('<td><button type="button" class="btn btn-danger" onclick="showDelWarning(\'' + childData.uid + '\')">X</button></td>');
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

// Open Add Guide Form
function showAddGuideForm() {
      document.getElementById("employeeForm").style.display = "block";
}
    
// Add the Guide to Db
function addGuide() {
      var name = (document.getElementById('name')).value;
      var specialization = (document.getElementById('specialization')).value;
      var languages = (document.getElementById('languages')).value;
      var occupation = (document.getElementById('occupation')).value;
      var payment = (document.getElementById('payment')).value;
      console.log(name + " " + specialization + " " + languages + " " + occupation + " " + payment + "\n");
      saveGuideToDb(name, payment, 10, occupation, languages, specialization);
      closeAddGuideForm();
}

// Close the Popup Add Guide Form
function closeAddGuideForm() {
      document.getElementById("employeeForm").style.display = "none";
}

// Save a new Guide to DB
function saveGuideToDb(name, payrate, rating, occupation, languages, specialization) {
  var guideId = firebase.database().ref().child('guides').push().key;
  updateGuide(guideId, name, payrate, rating, occupation, languages, specialization);
}

// Update the Database View
function updateGuide(guideId, name, payrate, rating, occupation, languages, specialization) {
  var guide = {
    uid: guideId,
    name: name,
    payrate: payrate,
    rating: rating,
    occupation: occupation,
    languages: languages,
    specialization: specialization
  };
  updateDb(guideId, guide);
}

// Delete a Guide from DB and update
function deleteGuideFromDb(guideId) {
  updateDb(guideId, null);
}

// Live Update of Database
function updateDb(uid, guide) {
  var updates = {};
  updates['/guides/' + uid] = guide;
  return firebase.database().ref().update(updates);
}


// Open warning Popup
function showDelWarning(guideId) {
  document.getElementById("delWarning").style.display = "block";
  console.log(guideId);
  localStorage.setItem('guideId', guideId);
  return guideId;
}

// Close warning Popup
function closeDelWarning() {
  document.getElementById("delWarning").style.display = "none";
}


function delGuide() {
  document.getElementById("delWarning").style.display = "none";
  guideId = localStorage.getItem('guideId');
  deleteGuideFromDb(guideId);
  localStorage.removeItem('guideId'); 
      
  document.getElementById("delConfirm").style.display = "block";
}

function closeDelConfirmation() {
  document.getElementById("delConfirm").style.display = "none";
}

// Reminder for chat Popup - NOT WORKING YET
var pmData = [
      {
        "name": "Χριστίνα Βασιλειάδη",
        "message": "Ο πελάτης θα περιμένει στην Καμάρα στις 10:00."
      }
];
