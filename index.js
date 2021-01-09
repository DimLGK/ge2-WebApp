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

// Data for map
var archeologicalSitesData = [
    {
        "lat": "40.62731322860056",
        "long": "22.9508688610709",
        "guide": "Tony Chan",
        "gid": "1"
    },
    {
        "lat": "40.58272482165455",
        "long": "22.963157448468245",
        "guide": "Hasan Adbul",
        "gid": "2"
    },
    {

        "lat": "40.6421290045795",
        "long": "22.95440936389948",
        "guide": "Χριστινα Βασιλειάδη",
        "gid": "3"
    }
];

// Change the icon of the marker
var guideIcon = L.icon({
    iconUrl: './pic/marker_car.png',
    iconSize: [60, 60], // size of the icon
    //iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    //popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Open Chat Popup
function showChat(id) {
    document.getElementById("chat").style.display = "block";
    localStorage.setItem('chatid', id);
    if (id === 'christina') {
        document.getElementById("chatHeader").innerHTML = "Χριστίνα Βασιλειάδη";
        markers[3].openPopup();
    } else if (id === 'tony') {
        document.getElementById("chatHeader").innerHTML = "Tony Chan";
        markers[1].openPopup();
    } else if (id === 'hasan') {
        document.getElementById("chatHeader").innerHTML = "Hasan Abdul";
        markers[2].openPopup();
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
    localStorage.removeItem('chat');
}
