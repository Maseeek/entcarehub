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
    clinics.name AS clinic_name, clinics.latitude, clinics.longitude
FROM consultants
JOIN specialities ON consultants.speciality_id = specialities.id
JOIN clinics ON consultants.clinic_id = clinics.id
WHERE consultants.id = '$id'";


$result = mysqli_query($conn, $sql);
$allDataArray = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($allDataArray);
?>
