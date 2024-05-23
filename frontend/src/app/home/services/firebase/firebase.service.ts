// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import firebase from 'firebase/compat';
// // import { firestore } from '../../../../firebase.config';

// @Injectable({
//   providedIn: 'root',
// })
// export class FirebaseService {
//   constructor() {}

//   getAll<T>(
//     collection: string,

//     options?: firebase.firestore.GetOptions | undefined
//   ) {
//     return new Observable<T[]>((subscriber) => {
//       firestore
//         .collection(collection)

//         .get(options)
//         .then((snapshot) => {
//           const data: T[] = snapshot.docs.map((item) => {
//             const doc = {
//               ...item.data(),
//               id: item.id,
//             };
//             return doc;
//           }) as T[];
//           subscriber.next(data);
//         })
//         .catch((err) => {
//           subscriber.error(err);
//         });
//     });
//   }

//   getOne<T>(collection: string, id: string) {
//     return new Observable<T>((subscriber) => {
//       firestore
//         .collection(collection)
//         .doc(id)
//         .get()
//         .then((snapshot) => {
//           const data: T = { ...snapshot.data(), id: snapshot.id } as T;
//           subscriber.next(data);
//         })
//         .catch((err) => {
//           subscriber.error(err);
//         });
//     });
//   }

//   // AddOne<T>(collection: string, ) {
//   //   return new Observable<T>((subscriber) => {
//   //     firestore
//   //       .collection(collection).add(co)
//   //       .get()
//   //       .then((snapshot) => {
//   //         const data: T = { ...snapshot.data(), id: snapshot.id } as T;
//   //         subscriber.next(data);
//   //       })
//   //       .catch((err) => {
//   //         subscriber.error(err);
//   //       });
//   //   });
//   // }
// }
