const form = document.querySelector('#form');
const noteContainer = document.querySelector('.notes-container');
const modalContainer = document.querySelector('.modal-container');

// add class
class Note {
  constructor(body) {
    this.body = body;
  }
}

//event listeners
form.addEventListener('submit', onSubmit);
noteContainer.addEventListener('click', showBtn);
modalContainer.addEventListener('click', removeBtn);

//functions
function showBtn(e) {
  if (e.target.classList.contains('view-button')) {
    const currentNote = e.target.closest('.notes');
    const currentBody = currentNote.querySelector('.note-text').textContent;
    showModal(currentBody);
  }

  if (e.target.classList.contains('del-button')) {
    if (confirm('Are you sure?')) {
      const currentNote = e.target.closest('.notes');
      currentNote.remove();
    }
  }
}

//add note to list
function addNoteToList(note) {
  const newUiNote = document.createElement('div');
  newUiNote.classList.add('notes');

  newUiNote.innerHTML = `<h3 class="note-title">Note</h3>
                          <p class = "note-text">${note.body}</p>
                          <div class = "btns">
                          <button class="d-button view-button">view details</button>
                          <button class="d-button del-button">delete note</button>
                          </div>`;

  noteContainer.appendChild(newUiNote);
}

function onSubmit(e) {
  e.preventDefault();
  const input = document.querySelector('#text');
  const placeHolder = document.querySelector('.placeholder');

  // if field is empty
  if (input.value === '') {
    input.style.border = '2px solid red';

    setTimeout(() => (input.style.border = ''), 2000);
  }

  // if field is not empty
  else {
    placeHolder.style.display = 'none';
    // create new note
    const newNote = new Note(input.value);
    addNoteToList(newNote);

    //clear field
    input.value = '';
    //focus field
    input.focus();
  }
}

// showModal
function showModal(body) {
  const modalBody = document.querySelector('.modal-text');
  modalBody.textContent = body;
  modalContainer.classList.add('active');
}

// remove modal
function removeBtn(e) {
  if (e.target.classList.contains('modal-btn')) {
    modalContainer.classList.remove('active');
  }
}
