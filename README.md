http://127.0.0.1:8000/admin/ Имя - а пароль - 1

http://127.0.0.1:8000/api/phones/func/?search={name} - принимает GET. get - ищет по полю name, выдаёт приблизительный список записей

http://127.0.0.1:8000/api/phones/func/?search={name}&corpus={corpus} - принимает GET. get - ищет по полю name и corpus, выдаёт приблизительный список записей(можно комбинировать запрос)

http://127.0.0.1:8000/api/phones/func/?brand={brand}&corpus={corpus}&yadra={yadra}&front_kamera={front_kamera}&giga_vstoeno={giga_vstoeno}&giga_operate={giga_operate}&accumulator={accumulator} - принимает GET. get - ищет по полям corpus,Brand,Yadra,Front kamera,Giga vstoeno,Giga operate,Accumulator и выдаёт приблизительный список записей,ПРИМЕЧАНИЕ надо чётко прописывать запрос

http://127.0.0.1:8000/api/phones/func/?brand={brand,brand,brand...} - принимает GET. get - ищет по полю brand, но также учитывает все brand, выводит список записей которые включаются в список brand

http://127.0.0.1:8000/api/phones/func/ принимает GET,POST. get - получение список всех телефонов и т.е, post - создать новую запись

http://127.0.0.1:8000/api/airpods/func/ принимает GET,POST. get - получение список всех телефонов и т.е, post - создать новую запись

http://127.0.0.1:8000/api/phones/func/{id}/ принимает GET,PUT,DELETE. get - получение одной записи put - изменение данных кроме slug, delete - удаление одной записи

http://127.0.0.1:8000/api/airpods/func/{id}/ принимает GET,PUT,DELETE. get - получение одной записи put - изменение данных кроме slug, delete - удаление одной записи

http://127.0.0.1:8000/api/accounts/login/ принимает POST. post - требует поля username,password после чего можно получить токен

http://127.0.0.1:8000/api/accounts/create/ принимает POST. post - требует поля username,password,new_password,email осле чего создаётся пользователь с токеном

http://127.0.0.1:8000/api/accounts/logout/ принимает POST. post - требует токен после чего токен удаляется у пользователя

http://127.0.0.1:8000/api/accounts/logoutALL/ принимает POST. post - требует токен после чего ВСЕ токены удаляется у пользователя

http://127.0.0.1:8000/api/phone/{slug}/ принимает GET. get - выводит запись по слагу но также выводит ряд записей похожие по полю brand и похожие записи из airpods

http://127.0.0.1:8000/api/airpod/{slug}/ принимает GET. get - выводит запись по слагу но также выводит ряд записей похожие по полю brand и похожие записи из phones

http://127.0.0.1:8000/api/accounts/extra_create/ - принимает POST.post - требует поля phone_id,comments и токен пользователя после чего создаётся комментарий

http://127.0.0.1:8000/api/accounts/create/ - это html страница где есть поля username,email в ходе заполнения создаётся аккаунт без подтверждения изначально и к пользователю придёт ссылка на подтверждение аккаунта(где также сгенерирован пароль) и он перейдёт на http://127.0.0.1:8000/ после чего пользователю нужно авторизовать свой созданный аккаунт через http://127.0.0.1:8000/api/accounts/login/

1. http://127.0.0.1:8000/login/ - это html страница где проходит авторизация аккаунта через гугл, он создаёт sessionid на бекенд клиенте(это как токен) и перенаправляяет на http://127.0.0.1:8000/

2. http://127.0.0.1:8000/auth/ - это html страница где проходит авторизация аккаунта через гитхаб, он создаёт sessionid на бекенд клиенте(это как токен) и перенаправляяет на http://127.0.0.1:8000/

3. http://127.0.0.1:8000/logout/ - выход с авторизованного аккаунта, удаляет сессии(не токены, работает с гитхабом/гуглом) и перенаправляет на http://127.0.0.1:8000/

4. http://127.0.0.1:8000/api/comments/createPho/ - принимает POST. post - берёт поля phone_id,rate,comment

5. http://127.0.0.1:8000/api/comments/operatePho/{id}/ - принимает GET,PUT,DELETE. get - выводит список записей связанный с phone_id. put - требует аунтификацию и чтобы пользователь был владельцем этого комментарияб требует поле comments,rate после чего комментарий измениться,delete - тоже что и put но без вводимых полей

6. http://127.0.0.1:8000/api/comments/createAir/ - принимает POST. post - берёт поля airpod_id,rate,comment

7. http://127.0.0.1:8000/api/comments/operateAir/{id}/ - принимает GET,PUT,DELETE. get - выводит список записей связанный с airpod_id. put - требует аунтификацию и чтобы пользователь был владельцем этого комментарияб требует поле comments,rate после чего комментарий измениться,delete - тоже что и put но без вводимых полей
