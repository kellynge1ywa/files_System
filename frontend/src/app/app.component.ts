import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'philes';
  auth = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    // window.addEventListener('storage', (event) => {
    //   if (event.storageArea === localStorage && event.key === 'token') {
    //     // Token has changed (likely due to restart) - clear it
    //     this.auth.logout();
    //   }
    // });
    //
  }
}
