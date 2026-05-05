<?php
  session_start();
  $isLoggedIn = $_SESSION['user_data'] ?? false;
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Career Events - Jobify</title>
  <link rel="shortcut icon" href="materials/logo.png" type="image/x-icon">
  <link rel="stylesheet" href="css/global.css">
  <link rel="stylesheet" href="css/events.css">
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
    <!-- Navigation Bar -->
    <nav>
      <div class="pages-section">
        <ul>
          <li><a href="index.php">HOME</a></li>
          <li><a href="Jobs/jobs.php">FIND JOBS</a></li>
          <li><a class="active" href="events.php">EVENTS</a></li>
          <li><a href="contact.php">CONTACT US</a></li>
          <li><a href="payment.php">SUBSCRIBE</a></li>
        </ul>
      </div>
      <?php if (!$isLoggedIn): ?>
      <div class="regist">
        <ul>
          <li>
            <a href="Authentication/register.php">REGISTER</a>
          </li>
          <li>
            <a href="Authentication/login.php">LOGIN</a>
          </li>
        </ul>
      </div>
      <?php endif; ?>
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <h1>Discover Your Next Opportunity</h1>
    <p>Join our exclusive career fairs and networking events to connect with top-tier employers and industry leaders.</p>
  </section>

  <!-- Upcoming Events -->
  <section class="upcoming-events">
    <h2 class="section-title">Upcoming Events</h2>
    <div class="events-grid">
      <!-- Event 1 -->
      <div class="event-card">
        <div class="event-img">
          <img src="https://alumni.msa.edu.eg/images/events/amazon-hirre.png" alt="Amazon Hiring Event">
          <div class="event-date-badge">
            20<span>SEP</span>
          </div>
        </div>
        <div class="event-content">
          <h3>Amazon Recruitment Day</h3>
          <div class="event-info">
            <i class="fa-solid fa-location-dot"></i> Amazon HQ, Cairo
          </div>
          <div class="event-info">
            <i class="fa-solid fa-clock"></i> 09:00 AM - 5:00 PM
          </div>
          <p class="event-desc">Join Amazon's recruitment team for a full day of interviews and networking. Multiple roles available in operations and tech.</p>
          <div class="event-footer">
            <a href="payment.php" class="view-btn">Register Now</a>
          </div>
        </div>
      </div>

      <!-- Event 2 -->
      <div class="event-card">
        <div class="event-img">
          <img src="https://alumni.msa.edu.eg/images/19sep_event.jpg" alt="MSA Career Event">
          <div class="event-date-badge">
            19<span>SEP</span>
          </div>
        </div>
        <div class="event-content">
          <h3>MSA Annual Job Fair</h3>
          <div class="event-info">
            <i class="fa-solid fa-location-dot"></i> MSA University Campus
          </div>
          <div class="event-info">
            <i class="fa-solid fa-clock"></i> 10:00 AM - 6:00 PM
          </div>
          <p class="event-desc">Connect with over 50+ leading companies at the MSA University annual career event. Bring your CV and dress to impress!</p>
          <div class="event-footer">
            <a href="payment.php" class="view-btn">Register Now</a>
          </div>
        </div>
      </div>

      <!-- Event 3 -->
      <div class="event-card">
        <div class="event-img">
          <img src="https://alumni.msa.edu.eg/images/Python_programming_workshop.jpg" alt="Python Workshop">
          <div class="event-date-badge">
            10<span>OCT</span>
          </div>
        </div>
        <div class="event-content">
          <h3>Python Programming Workshop</h3>
          <div class="event-info">
            <i class="fa-solid fa-location-dot"></i> Tech Hub, Maadi
          </div>
          <div class="event-info">
            <i class="fa-solid fa-clock"></i> 11:00 AM - 3:00 PM
          </div>
          <p class="event-desc">Enhance your coding skills with our intensive Python workshop. Suitable for beginners and intermediate developers.</p>
          <div class="event-footer">
            <a href="payment.php" class="view-btn">Register Now</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Past Events Highlights -->
  <section class="past-events">
    <h2 class="section-title">Event Highlights</h2>
    <div class="events-grid">
      <!-- Past Event 1 -->
      <div class="event-card">
        <div class="event-img">
          <img src="https://alumni.msa.edu.eg/images/Storyboard_for_Animation_workshop.jpg" alt="Storyboard Workshop">
        </div>
        <div class="event-content">
          <h3>Storyboard for Animation</h3>
          <div class="event-info">
            <i class="fa-solid fa-location-dot"></i> Online Webinar
          </div>
          <p class="event-desc">A deep dive into the world of animation storyboarding with industry professionals. Recording now available.</p>
          <div class="event-footer">
            <span style="color: #888; font-size: 14px;">Event Completed</span>
            <a href="#" style="color: #8b5cf6; font-weight: 500;">View Recording</a>
          </div>
        </div>
      </div>

      <!-- Past Event 2 -->
      <div class="event-card">
        <div class="event-img">
          <img src="materials/event2.png" alt="Engineering Forum">
        </div>
        <div class="event-content">
          <h3>Engineering Careers Forum</h3>
          <div class="event-info">
            <i class="fa-solid fa-location-dot"></i> Cairo University
          </div>
          <p class="event-desc">Focused on civil, mechanical, and electrical engineering roles with leading construction firms.</p>
          <div class="event-footer">
            <span style="color: #888; font-size: 14px;">Event Completed</span>
            <a href="#" style="color: #8b5cf6; font-weight: 500;">View Gallery</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
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
