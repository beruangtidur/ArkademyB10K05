<?php
Header('Content-type: application/json');

require_once('../env.php');

$conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);


switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        $data = [];
        $q = "SELECT users.*, skills.name AS skills FROM users LEFT JOIN skills ON users.id = skills.user_id";
        if ($result = $conn->query($q)) {
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_object()) {
                    if (isset($data[$row->id])) {
                        array_push($data[$row->id]['skills'], $row->skills);
                    } else {
                        $data[$row->id] = ['name' => $row->name, 'skills' => [$row->skills]];
                    }
                }
            } else {
                $data = null;
            }
            echo json_encode($data);
        }
        // return;
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