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

$(document).ready(function () {
    var dataReligion = [];
    var dataArxaio = [];
    var dataTech = [];
    var dataNewRoute = [];
    
     // Change the icon of the marker
    var arxeoIcon = L.icon({
        iconUrl: './pic/marker-icon-gold.png',
        iconSize: [28, 38]
    });
    var relegIcon = L.icon({
        iconUrl: './pic/marker-icon-blue.png',
        iconSize: [28, 38]
    });
    var technoIcon = L.icon({
        iconUrl: './pic/marker-icon-red.png',
        iconSize: [28, 38]
    });
    var newRouteIcon = L.icon({
        iconUrl: './pic/marker-icon-black.png',
        iconSize: [28, 38]
    });

var markersArxaiolog = firebase.database().ref('routes');
    markersArxaiolog.orderByChild('tourType').equalTo("Αρχαιολογικοί χώροι").on('value', snapshot => {

        snapshot.forEach(function (childSnapshot) {
            var arxaioData = childSnapshot.val();
            marker = L.marker([arxaioData.latitude, arxaioData.longitude], { draggable: 'true', icon: arxeoIcon })
                .bindPopup(arxaioData.title + '<br>' + '<a type="button" style="cursor: pointer;" onclick="deletePinsFromDb(\'' + arxaioData + '\', \'' + arxaioData.uid + '\')">Διαγραφή</a>')
                .openPopup();
            arxaioGroup.addLayer(marker);
            dataArxaio.push([arxaioData.latitude, arxaioData.longitude]);
        });
        // var arxaioPolyline = L.polyline(dataArxaio).setStyle({ color: 'green' });
        // arxaioGroup.addLayer(arxaioPolyline);
    });

    var markersReleg = firebase.database().ref('routes');
    markersReleg.orderByChild('tourType').equalTo("Θρησκευτικά μνημεία").on('value', snapshot => {

        snapshot.forEach(function (childSnapshot) {
            var relegData = childSnapshot.val();
            marker = L.marker([relegData.latitude, relegData.longitude], { draggable: 'true', icon: relegIcon })
                .bindPopup(relegData.title + '<br>' + '<a type="button" style="cursor: pointer;" onclick="deletePinsFromDb(\'' + relegData + '\', \'' + relegData.uid + '\')">Διαγραφή</a>')
                .openPopup();
            relegGroup.addLayer(marker);
            dataReligion.push([relegData.latitude, relegData.longitude]);
        });
        // var relegPolyline = L.polyline(dataReligion).setStyle({ color: 'black' });
        // relegGroup.addLayer(relegPolyline);
    });

    var markersTechno = firebase.database().ref('routes');
    markersTechno.orderByChild('tourType').equalTo("Τεχνολογικά αξιοθέατα").on('value', snapshot => {

        snapshot.forEach(function (childSnapshot) {
            var technoData = childSnapshot.val();
            marker = L.marker([technoData.latitude, technoData.longitude], { draggable: 'true', icon: technoIcon })
                .bindPopup(technoData.title + '<br>' + '<a type="button" style="cursor: pointer;" onclick="deletePinsFromDb(\'' + technoData + '\', \'' + technoData.uid + '\')">Διαγραφή</a>')
                .openPopup();
            technoGroup.addLayer(marker);
            dataTech.push([technoData.latitude, technoData.longitude]);
        });
        // var techPolyline = L.polyline(dataTech).setStyle({ color: 'blue' });
        // technoGroup.addLayer(techPolyline);
    });
    
    var markersNewRoute = firebase.database().ref('routes');
    markersNewRoute.orderByChild('tourType').equalTo("Περίπατος").on('value', snapshot => {

        snapshot.forEach(function (childSnapshot) {
            var newRouteData = childSnapshot.val();
            marker = L.marker([newRouteData.latitude, newRouteData.longitude], { draggable: 'true', icon: newRouteIcon })
                .bindPopup(newRouteData.title + '<br>' + '<a type="button" style="cursor: pointer;" onclick="deletePinsFromDb(\'' + newRouteData + '\', \'' + newRouteData.uid + '\')">Διαγραφή</a>')
                .openPopup();
            newRouteGroup.addLayer(marker);
            dataNewRoute.push([newRouteData.latitude, newRouteData.longitude]);
        });
    });
    
    document.getElementById("tour4").style.display = "none";
});


