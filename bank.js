function loginPage() {
    window.location = './login.html';
}

function registerPage() {
    window.location = './register.html';
}

//register

function register() {

    //1. fetch the values from the html 
    acno = reg_acno.value;
    uname = reg_name.value;
    pswd = reg_pswd.value;

    console.log(acno,uname,pswd);

    //2. create accDetails object
    accDetails = {
        acno,
        uname,
        pswd,
        balance:0
    }

    //3.check if acno is already present in localStorage
    if(acno =='' || uname =='' || pswd =='') {
        alert("Please fill missing fields");
    } else {
        if(acno in localStorage) {
            alert("User already registered");
        }
        //To set details in localStorage
        else {   
            localStorage.setItem(acno,JSON.stringify(accDetails));
            alert("Registration successful");
            //redirect to login page 
            //window.location = './login.html';
        }
    }
 
}

//login

function login() {
    //1. fetch details 
    acno = login_acno.value;
    //uname = login_name.value;
    pswd = login_pswd.value;

    //2. Login
    if(acno in localStorage) {
        accountDetails = JSON.parse(localStorage.getItem(acno));
        localStorage.setItem('username', accountDetails.uname);
        if(pswd == accountDetails.pswd) {
            console.log(accountDetails.uname);
            window.location = './home.html';
            /*
            const user = document.getElementById('user');
            console.log(user);
            user.textContent = `Welcome ${accountDetails.uname}`;
            alert(`Welcome ${accountDetails.uname}`);
            */
            //document.addEventListener('DOMContentLoaded', function() {
            //    const username = localStorage.getItem('username');
            //    const user = document.getElementById('user');
            //    user.innerHTML = `Welcome ${username}`;
            //});
        } else  {
            alert("Incorrect Password");
        }
    }  else  {
        alert("Please enter valid details")
    }
}

// updating user part in welcome messsage
const username = localStorage.getItem('username');
const user = document.getElementById('user');
console.log(user,username);
user.innerHTML = `Welcome ${username}`;


//deposit

function deposit() {
    //1. fetch details 
    acno = dep_acno.value;
    amount = Number(dep_amount.value);
    

    //2. Check 
    if(acno in localStorage) {
        accountDetails = JSON.parse(localStorage.getItem(acno));
        if(amount == '' || amount <= 0 ) {
            alert("Deposit Amount must be greater than zero");
        } else {
            console.log(accountDetails);
            accountDetails.balance += amount;
            localStorage.setItem(acno,JSON.stringify(accountDetails));
            alert("Your deposit has been successfully completed!");
        }
        
    } else  {
        alert("Please enter valid details")
    }
}


//withdraw

function withdraw() {
    //1. fetch details 
    acno = with_acno.value;
    amount = Number(with_amount.value);
    

    //2. Check 
    if(acno in localStorage) {
        accountDetails = JSON.parse(localStorage.getItem(acno));
        if(amount == '' || amount <= 0 ) {
            alert("Withdrawal Amount must be greater than zero");
        } else {
            if(accountDetails.balance >= amount) {
                accountDetails.balance -= amount;
                localStorage.setItem(acno,JSON.stringify(accountDetails));
                alert(`Withdrawal has been completed successfully!! \n Remaining Balance is:- ${accountDetails.balance}`);
            } else {
                alert("Insufficient Balance!!");
            }  
        }
        
    }  else  {
        alert("Please enter valid details")
    }
}


//logout

function logout() {
    localStorage.clear();
    location = "./index.html";
}