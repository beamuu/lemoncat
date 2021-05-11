
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



const homeFetch = async () => {

    var user = await getUser();
    var name, email, photoUrl, uid, emailVerified;


    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;

        document.getElementById('user-display').innerHTML = `account: ${email}`;
    } 
    else {
        alert('Please sign in first.')
        location.href = './index.html';
        return;
    }

    if (!emailVerified) {
        location.href = './verification.html';
        return;
    }

}