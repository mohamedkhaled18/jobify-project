<?php
require_once 'DbController.php';

class AuthController {
    private $db;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $this->db = DbController::getInstance('jobify');
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
        $query = "SELECT u.user_id, u.name, u.email, u.password, u.role, u.status, u.account_creation_date, s.gpa, s.major
                          FROM Users u 
                          INNER JOIN Students s ON u.user_id = s.student_id 
                          WHERE u.role = 'student' AND u.email = '$email';";
        $result = $this->db->query($query);
        // if ($result) {
        //     if (password_verify($password, $result['password'])) {
        //         $_SESSION['user_data'] = $result;
        //         return $result;
        //     }   
        // }
        if ($result) {
            if ($password == $result['password']) {
                $_SESSION['user_data'] = $result;
                return $result;
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
        header("Location: ../../Views/Authentication/login.php");
    }
}
?>