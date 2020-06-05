$(document).ready(() => {
  console.log("ready");
  renderTable(taskList.tasks);
});

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

$(document).on("click", "button[data-function]", (e) => {
  let chosen = $(e.target).attr("data-function");
  let rowId = $(e.target).closest("tr").children().first().text();

  switch (chosen) {
    case "complete":
      break;
    case "edit":
      break;
    case "delete":
      taskList.removeByOrder(rowId);
      break;
  }
});

const categoryTranslate = {
  work: "Trabalho",
  home: "Casa",
  university: "Universidade",
  personal: "Pessoal",
  shop: "Compras",
};

const renderTable = (tasks) => {
  // adicionar tradução da categoria
  // adicionar ações
  // adicionar color code pra prioridade
  let tbody = $("#list-body");
  tbody.empty();
  if (tasks && tasks.length > 0) {
    tasks.forEach((task) => {
      tbody.append(`
        <tr class="${task.completed ? "table-secondary" : ""}">
          <td>${task.order}</td>
          <td>${task.name}</td>
          <td>${task.priority}</td>
          <td>${categoryTranslate[task.category] || "-"}</td>
          <td class="py-2">
            ${
              task.completed
                ? `<button type="button" data-function="delete" class="btn btn-light btn-sm" data-toggle="tooltip" data-placement="top" title="Remover">🗑</button>`
                : `
                  <button type="button" data-function="complete" class="btn btn-light btn-sm" data-toggle="tooltip" data-placement="top" title="Completar">✔</button>
                  <button type="button" data-function="edit" class="btn btn-light btn-sm" data-toggle="tooltip" data-placement="top" title="Editar">✏</button>
                  <button type="button" data-function="delete" class="btn btn-light btn-sm" data-toggle="tooltip" data-placement="top" title="Remover">🗑</button>
                `
            }

            
          </td>
        </tr>
      `);
    });
  } else {
    tbody.append(`
      <tr class="table-secondary">
        <td colspan="5" class="text-center">
          <span>Nenhuma tarefa cadastrada</span>
        </td>
      </tr>
    `);
  }

  $(".tooltip").remove();
  $('[data-toggle="tooltip"]').tooltip();
};
