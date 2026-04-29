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
          <li><a href="register.html">REGISTER</a></li>
          <li><a class="active" href="login.html">LOGIN</a></li>
        </ul>
      </div>
    </nav>
  </header>

<!-- Login Section -->
<section class="login-section">
  <div class="container">

    <div class="left">
      <h2>Sign in</h2>

      <form action="#" method="POST">

        <input type="email" name="username" placeholder="Email" required>

        <input type="password" name="password" placeholder="Password" required>

        <select name="role" required>
          <option value="" disabled selected>Select Role</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="alumni">Alumni</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button type="submit" class="login-btn">Login</button>

      </form>

      <p class="register-link">
        Don’t have an account? <a href="register.html">Click here</a>
      </p>
    </div>

    <div class="right"></div>

  </div>
</section>

</body>
</html>