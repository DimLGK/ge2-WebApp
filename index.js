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

// Data for map
var archeologicalSitesData = [
    {
        "lat": "40.62731322860056",
        "long": "22.9508688610709",
        "guide": "Tony Chan"
    },
    {
        "lat": "40.58272482165455",
        "long": "22.963157448468245",
        "guide": "Hasan Adbul"
    },
    {

        "lat": "40.6421290045795",
        "long": "22.95440936389948",
        "guide": "Χριστινα Βασιλειάδη"

    }
];

// Change the icon of the marker
var guideIcon = L.icon({
    iconUrl: './pic/marker_car.png',
    iconSize: [38, 38], // size of the icon
    //iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    //popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

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
    localStorage.removeItem('chat');
}

var input = document.getElementById('christina');
document.getElementById('submit').onclick = function () {
    pmData.push(input.value);
    screen.innerHTML = input.value;
};

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

// Api for google maps

// Initialize and add the map
//function initMap() {
//    const thessaloniki = { lat: 40.627470, lng: 22.948031 };
//    const map = new google.maps.Map(document.getElementById("map"), {
//        zoom: 12,
//        center: thessaloniki,
//    });
    // The marker, positioned at Uluru
//    const marker = new google.maps.Marker({
//        position: thessaloniki,
//        map: map,
//    });
// }

//var pmData = [
//   {
//        "name": "Χριστίνα Βασιλειάδη",
//        "message": "Ο πελάτης θα περιμένει στην Καμάρα στις 10:00."
//    }
//];



