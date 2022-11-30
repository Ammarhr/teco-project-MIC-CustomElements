<!-- <script>
  // @ts-nocheck

  import { onMount } from "svelte";

  onMount(() => {
    const dragables = document.querySelectorAll(".dragable");
    const containers = document.querySelectorAll(".container");

    dragables.forEach((dragable) => {
      dragable.addEventListener("dragstart", () => {
        console.log("hello from dragging");
        dragable.classList.add("dragging");
      });
      dragable.addEventListener("draged", () => {
        dragable.classList.remove("dragging");
      });
    });
    containers.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        console.log("this is after ele, af", afterElement);
        const dragable = document.querySelector(".dragging");
        container.appendChild(dragable);
      });
    });

    function getDragAfterElement(container, y) {
      const dragableElements = [
        ...container.querySelectorAll(".dragable:not(.dragging)"),
      ];

      return dragableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }.element);
    }
  });
</script>

<body>
  <div class="container">
    <p class="dragable" draggable="true">1</p>
    <p class="dragable" draggable="true">2</p>
  </div>
  <div class="container">
    <p class="dragable" draggable="true">3</p>
    <p class="dragable" draggable="true">4</p>
  </div>
</body>

<style>
  body {
    margin: 0;
  }

  .container {
    background-color: black;
    padding: 1rem;
    margin-top: 1rem;
  }
  .dragable {
    padding: 1rem;
    background-color: aliceblue;
    cursor: move;
  }
  .dragable.dragging {
    opacity: 0.5;
    background-color: red;
  }
</style> -->
