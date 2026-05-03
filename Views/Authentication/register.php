<?php
  require_once '../../Controllers/AuthController.php';
  $auth = new AuthController();
  $errorMsg = '';
  
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      $name = $_POST['username'] ?? '';
      $email = $_POST['email'] ?? '';
      $password = $_POST['password'] ?? '';
      $confirmedPassword = $_POST['confirm_password'] ?? '';
      
      // $role = $_POST['role'] ?? '';
      
      if (!empty($name) && !empty($email) && !empty($password) && !empty($confirmedPassword)) {
        if ($password === $confirmedPassword) 
        {
          if (strlen($password) < 10)
          {
            $errorMsg = 'Password must be at least 10 characters';
          }
          else 
          {
            if ($auth->register($name, $email, $password)) 
            {
              header('Location: login.php');
              exit();
            } 
            else 
            {
              $errorMsg = 'Registration failed. Email might already exist or a database error occurred.';
            }
          }
        }
        else 
        {
          $errorMsg = 'There is mismatch in passwords';
        }
      } 
      else 
      {
        $errorMsg = 'Please fill out all required fields.';
      }
  }
?>

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
      <a href="../index.php">
        <span>Jobify</span>
      </a>
    </div>

    <nav>
      <div class="pages-section">
        <ul>
          <li><a href="../index.php">HOME</a></li>
          <li><a href="../Jobs/jobs.html">FIND JOBS</a></li>
          <li><a href="../event.html">EVENTS</a></li>
          <li><a href="../contact.html">CONTACT US</a></li>
        </ul>
      </div>

      <div class="regist">
        <ul>
          <li><a class="active" href="../Authentication/register.php">REGISTER</a></li>
          <li><a href="../Authentication/login.php">LOGIN</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- Register Section -->
  <section class="register-section">
    <div class="container">

      <div class="left">
        <h2>Sign up</h2>

        <form action="" method="POST">

          <input type="text" name="username" placeholder="Username" >

          <input type="email" name="email" placeholder="Email" >

          <input type="password" name="password" placeholder="Password" >

          <input type="password" name="confirm_password" placeholder="Confirm Password" >

          <!-- <select name="role" >
            <option value="" disabled selected>Select Role</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="alumni">Alumni</option>
            <option value="recruiter">Recruiter</option>
          </select> -->

          <button type="submit" class="register-btn">Register</button>

        </form>

        <?php if (!empty($errorMsg)): ?>
            <p style="color: red; margin-top: 10px; text-align: center;"><?= htmlspecialchars($errorMsg) ?></p>
        <?php endif; ?>


        <p class="login-link">
          Already have an account? <a href="../Authentication/login.php">Login here</a>
        </p>
      </div>

      <div class="right"></div>

    </div>
  </section>
  <!-- <script>

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
        if (permission) {
          form.submit();
          
        }
        else blankInputsAlert.style.display = 'block';
      });

  </script> -->
</body>
</html>