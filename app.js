const config = {
  parentId: "target",
  url: "https://api.recursionist.io/builder/computers?type=",
  cpu: {
    brand: "#cpu_brand",
    model: "#cpu_model",
  },
  gpu: {
    brand: "#gpu_brand",
    model: "#gpu_model",
  },
  ram: {
    num: "#num",
    brand: "#ram_brand",
    model: "#ram_model",
  },
  storage: {
    disk: "#disk",
    storage: "#storage",
    brand: "#disk_brand",
    model: "#disk_model",
  },
  btn: "#showPcs",
  show: "#pcs",
};

const imgs = [
  "https://www.sozai-library.com/wp-content/uploads/2016/04/7606-300x225.jpg",
  "https://publicdomainq.net/images/201802/20s/publicdomainq-0019100lxx.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCjyztNf0Tm1M720Kd0RWj6ACMWtjdYvVimg&usqp=CAU",
  "https://us.123rf.com/450wm/lineartestpilot/lineartestpilot1603/lineartestpilot160334169/53891344-%E6%89%8B%E6%9B%B8%E3%81%8D%E3%81%AE%E3%83%86%E3%82%AF%E3%82%B9%E3%83%81%E3%83%A3%E6%BC%AB%E7%94%BB%E3%83%87%E3%82%B9%E3%82%AF%E3%83%88%E3%83%83%E3%83%97-%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%82%BF%E3%83%BC.jpg?ver=6",
  "https://illustimage.com/photo/649.png"
]

