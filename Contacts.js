//Contact
import fs from "fs";
import * as http from "http";
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  console.log(req.url);
  console.log(req.method);
  if (req.method === "GET" && req.url === "/users") {
    const values = fs.readFileSync("./Contacts.json").toString();
    res.statusCode = 200;
    res.end(values);
  } else if (req.method == "POST" && req.url === "/contacts") {
    res.statusCode = 200;
    const data = fs.readFileSync("./Contacts.json").toString();
    let contacts = JSON.parse(data);
    let s = "";
    req.on("data", (chunk) => {
      s += chunk;
    });
    req.on("end", () => {
      const newContact = JSON.parse(s);
      contacts.push(newContact);
      const updated = JSON.stringify(contacts, null);
      fs.writeFileSync("./Contacts.json", updated);
      res.end(updated);
    });
  } else {
    res.statuscode = 404;
    res.end("Error 404! Not Found");
  }
});
server.listen(3000, () => {
  console.log("Server is started and is listening at port 3000");
});