import { config, imgs, errorPic } from "../params.js";
import Controller from "../controller/controller.js";
import Options from "./options.js";

class View {
  count = 1;

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

export default View;
