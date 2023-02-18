import { urls } from "src/app/shared/constants/urls";

export const environment = {
    production: true,
    apiUrl: urls.stagingUrl,
    // apiUrl: urls.awsUrl,


    // Production

    // firebaseConfig: {
    //     apiKey: "AIzaSyAm6blV0hs82ElUDgjSPwrpf40O6ncUjd0",
    //     authDomain: "humphrey-stretton.firebaseapp.com",
    //     databaseURL: "https://humphrey-stretton.firebaseio.com",
    //     projectId: "humphrey-stretton",
    //     storageBucket: "humphrey-stretton.appspot.com",
    //     messagingSenderId: "545119041119",
    //     appId: "1:545119041119:web:b7094a8883697a6e6bcdea"
    // }


    // Staging

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
