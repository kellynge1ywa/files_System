import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDetails } from '../../interfaces/files';
import { Folder } from '../../../../home/interfaces/folder';
import { FirebaseService } from '../../../../home/services/firebase/firebase.service';

import { firestore } from '../../../../../firebase.config';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute } from '@angular/router';
// import { firestore } from '../../../../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  folderId!: string;

  constructor(
    private firebaseServices: FirebaseService,
    private toastr: HotToastService,
    private route: ActivatedRoute
  ) {}

  getFolderId() {
    const folderId = this.route.snapshot.paramMap.get('id') as string;
    this.folderId = folderId;
    console.log(folderId);
  }

  addFile(folderId: string, file: FileDetails) {
    return firestore
      .collection('folders')
      .doc(folderId)
      .collection('files')
      .doc()
      .set(file)
      .then(() => {
        alert('File added!!!');
        this.toastr.observe({
          loading: 'Adding file...',
          success: 'File added successfully!!',
          error: 'Adding file failed!!',
        });
      });
  }

  getAllFiles() {
    return firestore
      .collection('folders')
      .get()
      .then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          console.log(doc.id);
        });
      });
  }

  getFolder(folderId: string) {
    return this.firebaseServices.getOne<Folder>('folders', folderId);
  }

  // getFolder(folderId: string) {
  //   return this.http.get<Folder>(`http://localhost:3000/folders/${folderId}`);
  // }
}
