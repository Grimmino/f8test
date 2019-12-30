//show/hide popup
let modal = document.querySelector('.modal')
let modalToggler = document.querySelector('.btn__modal')
let closeModal = document.querySelector('.modal__close')

modalToggler.addEventListener('click', function() {
    modal.classList.toggle('modal--show')
})

function hideModal() {
    modal.classList.remove('modal--show')
}

closeModal.addEventListener('click', function() {
    hideModal()
})


//form
let formElem = document.querySelector('.form')
let formLabel = formElem.querySelectorAll('.form__label:not(.form__label_checkbox)')

//form-dropdown
let formDropDownItem = formElem.querySelectorAll('.form__dropdown__item')

formDropDownItem.forEach(item => {
    item.addEventListener('click', function() {
        let input = item.closest('.form__label').querySelector('.form__input')
        input.value = item.textContent
        input.classList.add('form__input--focus')
    })
})


formLabel.forEach((item) => {
    item.querySelector("input").addEventListener("input", function(e) {
        e.target.value != '' ? e.target.classList.add('form__input--focus') : e.target.classList.remove('form__input--focus')
        formDropDownItem.forEach(item => {
            item.textContent.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 
                ? item.classList.remove('form__dropdown__item--hide') 
                : item.classList.add('form__dropdown__item--hide') 
        })
    })
})

function inputValid(item) {
    item.classList.contains('error') ? item.classList.remove('error') : null
    item.classList.add('valid')
}
function inputInvalid(item) {
    item.classList.contains('valid') ? item.classList.remove('valid') : null
    item.classList.add('error')
}

//form validation
formElem.addEventListener('submit', (e) => {
    e.preventDefault()

    formLabel.forEach(item => {

        let input = item.querySelector("input")

        switch(input.type) {
            case "text":
            case "date":
                input.value != '' ? (inputValid(item),false) : inputInvalid(item)
                break
            case 'email':
                input.value != '' && /\w*@\w*\.\w*/.test(input.value) ? (inputValid(item),false) : inputInvalid(item)
                break
        }
    })

    return false
})