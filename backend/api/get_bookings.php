<?php
// backend/api/get_bookings.php
require_once __DIR__ . '/../config.php';

try {
    $stmt = $pdo->query("
        SELECT b.*, p.title as package_title, p.featured_image as package_image
        FROM bookings b
        LEFT JOIN packages p ON b.package_id = p.id
        ORDER BY b.id DESC
    ");
    $bookings = $stmt->fetchAll();

    foreach ($bookings as &$b) {
        $b['id'] = (int)$b['id'];
        $b['package_id'] = (int)$b['package_id'];
        $b['nights_stayed'] = (int)$b['nights_stayed'];
        $b['tourist_quantity'] = (int)$b['tourist_quantity'];
        $b['hotel_price_per_night'] = (float)$b['hotel_price_per_night'];
        $b['package_base_price'] = (float)$b['package_base_price'];
        $b['total_amount_php'] = (float)$b['total_amount_php'];
    }

    echo json_encode([
        "status" => "success",
        "data" => $bookings
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
