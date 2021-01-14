import Options from "./views/options.js";
import View from "./views/view.js";

View.initialDisplay();
Options.getCpuData();
Options.getGpuData();
Options.getRamData();
Options.getStorageData();
View.displayPcSpecs();
