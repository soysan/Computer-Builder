import { config } from "../params.js";
import Controller from "./controller.js";

class Options {
    static getCpuData = (pc) => {
        const url = config.url + "cpu";
        const brandOp = document.querySelectorAll(config.cpu.brand)[0];
        const modelOp = document.querySelectorAll(config.cpu.model)[0];

        fetch(url).then(res => res.json()).then(data => {

            const brand = Controller.getBrand(data);
            const model = Controller.getModel(data);
            for (let i in brand) {
                let op = document.createElement('option');
                op.innerText = brand[i];
                op.value = brand[i];
                brandOp.append(op);
            }

            brandOp.addEventListener("change", () => {
                modelOp.innerHTML = "<option>Choose Model</option>";
                const choseBrand = document.querySelectorAll(config.cpu.brand)[0].value;
                for (let i = 0; i < model[choseBrand].length; i++) {
                    let op = document.createElement('option');
                    op.innerText = model[choseBrand][i];
                    op.value = model[choseBrand][i];
                    modelOp.append(op);
                }
            });

            modelOp.addEventListener("change", () => {
                const pickedModel = document.querySelectorAll(config.cpu.model)[0].value;
                pc.cpuBenchMark = Controller.getBenchmark(data, pickedModel);
            });
        })
    }


    static getGpuData = (pc) => {
        const url = config.url + "gpu";
        const brandOp = document.querySelectorAll(config.gpu.brand)[0];
        const modelOp = document.querySelectorAll(config.gpu.model)[0];

        fetch(url).then(res => res.json()).then(data => {
            const brand = Controller.getBrand(data);
            const model = Controller.getModel(data);
            for (let i in brand) {
                let op = document.createElement('option');
                op.innerText = brand[i];
                op.value = brand[i];
                brandOp.append(op);
            }

            brandOp.addEventListener("change", () => {
                modelOp.innerHTML = "<option>Choose Model</option>";
                const choseBrand = document.querySelectorAll(config.gpu.brand)[0].value;
                for (let i = 0; i < model[choseBrand].length; i++) {
                    let op = document.createElement('option');
                    op.innerText = model[choseBrand][i];
                    op.value = model[choseBrand][i];
                    modelOp.append(op);
                }
            });

            modelOp.addEventListener('change', () => {
                const pickedModel = document.querySelectorAll(config.gpu.model)[0].value;
                pc.gpuBenchMark = Controller.getBenchmark(data, pickedModel);
            })
        });
    }

    static getRamData = (pc) => {
        document.querySelectorAll(config.ram.num)[0].addEventListener('change', () => {
            const url = config.url + "ram";
            const brandOp = document.querySelectorAll(config.ram.brand)[0];
            const modelOp = document.querySelectorAll(config.ram.model)[0];
            brandOp.innerHTML = '<option>Choose Brand</option>';
            modelOp.innerHTML = '<option>Choose Model</option>';

            fetch(url).then(res => res.json()).then(data => {
                const brand = Controller.getBrand(data);
                const model = Controller.getModel(data);
                for (let i in brand) {
                    let op = document.createElement('option');
                    op.innerText = brand[i];
                    op.value = brand[i];
                    brandOp.append(op);
                }

                brandOp.addEventListener("change", () => {
                    modelOp.innerHTML = "<option>Choose Model</option>";
                    const HowManySlot = parseInt(document.querySelectorAll(config.ram.num)[0].value);
                    const choseBrand = document.querySelectorAll(config.ram.brand)[0].value;
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
                    const pickedModel = document.querySelectorAll(config.ram.model)[0].value;
                    pc.ramBenchMark = Controller.getBenchmark(data, pickedModel);
                });
            })
        });
    }

    static getStorageData = (pc) => {
        document.querySelectorAll(config.storage.disk)[0].addEventListener('change', () => {
            const disk = document.querySelectorAll(config.storage.disk)[0].value;
            const url = config.url + disk.toLowerCase();
            const brandOp = document.querySelectorAll(config.storage.brand)[0];
            const modelOp = document.querySelectorAll(config.storage.model)[0];
            const storageOp = document.querySelectorAll(config.storage.storage)[0];
            brandOp.innerHTML = "<option>Choose Brand</option>";
            modelOp.innerHTML = "<option>Choose Model</option>";
            storageOp.innerHTML = "<option>Choose Storage</option>";

            fetch(url).then(res => res.json()).then(data => {
                const brand = Controller.getBrand(data);
                const model = Controller.getModel(data);
                const storage = Controller.getStorageModel(data);
                const sortedStorage = Controller.sortStorage(storage);

                for (let i = 0; i < sortedStorage.length; i++) {
                    const op = document.createElement('option');
                    op.innerHTML = sortedStorage[i];
                    op.value = sortedStorage[i];
                    storageOp.append(op);
                }

                storageOp.addEventListener('change', () => {
                    for (let i in brand) {
                        const op = document.createElement('option');
                        op.innerText = brand[i];
                        op.value = brand[i];
                        brandOp.append(op);
                    }

                    brandOp.addEventListener("change", () => {
                        modelOp.innerHTML = "<option>Choose Model</option>";
                        const pickedStorage = document.querySelectorAll(config.storage.storage)[0].value;
                        const choseBrand = document.querySelectorAll(config.storage.brand)[0].value;
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
                    const pickedModel = document.querySelectorAll(config.storage.model)[0].value;
                    pc.storageBenchMark = Controller.getBenchmark(data, pickedModel);
                })
            });
        });
    }
}

export default Options;
