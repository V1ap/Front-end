// let arrowUp = document.createElement('span')
// let arrowUpSvg = document.createElement('svg')
// arrowUpSvg.width = '8';
// arrowUpSvg.height = '8';
// arrowUpSvg.viewBox = '0 0 8 8'
// arrowUpSvg.fill = 'none'
// let arrowUpPath = document.createElement('path')
// arrowUpPath.d = 'M3.49691e-07 4L0.705 4.705L3.5 1.915L3.5 8L4.5 8L4.5 1.915L7.29 4.71L8 4L4 -3.49691e-07L3.49691e-07 4Z'
// arrowUpPath.fill = '#9873FF'
// arrowUpSvg.append(arrowUpPath)
// arrowUp.append(arrowUpSvg)


function CreateTable() {
    let content = document.querySelector('.Client__content')
    if (document.querySelector('table') != null) {
        document.querySelector('table').remove();
    }
    let table = document.createElement('table')
    table.classList.add('Client__table')
    content.append(table)
    let tr = document.createElement('tr')
    let td1 = document.createElement('td')
    let btn1 = document.createElement('button')
    let span1 = document.createElement('span')
    let p1 = document.createElement('p')
    span1.classList.toggle('arrow-up')
    btn1.classList.add('Client__btn-table')
    p1.textContent = 'ID'
    p1.classList.add('text')
    // btn1.addEventListener('click', () => {
    //     arrayStudentPaint = arrayStudent.slice();
    //     arrayStudentPaint.sort((a, b) => alphabetFullName(a, b));
    //     repaint()
    // })
    btn1.append(p1);
    btn1.append(span1);
    td1.append(btn1);
    tr.append(td1);

    let td2 = document.createElement('td')
    let btn2 = document.createElement('button')
    let span2 = document.createElement('span')
    let p2 = document.createElement('p')
    let p2_s = document.createElement('p')
    p2.textContent = "Фамилия Имя Отчество"
    p2_s.textContent = "А-Я"
    p2.classList.add('text')
    p2_s.classList.add('text', 'text_s')
    span2.classList.toggle('arrow-down')
    btn2.classList.add('Client__btn-table')
    // btn1.addEventListener('click', () => {
    //     arrayStudentPaint = arrayStudent.slice();
    //     arrayStudentPaint.sort((a, b) => alphabetFullName(a, b));
    //     repaint()
    // })
    btn2.append(p2)
    btn2.append(span2)
    btn2.append(p2_s)
    td2.append(btn2);
    tr.append(td2);

    let td3 = document.createElement('td')
    let btn3 = document.createElement('button')
    let span3 = document.createElement('span')
    let p3 = document.createElement('p')
    p3.textContent = "Дата и время создания"
    p3.classList.add('text')
    span3.classList.toggle('arrow-down')
    btn3.classList.add('Client__btn-table')
    // btn1.addEventListener('click', () => {
    //     arrayStudentPaint = arrayStudent.slice();
    //     arrayStudentPaint.sort((a, b) => alphabetFullName(a, b));
    //     repaint()
    // })
    btn3.append(p3)
    btn3.append(span3);
    td3.append(btn3);
    tr.append(td3);

    let td4 = document.createElement('td')
    let btn4 = document.createElement('button')
    let span4 = document.createElement('span')
    let p4 = document.createElement('p')
    p4.textContent = "Последние изменения"
    p4.classList.add('text')
    span4.classList.toggle('arrow-down')
    btn4.classList.add('Client__btn-table')
    // btn1.addEventListener('click', () => {
    //     arrayStudentPaint = arrayStudent.slice();
    //     arrayStudentPaint.sort((a, b) => alphabetFullName(a, b));
    //     repaint()
    // })
    btn4.append(p4)
    btn4.append(span4);
    td4.append(btn4);
    tr.append(td4);

    let td5 = document.createElement('td')
    let btn5 = document.createElement('button')
    btn5.classList.add('Client__btn-table')
    // btn1.addEventListener('click', () => {
    //     arrayStudentPaint = arrayStudent.slice();
    //     arrayStudentPaint.sort((a, b) => alphabetFullName(a, b));
    //     repaint()
    // })
    btn5.textContent = "Контакты";
    td5.append(btn5);
    tr.append(td5);

    let td6 = document.createElement('td')
    let btn6 = document.createElement('button')
    let span6 = document.createElement('span')
    btn6.classList.add('Client__btn-table')
    // btn1.addEventListener('click', () => {
    //     arrayStudentPaint = arrayStudent.slice();
    //     arrayStudentPaint.sort((a, b) => alphabetFullName(a, b));
    //     repaint()
    // })
    btn6.textContent = "Действия";
    td6.append(btn6);
    tr.append(td6);
    table.append(tr);
    

    
}

CreateTable ()