### Веб приложение "Chat"
#### Для ревюьэра: для heroku не смог найти решении типа redirect как в netlify.toml. Поэтому там при обновлении страниц роутинг срабатывает только если index  ная страница. historyApiFallback не работает для production а. Если есть такой способ был бы очен рад узнавать. Спасибо.
В проекте на 4 ом спринте Parcel был заменен на Webpack и 
- добавлен webpack config с соответствующими плагинами и лоадерами.
- Чтобы запустить в режиме разработки нужно запустить команду `npm run serve`
- Чтобы собрать build, нужно запустить команду `npm run build`
- Чтобы запустить сервер на порту 3000, нужно запустить команду `npm run start`
- Добавлен Dockerfile и Makefile для сборки образа и запуска контейнера.



##Использован компонентный подход
- Использован handlebars для шаблонизации
- Использован EventBus паттерн
- Использован Proxy
- Использован компонент Block для реализации базового класса

## Адрес задеплоенной версии
https://loving-banach-cbcad4.netlify.app/

## Адрес задеплоенной версии на Heroku
https://infinite-depths-38111.herokuapp.com/

### Ссылка на PR Спринт 4
https://github.com/parnasmi/middle.messenger.praktikum.yandex/pull/4

### Ссылка на PR Спринт 3
https://github.com/parnasmi/middle.messenger.praktikum.yandex/pull/3

### Ссылка на PR Спринт 1
https://github.com/parnasmi/middle.messenger.praktikum.yandex/pull/1

### Ссылка на PR Спринт 2
https://github.com/parnasmi/middle.messenger.praktikum.yandex/pull/2
