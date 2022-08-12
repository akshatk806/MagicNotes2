// If user add a note, add it to local storage
showNotes();

let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',(event)=>{
    let addTxt=document.getElementById('addTxt');
    let addTitle=document.getElementById('addTitle');
    let notes=localStorage.getItem('notes');       // notes is a string because everything in the localstorage is string
    if(notes==null){
        notesObj=[];         // Initilizing an Empty array
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    var globalTitle=addTitle.value;
    notesObj.push(myObj);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value="";
    addTitle.value="";
    showNotes();
}); 

// Function to show notes from localStorage
function showNotes(){
    let notes=localStorage.getItem('notes');
    console.log(notes);
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index){
        html+=`  <div class="noteCard card m-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
                        <button id="${index}" onclick="editNote(this.id)" class="btn btn-warning">Edit Note</button>
                    </div>
                  </div>
        `;
    });

    let notesElm=document.getElementById('notes');
    if(notesObj.length!=0){
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML=`Nothing to show! Use "Add a Note" section above to add notes. `;
    }
}

// Function to delete a note
function deleteNote(index){
    let confirmDelete=confirm("Do You really want to Delete this note");
    if(confirmDelete){
        console.log(index);
        let notes=localStorage.getItem('notes');
        if(notes==null){
            notesObj=[];
        }
        else{
            notesObj=JSON.parse(notes);
        }
        notesObj.splice(index,1);
        // updating localStorage after deleting
        localStorage.setItem('notes',JSON.stringify(notesObj))
        showNotes();
    }
}

let search=document.getElementById('searchBtn');
let searchTxt=document.getElementById('searchTxt');
search.addEventListener('click',function(event){
    event.preventDefault();
    console.log(searchTxt.value)
    searchTxt.value=searchTxt.value.toLowerCase();
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach((element)=>{
        let cardTxt=element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(cardTxt.includes(searchTxt.value)){
            element.style.display="block"
        }
        else{
            element.style.display="none";
        }
    })
})
searchTxt.addEventListener('blur',function(){
    console.log(searchTxt.value)
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach((element)=>{
        element.style.display="block";
    })
})

// Edit Note
function editNote(index){
    console.log(index);
    let cardTitle=document.getElementsByTagName('h5')[index].innerText;     
    console.log(cardTitle)
    let cardTxt=document.getElementsByClassName('card-text')[index];
    let html=cardTxt.innerHTML;
    cardTxt.innerHTML=`<textarea class="textarea" id="textarea" rows=3>${html}</textarea>`;
    let textarea=document.getElementById('textarea');
    // console.log(textarea.value)
    textarea.addEventListener('blur',function(){
        cardTxt.innerHTML=textarea.value;
        console.log(typeof textarea.value);
        let notes=localStorage.getItem('notes');
        // console.log(notes);
        if(notes==null){
            notesObj=[];       
        }
        else{
            notesObj=JSON.parse(notes);
        }
        console.log(notesObj)
        let myObj={
            title:cardTitle,
            text:textarea.value
        }
        notesObj.splice(index,1,myObj)
        // notesObj.insert(index,myObj);
        console.log(notesObj)
        localStorage.setItem('notes',JSON.stringify(notesObj));
        showNotes();
    })
}