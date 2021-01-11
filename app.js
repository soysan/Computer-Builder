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
  display: "#showPc",
};

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
    let str = modelSpec.substring(modelSpec.length - 6, modelSpec.length - 2);
    return parseInt(str[0]);
  }
}

class View {
  static getCpuData = () => {
    let url = config.url + "cpu";
    let brandOp = document.querySelectorAll(config.cpu.brand)[0];
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
        let modelOp = document.querySelectorAll(config.cpu.model)[0];
        modelOp.innerHTML = "";
        let choseBrand = document.querySelectorAll(config.cpu.brand)[0].value;
        for (let i = 0; i < model[choseBrand].length; i++) {
          let op = document.createElement('option');
          op.innerText = model[choseBrand][i];
          op.value = model[choseBrand][i];
          modelOp.append(op);
        }
      });
    });
  }

  static getGpuData = () => {
    let url = config.url + "gpu";
    let brandOp = document.querySelectorAll(config.gpu.brand)[0];
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
        let modelOp = document.querySelectorAll(config.gpu.model)[0];
        modelOp.innerHTML = "";
        let choseBrand = document.querySelectorAll(config.gpu.brand)[0].value;
        for (let i = 0; i < model[choseBrand].length; i++) {
          let op = document.createElement('option');
          op.innerText = model[choseBrand][i];
          op.value = model[choseBrand][i];
          modelOp.append(op);
        }
      });
    });
  }

  static getRamData = () => {
    let url = config.url + "ram";
    let brandOp = document.querySelectorAll(config.ram.brand)[0];
    let modelOp = document.querySelectorAll(config.ram.model)[0];
    let numOp = document.querySelectorAll(config.ram.num)[0]; // 途中でhow many? を変えると挙動が変になる
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
        modelOp.innerHTML = "";
        let HowManySlot = parseInt(document.querySelectorAll(config.ram.num)[0].value);
        console.log(HowManySlot)
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
    });
  }

  static initialDisplay = () => {
    let parent = document.getElementById(config.parentId);
    let main = document.createElement("div");
    main.innerHTML = `
    <div class="bg-light p-3">
      <header class="bg-dark d-flex justify-content-center text-white">
        <h1>Build Your Own PC</h1>
      </header>
      <main>
        <div class="p-2">
          <h3>Step 1: Select your CPU</h3>
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
          <div class="btn my-3">
            <button class="btn btn-info px-3">Add PC</button>
          </div>
        </div>
      </main>
      <footer>
        <div id="showPc" class="h-30 bg-dark">pc space</div>
      </footer>
    </div>
        `;
    parent.append(main);
    return parent;
  }
}

View.initialDisplay();
View.getCpuData()
View.getGpuData()
View.getRamData()
