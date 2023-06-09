const inputElement = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')

const taskContainer = document.querySelector('.task-container')

const validateInput = () => inputElement.value.trim().length > 0

const handleaddTask = () => {
    const inputIsValid = validateInput()

    if(!inputIsValid) {
        return inputElement.classList.add("error")
    }

    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskContent = document.createElement('p')

    taskContent.innerText = inputElement.value

    taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteItem = document.createElement('i')
    deleteItem.classList.add('far')
    deleteItem.classList.add('fa-trash-can')

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)

    taskContainer.appendChild(taskItemContainer)

    inputElement.value = ""

    updateLocalStorage()
}

const handleClick = (taskContent) => {
    const tasks = taskContainer.childNodes
    
    for (const task of tasks ) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        
        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle('completed')
        }
    }
    updateLocalStorage()
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = taskContainer.childNodes

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        
        if (currentTaskIsBeingClicked)
        taskItemContainer.remove()
    }
    updateLocalStorage()
}

const handleInputChange = () => {
    const inputIsValid = validateInput()

    if (inputIsValid) {
        return inputElement.classList.remove("error")
    }
}

const updateLocalStorage = () => {
    const task = taskContainer.childNodes

    const localStorageTasks = [...task].map(task => {
        const content = task.firstChild
        const isCompleted = content.classList.contains('completed')

        return { description: content.innerText, isCompleted }
    })
    
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}

const refreshTasksUsingLocalStorage = () => {
    const taskFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

    if (!taskFromLocalStorage) return

    for (const task of taskFromLocalStorage) {
        const taskItemContainer = document.createElement('div')
        taskItemContainer.classList.add('task-item')
    
        const taskContent = document.createElement('p')
        taskContent.innerText = task.description
        
        if(task.isCompleted) {
            taskContent.classList.add('completed')
        }
    
        taskContent.addEventListener('click', () => handleClick(taskContent))
    
        const deleteItem = document.createElement('i')
        deleteItem.classList.add('far')
        deleteItem.classList.add('fa-trash-can')
    
        deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent))

        taskItemContainer.appendChild(taskContent)
        taskItemContainer.appendChild(deleteItem)

        taskContainer.appendChild(taskItemContainer)
    }
}

refreshTasksUsingLocalStorage()
 
addTaskButton.addEventListener("click", () => handleaddTask())

inputElement.addEventListener("Change", () => handleInputChange())