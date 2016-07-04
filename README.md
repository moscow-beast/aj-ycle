# ajсycle = ajax + biсycle

Простое native js решение для работы с ajax на основе XMLHttpRequest.
Создано, по крайней мере изначально, в (само)образовательных целях.
Но это не значит что решение не может быть использовано в практических целях.

Запросы реализованы только ассинхронные, поэтому фукция ничего не возращает,
а передает данные в callback - функцию.

## Summary

На данный момент реализованы методы GET и POST. Метод POST поддерживает
кодирование application/x-www-form-urlencoded и multipart/form-data

## Примеры

Вызов `ajсycle( параметры , данные , callback-функция )`

Типичое использование:

    ajсycle({
        method: 'POST',
        encoding: 0,
        url: './ajax.php'
        },
        {
            name: 'John',
            surname: 'Doe'
        },
        function (resp) {
            console.log(resp);
        });

### Параметры

method: метод, GET или POST

encoding: кодирование, только для метода POST, 0 - application/x-www-form-urlencoded
1 - multipart/form-dataform-data, 3 - text/plain

### Данные

Объект: на данный момент поддерживается только одномерный ассоциативный
массив. Либо строка, в таком случае устанавливается кодировка text/plain