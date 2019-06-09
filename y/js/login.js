function registrar(){
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;

    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .then(function(){
        verficar()
    })
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}

function ingreso(){
    
    var email2 = document.getElementById('email2').value;
    var contrasena2 = document.getElementById('contrasena2').value;
    
    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('existe usuario activo')
            aparece(user);
          // User is signed in.
          var displayName = user.displayName;
          
          var email = user.email;
          
          console.log('*****************');
          console.log(user.emailVerified)
          console.log('*****************');
          
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          console.log('no existe usuario activo')
          // ...
        }
      });
}
observador();

function aparece(user){
    var user = user;
    var contenido = document.getElementById('contenido');
    document.getElementById('nReg').style.display='none';
    document.getElementById('sReg').style.display='inline';
    if(user.emailVerified){
        contenido.innerHTML = `
        <p>Bienvenido y gracias por ser miembro de la pagina</p>
        <button onclick="cerrar()">Cerrar sesión</button> 
        <button  type="button" class="btn btn-info"> Añadir nuevos elementos</button> 
        `;
    } 
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log('Saliendo...')
    })
    .catch(function(error){
        console.log(error)
    })
}

function verficar(){
    var user = firebase.auth().currentUser;  
    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log('Enviando correo...');
      agregartxt2();
      function agregartxt2(){
        var newt = document.createElement("p");
        newt.style.cssText='border:8px solid #56aaf3;padding:12px;width:160px;margin:12px 0 12px 0;';                 
        var t = document.createTextNode("Para logearse porfavor verifique su email en el correo que le acabamos de enviar");       
        newt.appendChild(t);                                         
        document.getElementById("infe").appendChild(newt); 
        }                            
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    }); 
}