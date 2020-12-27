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

// Reference to guide on Firebase
var guidesRef = firebase.database().ref('guides');

// Populate table body with requests
$(document).ready(function () {
  var markersRef = firebase.database().ref('requests');
  
  markersRef.on('value', snapshot => {
    clearTableContents();
    localStorage.clear();
    snapshot.forEach(function (childSnapshot) {
      var childData = childSnapshot.val();

      if (childData.state === '0') {
        tr = $('<tr id=childData.uid/>');
        tr.append("<td>" + childData.name + "</td>");
        //tr.append("<td>" + childData.tourType + "</td>");
        tr.append("<td>" + childData.date + "</td>");
        tr.append("<td>" + childData.payment + "</td>");
        tr.append("<td>" + childData.meetingPlace + "</td>");
        tr.append("<td>" + childData.guides + "</td>");
        tr.append('<td><button id="acceptButton' + childData.uid + '" type="button" class="btn btn-primary" onclick="acceptButtons(\'' + childData.uid + '\', \'' + childData.name + '\', \'' + childData.tourType + '\',  \'' + childData.date + '\',  \'' + childData.payment + '\', \'' + childData.meetingPlace + '\', \'' + childData.state + '\')">Αποδοχή</button></td>');
        tr.append('<td><button id="deleteButton' + childData.uid + '" type="button" class="btn btn-danger" onclick="showDelWarning(\'' + childData.uid + '\', \'' + childData.name + '\', \'' + childData.tourType + '\',  \'' + childData.date + '\',  \'' + childData.payment + '\', \'' + childData.meetingPlace + '\', \'' + childData.state + '\')">Απόρριψη</button></td>');
        //tr.append('<td ><div id="delFeedback' + childData.uid + '">This is my DIV element.</div></td>');
        $('table').append(tr);

        //$(showButtonStatusOnView(childData.uid, childData.state));
      } else if (childData.state === '1') {
        tr = $('<tr id=childData.uid/>');
        tr.append("<td>" + childData.name + "</td>");
        //tr.append("<td>" + childData.tourType + "</td>");
        tr.append("<td>" + childData.date + "</td>");
        tr.append("<td>" + childData.payment + "</td>");
        tr.append("<td>" + childData.meetingPlace + "</td>");
        tr.append("<td>" + childData.guides + "</td>");
        tr.append('<td></td>');
        tr.append('<td style="color: green;"><div id="delFeedback' + childData.uid + '">Εγκρίθηκε</div></td>');
        $('table').append(tr);
      } else if (childData.state === '2') {
        tr = $('<tr id=childData.uid/>');
        tr.append("<td>" + childData.name + "</td>");
        //tr.append("<td>" + childData.tourType + "</td>");
        tr.append("<td>" + childData.date + "</td>");
        tr.append("<td>" + childData.payment + "</td>");
        tr.append("<td>" + childData.meetingPlace + "</td>");
        tr.append("<td>" + childData.guides + "</td>");
        tr.append('<td></td>');
        tr.append('<td style="color: red;"><div id="delFeedback' + childData.uid + '">Απορρίφθηκε</div></td>');
        $('table').append(tr);
      }


      for (var i = 0; i < localStorage.length; i++) {
        console.log(localStorage);
      }

      //Retrieve local storage

      // if (localStorage.chatState = '1') {
      //   document.getElementById("chat").style.display = "block";
      // } else if (localStorage.chatState = '0') {
      //   document.getElementById("chat").style.display = "none";
      // }
    });
  });

});

function showButtonStatusOnView(uid, state) {
  console.log(state);
  document.getElementById("delFeedback" + uid).style.display = "none";
  if (state === '2') {
    document.getElementById("acceptButton" + uid).style.display = "none";
    document.getElementById("deleteButton" + uid).style.display = "none";
    document.getElementById("delFeedback" + uid).style.display = "block";
  }
}

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
    console.log(mgsToSend);
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
  localStorage.removeItem('chatState');
  localStorage.setItem('chatState', '0');
  localStorage.removeItem('chat');
}

// Save a new Request to DB
function saveRequestToDb(name, tourType, date, payment, meetingPlace, state) {
  name = 'Ηλίας Γεωργίου';
  tourType = 'Αρχαιολογικοί χώροι';
  date = '15/12/2020, 12:00';
  payment = '80,00 ευρώ';
  meetingPlace = 'Hotel Aigaion';
  state = '0';
  var requestId = firebase.database().ref().child('requests').push().key;
  updateRequest(requestId, name, tourType, date, payment, meetingPlace, state);
}

// Update the Database View
function updateRequest(requestId, name, tourType, date, payment, meetingPlace, state) {
  var request = {
    uid: requestId,
    name: name,
    tourType: tourType,
    date: date,
    payment: payment,
    meetingPlace: meetingPlace,
    state: state
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

///////// Open warning Popup
function showDelWarning(requestId, name, tourType, date, payment, meetingPlace, state) {
  document.getElementById("delWarning").style.display = "block";
  //console.log(requestId);
  var request = {
    uid: requestId,
    name: name,
    tourType: tourType,
    date: date,
    payment: payment,
    meetingPlace: meetingPlace,
    state: state
  };
  localStorage.setItem('requestData', JSON.stringify(request));
  console.log(request);
  //delButtons();
}


function acceptButtons(requestId, name, tourType, date, payment, meetingPlace, state) {
  var request = {
    uid: requestId,
    name: name,
    tourType: tourType,
    date: date,
    payment: payment,
    meetingPlace: meetingPlace,
    state: state
  };
  //console.log(request);
  request.state = '1';
  uid = request.uid;
  console.log(request, uid);

  // document.getElementById("acceptButton" + uid).style.display = "none";
  // document.getElementById("deleteButton" + uid).style.display = "none";
  // document.getElementById("delFeedback" + uid).style.display = "block";

  updateDb(uid, request);
}



function delButtons() {
  document.getElementById("delWarning").style.display = "none";

  var request = [];
  var requestData = JSON.parse(localStorage.getItem('requestData'));

  request = requestData;
  //console.log(request);
  request.state = '2';
  uid = request.uid;
  console.log(request, uid);

  // document.getElementById("acceptButton" + uid).style.display = "none";
  // document.getElementById("deleteButton" + uid).style.display = "none";
  // document.getElementById("delFeedback" + uid).style.display = "block";

  updateDb(uid, request);
  //localStorage.clear();
  localStorage.removeItem('requestData');
}


// Close warning Popup
function closeDelWarning() {
  document.getElementById("delWarning").style.display = "none";
}


// Reminder for chat Popup - NOT WORKING YET
var pmData = [
  {
    "name": "Χριστίνα Βασιλειάδη",
    "message": "Ο πελάτης θα περιμένει στην Καμάρα στις 10:00."
  }
];
