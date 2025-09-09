// console.log("Contacts.js");
// const baseURL = "http://localhost:8081";
// const viewContactModal = document.getElementById("view_contact_modal");

// // options with default values
// const options = {
//   placement: "bottom-right",
//   backdrop: "dynamic",
//   backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
//   closable: true,
//   onHide: () => {
//     console.log("modal is hidden");
//   },
//   onShow: () => {
//     setTimeout(() => {
//       contactModal.classList.add("scale-100");
//     }, 50);
//   },
//   onToggle: () => {
//     console.log("modal has been toggled");
//   },
// };

// // instance options object
// const instanceOptions = {
//   id: "view_contact_mdoal",
//   override: true,
// };

// const contactModal = new Modal(viewContactModal, options, instanceOptions);

// function openContactModal() {
//   contactModal.show();
// }

// function closeContactModal() {
//   contactModal.hide();
// }

// async function loadContactdata(id) {
//   //function call to load data
//   console.log(id);
//   try {
//     const data = await (await fetch(`${baseURL}/api/contacts/${id}`)).json();
//     console.log(data);
//     document.querySelector("#contact_name").innerHTML = data.name;
//     document.querySelector("#contact_email").innerHTML = data.email;
//     document.querySelector("#contact_image").src = data.picture;
//     document.querySelector("#contact_address").innerHTML = data.address;
//     document.querySelector("#contact_phone").innerHTML = data.phoneNumber;
//     document.querySelector("#contact_about").innerHTML = data.description;
//     const contactFavorite = document.querySelector("#contact_favorite");
//     if (data.favorite) {
//       contactFavorite.innerHTML =
//         "<i class='fas fa-star text-yellow-400'></i><i class='fas fa-star text-yellow-400'></i><i class='fas fa-star text-yellow-400'></i><i class='fas fa-star text-yellow-400'></i><i class='fas fa-star text-yellow-400'></i>";
//     } else {
//       contactFavorite.innerHTML = "Not Favorite Contact";
//     }
//     const contactFavorite2 = document.querySelector("#favoriteContact");
//     if (data.favorite) {
//       contactFavorite2.innerHTML =
//         "<i class='fas fa-star text-yellow-400'></i>";
//     } 
//     document.querySelector("#contact_website").href = data.websiteLink;
//     document.querySelector("#contact_website").innerHTML = data.websiteLink;
//     document.querySelector("#contact_linkedIn").href = data.linkedInLink;
//     document.querySelector("#contact_linkedIn").innerHTML = data.linkedInLink;
//     openContactModal();
//   } catch (error) {
//     console.log("Error: ", error);
//   }
// }

// // delete contact

// async function deleteContact(id) {
//   Swal.fire({
//     title: "Do you want to delete the contact?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Delete",
//   }).then((result) => {
//     /* Read more about isConfirmed, isDenied below */
//     if (result.isConfirmed) {
//       const url = `${baseURL}/user/contacts/delete/` + id;
//       window.location.replace(url);
//     }
//   });
// }

console.log("Contacts.js");
const baseURL = "http://localhost:8081";

// Get modal element
const viewContactModal = document.getElementById("view_contact_modal");

// options with default values
const options = {
  placement: "bottom-right",
  backdrop: "dynamic",
  backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
  closable: true,
  onHide: () => {
    console.log("modal is hidden");
  },
  onShow: () => {
    setTimeout(() => {
      contactModal.classList.add("scale-100");
    }, 50);
  },
  onToggle: () => {
    console.log("modal has been toggled");
  },
};

// instance options object
const instanceOptions = {
  id: "view_contact_modal", // ✅ fixed typo
  override: true,
};

const contactModal = new Modal(viewContactModal, options, instanceOptions);

function openContactModal() {
  contactModal.show();
}

function closeContactModal() {
  contactModal.hide();
}

// Select all elements where data-favorite="true"
document.querySelectorAll('[data-favorite="true"]').forEach(div => {
  div.innerHTML = `<i class="fa-solid fa-star text-yellow-400"></i>`;
});





async function loadContactdata(id) {
  console.log("Loading contact:", id);
  try {
    const response = await fetch(`${baseURL}/api/contacts/${id}`);
    const data = await response.json();
    console.log("Contact data:", data);

    // Safe assignments with fallback
    const setText = (selector, value) => {
      const el = document.querySelector(selector);
      if (el) el.innerHTML = value || "";
    };

    const setHref = (selector, value) => {
      const el = document.querySelector(selector);
      if (el && value) {
        el.href = value;
        el.innerHTML = value;
      }
    };

    const setImage = (selector, src) => {
      const el = document.querySelector(selector);
      if (el) el.src = src || "/images/default-profile.png";
    };

    // Fill modal content
    setText("#contact_name", data.name);
    setText("#contact_email", data.email);
    setImage("#contact_image", data.picture);
    setText("#contact_address", data.address);
    setText("#contact_phone", data.phoneNumber);
    setText("#contact_about", data.description);

    const contactFavorite = document.querySelector("#contact_favorite");
    if (contactFavorite) {
      if (data.favorite) {
        contactFavorite.innerHTML =
          "<i class='fas fa-star text-yellow-400'></i>".repeat(5);
      } else {
        contactFavorite.innerHTML = "Not Favorite Contact";
      }
    }

  
    // Links
    setHref("#contact_website", data.websiteLink);
    setHref("#contact_linkedIn", data.linkedInLink);

    // Show modal
    openContactModal();

  } catch (error) {
    console.error("Error loading contact:", error);
  }
}

// delete contact
async function deleteContact(id) {
  Swal.fire({
    title: "Do you want to delete the contact?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      const url = `${baseURL}/user/contacts/delete/` + id;
      window.location.replace(url);
    }
  });
}
