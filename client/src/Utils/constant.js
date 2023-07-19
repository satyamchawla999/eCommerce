export const BASE_IMG_URL = "http://localhost:8000/Products/";
export const BASE_USER_IMG_URL = "http://localhost:8000/Users/";

export const logo = "https://www.snitch.co.in/cdn/shop/files/blackoption_200x@2x.png?v=1659016547"

export const getValues = (product) => {

    const data = {
        name: product ? product?.name : "",
        category: product ? product?.category : "",
        subCategory: product ? product?.subCategory : "",
        price: product ? product?.price : "",
        description: product ? product?.description : "",
        uid: product ? product?.uid : "",
        vName: product ? product?.vName : "",
        vUid: product ? product?.vUid : "",
        brandName: product ? product?.brandName : "",
        draft: product ? product?.draft : false,
    }
    return data;
}

export const getImages = (product) => {
    const data = {
        image1: (product ? (BASE_IMG_URL + product?.imgUrl[0]) : ""),
        image2: (product ? (BASE_IMG_URL + product?.imgUrl[1]) : ""),
        image3: (product ? (BASE_IMG_URL + product?.imgUrl[2]) : ""),
        image4: (product ? (BASE_IMG_URL + product?.imgUrl[3]) : ""),
    }
    return data;
}

export const getUserImages = (user) => {
    let data = {}
    if (Object.keys(user).length === 0) {
        user = {
            imgUrl: ["NA", "NA"]
        }
    }
    data = {
        image1: (user?.imgUrl[0] !== "NA" ? (BASE_USER_IMG_URL + user?.imgUrl[0]) : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1200px-Missing_avatar.svg.png"),
        image2: (user?.imgUrl[1] !== "NA" ? (BASE_USER_IMG_URL + user?.imgUrl[1]) : "https://www.snitch.co.in/cdn/shop/files/blackoption_200x@2x.png?v=1659016547"),
    }
    return data;
}

export const callouts = [
    {
      name: '',
      description: 'Women Collection',
      imageSrc: require("../assets/images/women.png"),
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
      value: "female"
    },
    {
      name: '',
      description: 'Latest Collection',
      imageSrc: 'https://i.pinimg.com/originals/c7/09/ac/c709acb1309dfcccc6aa0d67a90a316c.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
      value: "all"
    },
    {
      name: '',
      description: 'Men Collection',
      imageSrc: require("../assets/images/man.png"),
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
      value: "male"
    },
  ]