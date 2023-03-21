<?php
//plugin header information
/*
Plugin Name: Modal Form Plugin
Plugin URI: http://www.example.com
Description: This plugin creates an opt-in modal form
Version: 1.0
Author: Luis Hernandez Pinillo 
Author URI: http://www.example.com 
License: GPL2
*/


// Register and enqueue the modal form style
add_action('wp_enqueue_scripts', 'modal_form_scripts');
function modal_form_scripts(){
    wp_register_style('modal_form_style', plugins_url('modal-form-plugin/assets/css/modal-form.css'));
    wp_enqueue_style('modal_form_style');
}

// Add a shortcode to display the modal form
add_shortcode('modal_form', 'modal_form_shortcode');
function modal_form_shortcode(){
    $form = '<div class="modal-form">
        <div id="modal_form_content">
            <h2>PrUnderground Newsletter</h2>
            <hr>
            <form id="modal_form" action="" method="POST">
                <input type="text" name="nl-name" id="name" class="required" aria-label="your name" placeholder="Your Name">
                <input type="email" name="nl-email" id="email" class="required" aria-label="your email" placeholder="Email Address">
                <input type="submit" name="btnSubmit" value="Signup">
            </form>
        </div>
    </div>';
    return $form;
}

//to-do callback function to submit the form data to the newsletter table
function modal_form_callback(){
    global $wpdb;
    $table_name = $wpdb->prefix . 'newsletter';
    $name = $_POST['name'];
    $email = $_POST['email'];
    $wpdb->insert($table_name, array('name' => $name, 'email' => $email));
    wp_die();
}

// Add the modal form to the footer of the site
add_action('wp_footer', 'modal_form');
function modal_form(){
    $form = do_shortcode('[modal_form]');
    echo $form;
    wp_enqueue_script('modal-form-script', plugins_url('assets/js/modal-form.js', __FILE__), '', '1.0.0', true );
    wp_localize_script('modal-form-script', 'ajax_object', array('ajax_url' => admin_url('admin-ajax.php')) );
}

// Submit the form data to the newsletter table if exists in the database
add_action('wp_ajax_nopriv_modal_form_submit', 'modal_form_callback');
add_action('wp_ajax_modal_form_submit', 'modal_form_callback');