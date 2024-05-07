import { Component, inject, OnInit } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../modules/public/components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FolderService } from '../../services/folder/folder.service';
import { Folder } from '../../interfaces/folder';
import { AuthService } from '../../../modules/auth/services/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatMenuModule } from '@angular/material/menu';
import { UsersService } from '../../../modules/auth/services/user/users.service';
import { auth } from '../../../../firebase.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserResponseDto } from '../../../modules/auth/interface/user';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NavbarComponent,
    MatSidenavModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    MatMenuModule,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  value = 'Clear me';

  folders: Folder[] = [];
  folder!: Folder;

  showForm: boolean = false;

  folderName = new FormControl('', [Validators.required]);

  errorMessage = '';

  loggedInUserId?: string;
  auth = inject(AuthService);
  http = inject(HttpClient);

  addFolderForm = new FormGroup({
    folderName: new FormControl('', [Validators.required]),
  });

  constructor(
    private folderService: FolderService,
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private toastr: HotToastService
  ) {}
  // currentUser$ = this.userService.currentUserProfile$;

  // user$ = this.authService.loggedinUser$.subscribe((dt) => {
  //   const userId = dt?.uid;
  //   console.log(dt?.uid);
  //   this.loggedInUserId = userId;
  // });

  ngOnInit(): void {
    this.addFolderForm = new FormGroup({
      folderName: new FormControl('', Validators.required),
    });
    this.getFolders();

    //logged in user
    // this.auth.authState.subscribe((user) => {
    //   this.loggedInUser = user;
    //   console.log(user);
    // });
  }

  folderNameError() {
    if (this.folderName.hasError('required')) {
      this.errorMessage = 'Enter  folder name';
    } else {
      this.errorMessage = '';
    }
  }

  getFolders() {
    this.folderService.getFolders().subscribe((folders) => {
      this.folders = folders;
      console.log(folders);
    });
  }

  // getUser() {
  //   this.authService.getCurrentUser();
  // }
  onSubmit() {
    const formData = this.addFolderForm.value as Folder;
    if (this.addFolderForm.valid) {
      this.folderService
        .addFolder(formData)
        .pipe(
          this.toastr.observe({
            success: 'Folder added successful!!!',
            error: 'Folder add failed, try again',
            loading: 'Loading!!!',
            // error:((message))=>`${message}`
          })
        )
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  // onSubmit() {
  //   const newFolder = this.addFolderForm.value as Folder;
  //   const { folderName } = this.addFolderForm.value;
  //   if (this.addFolderForm.valid) {
  //     newFolder.id = folderName?.toLowerCase();
  //     newFolder.userId = this.loggedInUserId;
  //     this.folderService.addFolder(newFolder).then(() => {
  //       // newFolder.userId = ;
  //       this.toastr.observe({
  //         loading: 'Adding new folder..',
  //         success: 'Folder added successfully',
  //       });
  //       this.showForm = false;
  //     });
  //   }
  // }

  logout() {
    // this.authService
    //   .logout()
    //   .pipe(
    //     this.toastr.observe({
    //       success: 'Logout successfully!!!, Goodbye ',
    //       error: 'Logout failed!!!',
    //       loading: 'Loading',
    //     })
    //   )
    //   .subscribe(() => {
    //     this.router.navigate(['/']);
    //   });
  }
}
