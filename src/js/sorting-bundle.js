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
            let fa = a.ReadDate !== '' ? new Date(a.ReadDate) : new Date("1/1/1"),
                fb = b.ReadDate !== '' ? new Date(b.ReadDate) : new Date("1/1/1");
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
            let fa = a.CurrentReading !== '' ? parseFloat(a.CurrentReading?.split(',').join('')) : 0,
                fb = b.CurrentReading !== '' ? parseFloat(b.CurrentReading?.split(',').join('')) : 0;
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
            let fa = a.PreviousReading !== '' ? parseFloat(a.PreviousReading?.split(',').join('')) : 0,
                fb = b.PreviousReading !== '' ? parseFloat(b.PreviousReading?.split(',').join('')) : 0;
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
            let fa = a.TotalUsed !== "" ? parseFloat(a.TotalUsed.split(',').join('')) : 0,
                fb = b.TotalUsed !== "" ? parseFloat(b.TotalUsed.split(',').join('')) : 0;
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
            let fa = a.Low !== "" ? parseFloat(a.Low.split(',').join('')) : 0,
                fb = b.Low !== "" ? parseFloat(b.Low.split(',').join('')) : 0;
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
            let fa = a.Med !== "" ? parseFloat(a.Med.split(',').join('')) : 0,
                fb = b.Med !== "" ? parseFloat(b.Med.split(',').join('')) : 0;
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
            let fa = a.High !== "" ? parseFloat(a.High.split(',').join('')) : 0,
                fb = b.High !== "" ? parseFloat(b.High.split(',').join('')) : 0;
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
            let fa = a.Critical !== "" ? parseFloat(a.Critical.split(',').join('')) : 0,
                fb = b.Critical !== "" ? parseFloat(b.Critical.split(',').join('')) : 0;
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

//* SummaryBilling sort functions.
export const sortByAccountNumber = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = a.AccountNumber.toLowerCase(),
                fb = b.AccountNumber.toLowerCase();
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
export const sortByServiceAddress = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = a.ServiceAddress.toLowerCase(),
                fb = b.ServiceAddress.toLowerCase();
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

export const sortByCurrentCharges = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = a.CurrentCharges !== "" ? parseFloat(a.CurrentCharges.split(',').join('')) : 0,
                fb = b.CurrentCharges !== "" ? parseFloat(b.CurrentCharges.split(',').join('')) : 0;
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
export const sortByStatus = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = a.Status !== null ? a.Status : true,
                fb = b.Status !== null? b.Status : true;
            if (type == "asen") {
                if (fa && !fb) {
                    return -1;
                }
                if (!fa && fb) {
                    return 1;
                }
                return 0;
            } else {
                if (fa && !fb) {
                    return 1;
                }
                if (!fa && fb) {
                    return -1;
                }
                return 0;
            }
        });
    }
}

export const sortByContactName = (type, items) => {
    if (items && items.length > 1) {
        return items.sort((a, b) => {
            let fa = a.ContactName.toLowerCase(),
                fb = b.ContactName.toLowerCase();
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
