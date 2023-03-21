class formHandler {
  //read cookie newsletter form submitted and show form if not submitted

  //constructor
  constructor() {
    this.readCookie();
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
  //read cookie newsletter form submitted
  readCookie() {
    var name = "newsletter_form_submitted=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {   
            this.closeModal();         
            return c.substring(name.length, c.length);
            
        }else{
            this.showModal();
        }
    }
    return "";
}
//show modal form
showModal() {
    document.querySelector('.modal-form').style.display = 'block';
}
//close modal form
closeModal() {
    document.querySelector('.modal-form').style.display = 'none';
}


//form submit handler



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
          // set cookie for newsletter form submitted
          document.cookie = "newsletter_form_submitted=true; expires="+ new Date(Date.now() + 86400000) + "; path=/" ;

          // Close modal
         document.querySelector('.modal-form').style.display = 'none';
      }
  }
  
}

new formHandler();