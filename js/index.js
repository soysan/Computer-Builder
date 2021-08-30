import Options from "./controller/options.js";
import View from "./views/view.js";
import PCModel from "./model/model.js";

const pc = new PCModel;

View.initialDisplay(pc);
Options.getCpuData(pc);
Options.getGpuData(pc);
Options.getRamData(pc);
Options.getStorageData(pc);
