const getUser = () => {
    return new Promise ((resolve,reject) => {
        try {
            firebase.auth().onAuthStateChanged(function(user) {
                console.log(user);
                if (user) {
                console.log('user is sign in name.' , user.email);
                }   else {
                console.log('no user sign in.');
                }
                resolve(user);
            });  
        } catch(error) {
            console.log(error);
            reject(error);
        }
    });
}

const signOut = () => {
    return new Promise ((resolve,reject) => {
        firebase.auth().signOut()
        .then(() => {
            resolve('done');
        }).catch((error) => {
            reject(error);
        });
    })
}


const homeLoad = async () => {
    let user = await getUser();
    if (user == null) {
        console.log('home has no user active.');
        document.getElementById('status-button').innerHTML = 'sign in';
        document.getElementById('status-button').onclick = () => {
            location.href = './auth-signin.html';
        }
    }
    else {

        if (!user.emailVerified) {
            location.href = './auth-verify.html';
            return;
        }
        // user available
        console.log('user active.');
        document.getElementById('displayname').innerHTML = `${user.displayName} <button class="button-can-hover" onclick="location.href='./acc-edit.html'">edit</button>`;
        document.getElementById('user-display').innerHTML = `${user.email}`;
        document.getElementById('status-button').innerHTML = 'sign out';
        document.getElementById('status-button').onclick = async () => {
            await signOut();
            location.href = './auth-signin.html';
        }
    
    }
    var loadHTML = await myDatabase.collection('pageData').doc('public').get().catch(error => loadHTML = error);
    document.getElementById('html-output').innerHTML = loadHTML.homePageHTML;
    myDatabase.collection('pageData').doc('public')
    .onSnapshot(function(doc) {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ", doc.data());
        document.getElementById('html-output').innerHTML = doc.data().homePageHTML;
        document.getElementById('html-input').innerHTML = doc.data().homePageText;
        document.getElementById('editor').innerHTML = `last edit: ${doc.data().lastEdit}`;
        
    });
}