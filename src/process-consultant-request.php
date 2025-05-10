<?php
global $servername, $username, $password, $dbname;
include "db-config.php";

$speciality = trim($_GET["speciality"]);
$clinic = trim($_GET["clinic"]);
$date = trim($_GET["date"]);
$sort = trim($_GET["sort"]); // Get the sort parameter
$dayNumber = !empty($date) ? date('w', strtotime($date)) : null;

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Base query
$sql = "SELECT consultants.id, consultants.name, specialities.speciality, clinics.name AS clinic_name, clinics.latitude, clinics.longitude, 
               AVG(reviews.score) AS average_score, COUNT(reviews.recommend) AS total_recommendations
        FROM consultants
        JOIN specialities ON consultants.speciality_id = specialities.id
        JOIN clinics ON consultants.clinic_id = clinics.id
        LEFT JOIN reviews ON consultants.id = reviews.consultant_id";

// Conditions array
$conditions = [];

// Add conditions dynamically
if (!empty($speciality)) {
    $conditions[] = "specialities.speciality = '$speciality'";
}
if (!empty($clinic)) {
    $conditions[] = "clinics.name = '$clinic'";
}
if (!empty($date)) {
    $conditions[] = "consultant_schedule.weekday = $dayNumber";
    $conditions[] = "NOT EXISTS (
        SELECT 1
        FROM bookings
        WHERE bookings.consultant_id = consultants.id
          AND bookings.booking_date = '$date'
    )";
}

// Add consultant_schedule join only if date is provided
if (!empty($date)) {
    $sql .= " JOIN consultant_schedule ON consultants.id = consultant_schedule.consultant_id";
}

// Append conditions to the query
if (!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

// Group by consultants.id to avoid duplicates
$sql .= " GROUP BY consultants.id, consultants.name, specialities.speciality, clinics.name, clinics.latitude, clinics.longitude";

// Apply sorting based on the sort parameter
if ($sort === "Rating") {
    $sql .= " ORDER BY average_score DESC";
} elseif ($sort === "Total Recommendations") {
    $sql .= " ORDER BY total_recommendations DESC";
} elseif ($sort === "Distance") {
    $sql .= " ORDER BY clinics.latitude, clinics.longitude"; // Example for distance sorting
}

$result = mysqli_query($conn, $sql);

$allDataArray = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($allDataArray);
?>