class formHandler {
  constructor() {
      this.form = document.getElementById('modal_form');
      this.formFields = this.form.querySelectorAll('.required');
      this.events();
  }
  events() {
      this.form.addEventListener('submit', e => {
          this.formSubmitHandler(e);
      });
      
  }
  //methods
  formSubmitHandler(e) {
      e.preventDefault();
      let fields = this.formFields;
      fields.forEach(el => {
          el.classList.remove('error');
          if (el.value === '') {
              el.classList.add('error');
              el.setAttribute('placeholder', 'This field is required');
          }
      });
      // to-do on send ajax request

  }
  
}

new formHandler();