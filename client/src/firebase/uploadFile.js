import firebase from 'src/firebase';
import log from 'src/util/log';

// REJECT: Upload error
// RESOLVE: Img download url
const uploadFile = (file, directory) => new Promise((resolve, reject) => {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const uploadTask = storageRef.child(`${directory}/${file.name}`).put(file);
  uploadTask.on('state_changed',
    (snapshot) => {},
    (e) => {
      reject(e);
    },
    () => {
      // UPLOAD SUCCESS
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        resolve(downloadURL);
      });
    });
});

export default uploadFile;