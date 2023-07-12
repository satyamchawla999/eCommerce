export const BASE_IMG_URL = "http://localhost:8000/Products/";

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