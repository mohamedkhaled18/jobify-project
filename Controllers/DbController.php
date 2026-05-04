    <?php

        class DbController {
            private static $instance = null;
            private static $conn;
            private $dbName; 

            private function __construct($dbName){
                $this->dbName = $dbName;
            }

            // Singleton Pattern 
            public static function getInstance($dbName)
            {
                if (self::$instance === null)
                {
                    self::$instance = new DbController($dbName);
                    self::$instance->connect();
                }
                return self::$instance;
            }

            private function connect()
            {
                self::$conn = mysqli_connect("localhost", "root", "", $this->dbName);
                if (!self::$conn)
                    return false;
            }

            public function insert(string $table, array $fields, array $values) {
                if (empty($table) || count($fields) === 0 || count($values) === 0) {
                    return false;
                } else {
                    $values = array_map(fn($value) => is_string($value) ? "'$value'" : $value , $values);
                    $fields = implode(", ", $fields);
                    $values = implode(", ", $values);                
                    $query = "INSERT INTO $table($fields) VALUES($values)";
                    $result = mysqli_query(self::$conn, $query);

                    if (!$result) {
                        return false;
                    }
                    return mysqli_insert_id(self::$conn);
                }
            }
            
            public function select($tableName, $whereCondition = ""){
                try {
                    $query = "SELECT * FROM $tableName";
                    if (!empty($whereCondition)) {
                        $query .= " WHERE $whereCondition";
                    }
                    $result = mysqli_query(self::$conn, $query);
                    if ($result == false) {
                        return [];
                    }
                } catch (Exception $e) {
                    return [];
                }
                return mysqli_fetch_all($result, MYSQLI_ASSOC);
            }

            public function query($query) {
                $result = mysqli_query(self::$conn, $query);
                if ($result == false) {
                    return [];
                }
                return mysqli_fetch_all($result, MYSQLI_ASSOC);
            }
            

            public function close() {
                if (self::$conn)
                    mysqli_close(self::$conn);
            }
        }
