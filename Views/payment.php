<?php
  session_start();
  $isLoggedIn = $_SESSION['user_data'] ?? false;
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout - Jobify</title>
  <link rel="shortcut icon" href="materials/logo.png" type="image/x-icon">
  <link rel="stylesheet" href="css/global.css">
  <link rel="stylesheet" href="css/payment.css">
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
          <li><a href="contact.php">CONTACT US</a></li>
          <li><a class="active" href="payment.php">SUBSCRIBE</a></li>
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
  <section class="payment-hero">
    <h1>Secure Checkout</h1>
    <p style="color: white;">Complete your registration for the selected event.</p>
  </section>

  <!-- Payment Container -->
  <div class="payment-container">
    <!-- Left Column: Payment Form -->
    <div class="payment-card">
      <div class="payment-methods">
        <div class="method-box active">
          <i class="fa-solid fa-credit-card"></i>
          <p style="font-size: 12px; margin-top: 5px;">Credit Card</p>
        </div>
        <div class="method-box">
          <i class="fa-brands fa-paypal"></i>
          <p style="font-size: 12px; margin-top: 5px;">PayPal</p>
        </div>
        <div class="method-box">
          <i class="fa-solid fa-building-columns"></i>
          <p style="font-size: 12px; margin-top: 5px;">Bank Transfer</p>
        </div>
      </div>

      <h3><i class="fa-solid fa-shield-halved"></i> Payment Information</h3>
      <form action="#" method="POST">
        <div class="card-input-group">
          <label for="cardname">Cardholder Name</label>
          <div class="card-input-wrapper">
            <i class="fa-solid fa-user"></i>
            <input type="text" id="cardname" name="cardname" placeholder="John Doe" required>
          </div>
        </div>
        <div class="card-input-group">
          <label for="cardnumber">Card Number</label>
          <div class="card-input-wrapper">
            <i class="fa-solid fa-credit-card"></i>
            <input type="text" id="cardnumber" name="cardnumber" placeholder="0000 0000 0000 0000" required>
          </div>
        </div>
        <div class="card-row">
          <div class="card-input-group">
            <label for="expiry">Expiry Date</label>
            <div class="card-input-wrapper">
              <i class="fa-solid fa-calendar"></i>
              <input type="text" id="expiry" name="expiry" placeholder="MM/YY" required>
            </div>
          </div>
          <div class="card-input-group">
            <label for="cvv">CVV</label>
            <div class="card-input-wrapper">
              <i class="fa-solid fa-lock"></i>
              <input type="password" id="cvv" name="cvv" placeholder="***" maxlength="3" required>
            </div>
          </div>
        </div>
        <button type="submit" class="pay-now-btn">
          <i class="fa-solid fa-lock"></i> Pay EGP 250.00
        </button>
      </form>
      <p style="text-align: center; font-size: 13px; color: #94a3b8; margin-top: 20px;">
        <i class="fa-solid fa-circle-info"></i> Your payment is secured with 256-bit SSL encryption.
      </p>
    </div>

    <!-- Right Column: Order Summary -->
    <div class="order-summary">
      <h3 class="summary-title">Registration Summary</h3>
      <div class="summary-item">
        <span>Event</span>
        <span style="font-weight: 600; color: var(--primary-color);">MSA Annual Job Fair</span>
      </div>
      <div class="summary-item">
        <span>Date</span>
        <span>September 19, 2026</span>
      </div>
      <div class="summary-item">
        <span>Registration Fee</span>
        <span>EGP 250.00</span>
      </div>
      <div class="summary-item">
        <span>Service Fee</span>
        <span>EGP 0.00</span>
      </div>
      <div class="summary-item total">
        <span>Total Amount</span>
        <span>EGP 250.00</span>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: rgba(139, 92, 246, 0.05); border-radius: 10px; border: 1px solid rgba(139, 92, 246, 0.1);">
        <h4 style="font-size: 14px; margin-bottom: 5px; color: var(--primary-purple-color);">Note:</h4>
        <p style="font-size: 13px; color: #64748b; line-height: 1.4;">Registration confirmation will be sent to your email after successful payment.</p>
      </div>
    </div>
  </div>

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
