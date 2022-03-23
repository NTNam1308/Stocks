function calcCeilPrice(gia_tham_chieu, san) {
  san = san.toUpperCase();
  gia_tham_chieu = parseFloat(gia_tham_chieu) * 1000;
  if (san == "HOSE") {
    let gia_tri_bien_do = gia_tham_chieu * 1.07;
    if (gia_tri_bien_do >= 50000) {
      return Math.floor(gia_tri_bien_do / 100) * 100 / 1000;
    } else if (gia_tri_bien_do >= 10000) {
      return Math.floor(gia_tri_bien_do / 50) * 50 / 1000;
    } else {
      return Math.floor(gia_tri_bien_do / 10) * 10 / 1000;
    }
  } else if (san == "HNX") {
    let gia_tri_bien_do = gia_tham_chieu * 1.1;
    return Math.floor(gia_tri_bien_do / 100) * 100 / 1000;
  } else if (san == "UPCOM") {
    let gia_tri_bien_do = gia_tham_chieu * 1.15;
    return Math.floor(gia_tri_bien_do / 100) * 100 / 1000;
  }
}
function calcFloorPrice(gia_tham_chieu, san) {
  san = san.toUpperCase();
  gia_tham_chieu = parseFloat(gia_tham_chieu) * 1000;
  if (san == "HOSE") {
    let gia_tri_bien_do = gia_tham_chieu * 0.93;
    if (gia_tri_bien_do >= 50000) {
      const so_tien_lam_tron = gia_tri_bien_do % 100 > 0 ? 100 : 0;
      return (Math.floor(gia_tri_bien_do / 100) * 100 + so_tien_lam_tron) / 1000;
    } else if (gia_tri_bien_do >= 10000) {
      const so_tien_lam_tron = gia_tri_bien_do % 50 > 0 ? 50 : 0;
      return (Math.floor(gia_tri_bien_do / 50) * 50 + so_tien_lam_tron) / 1000;
    } else {
      const so_tien_lam_tron = gia_tri_bien_do % 10 > 0 ? 10 : 0;
      return (Math.floor(gia_tri_bien_do / 10) * 10 + so_tien_lam_tron) / 1000;
    }
  } else if (san == "HNX") {
    let gia_tri_bien_do = gia_tham_chieu * 0.9;
    const so_tien_lam_tron = gia_tri_bien_do % 100 > 0 ? 100 : 0;
    return (Math.floor(gia_tri_bien_do / 100) * 100 + so_tien_lam_tron) / 1000;
  } else if (san == "UPCOM") {
    let gia_tri_bien_do = gia_tham_chieu * 0.85;
    const so_tien_lam_tron = gia_tri_bien_do % 100 > 0 ? 100 : 0;
    return (Math.floor(gia_tri_bien_do / 100) * 100 + so_tien_lam_tron) / 1000;
  }
}
// function calcCeilPrice(gia_tham_chieu, san) {
//   san = san.toUpperCase();
//   gia_tham_chieu = parseFloat(gia_tham_chieu);
//   if (san == "HOSE") {
//     let gia_tri_bien_do = gia_tham_chieu * 1.07;
//     let phan_du = gia_tri_bien_do % 1;
//     if (gia_tri_bien_do >= 50) {
//       phan_du = parseInt(phan_du * 10);
//       return (parseInt(gia_tri_bien_do) + phan_du / 10).toFixed(2);
//     } else if (gia_tri_bien_do >= 10) {
//       phan_du = parseInt(phan_du * 100);
//       if (phan_du % 10 >= 5) {
//         return (parseInt(gia_tri_bien_do) + (Math.floor(phan_du / 10) * 10) / 100 + 0.05).toFixed(2);
//       } else {
//         return (parseInt(gia_tri_bien_do) + (Math.floor(phan_du / 10) * 10) / 100).toFixed(2);
//       }
//     } else {
//       return (parseInt(gia_tri_bien_do) + Math.floor(phan_du * 100) / 100).toFixed(2);
//     }
//   } else if (san == "HNX") {
//     let gia_tri_bien_do = gia_tham_chieu * 1.1;
//     let phan_du = gia_tri_bien_do % 1;
//     phan_du = parseInt(phan_du * 10);
//     return (parseInt(gia_tri_bien_do) + phan_du / 10).toFixed(2);
//   } else if (san == "UPCOM") {
//     let gia_tri_bien_do = gia_tham_chieu * 1.15;
//     let phan_du = gia_tri_bien_do % 1;
//     phan_du = parseInt(phan_du * 10);
//     return (parseInt(gia_tri_bien_do) + phan_du / 10).toFixed(2);
//   }
// }
// function calcFloorPrice(gia_tham_chieu, san) {
//   san = san.toUpperCase();
//   gia_tham_chieu = parseFloat(gia_tham_chieu);
//   if (san == "HOSE") {
//     let gia_tri_bien_do = gia_tham_chieu * 0.93;
//     let phan_du = gia_tri_bien_do % 1;
//     if (gia_tri_bien_do >= 50) {
//       phan_du = parseInt(phan_du * 100);
//       if (phan_du % 10 >= 1) {
//         return (parseInt(gia_tri_bien_do) + ((Math.floor(phan_du / 10)) * 10) / 100 + 0.1).toFixed(2);
//       } else {
//         return (parseInt(gia_tri_bien_do) + (Math.floor(phan_du / 10) * 10) / 100).toFixed(2);
//       }
//     } else if (gia_tri_bien_do >= 10) {
//       phan_du = parseInt(phan_du * 100);
//       if (phan_du % 10 > 0) {
//         if (phan_du % 10 < 5) {
//           return (parseInt(gia_tri_bien_do) + ((Math.floor(phan_du / 10)) * 10) / 100 + 0.05).toFixed(2);
//         } else {
//           return (parseInt(gia_tri_bien_do) + ((Math.floor(phan_du / 10)) * 10) / 100 + 0.1).toFixed(2);
//         }
//       } else {
//         return (parseInt(gia_tri_bien_do) + (Math.floor(phan_du / 10) * 10) / 100).toFixed(2);
//       }
//     } else {
//       phan_du = parseInt(phan_du * 1000);
//       if (phan_du % 10 > 0) {
//         return (parseInt(gia_tri_bien_do) + ((Math.floor(phan_du / 10)) * 10) / 1000 + 0.01).toFixed(2);
//       } else {
//         return (parseInt(gia_tri_bien_do) + (Math.floor(phan_du / 10) * 10) / 1000).toFixed(2);
//       }
//     }
//   } else if (san == "HNX") {
//     let gia_tri_bien_do = gia_tham_chieu * 0.9;
//     let phan_du = gia_tri_bien_do % 1;
//     phan_du = parseInt(phan_du * 100);
//     if (phan_du % 10 >= 1) {
//       return (parseInt(gia_tri_bien_do) + ((Math.floor(phan_du / 10)) * 10) / 100 + 0.1).toFixed(2);
//     } else {
//       return (parseInt(gia_tri_bien_do) + (Math.floor(phan_du / 10) * 10) / 100).toFixed(2);
//     }
//   } else if (san == "UPCOM") {
//     let gia_tri_bien_do = gia_tham_chieu * 0.85;
//     let phan_du = gia_tri_bien_do % 1;
//     phan_du = parseInt(phan_du * 100);
//     if (phan_du % 10 >= 1) {
//       return (parseInt(gia_tri_bien_do) + ((Math.floor(phan_du / 10)) * 10) / 100 + 0.1).toFixed(2);
//     } else {
//       return (parseInt(gia_tri_bien_do) + (Math.floor(phan_du / 10) * 10) / 100).toFixed(2);
//     }
//   }
// }
function getClassTextColorFromPrice(price, price_yesterday, board) {
  price = parseFloat(price);
  price_yesterday = parseFloat(price_yesterday);
  const ceil_price = calcCeilPrice(price_yesterday, board);
  const floor_price = calcFloorPrice(price_yesterday, board);
  if (price == 0) {
    return "text-nochange";
  } else if (price >= ceil_price) {
    return "text-ceilchange";
  } else if (price > price_yesterday) {
    return "text-upchange";
  } else if (price <= floor_price) {
    return "text-floorchange";
  } else if (price < price_yesterday) {
    return "text-downchange";
  } else {
    return "text-nochange";
  }
}
function getAnimationNameFromPrice(price, price_yesterday, board) {
  price = parseFloat(price);
  price_yesterday = parseFloat(price_yesterday);
  const ceil_price = calcCeilPrice(price_yesterday, board);
  const floor_price = calcFloorPrice(price_yesterday, board);
  if (price == 0) {
    return "nochange";
  } else if (price >= ceil_price) {
    return "ceilchange";
  } else if (price > price_yesterday) {
    return "upchange";
  } else if (price <= floor_price) {
    return "floorchange";
  } else if (price < price_yesterday) {
    return "downchange";
  } else {
    return "nochange";
  }
}
function formatMoney(number, min, max) {
  number = parseFloat(number);
  return number.toLocaleString("en", {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });
}
function getClassTextColorFromCL(cl) {
  switch (cl) {
    case "c":
      return "text-ceilchange";
    case "f":
      return "text-floorchange";
    case "d":
      return "text-downchange";
    case "i":
      return "text-upchange";
    case "e":
      return "text-nochange";
    default:
      return "text-nochange";
  }
}
function getAnimationNameFromChange(change) {
  change = parseFloat(change);
  if (change > 0) {
    return "upchange";
  } else if (change == 0) {
    return "nochange";
  } else {
    return "downchange";
  }
}
function getAnimationNameFromCL(cl) {
  switch (cl) {
    case "c":
      return "ceilchange";
    case "f":
      return "floorchange";
    case "d":
      return "downchange";
    case "i":
      return "upchange";
    case "e":
      return "nochange";
    default:
      return "nochange";
  }
}
function getSpanColorByValue(value, min, max, post_text = "") {
  if (value > 0) {
    value = formatMoney(value, min, max);
    return `<span class="text-upchange">+${value}${post_text}</span>
    `;
  } else if (value < 0) {
    value = formatMoney(value, min, max);
    return `<span class="text-downchange">${value}${post_text}</span>`;
  } else return `<span class="text-nochange">${value}${post_text}</span>`;
}
function getSpanColorByPerchange(change, perchange, cl) {
  const class_name = getClassTextColorFromCL(cl);
  if (cl == "i" || cl == "c") {
    return `<span class="${class_name}">+${change} (${perchange}%)</span>`;
  } else {
    return `<span class="${class_name}">${change} (${perchange}%)</span>`;
  }
}
function getClassColorByPercent(perchange) {
  if (perchange > 0) return "text-upchange";
  else if (perchange < 0) return "text-downchange";
  else return "text-nochange"
}
export const function_global = {
  getSpanColorByPerchange: getSpanColorByPerchange,
  getSpanColorByValue: getSpanColorByValue,
  getAnimationNameFromCL: getAnimationNameFromCL,
  getAnimationNameFromChange: getAnimationNameFromChange,
  getClassTextColorFromCL: getClassTextColorFromCL,
  calcCeilPrice: calcCeilPrice,
  calcFloorPrice: calcFloorPrice,
  getClassTextColorFromPrice: getClassTextColorFromPrice,
  getAnimationNameFromPrice: getAnimationNameFromPrice,
  getClassColorByPercent: getClassColorByPercent,
  formatMoney: formatMoney
}