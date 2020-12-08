// Firebase region

function saveGuideToDb(name, payrate, rating, occupation, languages, specialization) {
  var guideId = firebase.database().ref().child('guides').push().key;
  updateGuide(guideId, name, payrate, rating, occupation, languages, specialization);
}

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

function deleteGuideFromDb(guideId) {
  updateDb(guideId, null);
}

function updateDb(uid, guide) {
  var updates = {};
  updates['/guides/' + uid] = guide;
  return firebase.database().ref().update(updates);
}
