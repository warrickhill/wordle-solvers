// Load `*.js` under current directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require("fs")
  .readdirSync(__dirname + "/", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .forEach(function (file) {
    exports[file] = require("./" + file);
  });
