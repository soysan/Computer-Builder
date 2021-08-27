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
    "/pics/pc1.jpg",
    "/pics/pc2.jpg",
    "/pics/pc3.png",
    "/pics/pc4.png",
    "/pics/pc5.png"
]

const errorPic = "/pics/err.png";

export  {
    config,
    imgs,
    errorPic
}
