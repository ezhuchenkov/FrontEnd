# NewsExplorer-FrontEnd
# NotBadNews.tk Frontend

#### версия 1.0
### О Проекте: дипломный проект студента Яндекс Практикума по разработке сервиса, в котором можно найти новости по запросу и сохранить в личном кабинете.

Api доступен по адресу [https://api.notbadnews.tk]
Фронтенд доступен по адресу [https://notbadnews.tk]
![Йожик](https://github.com/ezhuchenkov/ezhuchenkov.github.io/blob/master/%D0%81%D0%B6.svg)


* команда npm run build собирает, создает папку dist с итоговым проектом, применяя webpaсk;
* команда npm run dev запускает сервер с хот релоудом;
* настроен фебпак;
* настроен Babel;
* настроен Post CSS;
* установлены дополнительны плагины;
* отдельные CSS-бандлы для каждой страницы;
* фронтенд приложения располагается на том же домене, что и API;* именование классов и структура файлов сделана по БЭМ;
* проект адаптирован под различные разрешения экрана;
* в коде используется семантическая разметка;
* шрифты подключены через @font-face;
* для изображений задан атрибут alt с подходящий значением.

Как развернуть проект:
- скопируйте ветку master;
- установить node модули;
- в зависимости от Ваших целей:

`npm run dev` - запуск локально для разработки

`npm run build` - сборка бандла для продакшена

`npm run pages` - обновить версию на GitHub Pages

`npm run deploy` - передать собранный проект на сервер


# Планы по доработке проекта:
* добавление JS кода по обращению к внешнему API по поиску новостей
* добавление JS кода по обращению к внутреннему API для авторизации пользователей, хранения информации по созхраненным карточкам новостей
* добавление JS кода по обработке событий на сайте (авторизация, меню, и т.д.)I
