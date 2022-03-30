<?php

/**
 * Класс инкапсулирует методы для валидации
 *
 */
class Validate {

    protected static $validatedValues = [];

    /**
     * Метод очищает поле формы от тегов
     *
     * @param $field
     */
    public static function stripTagsField($field) {
        if(isset($_POST[$field]) and boolval($_POST[$field])) {
            $preparedField = strip_tags($_POST[$field]);
            self::$validatedValues[$field] = $preparedField;

            return;
        }

        self::$validatedValues[$field] = '';
    }

    /**
     * Метод валидирует поле формы
     *
     * @param $field
     * @return bool
     */
    public static function requireFiled($field) {
        if(isset($_POST[$field]) and boolval($_POST[$field])) {
            $preparedField = strip_tags($_POST[$field]);

            if(!boolval($preparedField))
                return false;

            self::$validatedValues[$field] = $preparedField;

            return true;
        }
    }

    /**
     * Метод возвращает поля формы
     *
     * @return array
     */
    public static function getValidatedFields() {
        return self::$validatedValues;
    }
}