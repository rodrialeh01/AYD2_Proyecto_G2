import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      console.log("setupNodeEvents");
      console.log("on", on);
      console.log("config", config);
      
    },
  },
});
