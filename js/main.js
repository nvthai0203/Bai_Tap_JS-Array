let numbers = [];

const numberInput = document.getElementById("numberInput");
const arrayDisplay = document.getElementById("arrayDisplay");
const btnAdd = document.getElementById("btnAdd");
const btnClear = document.getElementById("btnClear");

function renderArray() {
  arrayDisplay.textContent = `[ ${numbers.join(", ")} ]`;
}

function requireArray() {
  if (numbers.length === 0) {
    return "Mảng đang rỗng. Vui lòng nhập số trước.";
  }
  return null;
}

btnAdd.addEventListener("click", () => {
  const value = numberInput.value.trim();
  if (value === "" || Number.isNaN(Number(value))) {
    alert("Vui lòng nhập một số nguyên hợp lệ.");
    return;
  }
  numbers.push(Number(value));
  numberInput.value = "";
  numberInput.focus();
  renderArray();
});

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnAdd.click();
});

btnClear.addEventListener("click", () => {
  numbers = [];
  renderArray();
  document.querySelectorAll(".result").forEach((el) => (el.textContent = ""));
});

// 1. Tổng các số dương trong mảng
function tongSoDuong() {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) sum += numbers[i];
  }
  return `Tổng các số dương: ${sum}`;
}

// 2. Đếm có bao nhiêu số dương trong mảng
function demSoDuong() {
  let count = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) count++;
  }
  return `Số lượng số dương: ${count}`;
}

// 3. Tìm số nhỏ nhất trong mảng
function soNhoNhat() {
  let min = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) min = numbers[i];
  }
  return `Số nhỏ nhất: ${min}`;
}

// 4. Tìm số dương nhỏ nhất trong mảng
function soDuongNhoNhat() {
  let minPositive = null;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
      if (minPositive === null || numbers[i] < minPositive) {
        minPositive = numbers[i];
      }
    }
  }
  if (minPositive === null) return "Không có số dương trong mảng.";
  return `Số dương nhỏ nhất: ${minPositive}`;
}

// 5. Tìm số chẵn cuối cùng trong mảng. Nếu mảng không có giá trị chẵn thì trả về -1
function soChanCuoiCung() {
  for (let i = numbers.length - 1; i >= 0; i--) {
    if (numbers[i] % 2 === 0) {
      return `Số chẵn cuối cùng: ${numbers[i]}`;
    }
  }
  return "Số chẵn cuối cùng: -1";
}

// 6. Đổi chỗ 2 giá trị trong mảng theo vị trí
function doiChoHaiViTri() {
  const i = Number(document.getElementById("index1").value);
  const j = Number(document.getElementById("index2").value);

  if (
    Number.isNaN(i) ||
    Number.isNaN(j) ||
    !Number.isInteger(i) ||
    !Number.isInteger(j)
  ) {
    return "Vui lòng nhập 2 vị trí (index) hợp lệ.";
  }
  if (i < 0 || i >= numbers.length || j < 0 || j >= numbers.length) {
    return `Vị trí phải nằm trong khoảng 0 đến ${numbers.length - 1}.`;
  }

  const temp = numbers[i];
  numbers[i] = numbers[j];
  numbers[j] = temp;
  renderArray();
  return `Đã đổi chỗ vị trí ${i} và ${j}. Mảng mới: [ ${numbers.join(", ")} ]`;
}

// 7. Sắp xếp mảng theo thứ tự tăng dần
function sapXepTangDan() {
  // Bubble sort
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = 0; j < numbers.length - 1 - i; j++) {
      if (numbers[j] > numbers[j + 1]) {
        const temp = numbers[j];
        numbers[j] = numbers[j + 1];
        numbers[j + 1] = temp;
      }
    }
  }
  renderArray();
  return `Mảng sau khi sắp xếp: [ ${numbers.join(", ")} ]`;
}

// Kiểm tra số nguyên tố
function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// 8. Tìm số nguyên tố đầu tiên trong mảng. Nếu mảng không có số nguyên tố thì trả về -1
function soNguyenToDauTien() {
  for (let i = 0; i < numbers.length; i++) {
    if (isPrime(numbers[i])) {
      return `Số nguyên tố đầu tiên: ${numbers[i]}`;
    }
  }
  return "Số nguyên tố đầu tiên: -1";
}

// 9. Nhập thêm 1 mảng số thực, tìm xem trong mảng có bao nhiêu số nguyên
function demSoNguyenTrongMangThuc() {
  const raw = document.getElementById("floatArrayInput").value.trim();
  if (raw === "") return "Vui lòng nhập mảng số thực (cách nhau bởi dấu phẩy).";

  const parts = raw.split(",");
  const floatArr = [];
  for (let i = 0; i < parts.length; i++) {
    const num = Number(parts[i].trim());
    if (parts[i].trim() === "" || Number.isNaN(num)) {
      return "Mảng số thực không hợp lệ. VD: 1.5, 2, 3.0, -4";
    }
    floatArr.push(num);
  }

  let count = 0;
  for (let i = 0; i < floatArr.length; i++) {
    if (Number.isInteger(floatArr[i])) count++;
  }
  return `Mảng số thực: [ ${floatArr.join(", ")} ] — Có ${count} số nguyên.`;
}

// 10. So sánh số lượng số dương và số âm xem số nào nhiều hơn
function soSanhDuongAm() {
  let positive = 0;
  let negative = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) positive++;
    else if (numbers[i] < 0) negative++;
  }

  let message;
  if (positive > negative) message = "Số dương nhiều hơn số âm.";
  else if (negative > positive) message = "Số âm nhiều hơn số dương.";
  else message = "Số dương và số âm bằng nhau.";

  return `Số dương: ${positive} | Số âm: ${negative} → ${message}`;
}

const handlers = {
  1: tongSoDuong,
  2: demSoDuong,
  3: soNhoNhat,
  4: soDuongNhoNhat,
  5: soChanCuoiCung,
  6: doiChoHaiViTri,
  7: sapXepTangDan,
  8: soNguyenToDauTien,
  9: demSoNguyenTrongMangThuc,
  10: soSanhDuongAm,
};

document.querySelectorAll(".fn-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const fn = btn.dataset.fn;
    // Lấy card cha (không lấy div lồng bên trong chứa input/button)
    const card = btn.closest(".p-4.space-y-2");
    const resultEl = card.querySelector(".result");

    // Chức năng 9 dùng mảng số thực riêng, không cần mảng chính
    if (fn !== "9") {
      const emptyMsg = requireArray();
      if (emptyMsg) {
        resultEl.textContent = emptyMsg;
        return;
      }
    }

    resultEl.textContent = handlers[fn]();
  });
});

renderArray();
