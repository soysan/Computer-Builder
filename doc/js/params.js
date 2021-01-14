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
    "https://i1.wp.com/sozaikoujou.com/wordpress/wp-content/uploads/2015/04/th_kaden_ca_033.png?w=860&ssl=1",
    "https://illustimage.com/photo/649.png"
]

const errorPic = "https://lh3.googleusercontent.com/proxy/VrzDdgv4B77u-hC8ILcB_UE6yBwWpDSrPTWxZAna4mr4pCHvtqSabvhy5PYeQwUx-8vbhN2VHOw";

export  {
    config,
    imgs,
    errorPic
}
