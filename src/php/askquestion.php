<?php
require 'settings.php';
require 'methods.php';

$data = [];
$data['name'] = clean($_POST['name']);
$data['tel'] = clean($_POST['tel']);
$data['area'] = clean($_POST['area']);

if (checkEmpty($data)) {
    $message = "$subjectOrder \r\nИмя: " . $data['name']
        . "\nТелефон: " . $data['tel']
        . "\nВопрос: " . $data['area'];

    sendMessageToTelegram($token, $chat_id_list, $message);
    sendMessageToMail($to, $subjectOrder, $message);
    echo 'Ваша вопрос принят. Я с Вами свяжусь в ближайшее время';
} else {
    echo 'Что-то пошло не так. Проверьте правильнось введенных данных1';

}






