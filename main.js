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
/*
  A form required validalasa most a submit eseményen keresztul ellenorzodik, es a sikeres allapot megjelenitese utan nem reloadol az oldal.
*/