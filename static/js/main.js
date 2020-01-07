/* eslint-disable no-undef */
const popupOpenday = document.querySelector('[data-modal="openday"]')
const popupOpendayShow = document.querySelector('[data-modal="openday-show"]')
const popupOpendayClose = popupOpenday.querySelector('[data-modal="openday-close"]')

popupOpendayShow.addEventListener('click', actionModal)
popupOpendayClose.addEventListener('click', actionModal)


function actionModal() {
    popupOpenday.classList.toggle('modal--show')
}

const formOpenday = popupOpenday.querySelector('[data-modal="openday-form"]')
const formOpendayLabel = formOpenday.querySelectorAll('[data-modal="openday-form-field"]')


formOpendayLabel.forEach(field => {
    if(field.querySelector('.form__input_select')) {
        field.classList.add('form__label--focus')
    }
})

formOpendayLabel.forEach(field => {
    field.querySelector('.form__input').addEventListener('input', function(e) {
        e.target.value != '' ? field.classList.add('form__label--focus') : field.classList.remove('form__label--focus')
    })
})

function inputValid(field) {
    field.classList.contains('error') ? field.classList.remove('error') : null
    field.classList.add('valid')
}
function inputInvalid(field) {
    field.classList.contains('valid') ? field.classList.remove('valid') : null
    field.classList.add('error')
}

formOpenday.addEventListener('submit', (e) => {
    e.preventDefault()

    formOpendayLabel.forEach(field => {
        let input = field.querySelector('.form__input')

        if(input.value != '') {
            inputValid(field)
        } else {
            inputInvalid(field)
            return false
        }
    })

    let obj = {}
    let formData = new FormData(formOpenday)
    formData.append('id', Math.random())
    
    formData.forEach((value, key) => {
        obj[key] = value
    })

    postResource('/', obj)
        .then(response => console.log(response))
        .catch(err => console.error(err))
})

async function postResource(url, data) {
    const res = await fetch (`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    return await res.json()
}