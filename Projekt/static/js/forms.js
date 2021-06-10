function checkForm() {
    let error = false;
    let nickname = document.getElementById('nickname');
    let age = document.getElementById('age');
    let sex = document.getElementById('sex');
    let nicknameError = document.getElementById('nickname-error');
    let ageError = document.getElementById('age-error');
    let sexError = document.getElementById('sex-error');
    nicknameError.classList.add('hide');
    ageError.classList.add('hide');
    sexError.classList.add('hide');
    let regex = /^[a-zA-Z0-9]+$/;
    let regexAge = /^[0-9]+$/;

    if(nickname.value.length === 0) {
        nicknameError.classList.remove('hide');
        nicknameError.innerHTML = 'You must enter your name';
        error = true;
        console.log('You must enter your name');
    }

    else if(nickname.value.length < 3) {
        nicknameError.classList.remove('hide');
        nicknameError.innerHTML = 'You name is too short (3 to 10 characters)';
        error = true;
        console.log('You name is too short (3 to 10 characters)');
    }

    else if(nickname.value.length > 10) {
        nicknameError.classList.remove('hide');
        nicknameError.innerHTML = 'You name is too long (3 to 10 characters)';
        error = true;
        console.log('You name is too long (3 to 10 characters)');
    }

    else if(regex.test(nickname.value) === false) {
        nicknameError.classList.remove('hide');
        nicknameError.innerHTML = 'Name can contain letters and digits only';
        error = true;
        console.log('Name can contain letters and digits only');
    }

    if(age.value.length === 0) {
        ageError.classList.remove('hide');
        ageError.innerHTML = 'You must enter your age';
        error = true;
        console.log('You must enter your age');
    }

    else if(regexAge.test(age.value) === false) {
        ageError.classList.remove('hide');
        ageError.innerHTML = 'Age must be an integer number';
        error = true;
        console.log('Age must be an integer number');
    }

    else if(parseInt(age.value) < 1 || parseInt(age.value) > 120) {
        ageError.classList.remove('hide');
        ageError.innerHTML = 'Incorrent age';
        error = true;
        console.log('Incorrent age');
    }

    if(sex.value === 'Choose...') {
        sexError.classList.remove('hide');
        sexError.innerHTML = 'You must choose your sex';
        error = true;
        console.log('Default value of sex');
    }
    
    if(error === true)
        return false;
    else 
        return true;
}