import * as moment from 'moment';

export function validateEmail(email) {

    // Biểu thức chính quy kiểm tra địa chỉ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Kiểm tra xem email có khớp với biểu thức chính quy hay không
    return emailRegex.test(email);
}

export const isValidBase64 = (str) => {
    try {
        if (str == '') {
            return true; // Cho phép trống nếu str là null hoặc undefined
        }
        if (!str.startsWith('data:image/') || !str.includes(';base64,')) {
            return false;
        }

        const firstChar = str.charAt(str.indexOf(';base64,') + ';base64,'.length);
        if (firstChar !== '/' && firstChar !== '+') {
            return false;
        }

        const padding = str.endsWith('==') ? 2 : (str.endsWith('=') ? 1 : 0);
        return (str.length - str.indexOf(';base64,') - ';base64,'.length - padding) % 4 === 0;
    } catch (error) {
        return false;
    }
}


export const validateDescription = (description) => {
    if (description == '') {
        return true; // Cho phép trống nếu str là null hoặc undefined
    }
    return description.length <= 128;
}
export const validateName = (str) => {
    if (str == '') {
        return true; // Cho phép trống nếu str là null hoặc undefined
    }
    return str.length >= 1;
}
export const validatePassword = (str) => {

    return str.length >= 1;
}

export const validateDateOfBirth = (dateString: string, format: string = 'YYYY-MM-DD'): boolean => {
    return moment(dateString, format, true).isValid();
}

