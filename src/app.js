import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from "./upload";

const firebaseConfig = {
    apiKey: "AIzaSyA-X6qRLbA10QpsU84LLzqFAx3ryxj_6bA",
    authDomain: "photo-cloud-671f9.firebaseapp.com",
    projectId: "photo-cloud-671f9",
    storageBucket: "photo-cloud-671f9.appspot.com",
    messagingSenderId: "836075009133",
    appId: "1:836075009133:web:111a9bf7989d460443fb64"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                    const percent = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
                    const block = blocks[index].querySelector('.preview-info-progress')
                    block.textContent = percent
                    block.style.width = percent + '%'

                },
                error => {
                    console.log(error)
                },
                () => {
                    console.log("Complete")
                    task.snapshot.ref.getDownloadURL().then(url => console.log("Url: " + url))
                }
            )
        })
    }
})

console.log('app is starting...')