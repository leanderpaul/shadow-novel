function getTags() {
  let arr = [];
  document.querySelectorAll('#showtags a').forEach((ele) => arr.push(ele.innerText));
  return arr.join(', ');
}
