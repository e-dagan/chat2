let socket = io();
let namebox = document.getElementById('name');
let chatbox = document.getElementById('chat');
let messagebox = document.getElementById('message');
let sendButton = document.getElementById('send');

let colors = ['#32edf0','#445c3e','#98f3fa', '#539edb','#4fed2f', '#fab025', '#2212ff', '#edd926', '#ed264a','#9b22e6','#ed47dd','#57e6aa','#761cd6','#e8563c','#27660a','#56fcf4'];
let random_color = colors[Math.floor(Math.random() * colors.length)];
document.getElementById('chat').style.color = random_color;
// li.element.setAttribute(color, )

let color_for_user = {};

sendButton.addEventListener('click' , ()=>{
  console.log("clicked!");
  let name = namebox.value.trim();
  if(name == ""){
    name = "anonymous";
    namebox.value = '';

  }
  console.log("name is: ", name)

  let message = messagebox.value.trim();
  console.log(message);
  if(message != ""){
    let data = {name: name, message: message}

    socket.emit('message' , data);
    console.log(data);
  }
  messagebox.value = "";
})

socket.on('incoming', (data)=>{
  console.log(data);
  let name = data.name;
  let message = data.message;
  let li = document.createElement("li");
  let p = document.createElement("p");
  p.innerHTML = "<span class='sender'>"+name+":</span> " + message;

  // try to find which color the user had
  if (!color_for_user[name]) {
    let random_color = colors[Math.floor(Math.random() * colors.length)];
    color_for_user[name] = random_color;
  }
  p.style.color = color_for_user[name];

  li.appendChild(p);
  chatbox.appendChild(li);
  chatbox.scrollTop = chatbox.scrollHeight;
});

//from: https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// Get the input field

// Execute a function when the user releases a key on the keyboard
messagebox.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    //  event.preventDefault();
    // Trigger the button element with a click
    sendButton.click();
  }
});
