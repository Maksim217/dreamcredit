<?php

/**
 * Класс инкапсулирует методы для json-ответов сервера
 */
class JsonWorker
{
    /**
     * Метод возвращает успешный ответ от сервера
     *
     * @param $key
     * @param $value
     */
    public static function answerSuccess($key, $value)
    {
        $response_success = array(
            'status' => 'OK',
            $key => $value
        );
        header('Content-Type: application/json');
        echo json_encode($response_success, JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Метод возвращает ответ от сервера в случае возникновения ошибки
     *
     * @param $key
     * @param $value
     */
    public static function answerError($key, $value)
    {
        $response_error = array(
            'status' => 'ERROR',
            $key => $value
        );
        header('Content-Type: application/json');
        echo json_encode($response_error, JSON_UNESCAPED_UNICODE);
        exit;
    }
}