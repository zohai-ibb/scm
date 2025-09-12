const form = document.getElementById("contact-form");

      form.addEventListener("submit", async function (e) {
        e.preventDefault();

        let formData = new FormData(form);

        try {
          let response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { Accept: "application/json" },
          });

          let result = await response.json();

          if (result.success) {
            Swal.fire({
              icon: "success",
              title: "Message Sent!",
              text: "Thank you for contacting us. We'll get back to you soon. Please click OK to return to the homepage.",
              confirmButtonColor: "#3085d6",
            }).then(() => {
              window.location.href = "/home";
            });
            form.reset();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops!",
              text: "Something went wrong. Please try again later.",
              confirmButtonColor: "#d33",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Please check your internet connection and try again.",
            confirmButtonColor: "#d33",
          });
        }
      });