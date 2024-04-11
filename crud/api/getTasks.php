<?php
include "./partials/Connection.php";

$idUser = $_GET['id'];

try {
    $sql = "SELECT * FROM `task` WHERE idUser = {$idUser};";
    $state = $conn->query($sql);
    
    $json = [];
    while ($row = $state->fetch(PDO::FETCH_ASSOC)) {
        $json[] = [
            'id' => $row['idTask'],
            'title' => $row['title'],
            'completed' => $row['completed'],
            'idUser' => $row['idUser']
        ];
    };

    $jsonString = json_encode($json);
    echo $jsonString;
} catch (PDOException $e) {
    die($e->getMessage());
}
?>
