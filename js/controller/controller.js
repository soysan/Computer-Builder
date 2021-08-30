import PCModel from "../model/model.js";
import { config, errorPic, imgs } from "../params.js";
import View from "../views/view.js";

class Controller {
    static getBrand = data => {
        let brand = {};
        for (let i in data) {
            let currData = data[i];
            if (brand[currData.Brand] === undefined) brand[currData.Brand] = currData.Brand;
        }
        return brand;
    }

    static getModel = data => {
        let model = {};
        for (let i in data) {
            let currData = data[i];
            if (model[currData.Brand] === undefined) model[currData.Brand] = [currData.Model];
            else model[currData.Brand].push(currData.Model);
        }
        return model;
    }

    static getLimitOfSlot = modelSpec => {
        let slotLimit = modelSpec.substring(modelSpec.length - 6, modelSpec.length - 4);
        return parseInt(slotLimit);
    }

    static getStorageModel = data => {
        let storage = {};
        for (let i in data) {
            let currData = Controller.getStorage(data[i].Model);
            if (storage[currData] === undefined) storage[currData] = currData;
        }
        return storage;
    }

    static getStorage = modelSpec => {
        let storage = modelSpec.split(' ').filter(word => word.includes("GB") || word.includes("TB")).join('');
        return storage;
    }

    static sortStorage = stoObj => {
        let storage = Object.keys(stoObj);
        let tb = [];
        let gb = [];
        for (let i = 0; i < storage.length; i++) {
            if (storage[i].includes("TB")) tb.push(parseFloat(storage[i].replace("TB", '')));
            else gb.push(parseFloat(storage[i].replace("GB", '')));
        }
        let sortedTb = tb.sort((a, b) => b - a).map(x => x.toString() + "TB");
        let sortedGb = gb.sort((a, b) => b - a).map(x => x.toString() + "GB");
        return sortedTb.concat(sortedGb);
    }

    static getBenchmark = (data, picked) => {
        let benchmark = 0;
        for (let i in data) {
            let currData = data[i];
            if (currData.Model === picked) benchmark = currData.Benchmark;
        }
        return benchmark;
    }

    static setChoseSpec = (pc) => {
        pc.cpuBrand = document.querySelectorAll(config.cpu.brand)[0].value;
        pc.cpuModel = document.querySelectorAll(config.cpu.model)[0].value;
        pc.gpuBrand = document.querySelectorAll(config.gpu.brand)[0].value;
        pc.gpuModel = document.querySelectorAll(config.gpu.model)[0].value;
        pc.ramCount = document.querySelectorAll(config.ram.num)[0].value;
        pc.ramBrand = document.querySelectorAll(config.ram.brand)[0].value;
        pc.ramModel = document.querySelectorAll(config.ram.model)[0].value;
        pc.disk = document.querySelectorAll(config.storage.disk)[0].value;
        pc.storage = document.querySelectorAll(config.storage.storage)[0].value;
        pc.storageBrand = document.querySelectorAll(config.storage.brand)[0].value;
        pc.storageModel = document.querySelectorAll(config.storage.model)[0].value;
    }

    static displayResult = (pc) => {
        const pcSpec = document.querySelectorAll(config.show)[0];
        const div = document.createElement('div');
        const img = imgs[Math.floor(Math.random() * (imgs.length))];
        Controller.setChoseSpec(pc);
        const validatePc = Object.values(pc).every(val => val !== null);
        if (validatePc) {
            View.displayPcSpecs(pcSpec, div, img, pc);
        } else {
            View.errSpec(pcSpec, div, errorPic);
        }
        PCModel.count++;
    }
}

export default Controller;
