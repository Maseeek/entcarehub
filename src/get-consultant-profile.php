<?php
global $servername, $username, $password, $dbname;
include "db-config.php";

$id = trim($_GET["id"]);

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Prepare the SQL statement

$sql = "SELECT consultants.id, consultants.name, consultants.consultation_fee,
    clinics.name AS clinic_name, clinics.latitude, clinics.longitude,
    AVG(reviews.score) AS average_rating, (COUNT(CASE WHEN reviews.recommend = 'Yes' THEN 1 END) / COUNT(reviews.recommend)) * 100 AS recommendation_percentage
FROM consultants
JOIN specialities ON consultants.speciality_id = specialities.id
JOIN clinics ON consultants.clinic_id = clinics.id
LEFT JOIN reviews ON consultants.id = reviews.consultant_id
WHERE consultants.id = '$id'
GROUP BY consultants.id, consultants.name, consultants.consultation_fee, clinics.name, clinics.latitude, clinics.longitude";


$result = mysqli_query($conn, $sql);
$allDataArray = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($allDataArray);
?>
