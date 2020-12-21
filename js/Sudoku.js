class Sudoku {
    constructor (initString = '000000000000000000000000000000000000000000000000000000000000000000000000000000000') {
        const startValue = initString
        .split('')
        .filter(el => '0123456789'.includes(el))
        .map(e => Number(e)); //проходится по всему массиву (map возвращает новый массив (return), а for each не делает так. просто проходит) ПРЕОБРАЗУЕМ/ПРИВОДИМ
        this.isComplete = false;
        this.body = [] //массив, в котором будут храниться объекты с информацией о каждой клетке, флаги для визуального отображения, информация о расположении клетки и само значение
        this.parts = [[],[],[],[],[],[],[],[],[]];
        this.columns = [[],[],[],[],[],[],[],[],[]]; //в этих трех массивах будет храниться индекс объекта в массиве body. в них будет 9 массивов и в каждом из них 9 значений
        this.rows = [[],[],[],[],[],[],[],[],[]];
        let idCounter = 1
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                this.body.push({
                    id: idCounter,
                    x, //column
                    y, //row для себя: Если поле совпадает с именем переменной, то вместо y: y можно написать так - y. У x аналогично
                    number: startValue[idCounter - 1], // 0 означает то, что неизвестно в какой ячейке это число должно быть. значение, которое нужно будет разгадать
                    selected: false,
                    supported: false,
                    error: false,
                    important: false,
                    p: parseInt(y / 3) * 3 + parseInt(x / 3) //parseInt() - преобразует строку в число. Используется для получения примитивного типа данных определенной строки. во время цикла формируется информация для такой-то клетки (такая-то колонка, такая-то строка). 3, потому что 3 ячейки вертикально, 3 горизлнтально
                })
                this.parts[parseInt(y / 3) * 3 + parseInt(x / 3)].push(idCounter-1); //обращение к ячейке по индексу
                this.columns[x].push(idCounter-1); //[x] - обращение по индексу в массив, в котором будут лежать индексы
                this.rows[y].push(idCounter-1);
                idCounter++
            }

        
        }
    }

    checkIsComplete() { //проходит по всем ячейкам, смотрит есть ли еще 0, чтобы понять решено судоку или нет
        
        for (const item of this.body) {
            if (item.number === 0 || item.error === true) {
                this.isComplete = false;
                break;
            }
                this.isComplete = true
                
        }
        
    }
    getRow (n) { //альтернативный вариант для этих действий - пройти по всем элементам body и посмотреть в каких координатах y соответствует n
        const row = []

        for (let i = 0; i < 9; i++) {
            row.push(this.body[this.rows[n][i]]) //Для того, чтобы получить индекс каждого следующего элемента в строке n
        } 
        return row
    }

    getColumn (n) { //альтернативный вариант для этих действий - пройти по всем элементам body и посмотреть в каких координатах x соответствует n
        const column = []

            for (let i = 0; i < 9; i++) {
                column.push(this.body[this.columns[n][i]])
            }

            return column
    }

    getPart (n) {
        const part = []

        
        
        for (let i = 0; i < 9; i++ ) { 
            part.push(this.body[this.parts[n][i]])
        }

        return part
    }
    keydownHandler (event, cell) {
        if ("123456789".includes(event.key)) {
            cell.number = Number(event.key); //Number необходим, чтобы превратить строку из eventkey в цифру (приведение типов)
        }
        if ( ["Backspace", "Delete"].includes(event.key) ) {
            cell.number = 0
        }
        cell.error = false
        for (const item of this.body) {
            if (cell.number && cell.number === item.number) { //если в клетке сейчас не ноль, то дальше происходит сравнение: равно ли значение введенной клетки значению обрабатываемой в текущей клетке, лежит ли что-то в cell number
                item.important = true
                if (cell !== item && (cell.x === item.x || cell.y === item.y || cell.p === item.p)) { //сравнивается рассматриваемая клетка, в которой нажата кнопка с клетками, принадлежащим тому. при переборе наткнулся он на ту же ячейку или нет. условия cell !== item исключает случай, когда программа думает, что любое введеннео число является ошибкой, потому что думает, что в ряду/столбце/секции такое значение уже существует.
                    item.error = true;
                    cell.error = true;
                }
                continue
            };
            item.important = false //для остальных элментов body, которые не включаются в заданные выше условия
            item.error = false
        }
        event.preventDefault(); //отменяет стандартные обработки событий
        this.viewUpdate();
        this.checkIsComplete(); 
    }
    focusHanlder (event, cell) {
        cell.selected = true;
        
        for (const item of this.getRow(cell.y)) {
            item.supported = true;
        }
        for (const item of this.getColumn(cell.x)) {
            item.supported = true;
        }
        for (const item of this.body) {
            if (cell.number && cell.number === item.number) {
                item.important = true
                continue
            };
            item.important = false
        }
        this.viewUpdate();
    }
    blurHandler (event, cell) {
        cell.selected = false;
        if(cell.error) {
            cell.number = 0; //важно! (убирает ошибочное число)
        }
        
        for (const item of this.body) {
            item.supported = false;
            item.important = false;
            item.error = false;
        }

        this.viewUpdate();
    }


    getHTML (size) { //метод, отвечающий за генерацию поля (именно поля, а не чисел в нем)
        for (const cell of this.body) { 
            const inputElement = document.createElement('input')
            inputElement.classList.add('sudoku-cell')
            inputElement.setAttribute("type", "text")
            if (cell.number) {
                inputElement.setAttribute("value", cell.number) //насильно вкладывает в value значения из script.js
                inputElement.setAttribute("disabled", true)
            }
            inputElement.addEventListener('keydown', event => this.keydownHandler(event, cell)) //событие, которое возникает в результате зажатия кнопки вниз
            inputElement.addEventListener('focus', event => this.focusHanlder(event, cell)) //событие, которое возникает в результате клика на поле
            inputElement.addEventListener('blur', event => this.blurHandler(event, cell)) //событие, которое возникает в результате потери фокуса
            cell.element = inputElement
        } //создание cell.part
        
        const rootElement = document.createElement('div')
        rootElement.classList.add("sudoku-gamearea") //создание класса div sudoku-gamearea
        rootElement.style.width = `${size}px`
        rootElement.style.height = `${size}px`
        rootElement.style["font-size"] = `${size / 20}px`

        for (let p = 0; p < 9; p++) { 
            const partElement = document.createElement('div')
            partElement.classList.add('sudoku-part') 

            for (const cell of this.getPart(p)) { //получение необходимой секции по индексу
                partElement.append(cell.element) 
            }
            rootElement.append(partElement) //добавление sudoku-part в rootElement в качестве дочернего (append)
        }
        // this.viewUpdate()
        return rootElement
    }

    viewUpdate() {
        for (const cell of this.body) {
            cell.element.classList.remove("supported-cell", "selected-cell", "important-cell", "error")
            cell.number ? cell.element.value = cell.number : cell.element.value = ''; //ячейка с нулем или без? если нет, то в input элемент добавляется введенное число пользователем и число, определенное условием
            if (cell.supported) {
                cell.element.classList.add("supported-cell")
            }
            if (cell.selected) {
                cell.element.classList.add("selected-cell")
            }
            if (cell.important) {
                cell.element.classList.add("important-cell")
            }
            if (cell.error) {
                cell.element.classList.add("error")
            }
        }
    }

    

    disable() {
        for (const item of this.body) {
            item.element.setAttribute("disabled", true);
        }
    }
}
