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
        tr.append("<td>" + childData.meetingplace + "</td>");
        tr.append("<td>" + childData.date + "</td>");

        if (childData.isavailable === true) tr.append("<td style='color: green;'>" + childData.guide + "</td>");
        else if (childData.isavailable === false) tr.append("<td style='color: red;'>" + childData.guide + "</td>");

        if (childData.ispaid === true) tr.append("<td style='color: green;'>" + childData.paymentmethod + "</td>");
        else if (childData.ispaid === false) tr.append("<td style='color: red;'>" + childData.paymentmethod + "</td>");

        tr.append('<td><button id="acceptButton' + childData.uid + '" type="button" class="btn btn-primary" onclick="acceptButtons(\'' + childData.uid + '\', \'' + childData.userid + '\', \'' + childData.cost + '\', \'' + childData.name + '\', \'' + childData.guide + '\', \'' + childData.tourtype + '\',  \'' + childData.date + '\', \'' + childData.duration + '\', \'' + childData.isavailable + '\', \'' + childData.ispaid + '\', \'' + childData.paymentmethod + '\', \'' + childData.payment + '\', \'' + childData.meetingplace + '\', \'' + childData.state + '\')">Αποδοχή</button></td>');
        tr.append('<td><button id="deleteButton' + childData.uid + '" type="button" class="btn btn-danger" onclick="showDelWarning(\'' + childData.uid + '\', \'' + childData.userid + '\', \'' + childData.cost + '\', \'' + childData.name + '\', \'' + childData.guide + '\', \'' + childData.tourtype + '\',  \'' + childData.date + '\', \'' + childData.duration + '\', \'' + childData.isavailable + '\', \'' + childData.ispaid + '\', \'' + childData.paymentmethod + '\', \'' + childData.payment + '\', \'' + childData.meetingplace + '\', \'' + childData.state + '\')">Απόρριψη</button></td>');
        //tr.append('<td ><div id="delFeedback' + childData.uid + '">This is my DIV element.</div></td>');
        $('table').append(tr);

        //$(showButtonStatusOnView(childData.uid, childData.state));
      } else if (childData.state === '1') {
        tr = $('<tr id=childData.uid/>');
        tr.append("<td>" + childData.name + "</td>");
        tr.append("<td>" + childData.meetingplace + "</td>");
        tr.append("<td>" + childData.date + "</td>");

        if (childData.isavailable === true) tr.append("<td style='color: green;'>" + childData.guide + "</td>");
        else if (childData.isavailable === false) tr.append("<td style='color: red;'>" + childData.guide + "</td>");

        if (childData.ispaid === true) tr.append("<td style='color: green;'>" + childData.paymentmethod + "</td>");
        else if (childData.ispaid === false) tr.append("<td style='color: red;'>" + childData.paymentmethod + "</td>");

        //tr.append('<td></td>');
        tr.append('<td style="color: green;"><div id="delFeedback' + childData.uid + '">Εγκρίθηκε</div></td>');
        tr.append('<td><button id="deleteButton' + childData.uid + '" type="button" class="btn btn-danger" onclick="undoState(\'' + childData.uid + '\', \'' + childData.userid + '\', \'' + childData.cost + '\', \'' + childData.name + '\', \'' + childData.guide + '\', \'' + childData.tourtype + '\',  \'' + childData.date + '\', \'' + childData.duration + '\', \'' + childData.isavailable + '\', \'' + childData.ispaid + '\', \'' + childData.paymentmethod + '\', \'' + childData.payment + '\', \'' + childData.meetingplace + '\', \'' + childData.state + '\')">Επαναφορά</button></td>');
        $('table').append(tr);
      } else if (childData.state === '2') {
        tr = $('<tr id=childData.uid/>');
        tr.append("<td>" + childData.name + "</td>");
        tr.append("<td>" + childData.meetingplace + "</td>");
        tr.append("<td>" + childData.date + "</td>");

        if (childData.isavailable === true) tr.append("<td style='color: green;'>" + childData.guide + "</td>");
        else if (childData.isavailable === false) tr.append("<td style='color: red;'>" + childData.guide + "</td>");

        if (childData.ispaid === true) tr.append("<td style='color: green;'>" + childData.paymentmethod + "</td>");
        else if (childData.ispaid === false) tr.append("<td style='color: red;'>" + childData.paymentmethod + "</td>");

        //tr.append('<td></td>');
        tr.append('<td style="color: red;"><div id="delFeedback' + childData.uid + '">Απορρίφθηκε</div></td>');
        tr.append('<td><button id="deleteButton' + childData.uid + '" type="button" class="btn btn-danger" onclick="undoState(\'' + childData.uid + '\', \'' + childData.userid + '\', \'' + childData.cost + '\', \'' + childData.name + '\', \'' + childData.guide + '\', \'' + childData.tourtype + '\',  \'' + childData.date + '\', \'' + childData.duration + '\', \'' + childData.isavailable + '\', \'' + childData.ispaid + '\', \'' + childData.paymentmethod + '\', \'' + childData.payment + '\', \'' + childData.meetingplace + '\', \'' + childData.state + '\')">Επαναφορά</button></td>');
        $('table').append(tr);
      } 

      for (var i = 0; i < localStorage.length; i++) {
        console.log("localStorage" + localStorage);
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
  // console.log("State:"+state);
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
    // 
    (mgsToSend);
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
//$(
//   function saveRequestToDb() {
//   var userid = firebase.database().ref().child('requests').push().key;
//   var name = 'Ηλίας Γεωργίου';
//   var guide = 'Tony Chan';
//   var tourtype = 'Αρχαιολογικοί χώροι';
//   var date = '15/12/2020, 12:00';
//   var paymentmethod = '80,00 ευρώ';
//   var meetingplace = 'Hotel Aigaion';
//   var state = '0';
//   var cost = 50;
//   var duration = 1;
//   var isavailable = true;
//   var ispaid = true;
//   var requestId = firebase.database().ref().child('requests').push().key;
//   updateRequest(requestId, userid, cost, name, guide, tourtype, date, duration, isavailable, ispaid, paymentmethod, meetingplace, state);
// }
//);

// Update the Database View
function updateRequest(requestId, userid, cost, name, guide, tourtype, date, duration, isavailable, ispaid, paymentmethod, payment, meetingplace, state) {
  var request = {
    uid: requestId,
    userid: userid,
    name: name,
    guide: guide,
    tourtype: tourtype,
    date: date,
    paymentmethod: paymentmethod,
    payment: payment,
    meetingplace: meetingplace,
    state: state,
    cost: parseInt(cost),
    duration: parseInt(duration),
    isavailable: isavailable,
    ispaid: ispaid
  };
  updateDb(requestId, request);
}


// Delete a Request from DB and update
function deleteRequestFromDb(requestId) {
  updateDb(requestId, null);
}


// Live Update of Database
function updateDb(uid, request) {
  console.log('hhAAJ')
  var updates = {};
  updates['/requests/' + uid] = request;
  return firebase.database().ref().update(updates);
}

///////// Open warning Popup
function showDelWarning(requestId, userid, cost, name, guide, tourtype, date, duration, isavailable, ispaid, paymentmethod, payment, meetingplace, state) {
  document.getElementById("delWarning").style.display = "block";
  //console.log("requestId: "+requestId);
  isavailable = true;
  ispaid = true;
  var request = {
    uid: requestId,
    userid: userid,
    name: name,
    guide: guide,
    tourtype: tourtype,
    date: date,
    paymentmethod: paymentmethod,
    payment: payment,
    meetingplace: meetingplace,
    state: state,
    cost: parseInt(cost),
    duration: parseInt(duration),
    isavailable: isavailable,
    ispaid: ispaid
  };
  localStorage.setItem('requestData', JSON.stringify(request));
  // console.log(request);
  //delButtons();
}

function acceptButtons(requestId, userid, cost, name, guide, tourtype, date, duration, isavailable, ispaid, paymentmethod, payment, meetingplace, state) {
  isavailable = true;
  ispaid = true;
  var request = {
    uid: requestId,
    userid: userid,
    name: name,
    guide: guide,
    tourtype: tourtype,
    date: date,
    paymentmethod: paymentmethod,
    payment: payment,
    meetingplace: meetingplace,
    state: state,
    cost: parseInt(cost),
    duration: parseInt(duration),
    isavailable: isavailable,
    ispaid: ispaid
  };
  //uid ,userid,cost ,name, guide ,tourtype ,date ,duration,isavailable ,ispaid,paymentmethod,meetingplace,state
  //console.log("request: "+request);
  request.state = '1';
  //uid = request.uid;
  // console.log("request, uid: "+request, uid);
  // document.getElementById("acceptButton" + uid).style.display = "none";
  // document.getElementById("deleteButton" + uid).style.display = "none";
  // document.getElementById("delFeedback" + uid).style.display = "block";
  updateDb(request.uid, request);
}

function undoState(requestId, userid, cost, name, guide, tourtype, date, duration, isavailable, ispaid, paymentmethod, payment, meetingplace, state) {
  isavailable = true;
  ispaid = true;
  var request = {
    uid: requestId,
    userid: userid,
    name: name,
    guide: guide,
    tourtype: tourtype,
    date: date,
    paymentmethod: paymentmethod,
    payment: payment,
    meetingplace: meetingplace,
    state: state,
    cost: parseInt(cost),
    duration: parseInt(duration),
    isavailable: isavailable,
    ispaid: ispaid
  };
  //console.log("request: "+request);
  request.state = '0';
  //uid = request.uid;
  // console.log("request, uid: "+request, uid);
  // document.getElementById("acceptButton" + uid).style.display = "none";
  // document.getElementById("deleteButton" + uid).style.display = "none";
  // document.getElementById("delFeedback" + uid).style.display = "block";
  updateDb(request.uid, request);
}



function delButtons() {
  document.getElementById("delWarning").style.display = "none";

  var request = [];
  var requestData = JSON.parse(localStorage.getItem('requestData'));

  request = requestData;
  //console.log("request: "+request);
  request.state = '2';
  //uid = request.uid;
  //console.log(request, uid);
  // document.getElementById("acceptButton" + uid).style.display = "none";
  // document.getElementById("deleteButton" + uid).style.display = "none";
  // document.getElementById("delFeedback" + uid).style.display = "block";

  updateDb(request.uid, request);
  //localStorage.clear();
  localStorage.removeItem('requestData');
}

// Close warning Popup
function closeDelWarning() {
  document.getElementById("delWarning").style.display = "none";
  errors++;
  console.log("Errors: " + errors);
}

// Reminder for chat Popup - NOT WORKING YET
var pmData = [
  {
    "name": "Χριστίνα Βασιλειάδη",
    "message": "Ο πελάτης θα περιμένει στην Καμάρα στις 10:00."
  }
];
