import $ from 'jquery';


class Messenger {

  constructor() {
    this.fadeOutTime = 1500;
    this.fadeInTime = 1500;
  }

  static messageStyle(color) {
    return `padding: 20px;
            background-color: ${color};
            color: white;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 2147483647;
            width: auto;
            text-align: center;
            border-radius: 7px;`;
  }

  static createMessage(text, color) {
    const message = document.createElement('div');
    message.style = Messenger.messageStyle(color);
    message.textContent = text;
    return message;
  }

  success(text = 'success') {
    const success = Messenger.createMessage(text, 'rgb(54, 157, 22)');
    document.body.appendChild(success);
    $(success).fadeIn(this.fadeInTime, () => {
      $(success).fadeOut(this.fadeOutTime, () => success.parentNode.removeChild(success));
    });
  }

  fail(text = 'fail') {
    const fail = Messenger.createMessage(text, 'rgb(255, 0, 0)');
    document.body.appendChild(fail);
    $(fail).fadeIn(this.fadeInTime, () => {
      $(fail).fadeOut(this.fadeOutTime, () => fail.parentNode.removeChild(fail));
    });
  }

}

export default Messenger;
