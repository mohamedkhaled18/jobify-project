<?php

include_once '../../Controllers/DbController.php';

class Admin {
  private $db;
  
  public function __construct() {
    $this->db = DbController::getInstance('jobify');
    
  }

  public function getAllStudents()
  {
    return $this->db->select('students'); 
  }


}