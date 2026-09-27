let newX = 0, newY = 0, newZ = 0; /*values for calculating position*/
let latestnote = null 
let startX, startY;

const colors = ["#36d36a", "#7cd784", "#19793c", "#5eb25f"];

const bulletin = document.querySelector('.bulletin') /* the board notes must stay inside */

function duplicate(e){ /*functionnality*/
    latestnote = e.target;  /*target*/
    startX = e.clientX /*gives current mouse position*/
    startY = e.clientY

    document.addEventListener('pointermove', duplicateMove) /*tracks position of mouse*/
    document.addEventListener('pointerup', duplicateUp) /*listen to removing mouse and stops mousemove event */
}

function duplicateMove(e){

    newX = startX - e.clientX /*calculates position*/
    newY = startY - e.clientY

    startX = e.clientX /*starts at  new position when dropped*/
    startY = e.clientY

    let newTop = latestnote.offsetTop - newY
    let newLeft = latestnote.offsetLeft - newX

    /* boundaries: at most half the note can hang outside the bulletin */
    const minLeft = bulletin.offsetLeft - (latestnote.offsetWidth / 6) //calculates left edge by seeing where it starts//
    const maxLeft = bulletin.offsetLeft + bulletin.offsetWidth - (latestnote.offsetWidth / 1.5) //calculates right edge by adding the width of bulletin then seeing where it starts//
    const minTop = bulletin.offsetTop - (latestnote.offsetHeight / 6)
    const maxTop = bulletin.offsetTop + bulletin.offsetHeight - (latestnote.offsetHeight / 1.5)

    newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft)) /* clamp left */
    newTop = Math.max(minTop, Math.min(newTop, maxTop)) /* clamp top */

    latestnote.style.top = newTop + 'px'
    latestnote.style.left = newLeft + 'px'
}

function duplicateUp(e){
    document.removeEventListener('pointermove', duplicateMove)
}

/*duplicating notepads*/

const anchor = document.getElementById('anchornote')
anchor.addEventListener('pointerdown', addclone) 

function addclone(e){
const clonedNote = anchor.cloneNode(true)
clonedNote.removeAttribute('id'); /*so not every notepad moves*/
clonedNote.className = 'draggable';  

clonedNote.style.top = anchor.offsetTop + 'px'; /* spawn it at anchor's position */
clonedNote.style.left = anchor.offsetLeft + 'px';

document.body.appendChild(clonedNote);
 clonedNote.addEventListener('pointerdown', duplicate)

clonedNote.addEventListener('click', edit)

const randomColor =Math.floor(Math.random()*4);
clonedNote.style.backgroundColor = colors[randomColor];
anchor.style.backgroundColor = colors[randomColor];

function edit(e){
    e.target.contentEditable = true;
    console.log('edit/dblclick fired');
}

latestnote = clonedNote; /* the drag should follow the note we just made, not whatever e.target originally was */
startX = e.clientX; /* start tracking from the current press position */
startY = e.clientY;

document.addEventListener('pointermove', duplicateMove) /* kick off the drag immediately, no second press needed */
document.addEventListener('pointerup', duplicateUp)
}