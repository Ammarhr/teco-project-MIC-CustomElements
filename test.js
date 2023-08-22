var browserName = "";
var browserVersion = "";

// Get the user agent string
var userAgentString = navigator.userAgent;

// Detect Chrome
if (userAgentString.indexOf("Edg") > -1) {
    browserName = "Microsoft Edge";
}

// Detect Firefox
else if (userAgentString.indexOf("Firefox") > -1) {
    browserName = "Firefox";
}

// Detect Internet Explorer
else if (userAgentString.indexOf("MSIE") > -1) {
    browserName = "Internet Explorer";
}

// Detect Microsoft Edge
else if (userAgentString.indexOf("Chrome") > -1) {
    browserName = "Chrome";
}
// Detect Safari
else if (userAgentString.indexOf("Safari") > -1) {
    browserName = "Safari";
}

console.log("Browser name: " + browserName);
console.log("Browser version: " + browserVersion);


///////////////


export function getProperties(values, defaultProperties, target) {
    if (!values.Showflaginside) {
        hidePropertiesIn(defaultProperties, values, ["Showflag"]);
    }
    return defaultProperties;
}
function hidePropertiesIn(propertyGroups, _value, keys) {
    keys.forEach(key =>
        modifyProperty((_, index, container) => container.splice(index, 1), propertyGroups, key, undefined, undefined)
    );/
}
function modifyProperty(modify, propertyGroups, key, nestedPropIndex, nestedPropKey) {
    propertyGroups.forEach(propGroup => {
        if (propGroup.propertyGroups) {
            modifyProperty(modify, propGroup.propertyGroups, key, nestedPropIndex, nestedPropKey);
        }
        propGroup.properties?.forEach((prop, index, array) => {
            if (prop.key === key) {
                if (nestedPropIndex === undefined || nestedPropKey === undefined) {
                    modify(prop, index, array);
                } else if (prop.objects) {
                    modifyProperty(modify, prop.objects[nestedPropIndex].properties, nestedPropKey);
                } else if (prop.properties) {
                    modifyProperty(modify, prop.properties[nestedPropIndex], nestedPropKey);
                }
            }
        });
    });
}