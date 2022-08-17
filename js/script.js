// Seleção de elementos
const toDoForm = document.querySelector('#to-do-form')
const toDoInput = document.querySelector('#to-do-input')
const toDoList = document.querySelector('#to-do-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelBtn = document.querySelector('#cancel-edit-btn')

let oldInpuValue

// Funções
function saveToDo(text) {
    const toDo = document.createElement('div')
    toDo.classList.add('to-do')

    const toDoTitle = document.createElement('h3')
    toDoTitle.innerText = text
    toDo.appendChild(toDoTitle)

    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-to-do')
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    toDo.appendChild(doneBtn)

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-to-do')
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    toDo.appendChild(editBtn)

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('remove-to-do')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    toDo.appendChild(deleteBtn)

    toDoList.appendChild(toDo)

    toDoInput.value = ''
    toDo.focus()
}   

function toggleForm() {
    editForm.classList.toggle('hide')
    toDoForm.classList.toggle('hide')
    toDoList.classList.toggle('hide')
}

function updateToDo(text) {

    const toDos = document.querySelectorAll('.to-do')

    toDos.forEach((toDo) => {

        let toDoTitle = toDo.querySelector('h3')

        if(toDoTitle.innerText === oldInpuValue){
            toDoTitle.innerText = text
        }

    })

}


// Eventos
toDoForm.addEventListener('submit', function(e){
    e.preventDefault()

    // console.log('Enviou form')

    const inputValue = toDoInput.value
    if(inputValue) {
        // console.log(inputValue)
        saveToDo(inputValue)
    }

})

cancelBtn.addEventListener('click', function(e) {
    e.preventDefault()

    toggleForm()
})

//mapear bottão
document.addEventListener('click', function(e){
    const targetEl = e.target
    const parentEl = targetEl.closest('div')
    let itemTitle

    if(parentEl && parentEl.querySelector('h3')){
        itemTitle = parentEl.querySelector('h3').innerText
    }

    if(targetEl.classList.contains('finish-to-do')){
        // console.log("clicou em finalizar")
        parentEl.classList.toggle('done')
    }

    if(targetEl.classList.contains('remove-to-do')){
        parentEl.remove()
    }

    if(targetEl.classList.contains('edit-to-do')){
        // console.log('editou')
        toggleForm()

        editInput.value = itemTitle
        oldInpuValue = itemTitle
    }

})

editForm.addEventListener('submit', function(e){
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue) {
        //atualizar
        updateToDo(editInputValue)
    }

    toggleForm()

})