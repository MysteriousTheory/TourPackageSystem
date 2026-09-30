<?php
// backend/api/delete_booking.php
require_once __DIR__ . '/../config.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

$id = isset($_GET['id']) ? (int)$_GET['id'] : (int)($data['id'] ?? 0);

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Valid booking ID required"]);
    exit();
}

try {
    $stmt = $pdo->prepare("DELETE FROM bookings WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode([
        "status" => "success",
        "message" => "Booking #{$id} deleted successfully"
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
