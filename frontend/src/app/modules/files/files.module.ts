import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFilesComponent } from './components/list-files/list-files.component';
import { FilesRoutingModule } from './files-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
// import { firebaseConfig } from '../../../firebase.config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptor/interceptor.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListFilesComponent,
    FilesRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    // provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideDatabase(() => getDatabase()),
    // provideStorage(() => getStorage()),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class FilesModule {}
