<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

require_once "./src/Services/email-sender.php";
require_once "./src/Services/json-worker.php";
require_once "./src/Services/validate.php";

$resultSubject = Validate::requireFiled("subject");
if(!boolval($resultSubject))
    JsonWorker::answerError("message", "заполните все обязательные поля!");

$resultEmail = Validate::requireFiled("email");
if(!boolval($resultEmail))
    JsonWorker::answerError("message", "заполните все обязательные поля!");

$resultName = Validate::requireFiled("name");
if(!boolval($resultName))
    JsonWorker::answerError("message", "заполните все обязательные поля!");

$resultQuestion = Validate::requireFiled("question");
if(!boolval($resultQuestion))
    JsonWorker::answerError("message", "заполните все обязательные поля!");

Validate::stripTagsField("phone");

$validatedFields = Validate::getValidatedFields();

$resultSend = Email::send("resume@ooo-modern.ru", $validatedFields);

if(boolval($resultSend))
    JsonWorker::answerSuccess("message", "email отправлен успешно!");

JsonWorker::answerError("message", "произошла ошибка при отправке email!");