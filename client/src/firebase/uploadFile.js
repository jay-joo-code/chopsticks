import firebase from 'src/firebase';
import axios from 'axios';

// REJECT: Upload error
// RESOLVE: Img download url
const uploadFile = (file, directory) => new Promise((resolve, reject) => {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const path = `${directory}/${file.name}`;
  
  // check if file already exists in storage
  storageRef.child(path).getDownloadURL()
    .then((url) => {
      resolve(url)
    })
    .catch((error) => {
      // file doesn't exist. upload file
      const uploadTask = storageRef.child(path).put(file);
      uploadTask.on('state_changed',
        (snapshot) => {},
        (e) => {
          reject(e);
        },
        () => {
          // UPLOAD SUCCESS
          uploadTask.snapshot.ref.getDownloadURL().then((src) => {
            // STORE METADATA IN DB
            const data = {
              name: file.name,
              src,
              path
            }
            axios.post('/api/file/create', data)
              .then(() => resolve(src))
              .catch((e) => reject(e))
          });
        });  
    });
});

export default uploadFile;