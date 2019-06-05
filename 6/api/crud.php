<?php
Header('Content-type: application/json');

require_once('../env.php');

$conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME) or die("Can't connect to database");


switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        $data = [];
        $q = "SELECT users.id,users.name, GROUP_CONCAT(skills.name) AS skills FROM users LEFT JOIN skills ON users.id=skills.user_id GROUP BY users.name,users.id ORDER BY users.id";
        if ($result = $conn->query($q)) {
            $data = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($data);
        }else{
            echo json_encode(false);
        }
 
        return false;
        break;// FETCH DATA PRG==============

    case 'POST':
        $name = escape($_POST['prg_name']);
        $q = "INSERT INTO users (name) VALUES ('$name')";

        run_query($q);
        
        return;
        break;// ADD NEW PRG ===============

    case 'DELETE':
        $id = $_GET['id'];
        $q = "DELETE FROM users WHERE id=$id";

        run_query($q);

        return;
        break;// DELETE PRG ================

    case 'PATCH':
        $skills = escape($_GET['skills']);
        $id = $_GET['id'];

        $q = "INSERT INTO skills (name,user_id) VALUE ('$skills', $id)";
        
        run_query($q);

        return;
        break;// ADD PRG SKILL(s) ============

    default:
        //Do nothing here
        break;
}

function run_query($q)
{
    global $conn;

    if ($conn->query($q)) echo json_encode(true);
    else echo json_encode(false);

    $conn->close();
}// run query then output json

function escape($s)
{
    global $conn;
    $s = $conn->real_escape_string($s);
    return $s;
}// escape string