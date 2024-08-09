export const memberResponseDTO = (user) => {
    return {
        "uuid" : user[0].uuid,
        "id" : user[0].id,
        // "email" : user[0].email,
        // "password" : user[0].password,
        // "name" : user[0].name,           // 필요한 정보
        "gender" : user[0].gender,
        // "one_line_info" : user[0].one_line_info,
        // "img_url" : user[0].img_url,     // 필요한 정보
    };
}

export const bodyinfoResponseDTO = (bodyInfo) => {
    return {
        "id": bodyInfo[0].id,
        "uuid": bodyInfo[0].uuid,
        "height": bodyInfo[0].height,
        "weight": bodyInfo[0].weight,
        "shoulder_width": bodyInfo[0].shoulder_width,
        "chest_circumference": bodyInfo[0].chest_circumference,
        "arm_length": bodyInfo[0].arm_length,
        "waist_circumference": bodyInfo[0].waist_circumference,
        "thigh_circumference": bodyInfo[0].thigh_circumference,
        "hip_circumference": bodyInfo[0].hip_circumference
    };
}

export const member_styleResponseDTO = (member_style) => {
    return {
        "id": member_style[0].id,
        "uuid": member_style[0].uuid,
        "style_id": member_style[0].style_id
    };
}

export const member_fitResponseDTO = (member_fit) => {
    return {
        "id": member_fit[0].id,
        "uuid": member_fit[0].uuid,
        "fit_id": member_fit[0].fit_id
    };
}

export const fitResponseDTO = (fit) => {
    return {
        "id": fit[0].id,
        "name": fit[0].name
    };
}

export const styleResponseDTO = (style) => {
    return {
        "id": style[0].id,
        "name": style[0].name
    };
}
