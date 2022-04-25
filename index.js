console.log("Hello World");
// "Todos"
// 1.Store  all the date to the localStorage
// 2.Give another colum as an option to delete the box 
// 3.add a scroll bar to the view


//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor
function Display() {

}

//Add method to display prototype
Display.prototype.add = function (book) {
    console.log('Adding to UI');
     tableBody = document.getElementById('tableBody');
    let uiString = `
                    <tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>
             `;
    tableBody.innerHTML += uiString;
}

// Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}


// Implement the validation  function
Display.prototype.validate= function (book) {
    if(book.name.length<2||book.author.length<2){
        return false;
    }
    else{
        return true;
    }
}
Display.prototype.show= function (type,displayMessage) {
    let message = document.getElementById('message')
    message.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>message:</strong> ${displayMessage}.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                <span aria-hidden = "truer>&times;</span>
                </button>
        </div>
    `
    setTimeout(() => {
        message.innerHTML = '';
    }, 2000);
}

// add sumbit event listener to for libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;

    }
    else if (programming.checked) {
        type = programming.value;

    }
    else if (cooking.checked) {
        type = cooking.value;

    }
    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('succes',"Your book is succesfully added");

    }
    else{
        display.show('danger',"Sorry you can not add this book");
    }
    e.preventDefault();
}
