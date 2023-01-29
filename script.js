/** @format */

const storage = document.querySelector(".storage-count");
const transfer = document.querySelector(".transfer-count");
let storage_value = document.querySelector(".storage-value");
let transfer_value = document.querySelector(".transfer-value");
const radio = document.querySelectorAll(".radio");
const radio_scaleway = document.querySelectorAll(".radio-scaleway");
let price = document.querySelectorAll(".price");
let check_bunny = document.querySelector(".change-radio");
let check_scaleway = document.querySelector(".change-scaleway");
const scale = document.querySelectorAll(".scale");

const radioHandler = (block) => {
  let sum = 0;
  radio.forEach((item) => {
    if (item.checked) {
      sum = (item.value * storage.value + 0.01 * transfer.value).toFixed(2);
      block.innerHTML = sum <= 10 ? sum + " $" : 10 + "$";
    }
  });
};

const scalewayHandler = (block) => {
  let sum_storage = 0;
  let sum_transfer = 0;
  radio_scaleway.forEach((item) => {
    if (item.checked) {
      sum_storage =
        storage.value > 75 ? (item.value * (storage.value - 75)).toFixed(2) : 0;
      sum_transfer =
        transfer.value > 75 ? (0.02 * (transfer.value - 75)).toFixed(2) : 0;
      sum = (+sum_storage + +sum_transfer).toFixed(2);
      block.innerHTML = sum + " $";
    }
  });
};

const countHandler = (range, scale_value) => {
  let sum_backblaze = 0;
  let sum_vultr = 0;
  document.querySelector(
    ".storage-name"
  ).innerHTML = `Storage: ${storage.value} GB`;
  document.querySelector(
    ".transfer-name"
  ).innerHTML = `Transfer: ${transfer.value} GB`;

  range.innerHTML = scale_value;
  price.forEach((item) => {
    if (item.classList.contains("backblaze-price")) {
      sum_backblaze = (0.005 * storage.value + 0.01 * transfer.value).toFixed(
        2
      );
      item.innerHTML = sum_backblaze >= 7 ? sum_backblaze + " $" : 7 + " $";

      document.querySelector(".backblaze-scale").style.width =
        parseFloat(item.innerHTML) * 10 + "px";
    }
    if (item.classList.contains("bunny-price")) {
      radioHandler(item);
      document.querySelector(".bunny-scale").style.width =
        parseFloat(item.innerHTML) * 10 + "px";
    }
    if (item.classList.contains("scaleway-price")) {
      scalewayHandler(item);
      document.querySelector(".scaleway-scale").style.width =
        parseFloat(item.innerHTML) * 10 + "px";
    }
    if (item.classList.contains("vultr-price")) {
      sum_vultr = ((+storage.value + +transfer.value) * 0.01).toFixed(2);
      item.innerHTML = sum_vultr >= 5 ? sum_vultr + " $" : 5 + " $";
      document.querySelector(".vultr-scale").style.width =
        parseFloat(item.innerHTML) * 10 + "px";
    }
  });
  let widthArr = [];
  let min = 0;
  scale.forEach((item) => {
    widthArr.push(parseFloat(item.style.width));
  });
  min = Math.min(...widthArr);
  scale.forEach((item) => {
    item.style.background = "";
    if (parseFloat(item.style.width) == min)
      item.style.background = item.getAttribute("color");
  });
};

countHandler(storage_value, storage.value);
countHandler(transfer_value, transfer.value);

storage.oninput = () => countHandler(storage_value, storage.value);
transfer.oninput = () => countHandler(transfer_value, transfer.value);
check_bunny.onchange = () =>
  radioHandler(document.querySelector(".bunny-price"));
check_scaleway.onchange = () =>
  scalewayHandler(document.querySelector(".scaleway-price"));
