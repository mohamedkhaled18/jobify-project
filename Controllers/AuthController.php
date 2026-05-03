<?php
require_once 'DbController.php';

class AuthController {
    private $db;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $this->db = new DbController('jobify');
    }

    public function register($name, $email, $password) {

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        try {
            $this->db->insert(
                'users', 
                ['name', 'email', 'password'], 
                [$name, $email, $hashedPassword]
            );

            $results = $this->db->select("users", "email = '$email'");
            if ($results && count($results) > 0) {
                $user = $results[0];
                $userId = $user['user_id'];
                return true;
            }
            return false;

        } catch (Exception $e) {
            return false;
        }
    }

    public function login($email, $password) {
        $results = $this->db->select('users', "email = '$email'");
        if ($results && count($results) > 0) {
            $user = $results[0];
            
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['name'] = $user['name'];
                $_SESSION['role'] = $user['role'];
                return $user;
            }   
        }
        return false;
    }

    public function logout() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        session_unset();
        session_destroy();
    }
}
?>