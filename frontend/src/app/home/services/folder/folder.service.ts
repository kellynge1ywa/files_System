import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Folder } from '../../interfaces/folder';
import { firestore } from '../../../../firebase.config';
import { auth } from '../../../../firebase.config';
import firebase from 'firebase/compat';
import { from, Observable } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';
import { ref } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  // private folderCollections:CollectionReference<Folder>;

  userId?: string;

  constructor(
    private http: HttpClient,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {
    // this.folderCollections=store.collection<Folder>('folders')
  }

  user$ = this.authService.loggedinUser$.subscribe((dt) => {
    const userUId = dt?.uid;
    console.log(dt?.uid);
    this.userId = userUId;
    console.log(this.userId);
  });

  getFolders() {
    if (!this.userId) {
      return 'User not found';
    }
    return firestore
      .collection('folders')
      .where('userId', '==', this.userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, '==', doc.data());
        });
      });
  }

  addFolder(folder: Folder) {
    return firestore.collection('folders').doc().set(folder);
  }

  getAllFolders() {
    return this.firebaseService.getAll<Folder>('folders');
  }

  updateFolder() {}

  deleteFolder(folder: Folder) {}
}
