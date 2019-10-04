const express = require("express");
const ejs = require("ejs");
const fs = require("fs");

const port = 8000;
const app = express();

let index = JSON.parse(fs.readFileSync("models/index.json"));
let nav = JSON.parse(fs.readFileSync("models/nav.json"));
let siteInfo = JSON.parse(fs.readFileSync("models/site-info.json"));

function renderPage(page, request, response)
{
    let pageContent = JSON.parse(fs.readFileSync("models/page/" + page.content));
    let pars = 
    {
        content: pageContent,
        nav: nav,
        site: siteInfo
    }
    response.render(pageContent.type, pars);
}

for(let page of index)
{
    app.get(page.name, (request, response) => renderPage(page, request, response));

    for(let altName of page.alts)
        app.get(altName, (request, response) => renderPage(page, request, response));
}

app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");

app.listen(port, () => console.log("Server listening on port " + port + "!"));