import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadProfileImageService {
  constructor(private storage: Storage) {}

  uploadProfileImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadedImage = from(uploadBytes(storageRef, image));
    return uploadedImage.pipe(
      switchMap((result) => getDownloadURL(result.ref))
    );
  }
}
