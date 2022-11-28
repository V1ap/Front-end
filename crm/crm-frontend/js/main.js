let arrayStudentServer = []
let arrayStudentPaint = []
let tooltipId = 0
let timerId
let fetchError = false
let im = Inputmask({ "mask": "+7 (999)999-99-99" });
// {id: 1, fullName: 'Пак Владислав Павлович', contacts: [{type: 'Vk', content:'vlapof'}], createDate: new Date(2022, 8, 29, 10, 20), changeDate: new Date(2022, 9, 2, 22, 22)}, {id: 2, fullName: 'Смелов Илья Максимович', contacts: [{type: 'Email', content:'ilyasmeloff@rambler.ru'}], createDate: new Date(2022, 9, 3, 12, 30), changeDate: new Date(2022, 9, 3, 12, 30)}

async function loadStudentList() {
  const response = await fetch('http://localhost:3000/api/clients')
  const data = await response.json()
  return data
}

async function createStudent(name, surname, lastName, contacts) {
  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name: name,
      surname: surname,
      lastName: lastName,
      contacts: contacts,
    })
  })
  if (response.status == 404) {
    document.querySelector('.popup-add__error-message').textContent = 'Студент не найден'
    document.querySelector('.popup-add__error-message').classList.add('error-message--active')
    fetchError = true
  }else if(response.status == 422) {
    document.querySelector('.popup-add__error-message').textContent = 'Данные введены не корректно'
    document.querySelector('.popup-add__error-message').classList.add('error-message--active')
    fetchError = true
  }else if(response.status >= 500 && response.status < 600){
    document.querySelector('.popup-add__error-message').textContent = 'Ошибка сервера'
    document.querySelector('.popup-add__error-message').classList.add('error-message--active')
    fetchError = true
  }else if(response.status >= 200 && response.status < 300){
    document.querySelector('.popup-change__error-message').classList.remove('error-message--active')
    const data = await response.json()
    console.log(data)
    const response2 = await fetch('http://localhost:3000/api/clients')
    const data2 = await response2.json()
    return data2
  }else {
    document.querySelector('.popup-change__error-message').textContent = 'Что-то пошло не так...'
    document.querySelector('.popup-change__error-message').classList.add('error-message--active')
    fetchError = true
  }
}

async function getStudent(studentId) {
  const response = await fetch(`http://localhost:3000/api/clients/${studentId}`)
  const data = await response.json()
  return data
}

