<?php

$host = "localhost";
$dbName = "todoApp";
$user = "root";
$password = "ferny2425";
$protocol = "mysql:host={$host};dbname={$dbName}";
try {
  // Generación de la Conexion a la base de datos
  $conn = new PDO($protocol, $user, $password);
} catch (PDOException $e) {
  die($e->getMessage());
}
