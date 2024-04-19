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
import { firebaseConfig } from '../../../firebase.config';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListFilesComponent,
    FilesRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],
})
export class FilesModule {}
