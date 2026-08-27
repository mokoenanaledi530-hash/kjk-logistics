document.getElementById("year").textContent =
  new Date().getFullYear();

const form = document.getElementById("quoteForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = new FormData(form);

  const name = data.get("name");
  const phone = data.get("phone");
  const message = data.get("message");

  const whatsappMessage =
    `KJK Logistics enquiry%0A%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Requirements: ${encodeURIComponent(message)}`;

  /*
    Replace YOUR_NUMBER with the KJK Logistics
    WhatsApp number when you are ready.
  */

  const whatsappNumber = "YOUR_NUMBER";

  if (whatsappNumber === "YOUR_NUMBER") {
    status.textContent =
      "Your enquiry is ready. Add the KJK WhatsApp number in app.js to activate WhatsApp enquiries.";
    return;
  }

  window.open(
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
    "_blank"
  );
});
