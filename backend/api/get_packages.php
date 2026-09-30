<?php
// backend/api/get_packages.php
require_once __DIR__ . '/../config.php';

try {
    $stmt = $pdo->query("SELECT * FROM packages ORDER BY id ASC");
    $packages = $stmt->fetchAll();

    // Fetch accommodations for each package
    foreach ($packages as &$pkg) {
        $pkg['gallery'] = json_decode($pkg['gallery']);
        $pkg['highlights'] = json_decode($pkg['highlights']);
        $pkg['inclusions'] = json_decode($pkg['inclusions']);
        $pkg['base_price_php'] = (float)$pkg['base_price_php'];
        $pkg['rating'] = (float)$pkg['rating'];
        $pkg['latitude'] = (float)$pkg['latitude'];
        $pkg['longitude'] = (float)$pkg['longitude'];

        $hotelStmt = $pdo->prepare("SELECT * FROM accommodations WHERE package_id = ?");
        $hotelStmt->execute([$pkg['id']]);
        $hotels = $hotelStmt->fetchAll();
        foreach ($hotels as &$h) {
            $h['amenities'] = json_decode($h['amenities']);
            $h['price_per_night_php'] = (float)$h['price_per_night_php'];
            $h['rating'] = (float)$h['rating'];
        }
        $pkg['accommodations'] = $hotels;
    }

    echo json_encode([
        "status" => "success",
        "data" => $packages
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
