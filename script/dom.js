$("#form-new").on("submit", (e) => {
  e.preventDefault();
  console.log("form submit");

  let formData = new FormData($("#form-new")[0]);

  let taskObj = {};
  for (const [key, value] of formData.entries()) {
    if (key == "priority") {
      taskObj[key] = parseInt(value);
      continue;
    }
    taskObj[key] = value;
  }

  taskList.addFromJson(taskObj);
});
