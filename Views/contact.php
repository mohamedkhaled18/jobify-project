<?php
  session_start();
  $isLoggedIn = $_SESSION['user_data'] ?? false;
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us - Jobify</title>
  <link rel="shortcut icon" href="materials/logo.png" type="image/x-icon">
  <link rel="stylesheet" href="css/global.css">
  <link rel="stylesheet" href="css/contact.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>

<body>

  <!-- Header -->
  <header class="main-header">
    <div class="logo">
      <a href="index.php">
        <span style="color: #8b5cf6;">Jobify</span>
      </a>
    </div>
    <nav>
      <div class="pages-section">
        <ul>
          <li><a href="index.php">HOME</a></li>
          <li><a href="Jobs/jobs.php">FIND JOBS</a></li>
          <li><a href="events.php">EVENTS</a></li>
          <li><a class="active" href="contact.php">CONTACT US</a></li>
          <li><a href="payment.php">SUBSCRIBE</a></li>
        </ul>
      </div>
      <?php if (!$isLoggedIn): ?>
      <div class="regist">
        <ul>
          <li><a href="Authentication/register.php">REGISTER</a></li>
          <li><a href="Authentication/login.php">LOGIN</a></li>
        </ul>
      </div>
      <?php endif; ?>
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="contact-hero">
    <h1>Get In Touch</h1>
    <p style="color: white;">Have questions? We're here to help you navigate your career journey.</p>
  </section>

  <!-- Contact Section -->
  <section class="contact-container">
    <!-- Info Column -->
    <div class="contact-info-section">
      <div class="info-item">
        <div class="icon"><i class="fa-solid fa-location-dot"></i></div>
        <div>
          <h4>Our Office</h4>
          <p>88 October Road, Nasr City,<br>Cairo, Egypt</p>
        </div>
      </div>
      <div class="info-item">
        <div class="icon"><i class="fa-solid fa-phone"></i></div>
        <div>
          <h4>Phone Numbers</h4>
          <p>+20 1198 745 623<br>+20 1256 974 365</p>
        </div>
      </div>
      <div class="info-item">
        <div class="icon"><i class="fa-solid fa-envelope"></i></div>
        <div>
          <h4>Email Address</h4>
          <p>info@jobify.com<br>support@jobify.com</p>
        </div>
      </div>
      <div class="info-item">
        <div class="icon"><i class="fa-solid fa-clock"></i></div>
        <div>
          <h4>Working Hours</h4>
          <p>Sun - Thu: 09:00 AM - 05:00 PM</p>
        </div>
      </div>
    </div>

    <!-- Form Column -->
    <div class="contact-form-section">
      <form action="#" method="POST">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your full name" required>
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required>
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" name="subject" placeholder="What is this about?" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="5" placeholder="How can we help you?" required></textarea>
        </div>
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <!-- Same footer as other pages -->
    <div class="contacts">
      <h3>Contacts</h3>
      <p><strong>Address:</strong> 88 October Road, Nasr City, Cairo, Egypt</p>
      <p><strong>Phone:</strong> +20 1198 745 623 / +20 1256 974 365</p>
      <div class="socialmedia">
        <h5>Follow us</h5>
        <div class="links">
          <i class="fab facebook fa-facebook-f"></i>
          <i class="fab twitter fa-twitter"></i>
          <i class="fab instagram fa-instagram"></i>
          <i class="fab fa-linkedin-in"></i>
        </div>
      </div>
    </div>
    <div class="explore">
      <h3>Explore</h3>
      <a href="Jobs/jobs.php">Browse Jobs</a>
      <a href="events.php">Career Events</a>
      <a href="#">Partners</a>
      <a href="#">About us</a>
      <a href="#">Testimonials</a>
    </div>
    <div class="useracc">
      <h3>My Account</h3>
      <a href="Authentication/login.php">Sign in</a>
      <a href="Student/studentdashboard.php">Dashboard</a>
      <a href="contact.php">Help</a>
      <a href="Authentication/register.php">Sign up</a>
    </div>
    <div class="legal">
      <h3>Legal</h3>
      <a href="#">Cookie Policy</a>
      <a href="#">Terms &amp; Conditions</a>
      <a href="#">Privacy Policy</a>
      <a href="contact.php">Contact us</a>
    </div>
    <div class="app">
      <h3>Our App</h3>
      <p>Download it now from</p>
      <div class="install">
        <img src="materials/play.jpg" alt="Google Play">
        <img src="materials/app.jpg" alt="App Store">
      </div>
      <p>Multiple secured payment</p>
      <img src="materials/pay.png" alt="payment">
    </div>
    <div class="copyrights">
      © 2026 Jobify. All rights reserved.
    </div>
  </footer>

</body>

</html>
