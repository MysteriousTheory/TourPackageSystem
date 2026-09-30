<?php
// backend/api/update_booking.php
require_once __DIR__ . '/../config.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || !isset($data['id'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid payload or missing booking ID"]);
    exit();
}

$id = (int)$data['id'];
$tourist_name = trim($data['tourist_name'] ?? '');
$tourist_email = trim($data['tourist_email'] ?? '');
$tourist_phone = trim($data['tourist_phone'] ?? '');
$place = trim($data['place'] ?? '');
$nights_stayed = (int)($data['nights_stayed'] ?? 1);
$tourist_quantity = (int)($data['tourist_quantity'] ?? 1);
$hotel_accommodation = trim($data['hotel_accommodation'] ?? 'Standard');
$hotel_price_per_night = (float)($data['hotel_price_per_night'] ?? 0);
$package_base_price = (float)($data['package_base_price'] ?? 0);
$booking_date = trim($data['booking_date'] ?? date('Y-m-d'));
$special_requests = trim($data['special_requests'] ?? '');
$status = trim($data['status'] ?? 'Confirmed');

// Recalculate total
$total_amount_php = ($package_base_price * $tourist_quantity) + ($hotel_price_per_night * $nights_stayed);
if (isset($data['total_amount_php']) && (float)$data['total_amount_php'] > 0) {
    $total_amount_php = (float)$data['total_amount_php'];
}

try {
    $stmt = $pdo->prepare("
        UPDATE bookings SET
            tourist_name = ?,
            tourist_email = ?,
            tourist_phone = ?,
            place = ?,
            nights_stayed = ?,
            tourist_quantity = ?,
            hotel_accommodation = ?,
            hotel_price_per_night = ?,
            package_base_price = ?,
            total_amount_php = ?,
            booking_date = ?,
            special_requests = ?,
            status = ?
        WHERE id = ?
    ");

    $stmt->execute([
        $tourist_name, $tourist_email, $tourist_phone,
        $place, $nights_stayed, $tourist_quantity,
        $hotel_accommodation, $hotel_price_per_night, $package_base_price,
        $total_amount_php, $booking_date, $special_requests, $status,
        $id
    ]);

    echo json_encode([
        "status" => "success",
        "message" => "Booking updated successfully!",
        "data" => [
            "id" => $id,
            "tourist_name" => $tourist_name,
            "place" => $place,
            "nights_stayed" => $nights_stayed,
            "tourist_quantity" => $tourist_quantity,
            "hotel_accommodation" => $hotel_accommodation,
            "total_amount_php" => $total_amount_php,
            "booking_date" => $booking_date,
            "status" => $status
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
