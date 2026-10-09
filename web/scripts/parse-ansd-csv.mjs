import fs from "node:fs";

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      q = !q;
      continue;
    }
    if ((c === "," && !q) || ((c === "\n" || c === "\r") && !q)) {
      row.push(cur.trim());
      cur = "";
      if (c !== ",") {
        if (row.some((x) => x)) rows.push(row);
        row = [];
        if (c === "\r" && text[i + 1] === "\n") i++;
      }
      continue;
    }
    cur += c;
  }
  if (cur || row.length) {
    row.push(cur.trim());
    if (row.some((x) => x)) rows.push(row);
  }
  return rows;
}

const path = process.argv[2];
const rows = parseCsv(fs.readFileSync(path, "utf8"));
const header = rows[0];
const data = rows.slice(1);
console.log("header", header.join(" | "));
console.log("rows", data.length);
const years = new Map();
const communes = new Map();
for (const r of data) {
  years.set(r[10], (years.get(r[10]) || 0) + 1);
  communes.set(r[3], (communes.get(r[3]) || 0) + 1);
}
console.log("years", [...years.entries()]);
console.log(
  "top communes\n" +
    [...communes.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([k, v]) => `${v}\t${k}`)
      .join("\n"),
);
