<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Register</title>

  <link rel="shortcut icon" href="../materials/logo.png" type="image/x-icon">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../css/register.css">
  <link rel="stylesheet" href="../css/global.css">
</head>

<body>

  <!-- Header -->
  <header class="main-header">
    <div class="logo">
      <a href="home.html">
        <span>Jobify</span>
      </a>
    </div>

    <nav>
      <div class="pages-section">
        <ul>
          <li><a href="home.html">HOME</a></li>
          <li><a href="jobs.html">FIND JOBS</a></li>
          <li><a href="event.html">EVENTS</a></li>
          <li><a href="contact.html">CONTACT US</a></li>
        </ul>
      </div>

      <div class="regist">
        <ul>
          <li><a class="active" href="register.html">REGISTER</a></li>
          <li><a href="login.html">LOGIN</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- Register Section -->
  <section class="register-section">
    <div class="container">

      <div class="left">
        <h2>Sign up</h2>

        <form action="#" method="">

          <input type="text" name="username" placeholder="Username" >

          <input type="email" name="email" placeholder="Email" >

          <input type="password" name="password" placeholder="Password" >

          <input type="password" name="confirm_password" placeholder="Confirm Password" >

          <select name="role" >
            <option value="" disabled selected>Select Role</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="alumni">Alumni</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button type="submit" class="register-btn">Register</button>

        </form>

        <div class="alerts">
          <div class="blank-inputs-alert">Some inputs are blank</div>
          <div class="mismatch-password-alert">There is a password mismatch</div>
          <div class="length-password-alert">Password must be at least 10 characters</div>
          <div class="invalid-email-alert">Invalid email</div>
        </div>

        <p class="login-link">
          Already have an account? <a href="login.html">Login here</a>
        </p>
      </div>

      <div class="right"></div>

    </div>
  </section>
  <script>

    const form = document.querySelector('form');
    const [
      usernameInput, emailInput, passwordInput, confirmPasswordInput, roleSelection
    ] = form.querySelectorAll('*');
    
    const [ 
      blankInputsAlert, mismatchPasswordAlert, lengthPasswordAlert, invalidEmailAlert
    ] = document.querySelectorAll('.alerts > *');


    function handleAppear(alertInput, isValid) {
      if (isValid)
        alertInput.style.display = 'none';
      else 
        alertInput.style.display = 'block';
    }

      // Allowed alphanumeric chars and underscore
      const usernameRegex = /\w+/gi;
      const emailRegex = /\w+@gmail.com/;
      // possible same email exists in the database 
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isAllValid = [];

        Array.from(document.querySelectorAll('form > *')).slice(0, 6).forEach((input) => {

          if(input == usernameInput) {
            isAllValid.push(input.value.match(usernameRegex) != null);
          }
          else if(input == emailInput) {
            let condition = input.value.match(emailRegex) != null;
            handleAppear(invalidEmailAlert, condition);
            isAllValid.push(condition);
          }
            
          else if(input == confirmPasswordInput)
          {
            let confirmPassword = confirmPasswordInput.value.trim();
            let password = passwordInput.value.trim();
            if (password.length < 10 && password != '') {
              handleAppear(lengthPasswordAlert, false);
              return;
            }

            let condition = password === confirmPassword && password != '';
            handleAppear(lengthPasswordAlert, true);
            if (password !== '')
              handleAppear(mismatchPasswordAlert, condition);
            isAllValid.push(condition);
          }

          else if(input == roleSelection)
            isAllValid.push(Boolean(roleSelection.value));
        })

        let permission = isAllValid.every(i => i == true);
        if (permission)
          form.submit();
        else blankInputsAlert.style.display = 'block';
        console.log(permission)
      });

  </script>
</body>
</html>