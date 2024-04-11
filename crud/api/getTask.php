<?php
include "./partials/Connection.php";

$idTask = $_GET['id'];

try {
    $sql = "SELECT * FROM `task` WHERE idTask = {$idTask};";
    $state = $conn->query($sql);
    $row = $state->fetch();
    $json = [
        'id' => $row['idTask'],
        'idUser' => $row['idUser'],
        'title' => $row['title'],
        'completed' => $row['completed'] == 1
    ];

    $jsonString = json_encode($json);
    echo $jsonString;
} catch (PDOException $e) {
    die($e->getMessage());
}
?>
