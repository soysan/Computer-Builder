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
    "../pics/pc1.png",
    "../pics/pc2.png",
    "../pics/pc3.png",
    "../pics/pc4.png",
    "../pics/pc5.png"
]

const errorPic = "https://github.com/soysan/Computer-Builder/blob/main/pics/err.png?raw=true";

export  {
    config,
    imgs,
    errorPic
}
