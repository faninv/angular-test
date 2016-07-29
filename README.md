# angular-test

2. Напишите простейший редактор списка с использованием библиотеки AngularJS.

Форма добавления/редактирования

Записи должны хранится в localStorage по уникальному автогенерируемому ID.
Для вывода списка, добавления и редактирования значений должны быть определены 3 state: #/list #/list/add #/list/edit/:id
Для взаимодействия с localStorage (загрузка списка, сохранение добавление удаление элемента) необходимо написать service.
Таблицу и форму редактирования вынести в отдельные directives.
Загрузка и сохранение данных производится в контроллерах, данные передаются в directives через scopes.

3. Angular. Написать 2 директивы. Первая деректива Таблица в “table 1” ХУ - генерируется рендомно от 1 до 10 с шагом 1, в “table 2” Х - генерируется от 2 до 10 с шагом 2 без повторений, У - от 1 до 10 с шагом 1. Также добавить переключатель между таблицами. Вторая деректива График отрисовывает точки “table 1” и при переключении отрисовывает диаграмму “table 2”.
(отрисовку можно выполнять любыми библиотеками и любым подходом). 