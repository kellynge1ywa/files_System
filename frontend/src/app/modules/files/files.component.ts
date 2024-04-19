import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
})
export class FilesComponent {}
