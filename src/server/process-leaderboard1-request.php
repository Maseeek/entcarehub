<?php
global $servername, $username, $password, $dbname;
include "db-config.php";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Query to get the percentage of recommendations and total recommendations
$sql = "SELECT consultants.id, 
               consultants.name, 
               (COUNT(CASE WHEN reviews.recommend = 'Yes' THEN 1 END) / COUNT(reviews.recommend)) * 100 AS recommendation_percentage,
               COUNT(CASE WHEN reviews.recommend = 'Yes' THEN 1 END) AS total_recommendations
        FROM consultants
        LEFT JOIN reviews ON consultants.id = reviews.consultant_id
        GROUP BY consultants.id, consultants.name
        ORDER BY recommendation_percentage DESC
        LIMIT 10";

$result = mysqli_query($conn, $sql);

$topConsultants = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($topConsultants);