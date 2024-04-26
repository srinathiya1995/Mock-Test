//Toggle the List group
$(document).ready(function () {
  // Show content when list item is clicked
  $(".list-group-item").click(function () {
    var contentId = $(this).data("content");
    var content = $(contentId).html();
    $("#content").html(content);
  });
});

//Disable the refresh page
function disableF5(e) {
  if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82)
    e.preventDefault();
}

$(document).ready(function () {
  $(document).on("keydown", disableF5);
});

// Final Mock JS Code
function openNextTest() {
  // Find the next disabled list-group-item
  const nextListItem = document.querySelector(".list-group-item.disabled");

  // Check if there is a next list-group-item
  if (nextListItem) {
    // Remove the 'disabled' class from the next list-group-item
    nextListItem.classList.remove("disabled");
    // Get the content ID from the data-content attribute
    const contentId = nextListItem.getAttribute("data-content");
    // Get the corresponding content element
    const contentElement = document.querySelector(contentId);

    // Hide any previously opened content
    document
      .querySelectorAll(".content-section > div")
      .forEach(function (element) {
        element.style.display = "none";
      });

    // Display the content element by removing the 'display: none' style
    contentElement.style.display = "none";

    // Store the state in local storage
    localStorage.setItem("enabledItem", nextListItem.id);
  } else {
    // If there are no more disabled list-group-items, alert the user
    alert("No more tests available.");
  }
}

function openNextTest() {
  // Get the ID of the last enabled list item from local storage
  const enabledItemId = localStorage.getItem("enabledItem");

  // Find the currently enabled list item
  const currentEnabledItem = document.getElementById(enabledItemId);

  // Find the next disabled list item after the currently enabled one
  const nextListItem = currentEnabledItem.nextElementSibling;

  // Check if there is a next disabled list item
  if (nextListItem && nextListItem.classList.contains("disabled")) {
    // Remove the 'disabled' class from the next list item
    nextListItem.classList.remove("disabled");

    // Get the content ID from the data-content attribute
    const contentId = nextListItem.getAttribute("data-content");

    // Get the corresponding content element
    const contentElement = document.querySelector(contentId);

    // Hide any previously opened content
    document
      .querySelectorAll(".content-section > div")
      .forEach(function (element) {
        element.style.display = "none";
      });

    // Display the content element by removing the 'display: none' style
    contentElement.style.display = "block";

    // Store the ID of the currently enabled item in local storage
    localStorage.setItem("enabledItem", nextListItem.id);
  } else {
    // If there are no more disabled list items, alert the user
    alert("No more tests available.");
  }
}

/* 
// Function to enable previously enabled item on page load
function enablePreviousItem() {
  const enabledItemId = localStorage.getItem("enabledItem");
  if (enabledItemId) {
    const enabledItem = document.getElementById(enabledItemId);
    if (enabledItem) {
      enabledItem.classList.remove("disabled");
    }
  }
}

// Add event listener to the test-submit button
document.getElementById("test-submit").addEventListener("click", function () {
  openNextTest();
}); */

//Send email and open next list item

function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "YOUR_SERVICE_ID";
  const templateID = "YOUR_TEMPLETE_ID";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("Your message sent successfully!!");
    })
    .catch((err) => console.log(err));
}

function openNextTest() {
  // Find the next disabled list-group-item
  const nextListItem = document.querySelector(".list-group-item.disabled");

  // Check if there is a next list-group-item
  if (nextListItem) {
    // Check if email sending is successful
    if (sendEmail()) {
      // Remove the 'disabled' class from the next list-group-item
      nextListItem.classList.remove("disabled");
      // Get the content ID from the data-content attribute
      const contentId = nextListItem.getAttribute("data-content");
      // Get the corresponding content element
      const contentElement = document.querySelector(contentId);

      // Hide any previously opened content
      document
        .querySelectorAll(".content-section > div")
        .forEach(function (element) {
          element.style.display = "none";
        });

      // Display the content element by removing the 'display: none' style
      contentElement.style.display = "block";

      // Store in local storage that this test has been completed
      localStorage.setItem(contentId + "-completed", true);

      // Check if there's any disabled list item, if not, hide the submit button
      if ($(".list-group-item.disabled").length === 0) {
        $("#test-submit").hide();
      }
    } else {
      // Handle email sending failure
      alert("Failed to send email. Please try again later.");
    }
  } else {
    // If there are no more disabled list-group-items, alert the user
    alert("No more tests available.");
  }
}

//contact form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Validate required fields
    const name = document.getElementById("name-contact").value.trim();
    const email = document.getElementById("email-contact").value.trim();
    const contact = document.getElementById("contact-num").value.trim();
    const message = document.getElementById("message-contact").value.trim();

    if (name === "" || email === "" || contact === "" || message === "") {
      alert("Please fill in all required fields.");
      return;
    }

    // If all fields are filled, submit the form
    form.submit();
  });
});
