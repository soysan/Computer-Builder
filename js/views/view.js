import Controller from "../controller/controller.js";
import { config } from "../params.js";
import PCModel from "../model/model.js";
class View {

  static errSpec = (pcSpec, div, errorPic) => {
    div.innerHTML = `
        <div class="d-flex justify-content-center align-items-center">
          <h3 class="col ">Please choose your PC Spec</h3>
          <img src=${errorPic} style="width: 100%; height: 80%" class="col">
        </div>
        `;
    pcSpec.append(div);
    return pcSpec;
  }

  static displayPcSpecs = (pcSpec, div, img, pc) => {
    const working = pc.calcWorkingScore();
    const gaming = pc.calcGamingScore();
    div.innerHTML =
      `
        <div class="d-flex justify-content-around">
          <h3>PC${PCModel.count}</h3>
          <h3><span class="badge badge-pill badge-success">Gaming</span>${gaming}%</h3>
          <h3><span class="badge badge-pill badge-warning">Working</span>${working}%</h3>
        </div>
        <div class="p-3 row">
          <div class="d-flex flex-column col">
            <div>
              <h3><span class="badge badge-primary">CPU</span></h3>
              <p>Brand :${pc.cpuBrand}</p>
              <p>Model :${pc.cpuModel}</p>
            </div>
            <div>
              <h3><span class="badge badge-primary">GPU</span></h3>
              <p>Brand :${pc.gpuBrand}</p>
              <p>Model :${pc.gpuModel}</p>
            </div>
            <div>
              <h3><span class="badge badge-primary">RAM</span></h3>
              <p>Brand :${pc.ramBrand}</p>
              <p>Model :${pc.ramModel}</p>
            </div>
            <div>
              <h3><span class="badge badge-primary">DISK</span></h3>
              <p>Disk : ${pc.disk}</p>
              <p>Storage:${pc.storage}</p>
              <p>Brand :${pc.storageBrand}</p>
              <p>Model :${pc.storageModel}</p>
            </div>
          </div>
          <div class="col">
            <img src=${img} style="width: 100%; height: 80%">
          </div>
        </div>
      `;
    pcSpec.append(div);
    return pcSpec;
  };

  static initialDisplay = (pc) => {
    const parent = document.getElementById(config.parentId);
    let main = document.createElement("div");
    main.innerHTML =
      `
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
              <option>Choose Brand</option>
            </select>
            <label for="cpu_model" class="p-2"><h5>Model</h5></label>
            <select class="form-control" id="cpu_model">
              <option>Choose Model</option>
            </select>
          </form>
          <h3>Step 2: Select your GPU</h3>
          <form class="form-inline">
            <label for="gpu_brand" class="p-2"><h5>Brand</h5></label>
            <select class="form-control" id="gpu_brand">
                <option>Choose Brand</option>
            </select>
            <label for="gpu_model" class="p-2"><h5>Model</h5></label>
            <select class="form-control" id="gpu_model">
              <option>Choose Model</option>
            </select>
          </form>
          <h3>Step 3: Select your memory card</h3>
          <form class="form-inline">
            <label for="num" class="p-2"><h5>How Many?</h5></label>
            <select class="form-control" id="num">
              <option>Choose Slot Number</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <label for="ram_brand" class="p-2"><h5>Brand</h5></label>
            <select class="form-control" id="ram_brand">
              <option>Choose Brand</option>
            </select>
            <label for="ram_model" class="p-2"><h5>Model</h5></label>
            <select class="form-control" id="ram_model">
              <option>Choose Model</option>
            </select>
          </form>
          <h3>Step 4: Select your storage</h3>
          <form class="form-inline">
            <label for="disk" class="p-2"><h5>HDD or SSD</h5></label>
            <select class="form-control" id="disk">
              <option>Choose Disk</option>
              <option>HDD</option>
              <option>SSD</option>
            </select>
            <label for="storage" class="p-2"><h5>Storage</h5></label>
            <select class="form-control" id="storage">
              <option>Choose Storage</option>
            </select>
            <label for="disk_brand" class="p-2"><h5>Brand</h5></label>
            <select class="form-control" id="disk_brand">
              <option>Choose Brand</option>
            </select>
            <label for="disk_model" class="p-2"><h5>Model</h5></label>
            <select class="form-control" id="disk_model">
              <option>Choose Model</option>
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
    document.querySelectorAll(config.btn)[0].addEventListener('click',() => Controller.displayResult(pc));
    return parent;
  }
}

export default View;
