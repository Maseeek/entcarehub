<?php
global $servername, $username, $password, $dbname;
include "db-config.php";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT reviews.feedback, reviews.recommend, reviews.score, consultants.name AS consultant_name
FROM reviews
JOIN consultants ON reviews.consultant_id = consultants.id
JOIN specialities ON consultants.speciality_id = specialities.id
JOIN clinics ON consultants.clinic_id = clinics.id
ORDER BY RAND()
LIMIT 0, 25;";

$result = mysqli_query($conn, $sql);

$allDataArray = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($allDataArray);