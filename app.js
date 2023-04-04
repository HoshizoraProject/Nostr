$(document).ready(function () {
  // 在網頁讀取完成後，自動載入資料到網頁中
  $.get("users.yml", function (data) {
    const users = jsyaml.load(data);

    // 產生用戶清單
    const userListBody = $("#user-list-body");
    users.forEach(user => {
      const row = $("<tr></tr>");
      const userNameCell = $("<td></td>").text(user.UserName);
      const publicKeyCell = $("<td></td>").text(user.PublicKey);
      const relayCell = $("<td></td>");
      if (user.Relay) {
        // 如果 Relay 欄位有值，顯示打勾圖式並且設定點擊事件
        relayCell.append($("<i></i>").addClass("fas fa-check relay-check-icon"));
        const relayValue = user.Relay;
        relayCell.click(function () {
          copyToClipboard(relayValue);
        });
      } else {
        // 如果 Relay 欄位沒有值，顯示打叉圖式
        relayCell.append($("<i></i>").addClass("fas fa-times relay-times-icon"));
      }
      const rowArray = [userNameCell, publicKeyCell, relayCell];
      rowArray.forEach(cell => row.append(cell));
      userListBody.append(row);
    });

    // 設定暗色模式的開關
    const darkModeSwitch = $("#dark-mode-switch");
    const body = $("body");
    darkModeSwitch.change(function () {
      body.toggleClass("dark-mode");
    });

    // 設定 UserUrl 欄位的點擊事件
    const userNameCells = userListBody.find("td:first-child");
    userNameCells.each(function () {
      const userNameCell = $(this);
      const userUrl = userNameCell.parent().data("user-url");
      if (userUrl) {
        userNameCell.click(function () {
          window.open(userUrl, "_blank");
        });
      }
    });
  });
});

// 複製文字到剪貼簿
function copyToClipboard(text) {
  const textarea = $("<textarea></textarea>");
  textarea.text(text);
  $("body").append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}