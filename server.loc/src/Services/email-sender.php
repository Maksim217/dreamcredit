<?php

/**
 * Класс инкапсулирует методы для работой с почтой
 */
class Email {

    /**
     * Метод для отправки письма
     *
     * @param $to
     * @param $options
     * @return bool
     */
    public static function send($to, $options) {
        $topicLetter = 'Questions from DreamCreditMaker: ' . $options["subject"];
        $message = 'Email: ' . $options["email"] . "\r\n" .
                'Name: ' . $options["name"] . "\r\n" .
                'Question: ' . $options["question"] . "\r\n" .
                'Phone Number: ' . $options["phone"];
        $headers = [];

        return mail($to, $topicLetter, $message, $headers);
    }
}