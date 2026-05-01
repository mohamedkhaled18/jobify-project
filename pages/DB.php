<?php

    class DB {
        private $conn;
        private $result;
        private $dbName;

        public function __construct(string $dbName) {
            $this->dbName = $dbName;
        }

        public function connect() {
            if ($this->conn) {
                return $this->conn;
            }

            $this->conn = mysqli_connect("localhost", "root", "", $this->dbName);
            if (!$this->conn) {
                die("Connection Failed: ". mysqli_connect_error());
            } else {
                return $this->conn;
            }
        }

        public function query($query) {
            if (empty($query) || !isset($query)) {
                die("This query is invalid");
                exit();
            }
            $this->result = mysqli_query($this->conn, $query);
            return $this->result;
        }

        public function insert(string $table, array $fields, array $values) {
            if (empty($table) || !isset($table)) {
                die("You should specify the table");
            } else if (count($fields) === 0 || count($values) === 0) {
                die("Please type the fields and values");
            } else {
                $values = array_map(fn($value) => is_string($value) ? "'$value'" : $value , $values);
                $fields = implode(", ", $fields);
                $values = implode(", ", $values);                
                $query = "INSERT INTO $table($fields) VALUES($values)";
                if (!$this->query($query)) {
                    throw new mysqli_sql_exception();
                }                
            }
        }
        
        public function select(string $table, $where = '') {
            if (empty($table) || !isset($table)) {
                // die("You should specify the table");
                return null;
            } else {
                $query = "SELECT * from $table ";
                if (!empty($where)) {
                    $query .= "WHERE $where";
                }
                return $this->query($query);
            }
        }

        public function close() {
            if ($this->conn)
                mysqli_close($this->conn);
        }
    }
    ?>
