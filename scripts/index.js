class Carusel {
  constructor(image='.testimonial-image', author = '.testimonial-author', text='.testimonial-text'){
    this.imageBlock = document.querySelector(image);
    this.author = document.querySelector(author);
    this.text = document.querySelector(text)
    this.testimonials = [];
    this.lastTestimonial = null;
    this.setTestimonials();
    this.setStartTestimonial();
    this.listenEvents();
  }

  setTestimonials(){
    let testimonials = [
      {
        author: "Myron Campbell", 
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime beatae maiores ipsa consequuntur soluta corrupti repellendus velit iste aliquid labore? Ex ipsam ut laudantium molestias doloribus explicabo quasi labore voluptatum!',
        image: './images/ava1.jpg'
      },
      {
        author: 'Peter Owen',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit cumque quod dolore consequatur eum voluptates reprehenderit quisquam explicabo a culpa debitis harum repellat architecto voluptas voluptatibus distinctio, excepturi delectus impedit.',
        image: './images/ava2.jpg'
      },
      {
        author: 'Elmer Mitchell',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque similique quo sit omnis deserunt repudiandae voluptas in alias placeat hic iure voluptatem nam natus ipsum, enim minus! Id, labore officia.',
        image: './images/ava3.jpg'
      }
    ]
    for (let val of testimonials){
      this.testimonials.push(val)
    }
  }

  setStartTestimonial(){
    let startTestimonial = this.testimonials[0]
    this.imageBlock.style.backgroundImage = `url(${startTestimonial.image})`;
    this.author.textContent = startTestimonial.author;
    this.text.textContent = startTestimonial.text;
    this.lastTestimonial = 0; // Сохраняем индекс текущего отзыва
  }
  listenEvents(){
    let right = document.querySelector('.fa-chevron-circle-right');
    let left = document.querySelector('.fa-chevron-circle-left');
    left.addEventListener('click', (event) => this.switch(event))
    right.addEventListener('click', (event) => this.switch(event))
  }
  switch(event){
    let currentIdx;
    if (event.target.dataset.arrow == 'right'){
      currentIdx = this.lastTestimonial+1;
      if (currentIdx >= this.testimonials.length){
        currentIdx = 0;
      }
    }else {
      currentIdx = this.lastTestimonial-1;
      if (currentIdx < 0){
        currentIdx = this.testimonials.length - 1;
      }
    }
    let currentTestim = this.testimonials[currentIdx];
    this.imageBlock.style.backgroundImage = `url(${currentTestim.image})`;
    this.author.textContent = currentTestim.author;
    this.text.textContent = currentTestim.text;
    this.lastTestimonial=currentIdx;
  }
  
}

class Timer {
  constructor(time = '00:15:00', timerBlock = '.timer'){
    this.time = time;
    this.timerBlock = document.querySelector(timerBlock);
    this.setTimer();
    this.startTimer()
  }
  setTimer(){
    this.timerBlock.textContent = this.time;
  }
  startTimer(){
    let hours = this.transformTime(this.time).hours
    let minutes = this.transformTime(this.time).minutes
    let seconds = this.transformTime(this.time).seconds
    setInterval(() => {
      if (seconds > 0 || minutes > 0 || hours > 0){
        seconds -= 1;
        if (seconds < 0 && minutes > 0){
          seconds = 59;
          minutes -= 1;
        }else if (minutes < 0 && hours > 0){
          minutes = 59;
          hours -= 1;
        }else if (seconds < 0 && minutes == 0 && hours > 0){
          seconds = 59;
          minutes = 59;
          hours-=1;
        }
      }else {
        clearInterval()
      }
      if (this.numberLessThanTen(hours)){
        hours = `0${hours}`
      }
      if (this.numberLessThanTen(minutes)){
        minutes = `0${minutes}`
      }
      if(this.numberLessThanTen(seconds)){
        seconds=`0${seconds}`
      }
      this.timerBlock.textContent = `${hours}:${minutes}:${seconds}`
    }, 1000)
  }
  numberLessThanTen(timeItem){
    timeItem = String(timeItem)
    if (!timeItem.match(/^[0-9]{2}$/i)){
      return true
    }else{
      return false
    }
  }
  transformTime(time){
    let transformedTime = time.split(':')
    let hours = transformedTime[0]
    let minutes = transformedTime[1];
    let seconds = transformedTime[2];
    return {
      hours,
      minutes,
      seconds, 
    }
  }
}

class formControl {
  constructor(tel = 'tel', name='name', submitBtn = 'submit-btn'){
    this.tel = document.getElementById(tel);
    this.name = document.getElementById(name)
    this.submitBtn = document.getElementById(submitBtn)
    this.listenEvents()
  }
  listenEvents(){
    this.tel.addEventListener('keypress', (event) => this.checkInput(event));
    this.tel.addEventListener('keydown', (event) => this.controlInputEdit(event));
    this.tel.addEventListener('focus', (event) => this.setNumberStart(event))
    this.tel.addEventListener('blur', (event) => this.removeNumberStart(event))
    this.submitBtn.addEventListener('click', (event) => this.handleFormSend(event))
  }
  checkInput(event){
    if (event.keyCode < 48 || event.keyCode > 57)
    event.returnValue = false;
  }
  controlInputEdit(event){
    let tel = document.getElementById('tel');
    if(event.keyCode == 8){
      if (tel.value == '+7')
      event.returnValue = false;
    }
  }
  handleFormSend(event){
    if(document.querySelector('.name-error')){
      document.querySelector('.name-error').remove()
    }
    if(document.querySelector('.tel-error')){
      document.querySelector('.tel-error').remove()
    }
    if (!this.validName(this.name.value) || !this.validTel(this.tel.value)){
      event.preventDefault()
      this.handleFormSendErrors(this.name.value, this.tel.value)
    }
  }
  handleFormSendErrors(name, tel){
    if (!this.validName(name) && !this.validTel(tel)){
      this.renderNameError()
      this.renderTelError()
    }else if (!this.validName(name)){
      this.renderNameError()
    }else {
      this.renderTelError()
    }
  }
  renderNameError(){
    let inputBlock = document.querySelector('.name-wrapper')
    let error = document.createElement('span');
    error.classList.add('name-error');
    error.textContent = 'Неверный формат имени';
    inputBlock.insertAdjacentElement('beforeend', error)
    setTimeout(()=> {
      error.remove()
    }, 2000)
  }
  renderTelError(){
    let inputBlock = document.querySelector('.tel-wrapper')
    let error = document.createElement('span');
    error.classList.add('tel-error');
    error.textContent = 'Неверный формат телефона';
    inputBlock.insertAdjacentElement('beforeend', error)
    setTimeout(()=> {
      error.remove()
    }, 2000)
  }
  validName(name){
    return name.match(/^[a-zA-Zа-яА-Я]{2,15}$/i) ? true : false;
  }
  validTel(tel){
    return tel.length === 12 ? true : false;
  }
  setNumberStart(event){
    if (event.target.value == ''){
      event.target.value = '+7'
    }
  }
  removeNumberStart(event){
    if (event.target.value == '+7'){
      event.target.value = ''
    }
  }
}

class scrollToForm {
  constructor(){
    this.listenEvents()
  }
  listenEvents(){
    const buttons = document.querySelectorAll('.order-btn');
    for (let button of buttons){
      button.addEventListener('click', (event) => this.scroll(event))
    }
  }
  scroll(event){
    event.preventDefault()
    const blockID = event.target.getAttribute('href').substr(1)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

new Carusel();
new Timer();
new formControl();
new scrollToForm();