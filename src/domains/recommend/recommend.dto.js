import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

// 멤버 정보 dto
export const memberResponseDTO = (memberData, bodyData, fitData, styleData) => {

    const member = [];
    const fits = {};
    const styles = {};

    if(fitData.length != 0) {

        fitData.forEach(fit => {
            const { pf_name, uuid } = fit;
            if (!fits[uuid]) {
                fits[uuid] = []; // uuid가 없으면 배열 생성
            }
            fits[uuid].push(pf_name); // pf_name 추가
        });  
    }

    if(styleData.length !=0) {

        styleData.forEach(style => {
            const { style_name, uuid } = style;
            if (!styles[uuid]) {
                styles[uuid] = []; // uuid가 없으면 배열 생성
            }
            styles[uuid].push(style_name); // style_name 추가
        });  
    }

    if (memberData.length !== 0) {
        for (let i = 0; i < memberData.length; i++) {
            const uuid = memberData[i].uuid;
            
            console.log(i);
            // fits와 styles의 값이 존재하는지 확인
            const fitValue = (fits[uuid] !== undefined ? fits[uuid] : null);
            const styleValue = (styles[uuid] !== undefined ? styles[uuid] : null);
            
            // fitValue가 null인 경우 에러 처리
            try{
                if (fitValue === null) {
                    // signup의 EMPTY_DATA error
                    throw new BaseError(`Missing Data: Missing fit data for member with UUID ${uuid}. Fit: ${fitValue}`);
                }
                if (styleValue === null) {
                    // signup의 EMPTY_DATA error
                    throw new BaseError(`Missing Data: Missing style data for member with UUID ${uuid}. Style: ${styleValue}`);
                }
                if (memberData[i].nickname === null) {
                    // signup의 EMPTY_DATA error
                    throw new BaseError(`Missing Data: Missing nickname data for member with UUID ${uuid}. memberdata: ${memberData[i].nickname}`);
                }
                if (memberData[i].img_url === null) {
                    // signup의 EMPTY_DATA error
                    throw new BaseError(`Missing Data: Missing img_url data for member with UUID ${uuid}. img_url: ${memberData[i].img_url}`);
                }
                if (bodyData[i].weight === null) {
                    // signup의 EMPTY_DATA error
                    throw new BaseError(`Missing Data: Missing nickname data for member with UUID ${uuid}. memberdata: ${bodyData[i].weight}`);
                }
                if (bodyData[i].height === null) {
                    // signup의 EMPTY_DATA error
                    throw new BaseError(`Missing Data: Missing nickname data for member with UUID ${uuid}. memberdata: ${bodyData[i].height}`);
                }
            } catch(err) {
                console.log(err);
                throw new BaseError(status.EMPTY_DATA);
            }

            member.push({
                "uuid": uuid,
                "nickname": memberData[i].nickname,
                "img_url": memberData[i].img_url,
                "weight": bodyData[i].weight,
                "height": bodyData[i].height,
                "fit": fitValue,
                "style": styleValue
            });
        }
    }
    

    return {
        "member": member
    };
}

// 체형 정보 dto
export const bodyinfoResponseDTO = (data) => {

    const bodyinfo = [];
    
    if(data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            bodyinfo.push({
                "uuid": data[i].uuid,
                "height": data[i].height,
                "weight": data[i].weight,
                "shoulder_width": data[i].shoulder_width,
                "chest_circumference": data[i].chest_circumference,
                "arm_length": data[i].arm_length,
                "waist_circumference": data[i].waist_circumference,
                "thigh_circumference": data[i].thigh_circumference,
                "hip_circumference": data[i].hip_circumference
            })
        }
    }

    return {
        "bodyinfo": bodyinfo
    };
}

// 체형 정보 dto
export const bodyinfo_toFlask_DTO = (data) => {

    const bodyinfo = [];
    
    if(data.length != 0) {
        bodyinfo.push({
            "height": data[0].height,
            "weight": data[0].weight,
            "shoulder_width": data[0].shoulder_width,
            "chest_circumference": data[0].chest_circumference,
            "arm_length": data[0].arm_length,
            "waist_circumference": data[0].waist_circumference,
            "thigh_circumference": data[0].thigh_circumference,
            "hip_circumference": data[0].hip_circumference
        })
    }

    return {
        "bodyinfo": bodyinfo
    };
}

// 멤버-스타일 매핑 dto
export const member_styleResponseDTO = (data) => {
    const styles = {};
    const memberstyle = [];
    
    if(data.length != 0) {

        data.forEach(style => {
            const { style_name, uuid } = style;
            if (!styles[uuid]) {
                styles[uuid] = []; // uuid가 없으면 배열 생성
            }
            styles[uuid].push(style_name); // pf_name 추가
        });
        
        for (let i = 0; i < data.length; i++) {
            memberstyle.push({
                "uuid": data[i].uuid,
                "style_name": styles[data[i].uuid]
            })
        }
    }

    console.log("member_style: ", memberstyle);

    return {
        "memeberstyle": memberstyle
    }
}

// 멤버-스타일 매핑 dto
export const member_style_toFlaskDTO = (data) => {
    const memberstyle = [];
    
    if(data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            memberstyle.push({
                "style_name": data[i].style_name
            })
        }
    }

    return {
        "memeberstyle": memberstyle
    }
}

// 멤버-핏 매핑 dto
export const member_fitResponseDTO = (data) => {
    const fits = {};
    const memberfit = [];
    
    if(data.length != 0) {

        data.forEach(fit => {
            const { pf_name, uuid } = fit;
            if (!fits[uuid]) {
                fits[uuid] = []; // uuid가 없으면 배열 생성
            }
            fits[uuid].push(pf_name); // pf_name 추가
        });
        
        for (let i = 0; i < data.length; i++) {
            memberfit.push({
                "uuid": data[i].uuid,
                "pf_name": fits[data[i].uuid]
            })
        }
    }

    return {
        "memeberfit": memberfit
    }
}
