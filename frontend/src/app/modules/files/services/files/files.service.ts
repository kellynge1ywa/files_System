import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FileDetails, UploadFileDto } from '../../interfaces/files';
import { Folder } from '../../../../home/interfaces/folder';
// import { FirebaseService } from '../../../../home/services/firebase/firebase.service';

// import { firestore } from '../../../../../firebase.config';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
// import { firestore } from '../../../../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  folderId!: string;

  baseUrl = 'https://localhost:7162/api/Files';
  http = inject(HttpClient);

  constructor(
    // private firebaseServices: FirebaseService,
    private toastr: HotToastService,
    private route: ActivatedRoute
  ) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getFolderId() {
    const folderId = this.route.snapshot.paramMap.get('id') as string;
    this.folderId = folderId;
    console.log(folderId);
  }

  addFile(folderId: string, newFile: FormData): Observable<FileDetails> {
    return this.http.post<FileDetails>(
      `${this.baseUrl}/upload/${folderId}`,
      newFile,
      {
        headers: this.createAuthorizationHeader(),
      }
    );
  }

  getFolderFiles(folderId: string) {
    return this.http
      .get<{ result: FileDetails[] }>(
        `${this.baseUrl}/folder_files/${folderId}`
      )
      .pipe(map((res) => res.result));
  }

  // getAllFiles() {
  //   return firestore
  //     .collection('folders')
  //     .get()
  //     .then((QuerySnapshot) => {
  //       QuerySnapshot.forEach((doc) => {
  //         console.log(doc.id);
  //       });
  //     });
  // }

  // getFolder(folderId: string) {
  //   return this.firebaseServices.getOne<Folder>('folders', folderId);
  // }

  // getFolder(folderId: string) {
  //   return this.http.get<Folder>(`http://localhost:3000/folders/${folderId}`);
  // }
}