async function editStudent(studentId, name, surname, lastName, contacts) {
  const response = await fetch(`http://localhost:3000/api/clients/${studentId}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name: name,
      surname: surname,
      lastName: lastName,
      contacts: contacts,
    })
  })
  if (response.status == 404) {
    document.querySelector('.popup-change__error-message').textContent = 'Студент не найден'
    document.querySelector('.popup-change__error-message').classList.add('error-message--active')
    fetchError = true
  }else if(response.status == 422) {
    document.querySelector('.popup-change__error-message').textContent = 'Данные введены не корректно'
    document.querySelector('.popup-change__error-message').classList.add('error-message--active')
    fetchError = true
  }else if(response.status >= 500 && response.status < 600){
    document.querySelector('.popup-change__error-message').textContent = 'Ошибка сервера'
    document.querySelector('.popup-change__error-message').classList.add('error-message--active')
    fetchError = true
  }else if(response.status >= 200 && response.status < 300){
    document.querySelector('.popup-change__error-message').classList.remove('error-message--active')
    fetchError = false
    const data = await response.json()
    console.log(data)
    const response2 = await fetch('http://localhost:3000/api/clients')
    const data2 = await response2.json()
    return data2
  }else {
    document.querySelector('.popup-change__error-message').textContent = 'Что-то пошло не так...'
    document.querySelector('.popup-change__error-message').classList.add('error-message--active')
    fetchError = true
  }
}

async function deleteStudent(studentId) {
  const response = await fetch(`http://localhost:3000/api/clients/${studentId}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  console.log(data)
  const response2 = await fetch('http://localhost:3000/api/clients')
  const data2 = await response2.json()
  return data2
}


function adaptionArrayStudent() {
  loadStudentList().then(studentList => {
    arrayStudentServer = studentList
    arrayStudentServer.sort((a, b) => a.id - b.id)
    searchInArray(document.querySelector('.header__input').value)
    repaint(arrayStudentPaint)
  })
}

function tooltipTextInstaller(content, tooltip) {
  tippy(tooltip, {
    content: content,
  });
}

function tooltipCreator() {
  for (let i = 0; i < tooltipId; i++) {
    arrayStudentServer.forEach((student) => {
      student.contacts.forEach((contact) => {
        let value = document.createElement('span')
        value.classList.add('tooltip__value')
        let tooltip = document.createElement('span')
        tooltip.classList.add('tooltip__text')
        value.textContent = contact.value
        if (contact.type == 'Телефон') im.mask(value)
        tooltip.textContent = `${contact.type}: `
        tooltip.append(value)
        tooltipTextInstaller(tooltip, `.tooltip-${i}`)
        i++
      })
    })
  }
}

function contactElementCreator(typeofPopup) {
  if (document.querySelectorAll('.contact__body').length < 10) {
    let contactBody = document.createElement('div')
    contactBody.classList.add('contact__body')
    let contactBtn = document.querySelector('.contact__btn-delete').cloneNode(true)
    contactBtn.style.display = 'block'
    contactBtn.addEventListener('click', () => {
      contactBody.remove()
      if (document.querySelectorAll('.contact__body').length < 10){
        document.querySelector(`.popup-${typeofPopup}__btn-contacts`).style.display = 'flex'
      }
    })
    let contactSelect = document.createElement('select')
    let contactTel = document.createElement('option')
    contactTel.textContent = "Телефон"
    let contactOther = document.createElement('option')
    contactOther.textContent = "Другое"
    let contactEmail = document.createElement('option')
    contactEmail.textContent = "Email"
    let contactVk = document.createElement('option')
    contactVk.textContent = "Vk"
    let contactFacebook = document.createElement('option')
    contactFacebook.textContent = "Facebook"
    let contactInput = document.createElement('input')
    contactInput.classList.add('contact__input')
    contactInput.type = 'tel'
    im.mask(contactInput);
    contactInput.placeholder = 'Введите данные контакта'
    let contacts = document.querySelector(`.popup-${typeofPopup}__contacts`)
    contactSelect.append(contactTel, contactOther, contactEmail, contactVk, contactFacebook)
    contactBody.append(contactSelect, contactInput, contactBtn)
    contacts.append(contactBody)
    const choices = new Choices(contactSelect, {
      searchEnabled: false,
      itemSelectText: ""
    })
    inputTypeChanger(contactBody)
    tooltipTextInstaller('Удалить контакт', '.contact__btn-delete')
  }
  if (!(document.querySelectorAll('.contact__body').length < 10)) {
    document.querySelector(`.popup-${typeofPopup}__btn-contacts`).style.display = 'none'
  }
}

function searchInArray(value) {
  arrayStudentPaint = arrayStudentServer.filter(student => `${student.surname} ${student.name} ${student.lastName}`.includes(value) || String(student.id).includes(value) || dateSplitText(student.createdAt).includes(value) || dateSplitText(student.updatedAt).includes(value))
}

function contactValidator(contactBody) {
  switch (contactBody.querySelector('.contact__input').type) {
    case 'tel':
      if (!(contactBody.querySelector('.contact__input').inputmask.unmaskedvalue().length == 10)) {
        contactBody.classList.add('input--error')
      }else contactBody.classList.remove('input--error')
      break;
    case 'email':
      if (!(contactBody.querySelector('.contact__input').value.length > 6 && contactBody.querySelector('.contact__input').value.length < 30)) {
        contactBody.classList.add('input--error')
      }else contactBody.classList.remove('input--error')
      break;
    default:
      if (!(contactBody.querySelector('.contact__input').value.length > 4 && contactBody.querySelector('.contact__input').value.length < 30)) {
        contactBody.classList.add('input--error')
      }else contactBody.classList.remove('input--error')
  }
}

function closePopupAdd() {
  document.querySelector('.overlay').classList.remove('overlay--active')
  document.querySelector('body').style.overflow = 'visible'
  document.querySelector('.popup-add').classList.remove('popup-add--active')
  setTimeout( () => {
    document.querySelectorAll('.contact__body').forEach((contactBody) => {
      contactBody.remove()
    })
    document.querySelector('.popup-add__form').reset()
    document.querySelector(`.popup-add__btn-contacts`).style.display = 'flex'
    document.querySelectorAll('.input--error').forEach((inputError) => inputError.classList.remove('input--error'))
    document.querySelectorAll('.error-message--active').forEach((errorMessage) => errorMessage.classList.remove('error-message--active'))
  }, 500)
}

function closePopupChange() {
  document.querySelector('.overlay').classList.remove('overlay--active')
  document.querySelector('.popup-change').classList.remove('popup-change--active')
  document.querySelector('body').style.overflow = 'visible'
  setTimeout( () => {
    document.querySelectorAll('.contact__body').forEach((contactBody) => {
      contactBody.remove()
    })
    document.querySelector('.popup-change__form').reset()
    document.querySelector(`.popup-change__btn-contacts`).style.display = 'flex'
    document.querySelectorAll('.input--error').forEach((inputError) => inputError.classList.remove('input--error'))
    document.querySelectorAll('.error-message--active').forEach((errorMessage) => errorMessage.classList.remove('error-message--active'))
  }, 500)
}

function labelActive(typeofPopup){
  document.querySelectorAll(`.popup-${typeofPopup}__label`).forEach((label) => {
    label.querySelector('.input').addEventListener('input', () => {
      if (label.querySelector('.input').value){
        label.querySelector('.label-text').classList.add('label-text--active')
      }else label.querySelector('.label-text').classList.remove('label-text--active')
      if (label.querySelector('.input--error')){
        label.querySelector('.input').classList.remove('input--error')
      }
    })
  })

}

function closePopupDelete() {
  document.querySelector('.overlay').classList.remove('overlay--active')
  document.querySelector('.popup-delete').classList.remove('popup-delete--active')
}

function formValidator(typeofPopup) {
  let errors = 0;
  document.querySelectorAll(`.popup-${typeofPopup}__label`).forEach((popUplabel) => {
    let error = 0
    if ((popUplabel.querySelector(`.popup-${typeofPopup}__input`).value.search(/\d/) != -1)) {
      error++
    } else if (popUplabel.querySelector(`.popup-${typeofPopup}__input`).value.length > 30 || popUplabel.querySelector(`.popup-${typeofPopup}__input`).value.length < 2) {
      error++
    }
    if (error > 0) {
      popUplabel.querySelector(`.popup-${typeofPopup}__input`).classList.add('input--error')
      errors++
    } else {
      popUplabel.querySelector(`.popup-${typeofPopup}__input`).classList.remove('input--error')
    }
  })
  if (document.querySelectorAll('.contact__body').length > 0) {
    document.querySelectorAll('.contact__body').forEach((contactBody) => {
      switch (contactBody.querySelector('.contact__input').type) {
        case 'tel':
          if (!(contactBody.querySelector('.contact__input').inputmask.unmaskedvalue().length == 10)) {
            errors++
            contactBody.classList.add('input--error')
            contactBody.querySelector('.contact__input').addEventListener('input', () => contactValidator(contactBody))
          }else contactBody.classList.remove('input--error')
          break;
        case 'email':
          if (!(contactBody.querySelector('.contact__input').value.length > 6 && contactBody.querySelector('.contact__input').value.length < 30)) {
            errors++
            contactBody.classList.add('input--error')
            contactBody.querySelector('.contact__input').addEventListener('input', () => contactValidator(contactBody))
          }else contactBody.classList.remove('input--error')
          break;
        default:
          if (!(contactBody.querySelector('.contact__input').value.length > 4 && contactBody.querySelector('.contact__input').value.length < 30)) {
            errors++
            contactBody.classList.add('input--error')
            contactBody.querySelector('.contact__input').addEventListener('input', () => contactValidator(contactBody))
          }else contactBody.classList.remove('input--error')
      }
    })
  }
  if (errors) {
    document.querySelector(`.popup-${typeofPopup}__error-message`).textContent = 'Заполните поля правильно'
    document.querySelector(`.popup-${typeofPopup}__error-message`).classList.add('error-message--active')
  } else {
    document.querySelector(`.popup-${typeofPopup}__error-message`).textContent = ''
    document.querySelector(`.popup-${typeofPopup}__error-message`).classList.remove('error-message--active')
  }
  return (!(errors))
}


function inputTypeChanger(contactBody) {
  contactBody.addEventListener('mouseover', () => {
    switch (contactBody.querySelector('[aria-selected=true]').textContent) {
      case "Телефон":
        contactBody.querySelector('.contact__input').type = 'tel';
        im.mask(contactBody.querySelector('.contact__input'));
        break;
      case "Email":
        contactBody.querySelector('.contact__input').type = 'email';
        Inputmask.remove(contactBody.querySelector('.contact__input'));
        contactBody.querySelector('.contact__input').placeholder = 'Введите данные контакта'
        break;
      default:
        contactBody.querySelector('.contact__input').type = 'text';
        Inputmask.remove(contactBody.querySelector('.contact__input'));
        contactBody.querySelector('.contact__input').placeholder = 'Введите данные контакта'
    }
  })
}

function dateSplit(str) {
  let date = document.createElement('span')
  let time = document.createElement('span')
  time.classList.add('time')
  dateServer = new Date(str)
  time.textContent = `${(dateServer.getHours() < 10) ? '0' + dateServer.getHours() : dateServer.getHours()}:${(dateServer.getMinutes() < 10) ? '0' + dateServer.getMinutes() : dateServer.getMinutes()}`
  date.textContent = `${(dateServer.getDate() < 10) ? '0' + dateServer.getDate() : dateServer.getDate()}.${(dateServer.getMonth() < 9) ? '0' + (dateServer.getMonth() + 1) : (dateServer.getMonth() + 1)}.${dateServer.getFullYear()}`
  let fullDate = document.createElement('div')
  fullDate.classList.add('full-date')
  fullDate.append(date, time)
  return fullDate
}

function dateSplitText(str) {
  dateServer = new Date(str)
  return `${(dateServer.getHours() < 10) ? '0' + dateServer.getHours() : dateServer.getHours()}:${(dateServer.getMinutes() < 10) ? '0' + dateServer.getMinutes() : dateServer.getMinutes()} ${(dateServer.getDate() < 10) ? '0' + dateServer.getDate() : dateServer.getDate()}.${(dateServer.getMonth() < 9) ? '0' + (dateServer.getMonth() + 1) : (dateServer.getMonth() + 1)}.${dateServer.getFullYear()}`
}

function sortOfPage() {
  document.querySelectorAll('.column').forEach((column) => {
    column.addEventListener('click', function(e){
      document.querySelectorAll('.column').forEach((columnVar) => {
        columnVar.classList.remove('column--active')
        columnVar.querySelector('.sort').classList.remove('sort--active')
    })
      e.currentTarget.classList.add('column--active')
      e.currentTarget.querySelector('.sort').classList.add('sort--active')
    })
  })
  document.querySelector('.column-id').addEventListener('click', () => {
    if (document.querySelector('.column-id__sort').className.split(' ').indexOf('arrow-down') == -1) {
      arrayStudentServer.sort((a, b) => b.id - a.id)
    } else arrayStudentServer.sort((a, b) => a.id - b.id)
    document.querySelector('.column-id__sort').classList.toggle('arrow-down')
    searchInArray(document.querySelector('.header__input').value)
    repaint(arrayStudentPaint)
  })

  document.querySelector('.column-name').addEventListener('click', () => {
    if (document.querySelector('.column-name__icon').className.split(' ').indexOf('arrow-down') == -1) {
      arrayStudentServer.sort((a, b) => {
        if (`${a.surname} ${a.name} ${a.lastName}` < `${b.surname} ${b.name} ${b.lastName}`) {
          return 1
        }
        if (`${a.surname} ${a.name} ${a.lastName}` > `${b.surname} ${b.name} ${b.lastName}`) {
          return -1
        }
        if (`${a.surname} ${a.name} ${a.lastName}` == `${b.surname} ${b.name} ${b.lastName}`) {
          return 0
        }
      })
      document.querySelector('.column-name__letter').textContent = 'Я-А'
    } else {
      arrayStudentServer.sort((a, b) => {
        if (`${a.surname} ${a.name} ${a.lastName}` > `${b.surname} ${b.name} ${b.lastName}`) {
          return 1
        }
        if (`${a.surname} ${a.name} ${a.lastName}` < `${b.surname} ${b.name} ${b.lastName}`) {
          return -1
        }
        if (`${a.surname} ${a.name} ${a.lastName}` == `${b.surname} ${b.name} ${b.lastName}`) {
          return 0
        }
      })
      document.querySelector('.column-name__letter').textContent = 'А-Я'
    }
    document.querySelector('.column-name__icon').classList.toggle('arrow-down')
    searchInArray(document.querySelector('.header__input').value)
    repaint(arrayStudentPaint)
  })

  document.querySelector('.column-date').addEventListener('click', () => {
    if (document.querySelector('.column-date__sort').className.split(' ').indexOf('arrow-down') == -1) {
      arrayStudentServer.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    } else arrayStudentServer.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    document.querySelector('.column-date__sort').classList.toggle('arrow-down')
    searchInArray(document.querySelector('.header__input').value)
    repaint(arrayStudentPaint)
  })

  document.querySelector('.column-change').addEventListener('click', () => {
    if (document.querySelector('.column-change__sort').className.split(' ').indexOf('arrow-down') == -1) {
      arrayStudentServer.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
    } else arrayStudentServer.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    document.querySelector('.column-change__sort').classList.toggle('arrow-down')
    searchInArray(document.querySelector('.header__input').value)
    repaint(arrayStudentPaint)
  })
}

function popupChangeActive(studentId) {
  document.querySelector('.popup-change__btn-close').addEventListener('click', closePopupChange)
  document.querySelector('.popup-change__btn-cancel').addEventListener('click', () => {
    closePopupChange()
    popupDeleteActive(studentId)
  })


  document.querySelector('body').style.overflow = 'hidden'
  document.querySelector('.overlay').classList.add('overlay--active')
  document.querySelector('.popup-change').classList.add('popup-change--active')

  getStudent(studentId).then(studentElem => {
    let student = studentElem
    document.querySelector('.popup-change__id').textContent = `ID: ${student.id}`
    document.querySelector('.change-surname').value = student.surname
    document.querySelector('.change-name').value = student.name
    document.querySelector('.change-middle-name').value = student.lastName

    student.contacts.forEach(contact => {
      let contactBody = document.createElement('div')
      contactBody.classList.add('contact__body')
      let contactBtn = document.querySelector('.contact__btn-delete').cloneNode(true)
      contactBtn.style.display = 'block'
      contactBtn.addEventListener('click', () => {
        if (document.querySelectorAll('.contact__body').length < 10){
          document.querySelector(`.popup-change__btn-contacts`).style.display = 'flex'
        }
        contactBody.remove()
      })
      let contactSelect = document.createElement('select')
      let contactTel = document.createElement('option')
      contactTel.textContent = "Телефон"
      let contactOther = document.createElement('option')
      contactOther.textContent = "Другое"
      let contactEmail = document.createElement('option')
      contactEmail.textContent = "Email"
      let contactVk = document.createElement('option')
      contactVk.textContent = "Vk"
      let contactFacebook = document.createElement('option')
      contactFacebook.textContent = "Facebook"
      let contactInput = document.createElement('input')
      contactInput.classList.add('contact__input')
      contactInput.placeholder = 'Введите данные контакта'
      switch (contact.type) {
        case 'Другое':
          contactOther.selected = 'selected'
          contactInput.type = 'text'
          break
        case 'Email':
          contactEmail.selected = 'selected'
          contactInput.type = 'email'
          break
        case 'Vk':
          contactVk.selected = 'selected'
          contactInput.type = 'text'
          break;
        case 'Facebook':
          contactFacebook.selected = 'selected'
          contactInput.type = 'text'
          break
        default:
          contactInput.type = 'tel'
      }
      contactInput.value = contact.value
      if (contactInput.type == 'tel') {
        im.mask(contactInput)
      }
      contactSelect.append(contactTel, contactOther, contactEmail, contactVk, contactFacebook)
      contactBody.append(contactSelect, contactInput, contactBtn)
      document.querySelector('.popup-change__contacts').append(contactBody)
      const choices = new Choices(contactSelect, {
        searchEnabled: false,
        itemSelectText: ""
      })
      inputTypeChanger(contactBody)
    })
    if (document.querySelectorAll('.contact__body').length >= 10){
      document.querySelector('.popup-change__btn-contacts').style.display = 'none'
    }
    tooltipTextInstaller('Удалить контакт', '.contact__btn-delete')

    function changeStudentElement(e) {
      e.preventDefault()
      if(document.querySelector('.popup-change__id').textContent.split(' ')[1] == studentId){
        if (formValidator('change')) {
          let contacts = []
          document.querySelectorAll('.contact__body').forEach((contactBody) => {
            let contact = new Contact(contactBody.querySelector('[aria-selected=true]').textContent, contactBody.querySelector('.contact__input').value)
            contacts.push(contact)
          })
          editStudent(studentId, `${document.querySelector('.change-name').value.trim()}`, `${document.querySelector('.change-surname').value.trim()}`, `${document.querySelector('.change-middle-name').value.trim()}`, contacts).then(studentList => {
            if(!fetchError){
              arrayStudentServer = studentList
              arrayStudentServer.sort((a, b) => a.id - b.id)
              searchInArray(document.querySelector('.header__input').value)
              repaint(arrayStudentPaint)
              document.querySelector('.popup-change__form').reset()
              closePopupChange()
            }
          })
        }
      }else{
        document.querySelector('.popup-change__btn-submit').removeEventListener('click', async (e) => {
          changeStudentElement(e)
        })
      }
    }
    document.querySelector('.popup-change__btn-submit').addEventListener('click', async (e) => {
      changeStudentElement(e)
    })
    document.querySelector('.popup-change__btn-close').addEventListener('click', () => {
      document.querySelector('.popup-change__btn-submit').removeEventListener('click', async (e) => {
        changeStudentElement(e)
      })
    })
    document.addEventListener('click', (event) => {
      if(document.querySelector('.popup-change--active')){
        if(!(event.composedPath().includes(document.querySelector('.popup-change')))) {
          document.querySelector('.popup-change__btn-submit').removeEventListener('click', async (e) => {
            changeStudentElement(e)
          })
        }
      }
    })
  })
}

function popupDeleteActive(studentId) {
  document.querySelector('.overlay').classList.add('overlay--active')
  document.querySelector('.popup-delete').classList.add('popup-delete--active')
  document.querySelector('.popup-delete__btn-delete').addEventListener('click', () => {
    deleteStudent(studentId).then(studentList => {
      arrayStudentServer = studentList
      arrayStudentServer.sort((a, b) => a.id - b.id)
      searchInArray(document.querySelector('.header__input').value)
      repaint(arrayStudentPaint)
    })
    closePopupDelete()
  })

  document.querySelector('.popup-delete__btn-cancel').addEventListener('click', closePopupDelete)
  document.querySelector('.popup-delete__btn-close').addEventListener('click', closePopupDelete)
}

function createStudentElement(e) {
  e.preventDefault()
  if (formValidator('add')) {
    let contacts = []
    document.querySelectorAll('.contact__body').forEach((contactBody) => {
      let contact = new Contact(contactBody.querySelector('[aria-selected=true]').textContent, (contactBody.querySelector('[aria-selected=true]').textContent == 'Телефон') ? contactBody.querySelector('.contact__input').inputmask.unmaskedvalue() : contactBody.querySelector('.contact__input').value)
      contacts.push(contact)
    })
    createStudent(`${document.querySelector('.add-name').value.trim()}`, `${document.querySelector('.add-surname').value.trim()}`, `${document.querySelector('.add-middle-name').value.trim()}`, contacts).then(studentList => {
      if(!fetchError) {
        arrayStudentServer = studentList
        arrayStudentServer.sort((a, b) => a.id - b.id)
        searchInArray(document.querySelector('.header__input').value)
        repaint(arrayStudentPaint)
        document.querySelector('.popup-add__form').reset()
        closePopupAdd()
      }
    })
  }
}

function popupAddActive() {
  document.querySelector('body').style.overflow = 'hidden'
  document.querySelector('.overlay').classList.add('overlay--active')
  document.querySelector('.popup-add').classList.add('popup-add--active')

  document.querySelector('.popup-add__btn-close').addEventListener('click', closePopupAdd)
  document.querySelector('.popup-add__btn-cancel').addEventListener('click', closePopupAdd)
}

function buttonHiddenListeners(){
  document.querySelectorAll('.contact-student').forEach((contactSection) => {
    if(contactSection.querySelector('.contact__btn-hidden')){
      contactSection.querySelector('.contact__btn-hidden').addEventListener('click', ()=>{
        contactSection.querySelectorAll('.contact-hidden').forEach((contactHidden) => {
          contactHidden.style.display = 'inline-block'
        })
        contactSection.querySelector('.contact__btn-hidden').style.display = 'none'
      })
      document.addEventListener('click', (e)=> {
        if(contactSection.querySelector('.contact__btn-hidden').style.display == 'none'){
          if(!(e.composedPath().includes(contactSection))) {
            contactSection.querySelectorAll('.contact-hidden').forEach((contactHidden) => contactHidden.style.display = 'none')
            contactSection.querySelector('.contact__btn-hidden').style.display = 'inline-block'
          }
        }
      })
    }
  })
}

function repaint(arrayStudent) {
  tooltipId = 0
  document.querySelectorAll('.row-student').forEach((row) => {
    row.remove()
  })
  arrayStudent.forEach((student) => {
    let row = document.createElement('li')
    row.classList.add('row-student')
    let columnId = document.createElement('div')
    let columnName = document.createElement('div')
    let columnContacts = document.createElement('div')
    columnContacts.classList.add('contact-student')
    let columnActions = document.createElement('div')
    columnId.textContent = student.id
    columnName.textContent = `${student.surname} ${student.name} ${student.lastName}`
    let columnDate = dateSplit(student.createdAt)
    let columnChange = dateSplit(student.updatedAt)
    let contactsLength = student.contacts.length
    let contactHiddenCouter = 0
    let contactBtnDisplay = 'inline-block'
    let contactBtnClass = 'contact-vissible'
    student.contacts.forEach((element) => {
      let contact = document.createElement('button')
      switch (element.type) {
        case "Facebook":
          contact.style.backgroundImage = "url(/src/fb.svg)"
          break
        case "Vk":
          contact.style.backgroundImage = "url(/src/Vk.svg)"
          break;
        case "Email":
          contact.style.backgroundImage = "url(/src/mail.svg)"
          break
        case "Другое":
          contact.style.backgroundImage = "url(/src/Subtract.svg)"
          break
        default:
          contact.style.backgroundImage = "url(/src/phone.svg)";
      }
      contactsLength > 5 ? contactHiddenCouter++ : contactHiddenCouter
      if (contactHiddenCouter === 5) {
        let contactHiddenBtn = document.createElement('button')
        contactHiddenBtn.classList.add('contact__btn-hidden')
        contactHiddenBtn.textContent = `+${contactsLength - 4}`
        columnContacts.append(contactHiddenBtn)
        contactBtnDisplay = 'none'
        contactBtnClass = 'contact-hidden'
      }
      contact.classList.add('contact-tooltip', `tooltip-${tooltipId}`, contactBtnClass)
      contact.style.display = contactBtnDisplay
      columnContacts.append(contact)
      tooltipId++
    })
    let btnChange = document.createElement('button')
    let btnDelete = document.createElement('button')
    let btnChangeIcon = document.createElement('span')
    let btnChangeText = document.createElement('span')
    let btnDeleteIcon = document.createElement('span')
    let btnDeleteText = document.createElement('span')
    btnChangeText.textContent = 'Изменить'
    btnChange.classList.add('change-btn')
    btnChangeIcon.classList.add('change-btn__icon')
    btnDeleteText.textContent = 'Удалить'
    btnDelete.classList.add('delete-btn')
    btnDeleteIcon.classList.add('delete-btn__icon')
    btnChange.append(btnChangeIcon, btnChangeText)
    btnChange.addEventListener('click', () => {
      popupChangeActive(student.id)
    })
    btnDelete.append(btnDeleteIcon, btnDeleteText)
    btnDelete.addEventListener('click', () => { popupDeleteActive(student.id) })
    columnActions.append(btnChange, btnDelete)
    row.append(columnId, columnName, columnDate, columnChange, columnContacts, columnActions)
    document.querySelector('.client__list').append(row)
    tooltipCreator()
  })
  buttonHiddenListeners()
}

class Contact {
  constructor(type, value) {
    this.type = type
    this.value = value
  }
}

document.addEventListener("DOMContentLoaded", () => {
  adaptionArrayStudent()


  document.querySelector('.popup-add__btn-submit').addEventListener('click', async e => {
    createStudentElement(e)
  })

  document.querySelector('.overlay').addEventListener('click', (event) => {
    if(document.querySelector('.popup-add--active')){
      if(!(event.composedPath().includes(document.querySelector('.popup-add')))) {
        closePopupAdd()
      }
    }
  })

  document.querySelector('.overlay').addEventListener('click', (event) => {
    if(document.querySelector('.popup-delete--active')){
      if(!(event.composedPath().includes(document.querySelector('.popup-delete')))) {
        closePopupDelete()
      }
    }
  })

  document.querySelector('.overlay').addEventListener('click', (event) => {
    if(document.querySelector('.popup-change--active')){
      if(!(event.composedPath().includes(document.querySelector('.popup-change')))) {
        closePopupChange()
      }
    }
  })

  document.querySelector('.create__button').addEventListener('click', popupAddActive)

  document.querySelector('.popup-change__btn-contacts').addEventListener('click', () => {
    contactElementCreator('change')
  })

  document.querySelector('.popup-add__btn-contacts').addEventListener('click', () => {
    contactElementCreator('add')
  })

  labelActive('add')
  labelActive('change')

  sortOfPage()


  document.querySelector('.header__input').addEventListener('input', () => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      searchInArray(document.querySelector('.header__input').value)
      repaint(arrayStudentPaint)
    }, 300)
  })

})

