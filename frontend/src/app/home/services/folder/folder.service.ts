import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddFolderDto, Folder, FolderResponse } from '../../interfaces/folder';
// import { firestore } from '../../../../firebase.config';
// import { auth } from '../../../../firebase.config';
// import firebase from 'firebase/compat';
import { from, map, Observable } from 'rxjs';
// import { FirebaseService } from '../firebase/firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';
import { ref } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  // private folderCollections:CollectionReference<Folder>;

  userId?: string;
  baseURL = 'http://localhost:7161/api/Folders';

  constructor(
    private http: HttpClient,
    // private firebaseService: FirebaseService,
    private authService: AuthService
  ) {}
  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getFolders() {
    return this.http
      .get<{ result: Folder[] }>(`${this.baseURL}/user_Folders`)
      .pipe(map((res) => res.result));
  }

  getFolder(folderId: string) {
    return this.http
      .get<{ result: Folder }>(`${this.baseURL}/${folderId}`)
      .pipe(map((res) => res.result));
  }

  addFolder(folder: AddFolderDto): Observable<Folder> {
    return this.http.post<Folder>(`${this.baseURL}`, folder, {
      headers: this.createAuthorizationHeader(),
    });
  }

  // addFolder(folder: Folder) {
  //   return firestore.collection('folders').doc().set(folder);
  // }

  // getAllFolders() {
  //   return this.firebaseService.getAll<Folder>('folders');
  // }

  updateFolder() {}

  deleteFolder(folder: Folder) {}
}
