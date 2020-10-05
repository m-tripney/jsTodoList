const toggleList = document.getElementById("toggleList");
const listDiv = document.querySelector(".list");
const descriptionInput = document.querySelector("input.description");
const descriptionP = document.querySelector("p.description");
const descriptionButton = document.querySelector("button.description");
const listUl = listDiv.querySelector("ul");
const addItemInput = document.querySelector("input.addItemInput");
const addItemButton = document.querySelector("button.addItemButton");
const lis = listUl.children;

function addUpButton(li) {
  let up = document.createElement("button");
  up.className = "up";
  up.textContent = "Up";
  li.appendChild(up);
  return up;
}

function addDownButton(li) {
  let down = document.createElement("button");
  down.className = "down";
  down.textContent = "Down";
  li.appendChild(down);
  return down;
}

function addRemoveButton(li) {
  let remove = document.createElement("button");
  remove.className = "remove";
  remove.textContent = "Remove";
  li.appendChild(remove);
  return remove;
}

function assessButtonStates(li) {
  if (lis.length > 0) {
    const prevLi = li.previousElementSibling;
    const topItemUpButton = lis[0].querySelector(".up");
    const topItemDownButton = lis[0].querySelector(".down");
    const bottomItemDownButton = lis[lis.length - 1].querySelector(".down");
    const bottomItemUpButton = lis[lis.length - 1].querySelector(".up");
    if (lis.length > 2) {
      for (let i = 1; i < lis.length - 1; i += 1) {
        const midItemRemoveButton = lis[i].querySelector(".remove");
        const midItemDownButton = lis[i].querySelector(".down");
        if (!lis[i].querySelector(".down")) {
          midItemRemoveButton.insertAdjacentElement(
            "beforebegin",
            addDownButton(lis[i])
          );
        }
        if (!lis[i].querySelector(".up")) {
          midItemDownButton.insertAdjacentElement(
            "beforebegin",
            addUpButton(lis[i])
          );
        }
      }
    }
    if (lis.length > 1) {
      // Does the top item have an Up button? If so, remove it.
      if (topItemUpButton) {
        lis[0].removeChild(topItemUpButton);
      }
      // Does top item have a Down button? If not, add one.
      if (!topItemDownButton) {
        const topItemRemoveButton = lis[0].querySelector(".remove");
        topItemRemoveButton.insertAdjacentElement(
          "beforebegin",
          addDownButton(li)
        );
      }
      // Does the bottom item have a Down button? If so, remove it.
      if (bottomItemDownButton) {
        lis[lis.length - 1].removeChild(bottomItemDownButton);
      }
      // Does the bottom item have an Up button? If not, add one.
      if (!bottomItemUpButton) {
        const bottomItemRemoveButton = lis[lis.length - 1].querySelector(
          ".remove"
        );
        bottomItemRemoveButton.insertAdjacentElement(
          "beforebegin",
          addUpButton(li)
        );
      }
    }
    if (lis.length === 1) {
      if (lis[0].querySelector(".down")) {
        const soloItemDownButton = lis[0].querySelector(".down");
        lis[0].removeChild(soloItemDownButton);
      }
      if (lis[0].querySelector(".up")) {
        const soloItemUpButton = lis[0].querySelector(".up");
        lis[0].removeChild(soloItemUpButton);
      }
    }
  }
}

listUl.addEventListener("click", (event) => {
  if (event.target.tagName == "BUTTON") {
    if (event.target.className == "remove") {
      let li = event.target.parentNode;
      let ul = li.parentNode;
      ul.removeChild(li);
      assessButtonStates(li);
    }
    if (event.target.className == "up") {
      let li = event.target.parentNode;
      let prevLi = li.previousElementSibling;
      let ul = li.parentNode;
      if (prevLi) {
        ul.insertBefore(li, prevLi);
      }
      assessButtonStates(li);
    }
    if (event.target.className == "down") {
      let li = event.target.parentNode;
      let nextLi = li.nextElementSibling;
      let ul = li.parentNode;
      if (nextLi) {
        ul.insertBefore(nextLi, li);
      }
      assessButtonStates(li);
    }
  }
});

toggleList.addEventListener("click", () => {
  if (listDiv.style.display == "none") {
    toggleList.textContent = "Hide list";
    listDiv.style.display = "block";
  } else {
    toggleList.textContent = "Show list";
    listDiv.style.display = "none";
  }
});

descriptionButton.addEventListener("click", () => {
  descriptionP.innerHTML = descriptionInput.value + ":";
  descriptionInput.value = "";
});

addItemButton.addEventListener("click", () => {
  let ul = document.getElementsByTagName("ul")[0];
  let li = document.createElement("li");
  li.textContent = addItemInput.value;
  ul.appendChild(li);
  // Always add a Remove button...
  addRemoveButton(li);
  // ... and, if there is a preceding list item, add an Up button, too
  if (li.previousElementSibling) {
    const localRemoveButton = li.querySelector(".remove");
    localRemoveButton.insertAdjacentElement("beforebegin", addUpButton(li));
    // Then, assess button states of existing list items
    assessButtonStates(li);
  }
  // Clear the item text entry field
  addItemInput.value = "";
});
