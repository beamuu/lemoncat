
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




const signIn = (email,password) => {
    document.getElementById('loading').style.visibility = 'visible';
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
        location.href = './index.html';
    // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
    }).catch(function(error) {
        alert(error.message);
        console.log(error);
        document.getElementById('loading').style.visibility = 'hidden';
    // Handle error.
    });
}

const signUp = (email,password,confirm_password) => {

    if (password != confirm_password) {
        alert('Password and confirm password not match.');
        return;
    }
    document.getElementById('loading').style.visibility = 'visible';
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(() => {
        alert(`sign up with ${email} complete.`);
        location.href = './auth-signin.html';
    })
    .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/week-password') {
            alert('week password');

        } else {
            alert(errorMessage);
        }
        console.log(error);
        document.getElementById('loading').style.visibility = 'hidden';
    });
    
}

const sendVerificationEmail = async () => {

    var user = await getUser();
    if (user.emailVerified) {
        if (user.displayName) {
            location.href = './index.html';
        }
        else {
            location.href = './acc-setup.html';
        }
        return;
    }
    document.getElementById('instruction').innerHTML = `We will send you the verification email.<br><br>Please check your inbox. ${user.email}`;
    user.sendEmailVerification().then(function() {
        alert('Verification email was sent. Check you inbox.');
    }).catch(function(error) {
        alert(error);
    });
}

const checkVerification = async () => {
    var user = await getUser();
    console.log(user.emailVerified);
    if (!user.emailVerified) {
        location.href = './auth-verify.html';
    }
    else {
        location.href = './acc-setup.html';
    }
}

const setDisplayName = async (name) => {
    var user = await getUser();
    if (!user.emailVerified) {
        location.href = './auth-signin.html';
    }
    else {
        user.updateProfile({
            displayName: name 
        })
        .then(() => {
            console.log('username is set as', name);
            alert(`Username is set as ${name}`);
            location.href = './index.html';
        })
        .catch((error) => {
            alert(error);
        });
    }
}

const getCurrentName = async () => {
    const user = await getUser();
    document.getElementById('current-name').innerHTML = `Your current name is "${user.displayName}"`;
}