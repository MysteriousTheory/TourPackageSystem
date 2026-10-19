<?php
// backend/config.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Support environment variables with fallback to Docker and local XAMPP
$db_host = getenv('DB_HOST') ?: "db";
$db_port = getenv('DB_PORT') ?: "3306";
$db_user = getenv('DB_USER') ?: "root";
$db_pass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : "root";
$db_name = getenv('DB_NAME') ?: "tour_packages_db";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false
];

try {
    $dsn = "mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);
} catch (PDOException $e) {
    // If default 'db' host fails and no custom DB_HOST was provided, fallback to localhost (standard XAMPP)
    if (!getenv('DB_HOST') && $db_host === 'db') {
        try {
            // Attempt standard XAMPP (localhost, root, empty password)
            $pdo = new PDO("mysql:host=localhost;port={$db_port};dbname={$db_name};charset=utf8mb4", $db_user, '', $options);
        } catch (PDOException $e2) {
            try {
                // Attempt XAMPP with 'root' password
                $pdo = new PDO("mysql:host=localhost;port={$db_port};dbname={$db_name};charset=utf8mb4", $db_user, 'root', $options);
            } catch (PDOException $e3) {
                http_response_code(500);
                echo json_encode([
                    "status" => "error",
                    "message" => "Database connection failed: " . $e->getMessage()
                ]);
                exit();
            }
        }
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Database connection failed: " . $e->getMessage()
        ]);
        exit();
    }
}
?>
