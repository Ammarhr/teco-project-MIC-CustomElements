const o=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.MeterNumber.toLowerCase(),e=i.MeterNumber.toLowerCase();return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},f=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.ReadDate!==""?new Date(n.ReadDate):new Date("1/1/1"),e=i.ReadDate!==""?new Date(i.ReadDate):new Date("1/1/1");return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},l=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.BillingPeriod,e=i.BillingPeriod;return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},g=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{var s,a;let r=n.CurrentReading!==""?parseFloat((s=n.CurrentReading)==null?void 0:s.split(",").join("")):0,e=i.CurrentReading!==""?parseFloat((a=i.CurrentReading)==null?void 0:a.split(",").join("")):0;return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},c=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{var s,a;let r=n.PreviousReading!==""?parseFloat((s=n.PreviousReading)==null?void 0:s.split(",").join("")):0,e=i.PreviousReading!==""?parseFloat((a=i.PreviousReading)==null?void 0:a.split(",").join("")):0;return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},d=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.TotalUsed!==""?parseFloat(n.TotalUsed.split(",").join("")):0,e=i.TotalUsed!==""?parseFloat(i.TotalUsed.split(",").join("")):0;return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},C=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.Low!==""?parseFloat(n.Low.split(",").join("")):0,e=i.Low!==""?parseFloat(i.Low.split(",").join("")):0;return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},p=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.Med!==""?parseFloat(n.Med.split(",").join("")):0,e=i.Med!==""?parseFloat(i.Med.split(",").join("")):0;return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},h=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.High!==""?parseFloat(n.High.split(",").join("")):0,e=i.High!==""?parseFloat(i.High.split(",").join("")):0;return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},w=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.Critical!==""?parseFloat(n.Critical.split(",").join("")):0,e=i.Critical!==""?parseFloat(i.Critical.split(",").join("")):0;return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},B=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.Service.toLowerCase(),e=i.Service.toLowerCase();return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},j=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.AccountNumber.toLowerCase(),e=i.AccountNumber.toLowerCase();return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},L=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.ServiceAddress.toLowerCase(),e=i.ServiceAddress.toLowerCase();return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},y=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.CurrentCharges!==""?parseFloat(n.CurrentCharges.split(",").join("")):0,e=i.CurrentCharges!==""?parseFloat(i.CurrentCharges.split(",").join("")):0;return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},F=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{var s,a;let r=((s=n.Status)==null?void 0:s.toLowerCase())||"",e=((a=i.Status)==null?void 0:a.toLowerCase())||"";return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})},R=(u,t)=>{if(t&&t.length>1)return t.sort((n,i)=>{let r=n.ContactName.toLowerCase(),e=i.ContactName.toLowerCase();return u=="asen"?r<e?-1:r>e?1:0:r<e?1:r>e?-1:0})};export{w as a,h as b,p as c,C as d,d as e,c as f,g,l as h,f as i,o as j,R as k,F as l,y as m,L as n,j as o,B as s};
//# sourceMappingURL=sorting-bundle.66f869c4.js.map
