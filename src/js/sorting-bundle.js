export const sortByMeterNumber = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = a.MeterNumber.toLowerCase(),
                fb = b.MeterNumber.toLowerCase();
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}
export const sortByReadDate = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = new Date(a.ReadDate),
                fb = new Date(b.ReadDate);
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}
export const sortByBillingPeriod = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = a.BillingPeriod,
                fb = b.BillingPeriod;
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {

                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}
export const sortByBilledAmount = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = a.BilledAmount.toLowerCase(),
                fb = b.BilledAmount.toLowerCase();
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}
export const sortByCurrentReading = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = a !== '' ? parseFloat(a.CurrentReading?.split(',').join('')) : 0,
                fb = b !== '' ? parseFloat(b.CurrentReading?.split(',').join('')) : 0;
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}
export const sortByPreviousReading = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = a !== '' ? parseFloat(a.PreviousReading.split(',').join('')) : 0,
                fb = b !== '' ? parseFloat(b.PreviousReading.split(',').join('')) : 0;
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}
export const sortByTotalUsed = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = parseFloat(a.TotalUsed.split(',').join('')),
                fb = parseFloat(b.TotalUsed.split(',').join(''));
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}
export const sortByLow = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = parseFloat(a.Low.split(',').join('')),
                fb = parseFloat(b.Low.split(',').join(''));
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}
export const sortByMed = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = parseFloat(a.Med.split(',').join('')),
                fb = parseFloat(b.Med.split(',').join(''));
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}
export const sortByHigh = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = parseFloat(a.High.split(',').join('')),
                fb = parseFloat(b.High.split(',').join(''));
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}
export const sortByCritical = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = parseFloat(a.Critical.split(',').join('')),
                fb = parseFloat(b.Critical.split(',').join(''));
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}
export const sortByService = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = a.Service.toLowerCase(),
                fb = b.Service.toLowerCase();
            if (type == "asen") {
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}