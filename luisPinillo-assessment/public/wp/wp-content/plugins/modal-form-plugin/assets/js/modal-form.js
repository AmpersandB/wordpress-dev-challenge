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
      
      if (this.form.querySelectorAll('.error').length === 0) {
          // AJAX request
          let xhr = new XMLHttpRequest();
          var name = document.getElementById('name').value;
          var email = document.getElementById('email').value;
          var action = 'modal_form_callback';
          
          //let formData  = new FormData(this.form);
          let formData  = 'action='+ action +'&nl-name=' + name + '&nl-email=' + email
          
          xhr.open('POST', ajax_object.ajax_url, true);
          console.log(ajax_object.ajax_url);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onload = function () {
              if (this.status === 200) {
                  // Success message
                  console.log('Success');
              } else {
                  // Error message
                  console.log('Error');
              }
          };
          xhr.send( formData);
          
          // Close modal
         document.querySelector('.modal-form').style.display = 'none';
      }
  }
  
}

new formHandler();