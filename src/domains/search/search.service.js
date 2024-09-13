import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { addClothResponseDTO } from "./search.dto.js";
import { clothAdd, getAddCloth } from "./search.dao.js";

export const addMyCloth = async (userId, body) => {
    const requiredFields = ['name', 'product_code', 'category', 'size', 'fit'];
    let miss;
    for(const field of requiredFields) {
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
        'image': body.image,
        'brand': body.brand,
        'name': body.name,
        'product_code': body.product_code,
        'category': body.category,
        'size': body.size,
        'fit': body.fit,
        'color': body.color,
        'url': body.url,
        'rating': body.rating,
        'memo': body.memo,
        'length': body.length,
        'shoulder': body.shoulder,
        'chest': body.chest,
        'armhole': body.armhole,
        'sleeve': body.sleeve,
        'sleeve_length': body.sleeve_length,
        'hem': body.hem
    });
    return addClothResponseDTO(await getAddCloth(clothData));
}