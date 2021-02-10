import { config } from "../params.js";
import Controller from "../controller/controller.js";

class Options {
    static cupBenchmark = 0;
    static gpuBenchmark = 0;
    static ramBenchmark = 0;
    static diskBenchmark = 0;

    static getCpuData = () => {
        const url = config.url + "cpu";
        const brandOp = document.querySelectorAll(config.cpu.brand)[0];
        const modelOp = document.querySelectorAll(config.cpu.model)[0];

        fetch(url).then(res => res.json()).then(data => {
            let brand = Controller.getBrand(data);
            let model = Controller.getModel(data);
            for (let i in brand) {
                let op = document.createElement('option');
                op.innerText = brand[i];
                op.value = brand[i];
                brandOp.append(op);
            }

            brandOp.addEventListener("change", () => {
                modelOp.innerHTML = "<option>choose model</option>";
                let choseBrand = document.querySelectorAll(config.cpu.brand)[0].value;
                for (let i = 0; i < model[choseBrand].length; i++) {
                    let op = document.createElement('option');
                    op.innerText = model[choseBrand][i];
                    op.value = model[choseBrand][i];
                    modelOp.append(op);
                }
            });

            modelOp.addEventListener("change", () => {
                let pickedModel = document.querySelectorAll(config.cpu.model)[0].value;
                Options.cupBenchmark = Controller.getBenchmark(data, pickedModel);
            });
        });
    }

    static getGpuData = () => {
        const url = config.url + "gpu";
        const brandOp = document.querySelectorAll(config.gpu.brand)[0];
        const modelOp = document.querySelectorAll(config.gpu.model)[0];

        fetch(url).then(res => res.json()).then(data => {
            let brand = Controller.getBrand(data);
            let model = Controller.getModel(data);
            for (let i in brand) {
                let op = document.createElement('option');
                op.innerText = brand[i];
                op.value = brand[i];
                brandOp.append(op);
            }

            brandOp.addEventListener("change", () => {
                modelOp.innerHTML = "<option>choose model</option>";
                let choseBrand = document.querySelectorAll(config.gpu.brand)[0].value;
                for (let i = 0; i < model[choseBrand].length; i++) {
                    let op = document.createElement('option');
                    op.innerText = model[choseBrand][i];
                    op.value = model[choseBrand][i];
                    modelOp.append(op);
                }
            });

            modelOp.addEventListener('change', () => {
                let pickedModel = document.querySelectorAll(config.gpu.model)[0].value;
                Options.gpuBenchmark = Controller.getBenchmark(data, pickedModel);
            })
        });
    }

    static getRamData = () => {
        document.querySelectorAll(config.ram.num)[0].addEventListener('change', () => {
            const url = config.url + "ram";
            const brandOp = document.querySelectorAll(config.ram.brand)[0];
            const modelOp = document.querySelectorAll(config.ram.model)[0];
            brandOp.innerHTML = '<option>choose brand</option>';
            modelOp.innerHTML = '<option>choose model</option>';

            fetch(url).then(res => res.json()).then(data => {
                let brand = Controller.getBrand(data);
                let model = Controller.getModel(data);
                for (let i in brand) {
                    let op = document.createElement('option');
                    op.innerText = brand[i];
                    op.value = brand[i];
                    brandOp.append(op);
                }

                brandOp.addEventListener("change", () => {
                    modelOp.innerHTML = "<option>choose model</option>";
                    let HowManySlot = parseInt(document.querySelectorAll(config.ram.num)[0].value);
                    let choseBrand = document.querySelectorAll(config.ram.brand)[0].value;
                    for (let i = 0; i < model[choseBrand].length; i++) {
                        let op = document.createElement('option');
                        if (Controller.getLimitOfSlot(model[choseBrand][i]) <= HowManySlot) {
                            op.innerText = model[choseBrand][i];
                            op.value = model[choseBrand][i];
                            modelOp.append(op);
                        }
                    }
                });
                modelOp.addEventListener('change', () => {
                    let pickedModel = document.querySelectorAll(config.ram.model)[0].value;
                    Options.ramBenchmark = Controller.getBenchmark(data, pickedModel);
                });
            })
        });
    }

    static getStorageData = () => {
        document.querySelectorAll(config.storage.disk)[0].addEventListener('change', () => {
            let disk = document.querySelectorAll(config.storage.disk)[0].value;
            const url = config.url + disk.toLowerCase();
            const brandOp = document.querySelectorAll(config.storage.brand)[0];
            const modelOp = document.querySelectorAll(config.storage.model)[0];
            const storageOp = document.querySelectorAll(config.storage.storage)[0];
            brandOp.innerHTML = "<option>choose brand</option>";
            modelOp.innerHTML = "<option>choose model</option>";
            storageOp.innerHTML = "<option>choose storage</option>";

            fetch(url).then(res => res.json()).then(data => {
                let brand = Controller.getBrand(data);
                let model = Controller.getModel(data);
                let storage = Controller.getStorageModel(data);
                let sortedStorage = Controller.sortStorage(storage);

                for (let i = 0; i < sortedStorage.length; i++) {
                    let op = document.createElement('option');
                    op.innerHTML = sortedStorage[i];
                    op.value = sortedStorage[i];
                    storageOp.append(op);
                }

                storageOp.addEventListener('change', () => {
                    for (let i in brand) {
                        let op = document.createElement('option');
                        op.innerText = brand[i];
                        op.value = brand[i];
                        brandOp.append(op);
                    }

                    brandOp.addEventListener("change", () => {
                        modelOp.innerHTML = "<option>choose model</option>";
                        let pickedStorage = document.querySelectorAll(config.storage.storage)[0].value;
                        let choseBrand = document.querySelectorAll(config.storage.brand)[0].value;
                        for (let i = 0; i < model[choseBrand].length; i++) {
                            let op = document.createElement('option');
                            if (model[choseBrand][i].includes(pickedStorage)) {
                                op.innerText = model[choseBrand][i];
                                op.value = model[choseBrand][i];
                                modelOp.append(op);
                            }
                        }
                    });
                });
                modelOp.addEventListener('change', () => {
                    let pickedModel = document.querySelectorAll(config.storage.model)[0].value;
                    Options.diskBenchmark = Controller.getBenchmark(data, pickedModel);
                })
            });
        });
    }

    static setBenchmark = () => {
        let benchmarks = {
            cpu: Options.cupBenchmark,
            gpu: Options.gpuBenchmark,
            ram: Options.ramBenchmark,
            disk: Options.diskBenchmark,
        };
        for (let i in benchmarks) {
            if (benchmarks[i] === 0) return null;
        }
        return benchmarks;
    }
}

export default Options;
