const applyZipCodeMask = (zipCodeStr) => {
    return zipCodeStr
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2') 
        .substring(0, 9); 
}

const removeZipCodeMask = (zipCodeStr) => {
    return zipCodeStr.replace(/\D/g, ''); 
}

const formatZipCode = (zipCodeStr) => {
    zipCodeStr = zipCodeStr.replace(/\D/g, ''); 
    if (zipCodeStr.length > 8) {
        zipCodeStr = zipCodeStr.substring(0, 8); 
    }
    if (zipCodeStr.length > 5) {
        return `${zipCodeStr.substring(0, 5)}-${zipCodeStr.substring(5, 8)}`;
    } else {
        return zipCodeStr; 
    }
}

const applyPhoneMask = (phoneStr) => {
    return phoneStr
        .replace(/\D/g, '') 
        .replace(/(\d{2})(\d)/, '($1) $2') 
        .replace(/(\d{5})(\d)/, '$1-$2') 
        .substring(0, 15); 
}

const removePhoneMask = (phoneStr) => {
    return phoneStr.replace(/\D/g, ''); 
}

const formatPhone = (phoneStr) => {
    phoneStr = phoneStr.replace(/\D/g, ''); 
    if (phoneStr.length > 11 ) { 
        phoneStr = phoneStr.substring(0, 10);
    }
    if (phoneStr.length == 11 ) {
        return `(${phoneStr.substring(0, 2)}) ${phoneStr.substring(2, 7)}-${phoneStr.substring(7, 11)}`;
    } else if (phoneStr.length == 10 ) { 
        return `(${phoneStr.substring(0, 2)}) ${phoneStr.substring(2, 6)}-${phoneStr.substring(6, 10)}`;
    } else {
        return `(${phoneStr})`;
    }


}



