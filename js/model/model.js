class PCModel {
  static count = 1;

  constructor() {
    this.cpuBrand = null;
    this.cpuModel = null;
    this.cpuBenchMark = null;
    this.gpuBrand = null;
    this.gpuModel = null;
    this.gpuBenchMark = null;
    this.ramCount = null;
    this.ramBrand = null;
    this.ramModel = null;
    this.ramBenchMark = null;
    this.disk = null;
    this.storage = null;
    this.storageBrand = null;
    this.storageModel = null;
    this.storageBenchMark = null;
  }

  calcGamingScore = () => {
    const cpu = this.cpuBenchMark * .25;
    const gpu = this.gpuBenchMark * .6;
    const ram = this.ramBenchMark * .125;
    const storage = this.disk === 'SSD' ? this.storageBenchMark * .1 : this.storageBenchMark * .025;
    return Math.floor(cpu + gpu + ram + storage);
  }

  calcWorkingScore = () => {
    const cpu = parseInt(this.cpuBenchMark * .6);
    const gpu = parseInt(this.gpuBenchMark * .25);
    const ram = parseInt(this.ramBenchMark * .1);
    const storage = parseInt(this.storageBenchMark * .5)
    return Math.floor(cpu + gpu + ram + storage);
  }

  resetPc = () => {
    this.cpuBrand = null;
    this.cpuModel = null;
    this.cpuBenchMark = null;
    this.gpuBrand = null;
    this.gpuModel = null;
    this.gpuBenchMark = null;
    this.ramCount = null;
    this.ramBrand = null;
    this.ramModel = null;
    this.ramBenchMark = null;
    this.disk = null;
    this.storage = null;
    this.storageBrand = null;
    this.storageModel = null;
    this.storageBenchMark = null;
  }
}

export default PCModel;
