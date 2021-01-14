import { config } from "../params.js";

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

    static getSpec = () => {
        let cpuBrand = document.querySelectorAll(config.cpu.brand)[0].value;
        let cpuModel = document.querySelectorAll(config.cpu.model)[0].value;
        let gpuBrand = document.querySelectorAll(config.gpu.brand)[0].value;
        let gpuModel = document.querySelectorAll(config.gpu.model)[0].value;
        let ramBrand = document.querySelectorAll(config.ram.brand)[0].value;
        let ramModel = document.querySelectorAll(config.ram.model)[0].value;
        let disk = document.querySelectorAll(config.storage.disk)[0].value;
        let storage = document.querySelectorAll(config.storage.storage)[0].value;
        let diskBrand = document.querySelectorAll(config.storage.brand)[0].value;
        let diskModel = document.querySelectorAll(config.storage.model)[0].value;
        let spec = {
            cpu: {
                brand: cpuBrand,
                model: cpuModel,
            },
            gpu: {
                brand: gpuBrand,
                model: gpuModel,
            },
            ram: {
                brand: ramBrand,
                model: ramModel,
            },
            disk: {
                disk: disk,
                storage: storage,
                brand: diskBrand,
                model: diskModel,
            }
        }
        return spec;
    }
}

export default Controller;
