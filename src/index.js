import view from "../views/view.bjs";
import test from "../views/test.bjs";
import app from "../views/layouts/app.bjs";
import { Runtime } from "@tarik02/bladejs";


const runtime = new Runtime([
  {
    async getTemplateCompiledFile(name) {
      if (name === "view") {
        return view;
      }
      return undefined;
    },

    async isOutdated(name, template, creationTime) {
      return false;
    },
  },
]);

(async () => {
  if (typeof document !== "undefined") {
    let data = "";
    for await (const chunk of runtime.render("view", { myVar: "myValue" })) {
      data += chunk;
    }
    document.write(data);
  } else {
    for await (const chunk of runtime.render("view")) {
      global.process.stdout.write(chunk);
    }
  }
})();
