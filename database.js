// Firebase region

function saveGuideToDb(first, last, payrate, rating, languages, specialization) {
  var guideId = firebase.database().ref().child('guides').push().key;
  updateGuide(guideId, first, last, payrate, rating, languages, specialization);
}

function updateGuide(guideId, first, last, payrate, rating, languages, specialization) {
  var guide = {
    uid: guideId,
    first_name: first,
    last_name: last,
    payrate: payrate,
    rating: rating,
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