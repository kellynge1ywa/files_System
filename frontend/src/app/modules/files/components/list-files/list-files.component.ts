import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { ImageService } from '../../services/images/image.service';
import { Observable } from 'rxjs';
import { FilesService } from '../../services/files/files.service';
import { FileDetails, UploadFileDto } from '../../interfaces/files';
import { Folder } from '../../../../home/interfaces/folder';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UsersService } from '../../../auth/services/user/users.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FolderService } from '../../../../home/services/folder/folder.service';

@Component({
  selector: 'app-list-files',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './list-files.component.html',
  styleUrl: './list-files.component.css',
})
export class ListFilesComponent implements OnInit {
  showPreview = false;

  folderId!: string;

  // files!: FileDetails[];

  folder?: Folder;

  folderService = inject(FolderService);

  selectedFile?: FileDetails;

  files: FileDetails[] = [];

  loggedInUserId?: string;

  showForm: boolean = false;

  imageURL: string = '';

  errorMessage = '';

  fileUpload!: UploadFileDto;

  newFile = new FormControl('', [Validators.required]);
  // filepath = new FormControl('', [Validators.required]);

  addFileForm = new FormGroup({
    newFile: new FormControl('', Validators.required),
    // filepath: new FormControl('', Validators.required),
  });

  constructor(
    private fileService: FilesService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private toastr: HotToastService
  ) {}
  // user$ = this.authService.loggedinUser$.subscribe((dt) => {
  //   const userId = dt?.uid;
  //   console.log(dt?.uid);
  //   this.loggedInUserId = userId;
  // });
  // currentUser$ = this.userService.currentUserProfile$;

  ngOnInit(): void {
    const folderId = this.route.snapshot.paramMap.get('id') as string;
    console.log(folderId);
    this.folderId = folderId;
    console.log(this.folderId);
    // this.getAllFiles();
    this.getFolder(folderId);

    this.getFiles(this.folderId);

    this.fileUpload = { file: null as unknown as File }; // Initialize properly
  }

  preview(file: FileDetails) {
    if (file.id === this.selectedFile?.id) {
      this.showPreview = !this.showPreview;
    }
    this.selectedFile = file;
  }

  getFiles(folderId: string) {
    this.fileService.getFolderFiles(folderId).subscribe((files) => {
      files.map((file) => {
        file.filePath = file.filePath.replace(/\\/g, '/');
        file.filePath = file.filePath.replace(/ /g, '').toLowerCase();
        // console.log(file.filePath.replace(' ', '_'));
      });
      this.files = files;
    });
  }

  fileError() {
    if (this.newFile.hasError('required')) {
      this.errorMessage = 'Enter  file name';
    } else {
      this.errorMessage = '';
    }
  }

  // filePathError() {
  //   if (this.filepath.hasError('required')) {
  //     this.errorMessage = 'Enter  file path';
  //   } else {
  //     this.errorMessage = '';
  //   }
  // }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    this.fileUpload.file = <File>files[0];
  };
  onSubmit() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileUpload.file, this.fileUpload.file.name);
    this.fileService
      .addFile(this.folderId, formData)
      .pipe(
        this.toastr.observe({
          success: 'File uploaded successfully!!!',
          error: 'File upload failed, try again',
          loading: 'Loading!!!',
        })
      )
      .subscribe(() => {});
  }

  // uploadFile(event: any) {
  //   this.fileUpload.file = event.target.files[0];
  // }

  // onSubmit() {
  //   this.fileService
  //     .addFile(this.folderId, this.fileUpload)
  //     .pipe(
  //       this.toastr.observe({
  //         success: 'File uploaded successful!!!',
  //         error: 'File upload failed, try again',
  //         loading: 'Loading!!!',
  //       })
  //     )
  //     .subscribe((file) => {
  //       console.log(file);
  //     });
  // }

  // getAllFiles() {
  //   this.fileService.getAllFiles();
  // }

  getFolder(folderId: string) {
    this.folderService
      .getFolder(folderId)
      .subscribe((folder) => (this.folder = folder));
  }

  logout() {
    this.authService.logout();
  }
}
