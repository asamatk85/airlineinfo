// ページ読み込み時に実行する処理
document.addEventListener("DOMContentLoaded", function () {
  // 過去5日間の日付を表示
  const today = new Date();
  for (let i = 4; i >= 0; i--) { // 順番を逆にする
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    addDateColumn(date);
  }
});

// 過去5日間の日付を表に追加する関数
function addDateColumn(date) {
  const operationsTable = document.getElementById("operationsTable");
  const headerRow = operationsTable.querySelector("thead tr");
  const newTh = document.createElement("th");
  newTh.textContent = formatDate(date);
  headerRow.appendChild(newTh);

  // 各行に空のセルを追加
  const rows = operationsTable.querySelectorAll("tbody tr");
  rows.forEach(row => {
    const newTd = document.createElement("td");
    newTd.onclick = function() {
      const rowIndex = Array.from(row.parentElement.children).indexOf(row);
      const columnIndex = Array.from(row.children).indexOf(newTd);
      handleCellClick(rowIndex, columnIndex);
    };
    row.appendChild(newTd);
  });
}

// 日付をフォーマットする関数
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}`;
}

// セルをクリックしたときの処理
function handleCellClick(rowIndex, columnIndex) {
  // 選択されたセルを更新
  const selectedCell = document.querySelector(`#operationsTable tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${columnIndex + 1})`);

  // 選択されたセルにフォームを表示
  showInputForm(selectedCell, rowIndex, columnIndex);
}

// 入力フォームを表示する関数
function showInputForm(selectedCell, rowIndex, columnIndex) {
  const inputForm = document.querySelector("#inputForm");

  // 選択したセルの位置を設定
  document.querySelector("#trainNumber").value = selectedCell.textContent.trim();
  document.querySelector("#selectedRowIndex").value = rowIndex;
  document.querySelector("#selectedColumnIndex").value = columnIndex;

  // 入力フォームを表示
  inputForm.classList.remove("hidden");
}

// 入力フォームを送信する関数
function submitForm() {
  const trainNumberInput = document.querySelector("#trainNumber");
  const trainNumber = trainNumberInput.value.trim();
  const selectedRowIndexInput = document.querySelector("#selectedRowIndex");
  const selectedRowIndex = parseInt(selectedRowIndexInput.value);
  const selectedColumnIndexInput = document.querySelector("#selectedColumnIndex");
  const selectedColumnIndex = parseInt(selectedColumnIndexInput.value);

  if (trainNumber !== "" && !isNaN(selectedRowIndex) && !isNaN(selectedColumnIndex)) {
    const selectedCell = document.querySelector(`#operationsTable tbody tr:nth-child(${selectedRowIndex + 1}) td:nth-child(${selectedColumnIndex + 1})`);
    selectedCell.textContent = trainNumber; // セルに入力した編成番号を反映する

    // テキストに応じて背景色を変更する
    switch(trainNumber) {
      case "JA381A":
        selectedCell.style.backgroundColor = "#4197CA";
        break;
      case "JA382A":
        selectedCell.style.backgroundColor = "#0098A8";
        break;
      case "JA383A":
        selectedCell.style.backgroundColor = "#F57539";
        break;
      default:
        selectedCell.style.backgroundColor = ""; // デフォルトの背景色に戻す
    }

    const inputForm = document.querySelector("#inputForm");
    inputForm.classList.add("hidden"); // 入力フォームを非表示にする
  }
}
