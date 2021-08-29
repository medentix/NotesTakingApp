console.log("welcome in app.js");
showNotes();
let addButton = document.getElementById('addButton');
addButton.addEventListener("click", function (e) {

    let addtxt = document.getElementById('addTextArea');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtxt.value = "";
    console.log(notesObj);

    showNotes();
});

//function to show elements from text Area.
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj= JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html +=
            `<div class="col-sm-3">
                <div class="notecard text-white bg-danger mb-3" style="max-width: 18rem;" id="">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text">${element}</p>
                        <Button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</Button>
                    </div>
                </div>
            </div>`;
    });

    let notesElem = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerHTML = `Nothing to show. Add a note`;
    }
}


//function to delete note

function deleteNote(index){
    console.log("i'm deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputval = search.value.toLowerCase();
    console.log("Input fired.",inputval);

    let noteCards = document.getElementsByClassName('notecard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputval)){
                element.style.display = "blcok";
        }
        else{
            element.style.display = "none";
        }
    });

});

//this app is not responsive
//search button is not working fine.
//delete button is also not working fine

//add some more features...
//pin important notes on top
//separate notes by user
//sync and host to web server
