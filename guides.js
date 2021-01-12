// Configuration Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDm7qL28ccs6HgswcezkNMG3zy8Tk8El5E",
    authDomain: "tourexploration2.firebaseapp.com",
    databaseURL: "https://tourexploration2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tourexploration2",
    storageBucket: "tourexploration2.appspot.com",
    messagingSenderId: "503852972480",
    appId: "1:503852972480:web:e90e2d169dd7ee7f33b025",
    measurementId: "G-MF1VLCT6K7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create variable to store last id
var currentId;

// Populate table body with guides
$(document).ready(function () {
  var markersRef = firebase.database().ref('guides');
  markersRef.on('value', snapshot => {
    clearTableContents();
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();

      tr = $('<tr id=childData.uid/>');
      tr.append("<td>" + childData.name + "</td>");
      tr.append("<td>" + childData.specialization + "</td>");
      tr.append("<td>" + childData.languages + "</td>");
      tr.append("<td>" + childData.occupation + "</td>");
      tr.append("<td>" + childData.payrate + "</td>");
      tr.append('<td><button type="button" class="btn btn-danger" onclick="showDelWarning(\'' + childData.uid + '\')">X</button></td>');
      $('table').append(tr);
      currentId = childData.gid;
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
function showChat(id) {
  document.getElementById("chat").style.display = "block";
  localStorage.setItem('chatid', id);
  if (id === 'christina') {
    document.getElementById("chatHeader").innerHTML = "Χριστίνα Βασιλειάδη";
  } else if (id === 'tony') {
    document.getElementById("chatHeader").innerHTML = "Tony Chan";
  } else if (id === 'hasan') {
    document.getElementById("chatHeader").innerHTML = "Hasan Abdul";
  }
}

function sendMsg() {
  var chatId = localStorage.getItem('chatid');
  if (document.getElementById("textMsg").value != '') {
    var dateTime = new Date().toLocaleString();
    var mgsToSend = document.getElementById("textMsg").value;
    // console.log(mgsToSend);
  }
  
  var msgData = {
    id: chatId,
    date: dateTime,
    message: mgsToSend
  };
  updateChatInDb(chatId, msgData);
}

// Live Update of chat
function updateChatInDb(chatId, msgData) {
  localStorage.removeItem('chatid');
  var updates = {};
  updates['/chat/' + chatId] = msgData;
  return firebase.database().ref().update(updates);
}

// Close Chat Popup
function closeChat() {
  document.getElementById("chat").style.display = "none";
  localStorage.removeItem('chat');
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
  // console.log(name + " " + specialization + " " + languages + " " + occupation + " " + payment + "\n");
  saveGuideToDb(name, payment, 10, occupation, languages, specialization);
  closeAddGuideForm();
}

// Close the Popup Add Guide Form
function closeAddGuideForm() {
  document.getElementById("employeeForm").style.display = "none";
  errors++;
  console.log("Error No:"+errors+" Click button by mistake");
}

// Save a new Guide to DB
function saveGuideToDb(name, payrate, rating, occupation, languages, specialization) {
  var guideId = firebase.database().ref().child('guides').push().key;
  updateGuide(guideId, name, payrate, rating, occupation, languages, specialization);
}

// Update the Database View
function updateGuide(guideId, name, payrate, rating, occupation, languages, specialization) {
  currentId++;
  var guide = {
    uid: guideId,
    name: name,
    payrate: payrate,
    rating: rating,
    occupation: occupation,
    languages: languages,
    specialization: specialization,
    lat: "40.6291606863165", 
    long: "22.948215252108092",
    gid: currentId
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
  // console.log(guideId);
  localStorage.setItem('guideId', guideId);
  return guideId;
}

// Close warning Popup
function closeDelWarning() {
  document.getElementById("delWarning").style.display = "none";
  errors++;
  console.log("Error No:"+errors+" Click button by mistake");
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
