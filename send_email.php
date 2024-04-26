<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Set recipient email address
    $to = "prasannauixdesigner@gmail.com";
    
    // Set subject
    $subject = "Form Submission";
    
    // Get form data
    $message = $_POST['message'];
    
    // Set additional headers
    $headers = "From: webmaster@example.com" . "\r\n";
    $headers .= "Reply-To: webmaster@example.com" . "\r\n";
    
    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Email sending failed!";
    }
} else {
    echo "Form submission method not allowed.";
}
?>
