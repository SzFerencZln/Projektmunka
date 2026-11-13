function vissza() {
  document.getElementById("foglalas").style.display = "block";
  document.getElementById("sikeres").style.display = "none";
}

function jelentkezes(event) {
  if (event) {
    event.preventDefault();
  }

  const form = document.getElementById("tesztvezetesForm");
  if (form && !form.checkValidity()) {
    form.reportValidity();
    return;
  }

  document.getElementById("foglalas").style.display = "none";
  document.getElementById("sikeres").style.display = "block";
}

const tesztvezetesForm = document.getElementById("tesztvezetesForm");
if (tesztvezetesForm) {
  tesztvezetesForm.addEventListener("submit", jelentkezes);
}

const visszaButton = document.querySelector("#sikeres button");
if (visszaButton) {
  visszaButton.addEventListener("click", vissza);
}

const autoSearchForm = document.getElementById("autoSearchForm");
const autoSearchInput = document.getElementById("exampleDataList");
const searchStatus = document.getElementById("searchStatus");

function szuresAutoKatalogust() {
  if (!autoSearchInput || !searchStatus) {
    return;
  }

  const searchTerm = autoSearchInput.value.trim().toLocaleLowerCase("hu-HU");
  const brandHeadings = document.querySelectorAll(".keszlet > .container > h1.ar");
  let visibleCount = 0;

  brandHeadings.forEach((brandHeading) => {
    const brandRow = brandHeading.nextElementSibling;
    let brandVisibleCount = 0;

    brandRow.querySelectorAll(":scope > .cols").forEach((cardColumn) => {
      const carCard = cardColumn.querySelector(".auto-card");
      const matches = carCard.textContent.toLocaleLowerCase("hu-HU").includes(searchTerm);

      cardColumn.hidden = !matches;
      if (matches) {
        brandVisibleCount += 1;
        visibleCount += 1;
      }
    });

    brandHeading.hidden = brandVisibleCount === 0;
  });

  searchStatus.hidden = visibleCount > 0;
  searchStatus.textContent = "Nincs a keresésnek megfelelő autó.";
}

if (autoSearchForm && autoSearchInput) {
  autoSearchInput.addEventListener("input", szuresAutoKatalogust);
  autoSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    szuresAutoKatalogust();
  });
}

document.querySelectorAll(".auto-card").forEach((carCard) => {
  const modelName = carCard.querySelector(".card-title")?.textContent.trim();
  const detailsButton = carCard.querySelector("[data-bs-target]");
  const modal = detailsButton && document.querySelector(detailsButton.dataset.bsTarget);
  const modalFooter = modal?.querySelector(".modal-footer");

  if (!modelName || !modalFooter || modalFooter.querySelector(".booking-link")) {
    return;
  }

  const bookingLink = document.createElement("a");
  bookingLink.className = "btn booking-link";
  bookingLink.href = `foglalas.html?modell=${encodeURIComponent(modelName)}`;
  bookingLink.setAttribute("aria-label", `Tesztvezetés foglalása: ${modelName}`);
  bookingLink.textContent = "Tesztvezetést kérek";
  modalFooter.prepend(bookingLink);
});

const bookingModelSelect = document.getElementById("tipusok");
if (bookingModelSelect) {
  const requestedModel = new URLSearchParams(window.location.search).get("modell");
  const matchingOption = [...bookingModelSelect.options].find((option) =>
    option.textContent.trim().toLocaleLowerCase("hu-HU") === requestedModel?.trim().toLocaleLowerCase("hu-HU")
  );

  if (matchingOption) {
    bookingModelSelect.value = matchingOption.value;
  }
}
/*
  A form required validalasa most a submit eseményen keresztul ellenorzodik, es a sikeres allapot megjelenitese utan nem reloadol az oldal.
*/