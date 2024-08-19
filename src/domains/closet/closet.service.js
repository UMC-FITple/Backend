import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addClothResponseDTO } from "./closet.dto.js";
import { clothAdd, getAddCloth } from "./closet.dao.js";

export const addMyCloth = async (userId, body) => {
    console.log("서비스 도착");
    const requiredFields = ['name', 'product_code', 'category', 'size', 'fit'];
    let miss;
    for(const field of requiredFields) {
        console.log("body[field]", body[field]);
        if(!body[field]) {
            miss = field;
        }
    }
    switch (miss) {
        case 'name':
            throw new BaseError(status.NAME_BAD_REQUEST);
        case 'product_code':
            throw new BaseError(status.CODE_BAD_REQUEST);
        case 'category':
            throw new BaseError(status.CATEGORY_BAD_REQUEST);
        case 'size':
            throw new BaseError(status.SIZE_BAD_REQUEST);
        case 'fit':
            throw new BaseError(status.FIT_BAD_REQUEST);
      }


    const clothData = await clothAdd({
        'uuid': userId,
        'brand': body.brand,
        'name': body.name,
        'product_code': body.product_code,
        'category': body.category,
        'size': body.size,
        'fit': body.fit,
        'color': body.color,
        'url': body.url,
        'rating': body.rating,
        'memo': body.memo
    });
    console.log("옷 삽입");
    return addClothResponseDTO(await getAddCloth(clothData));
}