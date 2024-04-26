
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Basic spam protection: Check if the form fields are not empty
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['contact']) || empty($_POST['message'])) {
        // Handle empty fields
        echo "Please fill in all required fields.";
        exit;
    }

    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $contact = $_POST['contact'];
    $subject = isset($_POST['subject']) ? $_POST['subject'] : 'No Subject';
    $message = $_POST['message'];

    // Construct email message
    $to = "prasannauixdesigner@gmail.com";
    $subject = "New Message from Contact Form: $subject";
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Contact: $contact\n";
    $body .= "Message: \n$message";

    // Send email
    $headers = "From: $email";
    if (mail($to, $subject, $body, $headers)) {
    echo '<script>alert("Message sent successfully.");</script>';
    // Redirect to homepage
    echo '<script>window.location.replace("/Public/Contact.html");</script>';
    } else {
    echo '<script>alert("Failed to send message. Please try again later.");</script>';
    }
} else {
    // Redirect if accessed directly
    header("Location: /Public/Contact.html"); // Redirect to homepage or appropriate page
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $captcha_response = $_POST['g-recaptcha-response'];
    $secret_key = '6Ldj1JopAAAAAAgbws9qTA0kT2d6f8NN2w1XI_rK';

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = array(
        'secret' => $secret_key,
        'response' => $captcha_response
    );

    $options = array(
        'http' => array (
            'method' => 'POST',
            'content' => http_build_query($data)
        )
    );

    $context  = stream_context_create($options);
    $verify = file_get_contents($url, false, $context);
    $captcha_success = json_decode($verify);

    if ($captcha_success->success) {
        // CAPTCHA verified, continue processing form submission
        // Your existing code for form submission goes here
    } else {
        // CAPTCHA verification failed, handle accordingly
        echo "CAPTCHA verification failed.";
    }
}
?>
