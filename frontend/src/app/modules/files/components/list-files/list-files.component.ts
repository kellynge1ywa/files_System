import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageService } from '../../services/images/image.service';
import { Observable } from 'rxjs';
import { FilesService } from '../../services/files/files.service';
import { FileDetails } from '../../interfaces/files';
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

  files!: FileDetails[];

  folder?: Folder;

  selectedFile?: FileDetails;

  file: FileDetails[] = [];

  loggedInUserId?: string;

  showForm: boolean = false;

  imageURL: string = '';

  errorMessage = '';

  filename = new FormControl('', [Validators.required]);
  filepath = new FormControl('', [Validators.required]);

  addFileForm = new FormGroup({
    filename: new FormControl('', Validators.required),
    filepath: new FormControl('', Validators.required),
  });

  constructor(
    private fileService: FilesService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private toastr: HotToastService
  ) {}
  user$ = this.authService.loggedinUser$.subscribe((dt) => {
    const userId = dt?.uid;
    console.log(dt?.uid);
    this.loggedInUserId = userId;
  });
  currentUser$ = this.userService.currentUserProfile$;

  ngOnInit(): void {
    const folderId = this.route.snapshot.paramMap.get('id') as string;
    console.log(folderId);
    this.folderId = folderId;
    console.log(this.folderId);
    this.getAllFiles();
    this.getFolder(folderId);
  }

  preview(file: FileDetails) {
    if (file.id === this.selectedFile?.id) {
      this.showPreview = !this.showPreview;
    }
    this.selectedFile = file;
  }

  // getFiles(folderId: string) {
  //   this.fileService.getAllFiles(folderId)
  //     .subscribe((files) => (this.files = files));
  // }

  fileNameError() {
    if (this.filename.hasError('required')) {
      this.errorMessage = 'Enter  file name';
    } else {
      this.errorMessage = '';
    }
  }

  filePathError() {
    if (this.filepath.hasError('required')) {
      this.errorMessage = 'Enter  file path';
    } else {
      this.errorMessage = '';
    }
  }

  onSubmit() {
    const newFile = this.addFileForm.value as FileDetails;
    const { filename } = this.addFileForm.value;
    if (this.addFileForm.valid) {
      newFile.id = filename?.toLowerCase();
      newFile.folderId = this.folderId;
      console.log(newFile.folderId);
      newFile.format = this.folder?.folderName.slice(0, -1);
      newFile.userId = this.loggedInUserId;
      this.fileService.addFile(this.folderId, newFile).then(() => {
        this.showForm = false;
      });
    }
  }

  getAllFiles() {
    this.fileService.getAllFiles();
  }

  getFolder(folderId: string) {
    this.fileService
      .getFolder(folderId)
      .subscribe((folder) => (this.folder = folder));
  }

  logout() {
    this.authService
      .logout()
      .pipe(
        this.toastr.observe({
          success: 'Logout successfully!!!, Goodbye ',
          error: 'Logout failed!!!',
          loading: 'Loading',
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
