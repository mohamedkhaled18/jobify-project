<?php
  session_start();
  $isLoggedIn = $_SESSION['user_data'] ?? false;
?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="css/home.css">
  <link rel="stylesheet" href="css/global.css">
    <title>Jobify</title>
  <link rel="shortcut icon" href="materials/logo.png" type="image/x-icon">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>

<body>

  <!-- Header -->
  <header class="main-header">
    <!-- Logo -->
    <div class="logo">
      <a href="index.php">
        <span style="color: #8b5cf6;">Jobify</span>
      </a>
    </div>
    <!-- Naigation Bar -->
    <nav>
      <div class="pages-section">
        <ul>
          <li><a class="active" href="index.php">HOME</a></li>
          <li><a href="Jobs/jobs.php">FIND JOBS</a></li>
          <li><a href="events.php">EVENTS</a></li>
          <li><a href="contact.php">CONTACT US</a></li>
          <li><a href="payment.php">SUBSCRIBE</a></li>
        </ul>
      </div>
      <?php if (!$isLoggedIn): ?>
      <div class="regist">
        <ul>
          <li>
            <a href="Authentication/register.php">REGISTER</a></i>
          </li>
          <li>
            <a href="Authentication/login.php">LOGIN</a></i>
          </li>
        </ul>
      </div>
      <?php endif; ?>
    </nav>
  </header>

  <!-- Intro -->
  <section class="intro">
    <div class="sentence">
     <h1>Step Into Your Future with<span style="color: #8b5cf6;"> 400+</span></h1>
     <h1>Job Opportunities</h1>     
    </div>
    <p>Connect with leading employers at the University Career Fair</p>
    <p>and build your dream career</p>
    <a href="Jobs/jobs.html">Browse Jobs</a>
    <div class="stats">
      <div class="stat">
        <span class="number">
          <span data-stat="11" class="stat-number"></span>542
        </span>
        <span class="desc">Jobs</span>
      </div>
      <div class="stat">
        <span class="number">
          <span data-stat="25" class="stat-number"></span>248
        </span>
        <span class="desc">Companies</span>
      </div>
      <div class="stat">
        <span class="number">
          <span data-stat="6" class="stat-number"></span>32045
        </span>
        <span class="desc">Active Job Seekers</span>
      </div>
    </div>
  </section>
<section class="aboutus">
  <div class="about-text">
    <h1>About Us</h1>
    <p>
      Jobify is a university-focused job fair platform designed to bridge the gap between students and employers. Our mission is to connect ambitious students and fresh graduates with top companies through organized career events and opportunities. We provide a space where talent meets opportunity, helping students explore internships, full-time roles, and career paths that match their goals. At Jobify, we believe that every student deserves a chance to start strong in their professional journey. Through our events, we aim to inspire, guide, and empower the next generation of professionals.
    </p>
  </div>

  <div class="about-img">
    <img src="materials/logo.png" alt="about jobify">
  </div>
</section>
<section class="events-section">
  <h2 class="title">Events</h2>

  <div class="events-container">

    <div class="event-card">
      <img src="materials/event3.png" alt="">
      <div class="content">
        <p>Jobify Annual Career Fair</p>
        <a href="events.php" class="btn">See More</a>
      </div>
    </div>
    <div class="event-card">
      <img src="materials/event4.png" alt="">
      <div class="content">
        <p>Jobify Annual Career Fair in Cairo</p>
        <a href="events.php" class="btn">See More</a>
      </div>
    </div>
    <div class="event-card">
      <img src="materials/event2.png" alt="">
      <div class="content">
        <p>Jobify Career Fair For Special Needs</p>
        <a href="events.php" class="btn">See More</a>
      </div>
    </div>

    <div class="event-card">
      <img src="materials/event1.png" alt="">
      <div class="content">
        <p>Jobify Career Fair in Alexandria</p>
        <a href="events.php" class="btn">See More</a>
      </div>
    </div>

  </div>
</section>


<section class="recruiters-section">

  <h2 class="title">Our Recruiter Opinions About Live Events</h2>

  <div class="recruiters-container">

    <div class="recruiter-card">
      <img src="materials/recruiter1png.png" alt="">
      <div class="content">
        <h3>Mohamed El-Sayed Ali-OUD Egypt</h3>
        <p>"We found highly qualified candidates through Jobify. The platform is very efficient."</p>
      </div>
    </div>

    <div class="recruiter-card">
      <img src="materials/recruiter3.png" alt="">
      <div class="content">
        <h3>Ahmed Khaled Mahmoud-UX Centers</h3>
        <p>"A great experience hiring fresh talent. The process is smooth and fast."</p>
      </div>
    </div>

    <div class="recruiter-card">
      <img src="materials/recruiter2.png" alt="">
      <div class="content">
        <h3>Sara Abdelrahman-MP Hotels</h3>
        <p>"One of the best recruitment events we've used for finding top candidates."</p>
      </div>
    </div>

  </div>

</section>
  <section class="app-banner">
  <img src="materials/appbanner.png" alt="">
  <button class="download-btn">Download Now</button>
</section>
<section class="Partners">
  <h1>Our Partners</h1>
  <img src="materials/partners.png" alt="partners">
</section>
<section class="signup-section">
  
  <div class="signup-text">
    <h2>Stay Updated</h2>
    <p>Subscribe with your email to get the latest updates</p>
  </div>

  <form class="signup-form">
    <input type="email" placeholder="Enter your email" required>
    <button type="submit">Subscribe</button>
  </form>

</section>
  <!-- Footer -->
  <footer class="footer">
    <div class="contacts">
      <h3>Contacts</h3>
      <p><strong>Adress:</strong> 88 october road, nasr city, cairo , egypt</p>
      <p><strong>Phone:</strong> +20 1198 7456 23/+20 1256 9743 65</p>
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
      <a href="Jobs/jobs.html">Browse Jobs</a>
      <a href="events.php">Carrer Events</a>
      <a href="#">Partners</a>
      <a href="#">About us</a>
      <a href="#">Testimonials</a>
    </div>
    <div class="useracc">
      <h3>My Account</h3>
      <a href="Authentication/login.php">Sign in</a>
      <a href="Student/studentdashboard.html">Dashboard</a>
      <a href="contact.php">Help</a>
      <a href="Authentication/register.php">Sign up</a>
    </div>
    <div class="legal">
      <h3>Legal</h3>
      <a href="#">Cookie Policy</a>
      <a href="#">Terms & Conditions</a>
      <a href="#">Privacy Policy</a>
      <a href="contact.php">Contact us</a>
    </div>
    <div class="app">
      <h3>Our App</h3>
      <p>Download it now from</p>
      <div class="install">
        <img src="materials/play.jpg" alt="google play">
        <img src="materials/app.jpg" alt="app store">
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