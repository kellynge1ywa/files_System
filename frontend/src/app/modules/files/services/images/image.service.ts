import { Injectable } from '@angular/core';
import { getStorage, ref } from 'firebase/storage';
import { imageRef, storage } from '../../../../../firebase.config';
import { map, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  getImages() {
    const getImages = imageRef.child('images');
    getImages.fullPath;
  }

  // getImages() {
  //   const folderRef = storage.ref('images');
  //   return folderRef.listAll();
  // }

  downloadImages(imagePath: string) {
    const imageStorage = firebase.storage();
    const imageRef = imageStorage.ref(imagePath);
    imageRef
      .child(imagePath)
      .getDownloadURL()
      .then((url) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
      });
  }

  getFolderRef(folderPath: string) {
    return storage.ref(folderPath);
    // return fileRef.getDownloadURL();
  }

  listImages(folderPath: string) {
    const folderRef = this.getFolderRef(folderPath);
    return folderRef.listAll();
  }
}
