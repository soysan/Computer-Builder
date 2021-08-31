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
    "https://github.com/soysan/Computer-Builder/blob/main/pics/pc1.png?raw=true",
    "https://github.com/soysan/Computer-Builder/blob/main/pics/pc2.png?raw=true",
    "https://github.com/soysan/Computer-Builder/blob/main/pics/pc3.png?raw=true",
    "https://github.com/soysan/Computer-Builder/blob/main/pics/pc4.png?raw=true
",
    "https://github.com/soysan/Computer-Builder/blob/main/pics/pc5.png?raw=true"
]

const errorPic = "https://github.com/soysan/Computer-Builder/blob/main/pics/err.png?raw=true";

export  {
    config,
    imgs,
    errorPic
}
