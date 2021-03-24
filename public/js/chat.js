const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const chatWith = get(".chatWith");
const typing = get(".typing");
const chatStatus = get(".chatStatus");
const chatId = window.location.pathname.substr(6);
let authUser;
let typingTimer = false;

msgerForm.addEventListener("submit", event => {

  event.preventDefault();

  const msgText = msgerInput.value;

  if (!msgText) return;

  axios.post('/message/sent', {
    message: msgText,
    chat_id: chatId
  }).then( res => {

    let data = res.data;

    appendMessage(
      data.user.name,
      PERSON_IMG,
      'right',
      data.content,
      formatDate(new Date(data.created_at))
    );

  }).catch( error => {

    console.log('Ha ocurrido un error');
    console.log(error);

  });

  msgerInput.value = "";
});



function appendMessage(name, img, side, text, date) {

  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${date}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);

  scrollToBottom();
}

Echo.join(`chat.${chatId}`).listen('MessageSent', (e) => {
    
  console.log(e);

});


// Utils
  function get(selector, root = document) {
    return root.querySelector(selector);
  }

  function formatDate(date) {

    const d = date.getDate();
    const mo = date.getMonth() + 1;
    const y = date.getFullYear();
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${d}/${mo}/${y} ${h.slice(-2)}:${m.slice(-2)}`;
    
  }

  function scrollToBottom()
  {
    msgerChat.scrollTop = msgerChat.scrollHeight;
  }