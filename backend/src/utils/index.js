const fs = require("fs");
const path = require("path");

const readJson = (filename) => {
    const filePath = path.join(__dirname, "..", "data", filename);

    const rawData = fs.readFileSync(filePath);

    return JSON.parse(rawData);
};

const saveJson = (filename, data) => {
    const filePath = path.join(__dirname, "..", "data", filename);
    fs.writeFileSync(filePath, JSON.stringify(data));
};

module.exports = { readJson, saveJson };