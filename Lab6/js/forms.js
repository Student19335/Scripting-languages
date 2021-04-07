function checkForm() {
    var error = false;
    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var email = document.getElementById("email");
    var info = document.getElementById("info");
    document.getElementById('errorFname').className='hide';
    document.getElementById('errorLname').className='hide'; 
    document.getElementById('errorEmail').className='hide'; 
    document.getElementById('errorEmail2').className='hide'; 
    document.getElementById('errorInfo').className='hide';

    if(fname.value == "") {
        document.getElementById('errorFname').className='alert alert-danger';
        document.getElementById('borderFname').className='has-error'; 
        error = true;
    } else document.getElementById('borderFname').className='has-success'; 

    if(lname.value == "") {
        document.getElementById('errorLname').className='alert alert-danger'; 
        document.getElementById('borderLname').className='has-error'; 
        error = true;
    } else document.getElementById('borderLname').className='has-success'; 

    
    if(email.value == "") {
        document.getElementById('errorEmail').className='alert alert-danger'; 
        document.getElementById('borderEmail').className='has-error'; 
        error = true;
    } 

    else {
        var validEmail = email.value;
        var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
        if(regex.test(validEmail) == false) {
            document.getElementById('errorEmail2').className='alert alert-danger';
            document.getElementById('borderEmail').className='has-error'; 
            error = true;
        }
        else document.getElementById('borderEmail').className='has-success'; 
    }

    if(info.value == "") {
        document.getElementById('errorInfo').className='alert alert-danger';
        document.getElementById('borderInfo').className='has-error'; 
        error = true;
    } else document.getElementById('borderInfo').className='has-success';
    
    console.log(error);
    if(error == true) {
        return false;
    }
    else {
        return true;
    }
}

function onblurFname() {
    var x = document.getElementById('fname').value;
    if(x == "") {
        document.getElementById('borderFname').className='has-error';
        document.getElementById('errorFname').className='alert alert-danger';
    }
}
function onchangeFname() {
    var x = document.getElementById('fname').value;
    if(x != "") {
        document.getElementById('borderFname').className='has-success';
        document.getElementById('errorFname').className='hide';
    }
}

//

function onblurLname() {
    var x = document.getElementById('lname').value;
    if(x == "") {
        document.getElementById('borderLname').className='has-error';
        document.getElementById('errorLname').className='alert alert-danger';
    }
}
function onchangeLname() {
    var x = document.getElementById('lname').value;
    if(x != "") {
        document.getElementById('borderLname').className='has-success';
        document.getElementById('errorLname').className='hide';
    }
}

//

function onblurEmail() {
    var x = document.getElementById('email').value;
    if(x == "") {
        document.getElementById('borderEmail').className='has-error';
        document.getElementById('errorEmail2').className='hide';
        document.getElementById('errorEmail').className='alert alert-danger';
    }
}
function onchangeEmail() {
    var x = document.getElementById('email').value;
    var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
    if(regex.test(x) == true) {
        document.getElementById('borderEmail').className='has-success';
        document.getElementById('errorEmail').className='hide';
        document.getElementById('errorEmail2').className='hide';
    }
    else {
        document.getElementById('borderEmail').className='has-error';
        document.getElementById('errorEmail').className='hide';
        document.getElementById('errorEmail2').className='alert alert-danger';
    }
}

//

function onblurInfo() {
    var x = document.getElementById('info').value;
    if(x == "") {
        document.getElementById('borderInfo').className='has-error';
        document.getElementById('errorInfo').className='alert alert-danger';
    }
}
function onchangeInfo() {
    var x = document.getElementById('info').value;
    if(x != "") {
        document.getElementById('borderInfo').className='has-success';
        document.getElementById('errorInfo').className='hide';
    }
}