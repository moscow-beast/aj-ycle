# ajсycle = ajax + biсycle

Простое native js решение для работы с ajax на основе XMLHttpRequest.
Создано, по крайней мере изначально, в (само)образовательных целях.
Но это не значит что решение не может быть использовано в практических целях.

Запросы реализованы только ассинхронные, поэтому фукция ничего не возращает,
а передает данные в callback - функцию.

## Summary

На данный момент реализованы методы GET и POST. Метод POST поддерживает
кодирование application/x-www-form-urlencoded и multipart/form-data

## POST

            ajсycle({
                method: 'post',
                encoding: 0,
                url: './',
                values: {
                    name: 'John',
                    surname: 'Doe'
                }
            }, function (resp) {
                console.log(resp);
            });