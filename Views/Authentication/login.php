<?php
  require_once '../../Controllers/AuthController.php';
  require_once '../../Controllers/DbController.php';
  $auth = new AuthController();
  $errorMsg = '';

  $db = DbController::getInstance('jobify');
  
  if (isset($_POST['email']) && isset($_POST['password']))
  {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!empty($email) && !empty($password))
    {
      $user_data = $auth->login($email, $password);
      if (!$user_data)
        $errorMsg = "Wrong Credentials";
      
      else {
        if ($user_data['role'] == 'student')
          header("Location: ../Student/studentdashboard.php");
        elseif ($user_data['role'] == 'recruiter')
          header("Location: ../Recruiter/recruiterdashboard.php");
        elseif ($user_data['role'] == 'admin')
          header("Location: ../Admin/admindashboard.php");
        exit();
      }
    } 
    else {
      $errorMsg = "Email input or password is blank";
    }
  }

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login</title>
    <link rel="shortcut icon" href="../materials/logo.png" type="image/x-icon">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../css/login.css">
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
          <li><a href="../Authentication/register.php">REGISTER</a></li>
          <li><a class="active" href="../Authentication/login.php">LOGIN</a></li>
        </ul>
      </div>
    </nav>
  </header>

<!-- Login Section -->
<section class="login-section">
  <div class="container">

    <div class="left">
      <h2>Sign in</h2>

      <form action="" method="POST">

        <input type="email" name="email" placeholder="Email" >

        <input type="password" name="password" placeholder="Password" >


        <button type="submit" class="login-btn">Login</button>

      </form>

      <?php if (!empty($errorMsg)): ?>
          <p style="color: red; margin-top: 10px; text-align: center;"><?= $errorMsg ?></p>
      <?php endif; ?>

      <p class="register-link">
        Don’t have an account? <a href="../Authentication/register.php">Click here</a>
      </p>
    </div>

    <div class="right"></div>

  </div>
</section>

</body>
</html>