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
        error = true;
    }

    if(lname.value == "") {
        document.getElementById('errorLname').className='alert alert-danger'; 
        error = true;
    }

    if(info.value == "" || length(info.value) > 250) {
        document.getElementById('errorInfo').className='alert alert-danger'; 
        error = true;
    }

    if(email.value == "") {
        document.getElementById('errorEmail').className='alert alert-danger'; 
        error = true;
    }

    else {
        var validEmail = email.value;
        var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
        if(regex.test(validEmail) == false) {
            document.getElementById('errorEmail2').className='alert alert-danger'; 
            error = true;
        }
    }
    
    if(error == false) return true;
    else {
        return false;
    }
}
