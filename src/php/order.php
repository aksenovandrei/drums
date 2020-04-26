<?php

require 'settings.php';
require 'methods.php';

$data = [];
$data['name'] = clean($_POST['name']);
$data['tel'] = clean($_POST['tel']);
$data['area'] = clean($_POST['area']);
$data['cleaningType'] = clean($_POST['cleaningType']);
$data['price'] = clean($_POST['price']);



if (checkEmpty($data)) {
    $data['email'] = clean($_POST['email']);
    $message = "$subjectOrder \r\nИмя: " . $data['name']
        . "\nE-mail: " . $data['email']
        . "\nТелефон: " . $data['tel']
        . "\nПлощадь: " . $data['area'] . ' кв. м.'
        . "\nТип уборки: " . $data['cleaningType']
        . "\nСтоимость: " . $data['price'] . ' руб';
    sendMessageToTelegram($token, $chat_id_list, $message);
    sendMessageToMail($to, $subjectOrder, $message);
    echo 'Ваша заявка принята. Мы перезвоним Вам в течение 9 минут!';
} else {
    // TODO вывести ошибку в аякс
    echo 'Что-то пошло не так. Проверьте правильнось введенных данных';

}





