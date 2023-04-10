<h1>Бекенд приложение #smartphone_proj</h1>

<h2>Служебная часть</h2>

http://127.0.0.1:8000/admin/

<h2>Апи для телефонов</h2>

http://127.0.0.1:8000/api/phones/func/?search={name} - принимает GET. get - ищет по полю name, выдаёт приблизительный список записей

http://127.0.0.1:8000/api/phones/func/?search={name}&corpus={corpus} - принимает GET. get - ищет по полю name и corpus, выдаёт приблизительный список записей(можно комбинировать запрос)

http://127.0.0.1:8000/api/phones/func/?brand={brand}&corpus={corpus}&yadra={yadra}&front_kamera={front_kamera}&giga_vstoeno={giga_vstoeno}&giga_operate={giga_operate}&accumulator={accumulator} - принимает GET. get - ищет по полям corpus,Brand,Yadra,Front kamera,Giga vstoeno,Giga operate,Accumulator и выдаёт приблизительный список записей,ПРИМЕЧАНИЕ надо чётко прописывать запрос

http://127.0.0.1:8000/api/phones/func/?brand={brand,brand,brand...} - принимает GET. get - ищет по полю brand, но также учитывает все brand, выводит список записей которые включаются в список brand

http://127.0.0.1:8000/api/phones/func/{id}/ принимает GET,PUT,DELETE. get - получение одной записи put - изменение данных кроме slug, delete - удаление одной записи

http://127.0.0.1:8000/api/phone/{slug}/ принимает GET. get - выводит запись по слагу но также выводит ряд записей похожие по полю brand и похожие записи из airpods

<h2>Апи для Наушников</h2>

http://127.0.0.1:8000/api/phone/{slug}/ принимает GET. get - выводит запись по слагу но также выводит ряд записей похожие по полю brand и похожие записи из airpods

http://127.0.0.1:8000/api/airpods/func/ принимает GET,POST. get - получение список всех телефонов и т.е, post - создать новую запись

http://127.0.0.1:8000/api/airpods/func/{id}/ принимает GET,PUT,DELETE. get - получение одной записи put - изменение данных кроме slug, delete - удаление одной записи

<h2>Апи для Аккаунтов</h2>

http://127.0.0.1:8000/api/accounts/user/ принимает GET. get - проверяет есть ли токен у пользователя

http://127.0.0.1:8000/api/accounts/login/ принимает POST. post - требует поля username,password после чего можно получить токен

http://127.0.0.1:8000/api/accounts/fast_create/ принимает POST. post - требует поля username,email после чего оздаётся пользователь не активный(тоесть невозмоно авторизоваться)

http://127.0.0.1:8000/api/accounts/extra_create/ принимает POST. post - требует поля username,password,new_password,email осле чего создаётся пользователь с токеном

http://127.0.0.1:8000/api/accounts/logout/ принимает POST. post - требует токен после чего токен удаляется у пользователя

http://127.0.0.1:8000/api/accounts/logoutALL/ принимает POST. post - требует токен после чего ВСЕ токены удаляется у пользователя

http://127.0.0.1:8000/api/accounts/create/ - принимает POST. POST требуют поля username,email в ходе заполнения создаётся аккаунт без подтверждения изначально и к пользователю придёт ссылка на подтверждение аккаунта(где также сгенерирован пароль) и он перейдёт на http://127.0.0.1:3000/ после чего пользователю нужно авторизовать свой созданный аккаунт через http://127.0.0.1:8000/api/accounts/login/

<h2>Апи для сторонних авторизаций аккаунтов</h2>

http://127.0.0.1:8000/logout/ - выход с авторизованного аккаунта, удаляет сессии(не токены, работает с гитхабом/гуглом) и перенаправляет на http://127.0.0.1:8000/

http://127.0.0.1:8000/login/github/ - редиректит пользователя на Github страницу, в ходе заполнение данных генерируеться сессия токен(sessionid).

http://127.0.0.1:8000/login/google-oauth2/ - редиректит пользователя на Google страницу, в ходе заполнение данных генерируеться сессия токен(sessionid).# не в рабочем состоянии

<h2>Апи комментарии(Телефоны,Наушники)</h2>

http://127.0.0.1:8000/api/comments/createPho/ - принимает POST. post - берёт поля phone_id,rate,comment

http://127.0.0.1:8000/api/comments/operatePho/{id}/ - принимает GET,PUT,DELETE. get - выводит список записей связанный с phone_id. put - требует аунтификацию и чтобы пользователь был владельцем этого комментарияб требует поле comments,rate после чего комментарий измениться,delete - тоже что и put но без вводимых полей

http://127.0.0.1:8000/api/comments/createAir/ - принимает POST. post - берёт поля airpod_id,rate,comment

http://127.0.0.1:8000/api/comments/operateAir/{id}/ - принимает GET,PUT,DELETE. get - выводит список записей связанный с airpod_id. put - требует аунтификацию и чтобы пользователь был владельцем этого комментарияб требует поле comments,rate после чего комментарий измениться,delete - тоже что и put но без вводимых полей

<h2>Апи корзины товаров+оплата</h2>

http://127.0.0.1:8000/api/comments/add_product/ - принимает POST. post - берёт поля group_product(1-телефоны,2-наушники),product_id также требует токен/сессию пользователя, и есть необязательное поле count,если его не указывать count=1, после чего будет добавлен товар в корзину клиента с доп полями. Примечание: повторно сделать запрос будет невозможно, слаговое поле не может повторяться.

http://127.0.0.1:8000/api/comments/operate_product/{id}/ - принимает GET,DELETE,PUT. 
get - берёт id пользователя и сверяет с токеном пользователя после чего выводидтся список товаров взятых пользователем, 
delete - берёт id объекта и токен пользователя, после чего удаляет эту запись,
put - берёт id объекта и токен пользователя, требует поле count, после чего товар будет изменён.

http://127.0.0.1:8000/api/comments/get_traffic/ - принимает PATCH. patch - берёт токен пользователя, после чего выводит список товаров которые прошли успешную транзакцию

http://127.0.0.1:8000/create-checkout-session/<id>/ - принимает POST. post - берёт id пользователя(работает на всех пользователей) и генерирует уникальную сессию(ссылку) которая перекидывает пользователя на сайт stripe где происходит оплата, после того как пользователь ввёл свои данные(тестовые : 4242 4242 4242 4242,11/23,123 ) происходит платёжная операция в ходе которой все товары оплачиваються и редиректит пользователя на http://smartshopcenter.org:3000/ и в случае отмены покупки http://smartshopcenter.org:3000/ , после завершения обработки платежа на почту пользователя приходит email сообщение