function showSites(type) {
    //var newRouteGroup = type;
    map.removeLayer(arxaioGroup);
    map.removeLayer(relegGroup);
    map.removeLayer(technoGroup);
    map.removeLayer(newRouteGroup);
    map.addLayer(type);

    //localStorage.setItem('routeType', type);

    // Change the icon of the marker
    var arxeoIcon = L.icon({
        iconUrl: './pic/marker-icon-gold.png',
        iconSize: [28, 38]
    });
    var relegIcon = L.icon({
        iconUrl: './pic/marker-icon-blue.png',
        iconSize: [28, 38]
    });
    var technoIcon = L.icon({
        iconUrl: './pic/marker-icon-red.png',
        iconSize: [28, 38]
    });
    var newRouteIcon = L.icon({
        iconUrl: './pic/marker-icon-black.png',
        iconSize: [28, 38]
    });

    
    var geocodeService = L.esri.Geocoding.geocodeService();
    // $("#One").click(function () {
    //   var curPos = myMarker.getLatLng();
    //   alert(curPos.lng + " : " + curPos.lat);
    // });

    map.on('click', function (e) {
        geocodeService.reverse().latlng(e.latlng).run(function (error, result) {
            if (type == arxaioGroup) {
                console.log('arxaioGroup');

                onarxaioClickMarker = L.marker(result.latlng, { draggable: 'true', icon: arxeoIcon })
                    .bindPopup(result.address.Match_addr + '<br>' + '<a type="button" style="cursor: pointer;" >Διαγραφή</a>', {
                        removable: true,
                        editable: true,
                        clickable: true,
                        icon: arxeoIcon
                    }).openPopup();
                arxaioGroup.addLayer(onarxaioClickMarker);

                var curPos = onarxaioClickMarker.getLatLng();

                latitude = curPos.lat;
                longitude = curPos.lng;
                title = result.address.Match_addr;
                description = result.address.Match_addr;
                isSelected = 'true';
                tourType = 'Αρχαιολογικοί χώροι';
                imageUrl = '';
                saveRouteToDb(latitude, longitude, isSelected, title, description, tourType, imageUrl);

                dataArxaio.push([curPos.lat, curPos.lng]);

                //console.log(arxaioGroup);
                //dataArxaio.push([technoData.latitude, technoData.longitude]);
            } else if (type == relegGroup) {
                console.log('relegGroup');

                onrelegClickMarker = L.marker(result.latlng, { draggable: 'true', icon: relegIcon })
                    .bindPopup(result.address.Match_addr + '<br>' + '<a type="button" style="cursor: pointer;" >Διαγραφή</a>', {
                        removable: true,
                        editable: true,
                        clickable: true,
                        icon: relegIcon
                    }).openPopup();
                relegGroup.addLayer(onrelegClickMarker);

                var curPos = onrelegClickMarker.getLatLng();

                latitude = curPos.lat;
                longitude = curPos.lng;
                title = result.address.Match_addr;
                description = result.address.Match_addr;
                isSelected = 'true';
                tourType = 'Θρησκευτικά μνημεία';
                imageUrl = '';
                saveRouteToDb(latitude, longitude, isSelected, title, description, tourType, imageUrl);

                dataReligion.push([curPos.lat, curPos.lng]);

                //dataTech.push([technoData.latitude, technoData.longitude]);
            } else if (type == technoGroup) {
                console.log('technoGroup');

                ontechnoClickMarker = L.marker(result.latlng, { draggable: 'true', icon: technoIcon })
                    .bindPopup(result.address.Match_addr + '<br>' + '<a type="button" style="cursor: pointer;" >Διαγραφή</a>', {
                        removable: true,
                        editable: true,
                        clickable: true,
                        icon: technoIcon
                    }).openPopup();
                technoGroup.addLayer(ontechnoClickMarker);

                var curPos = ontechnoClickMarker.getLatLng();

                latitude = curPos.lat;
                longitude = curPos.lng;
                title = result.address.Match_addr;
                description = result.address.Match_addr;
                isSelected = 'true';
                tourType = 'Τεχνολογικά αξιοθέατα';
                imageUrl = '';
                saveRouteToDb(latitude, longitude, isSelected, title, description, tourType, imageUrl);

                dataTech.push([curPos.lat, curPos.lng]);

                //dataTech.push([technoData.latitude, technoData.longitude]);
            } else if (type == newRouteGroup) {
                console.log('newRouteGroup');

                onnewRouteClickMarker = L.marker(result.latlng, { draggable: 'true', icon: newRouteIcon })
                    .bindPopup(result.address.Match_addr + '<br>' + '<a type="button" style="cursor: pointer;">Διαγραφή</a>', {
                        removable: true,
                        editable: true,
                        clickable: true,
                        icon: newRouteIcon
                    }).openPopup();
                newRouteGroup.addLayer(onnewRouteClickMarker);

                var curPos = onnewRouteClickMarker.getLatLng();

                latitude = curPos.lat;
                longitude = curPos.lng;
                title = result.address.Match_addr;
                description = result.address.Match_addr;
                isSelected = 'true';
                tourType = 'peripatos'; //type;
                imageUrl = '';
                saveRouteToDb(latitude, longitude, isSelected, title, description, tourType, imageUrl);

                //alert(curPos.lng + " : " + curPos.lat);
                dataNewRoute.push([curPos.lat, curPos.lng]);

                //dataTech.push([technoData.latitude, technoData.longitude]);
            }
        });
    });

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
    localStorage.removeItem('chat');
}