const errorPic = "https://lh3.googleusercontent.com/proxy/VrzDdgv4B77u-hC8ILcB_UE6yBwWpDSrPTWxZAna4mr4pCHvtqSabvhy5PYeQwUx-8vbhN2VHOw";

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
    for (let i = 0; i < storage.length; i++){
      if (storage[i].includes("TB")) tb.push(parseFloat(storage[i].replace("TB",'')));
      else gb.push(parseFloat(storage[i].replace("GB",'')));
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
class View {
  static count = 1;

  static displayPcSpecs = () => {
    const pcSpec = document.querySelectorAll(config.show)[0];
    let btn = document.querySelectorAll(config.btn)[0];
    btn.addEventListener('click', () => {
      let div = document.createElement('div');
      let benchmarks = Options.setBenchmark();
      if (benchmarks === null) {
        div.innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
          <h3 class="col ">Please choose your PC Spec</h3>
          <img src=${errorPic} style="width: 100%; height: 80%" class="col">
        </div>
        `;
        pcSpec.append(div);
        return pcSpec;
      }
      let gaming = 0;
      let working = 0;
      for (let i in benchmarks) {
        if (i === "cpu") {
          gaming += benchmarks[i] * .25;
          working += benchmarks[i] * .6;
        }
        if (i === "gpu") {
          gaming += benchmarks[i] * .6;
          working += benchmarks[i] * .25;
        }
        if (i === "ram") {
          gaming += benchmarks[i] * .12;
          working += benchmarks[i] * .1;
        }
        if (i === "disk") {
          gaming += benchmarks[i] * .1;
          working += benchmarks[i] * 0.05;
        }
      }
      const spec = Controller.getSpec();
      const img = imgs[Math.floor(Math.random() * (imgs.length + 1))];
      div.innerHTML =
        `
        <div class="d-flex justify-content-around">
          <h3>PC${View.count}</h3>
          <h3><span class="badge badge-pill badge-success">Gaming</span>${Math.floor(gaming)}%</h3>
          <h3><span class="badge badge-pill badge-warning">Working</span>${Math.floor(working)}%</h3>
        </div>
        <div class="p-3 row">
          <div class="d-flex flex-column col">
            <div>
              <h3><span class="badge badge-primary">CPU</span></h3>
              <p>Brand :${spec.cpu.brand}</p>
              <p>Model :${spec.cpu.model}</p>
            </div>
            <div>
              <h3><span class="badge badge-primary">GPU</span></h3>
              <p>Brand :${spec.gpu.brand}</p>
              <p>Model :${spec.gpu.model}</p>
            </div>
            <div>
              <h3><span class="badge badge-primary">RAM</span></h3>
              <p>Brand :${spec.ram.brand}</p>
              <p>Model :${spec.ram.model}</p>
            </div>
            <div>
              <h3><span class="badge badge-primary">DISK</span></h3>
              <p>Disk : ${spec.disk.disk}</p>
              <p>Storage:${spec.disk.storage}</p>
              <p>Brand :${spec.disk.brand}</p>
              <p>Model :${spec.disk.model}</p>
            </div>
          </div>
          <div class="col">
            <img src=${img} style="width: 100%; height: 80%">
          </div>
        </div>
      `;
      View.count++;
      pcSpec.append(div);
      return pcSpec;
    });
  }
  static initialDisplay = () => {
    const parent = document.getElementById(config.parentId);
    let main = document.createElement("div");
    main.innerHTML = `
    <div class="bg-light p-3">
      <header class="bg-dark d-flex justify-content-center text-white">
        <h1>Build Your Own PC</h1>
      </header>
      <main>
        <div class="p-2">
          <h3 class="col">Step 1: Select your CPU</h3>
          <form class="form-inline">
            <label for="cpu_brand" class="p-2"><h5>Brand</h5></label>
            <select class="form-control" id="cpu_brand">
              <option>choose brand</option>
            </select>
            <label for="cpu_model" class="p-2"><h5>Model</h5></label>
            <select class="form-control" id="cpu_model">
              <option>choose model</option>
            </select>
          </form>
          <h3>Step 2: Select your GPU</h3>
          <form class="form-inline">
            <label for="gpu_brand" class="p-2"><h5>Brand</h5></label>
            <select class="form-control" id="gpu_brand">
                <option>choose brand</option>
            </select>
            <label for="gpu_model" class="p-2"><h5>Model</h5></label>
            <select class="form-control" id="gpu_model">
              <option>choose model</option>
            </select>
          </form>
          <h3>Step 3: Select your memory card</h3>
          <form class="form-inline">
            <label for="num" class="p-2"><h5>How Many?</h5></label>
            <select class="form-control" id="num">
              <option>choose slot number</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <label for="ram_brand" class="p-2"><h5>Brand</h5></label>
            <select class="form-control" id="ram_brand">
              <option>choose brand</option>
            </select>
            <label for="ram_model" class="p-2"><h5>Model</h5></label>
            <select class="form-control" id="ram_model">
              <option>choose model</option>
            </select>
          </form>
          <h3>Step 4: Select your storage</h3>
          <form class="form-inline">
            <label for="disk" class="p-2"><h5>HDD or SSD</h5></label>
            <select class="form-control" id="disk">
              <option>choose Disk</option>
              <option>HDD</option>
              <option>SSD</option>
            </select>
            <label for="storage" class="p-2"><h5>Storage</h5></label>
            <select class="form-control" id="storage">
              <option>choose Storage</option>
            </select>
            <label for="disk_brand" class="p-2"><h5>Brand</h5></label>
            <select class="form-control" id="disk_brand">
              <option>choose brand</option>
            </select>
            <label for="disk_model" class="p-2"><h5>Model</h5></label>
            <select class="form-control" id="disk_model">
              <option>choose model</option>
            </select>
          </form>
          <div id="showPcs" class="btn my-3">
            <button class="btn btn-info px-3">Add PC</button>
          </div>
        </div>
      </main>
      <footer>
        <div id="pcs" class="h-30 bg-info text-white p-3"></div>
      </footer>
    </div>
        `;
    parent.append(main);
    return parent;
  }
}

View.initialDisplay();
Options.getCpuData();
Options.getGpuData();
Options.getRamData();
Options.getStorageData();
View.displayPcSpecs();
