<?php

    class DbController {
        private $conn;
        private $dbName;

        public function __construct(string $dbName) {
            $this->dbName = $dbName;
            $this->connect();
        }

        public function connect() {
            if ($this->conn) {
                return $this->conn;
            }

            $this->conn = mysqli_connect("localhost", "root", "", $this->dbName);
            return $this->conn;
        }

        public function insert(string $table, array $fields, array $values) {
            if (empty($table) || count($fields) === 0 || count($values) === 0) {
                return false;
            } else {
                $values = array_map(fn($value) => is_string($value) ? "'$value'" : $value , $values);
                $fields = implode(", ", $fields);
                $values = implode(", ", $values);                
                $query = "INSERT INTO $table($fields) VALUES($values)";
                $result = mysqli_query($this->conn, $query);

                if (!$result) {
                    return false;
                }
                return mysqli_insert_id($this->conn);
            }
        }
        
        public function select($tableName, $whereCondition = ""){
            try {
                $query = "SELECT * FROM $tableName";
                if (!empty($whereCondition)) {
                    $query .= " WHERE $whereCondition";
                }
                $result = mysqli_query($this->conn, $query);
                if ($result == false) {
                    return [];
                }
            } catch (Exception $e) {
                return [];
            }
            return mysqli_fetch_all($result);
        }
        

        public function close() {
            if ($this->conn)
                mysqli_close($this->conn);
        }
    }