// Save a new routes to DB
function saveRouteToDb(latitude, longitude, isSelected, title, description, tourType, imageUrl) {
    var routeId = firebase.database().ref().child('routes').push().key;
    updateRoute(routeId, latitude, longitude, isSelected, title, description, tourType, imageUrl);
}

// Update the Database View
function updateRoute(routeId, latitude, longitude, isSelected, title, description, tourType, imageUrl) {
    var route = {
        uid: routeId,
        latitude: latitude,
        longitude: longitude,
        isSelected: isSelected,
        title: title,
        description: description,
        tourType: tourType,
        imageUrl: imageUrl
    };
    updateDb(routeId, route);
}

// Delete a routes from DB and update
function deleteRouteFromDb(routeId) {
    updateDb(routeId, null);
}

// Delete a pins from DB and update
function deletePinsFromDb(routeData, uid) {
    //var layer = technoGroup;
    //map.removeLayer(markersTechno);
    //technoData.refresh();
    updateDb(uid, null);
    //routeData.splice(uid, 1);
    //routeData = [];

    //map.addLayer(technoGroup);
}

// Live Update of Database
function updateDb(uid, route) {
    var updates = {};
    updates['/routes/' + uid] = route;
    return firebase.database().ref().update(updates);
}


function deleteRoute1() {
    document.getElementById("tour1").style.display = "none";
}

function deleteRoute2() {
    document.getElementById("tour2").style.display = "none";
}

function deleteRoute3() {
    document.getElementById("tour3").style.display = "none";
}

function deleteRoute4() {
    document.getElementById("tour4").style.display = "none";
}


// Open Add Route Form
function showAddRouteForm() {
    document.getElementById("routeForm").style.display = "block";
}

// Add the Route to Db
function addRoute() {
    document.getElementById("tour4").style.display = "block";
    var type = (document.getElementById('type')).value;
    document.getElementById("labelType").innerHTML = type;
    //saveRouteToDb(name, payment, 10, occupation, languages, specialization);
    closeAddRouteForm();
}

// Close the Popup Add Route Form
function closeAddRouteForm() {
    document.getElementById("routeForm").style.display = "none";
    errors++;
    console.log("Error No:"+errors+" Click button by mistake");
}


// Open warning Popup
function showDelWarning(routeId) {
  document.getElementById("delWarning").style.display = "block";
  console.log(routeId);
  localStorage.setItem('routeId', routeId);
  //return routeId;
}

// Close warning Popup
function closeDelWarning() {
  document.getElementById("delWarning").style.display = "none";
}


function delRoute() {
  document.getElementById("delWarning").style.display = "none";
  routeId = localStorage.getItem('routeId');
  console.log(routeId);
  if (routeId == 'tour1') {
    deleteRoute1();
  } else if (routeId == 'tour2') {
    deleteRoute2();
  } else if (routeId == 'tour3') {
    deleteRoute3();
  } else if (routeId == 'tour4') {
    deleteRoute4();
  }
  //deleteGuideFromDb(routeId);
  localStorage.removeItem('routeId');

  document.getElementById("delConfirm").style.display = "block";
}

function closeDelConfirmation() {
  document.getElementById("delConfirm").style.display = "none";
}
