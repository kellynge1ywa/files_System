import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-folder',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './add-folder.component.html',
  styleUrl: './add-folder.component.css',
})
export class AddFolderComponent implements OnInit {
  profileForm = new FormGroup({
    folderName: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  onSubmit() {}
}
