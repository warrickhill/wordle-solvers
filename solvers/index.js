require("fs")
    .readdirSync(__dirname + "/", { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .forEach(function (file) {
        exports[file] = require("./" + file)
    })
