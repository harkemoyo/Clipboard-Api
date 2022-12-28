 //Over HTTPS only (or localhost)
        //Only on active tabs
        //Permissions for read and write are required
        
        //Get permission to access clipboard
        navigator.permissions.query({
            name: 'clipboard-read',
            name: 'clipboard-write'
        }).then(permissionStatus => {
          // Will be 'granted', 'denied' or 'prompt':
          console.log(permissionStatus.state);
          // Listen for changes to the permission state
          permissionStatus.onchange = () => {
            console.log('Clipboard Permission State:', permissionStatus.state);
          };
        });
        
        //select the <pre> element's code
        //this would be wrapped in the button click listener function
        let pre = document.querySelector('pre');
        const input = document.createElement('input');
        document.body.appendChild(input);
     
        input.focus();
        input.select();
        navigator.clipboard.writeText(pre.textContent)
        .then(() => {
            console.log('Copied to clipboard');
        })
        .catch(err => {
            // This can happen if the user denies clipboard permissions:
            console.error('Could not copy text: ', err);
        });
        
        //Retrieve what was in the clipboard
        navigator.clipboard.readText()
        .then(text => {
            console.log('Content in Clipboard is: ', text);
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
        
        //Add listener for the paste event
        document.addEventListener('paste', ev => {
            //ev.preventDefault(); //<-- if you don't want the actual paste
            
            navigator.clipboard.readText().then(text => {
                console.log('Pasted text: ', text);
            });
        });




// document.addEventListener('DOMContentLoaded', () =>{
//  ['cut','copy','paste'].forEach(function(event){
//     document.addEventListener(event,function(ev){
//         console.log(event);
//         if (ev.type == 'paste'){
//             console.log(ev.clipboardData.getData('text'));
//         }
//     });
//  });
//  let pre = document.querySelector('pre');
//             pre.addEventListener('copy', (ev)=>{
//                 ev.preventDefault();
//                 ev.stopPropagation();
//                 console.log(ev.target);
//                 console.log('COPIED\n', pre.textContent);
//             });
//             document.getElementById('btnCopy').addEventListener('click', (ev)=>{
//                 let pre = document.querySelector('pre');
//                 let text = pre.textContent;
//                 const input = document.createElement('input');
//                 document.body.appendChild(input);
//                 input.value = text;
//                 input.focus();
//                 input.select();
//                 const result = document.execCommand('copy');
//                 if (result === 'unsuccessful') {
//                     console.error('Failed to copy text.');
//                 }
//             });
// });