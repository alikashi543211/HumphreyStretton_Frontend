// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { urls } from "src/app/shared/constants/urls";

export const environment = {
    production: false,
    apiUrl: urls.stagingUrl,

    firebaseConfig: {
        apiKey: "AIzaSyCM6eRC08uXM7aMLm-SvJi-I4k7E1nz4Os",
        authDomain: "humphrey-2a081.firebaseapp.com",
        databaseURL: "https://humphrey-2a081-default-rtdb.firebaseio.com",
        projectId: "humphrey-2a081",
        storageBucket: "humphrey-2a081.appspot.com",
        messagingSenderId: "888798923943",
        appId: "1:888798923943:web:0a3ebb0ffa20a4b0d95f82",
        measurementId: "G-D79BYD315K"
    }


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
