http://127.0.0.1:8000/admin/ Имя - а пароль - 1

http://127.0.0.1:8000/api/phones/func/?search={name} - принимает GET. get - ищет по полю name, выдаёт приблизительный список записей

http://127.0.0.1:8000/api/phones/func/?search={name}&corpus={corpus} - принимает GET. get - ищет по полю name и corpus, выдаёт приблизительный список записей(можно комбинировать запрос)

http://127.0.0.1:8000/api/phones/func/?brand={brand}&corpus={corpus}&yadra={yadra}&front_kamera={front_kamera}&giga_vstoeno={giga_vstoeno}&giga_operate={giga_operate}&accumulator={accumulator} - принимает GET. get - ищет по полям corpus,Brand,Yadra,Front kamera,Giga vstoeno,Giga operate,Accumulator и выдаёт приблизительный список записей,ПРИМЕЧАНИЕ надо чётко прописывать запрос

http://127.0.0.1:8000/api/phones/func/?brand={brand,brand,brand...} - принимает GET. get - ищет по полю brand, но также учитывает все brand, выводит список записей которые включаются в список brand

http://127.0.0.1:8000/api/phones/func/ принимает GET,POST. get - получение список всех телефонов и т.е, post - создать новую запись

http://127.0.0.1:8000/pi/phones/func/{id}/ принимает GET,PUT,DELETE. get - получение одной записи put - изменение данных кроме slug, delete - удаление одной записи

http://127.0.0.1:8000/api/accounts/login/ принимает POST. post - требует поля username,password после чего можно получить токен

http://127.0.0.1:8000/api/accounts/create/ принимает POST. post - требует поля username,password,new_password,email осле чего создаётся пользователь с токеном

http://127.0.0.1:8000/api/accounts/logout/ принимает POST. post - требует токен после чего токен удаляется у пользователя

http://127.0.0.1:8000/api/accounts/logoutALL/ принимает POST. post - требует токен после чего ВСЕ токены удаляется у пользователя

http://127.0.0.1:8000/api/phone/{slug}/ принимает GET. get - выводит запись по слагу но также выводит ряд записей похожие по полю brand

http://127.0.0.1:8000/api/comments/create/ - принимает POST.post - требует поля phone_id,comments и токен пользователя после чего создаётся комментарий

http://127.0.0.1:8000/api/comments/operate/{id}/ - принимает GET,PUT,DELETE. get - выводит список записей связанный с phone_id. put - требует аунтификацию и чтобы пользователь был владельцем этого комментарияб требует поле comment после чего комментарий измениться,delete - тоже что и put но без вводимых полей

