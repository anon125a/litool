const libName = document.getElementById("lib-selection");
const dataType = document.getElementById("data-selection");
let offset = [document.getElementById("offset0"),document.getElementById("offset1"),document.getElementById("offset2"),document.getElementById("offset3")];
let editValue = [document.getElementById("editto0"),document.getElementById("editto1"),document.getElementById("editto2"),document.getElementById("editto3")];
const genCPPBtn = document.getElementById("gen-cpp");
const genLUABtn = document.getElementById("gen-lua");
const genField = document.getElementById("gen-box");
const body = document.getElementById("boddy");
const mulOff = document.getElementById("m-off");

let type;

const generateCPP = () => {
    if(!checkDatas()) {
        alert("Fill All Requirement");
    } else {
    genField.style.padding = "1rem 2rem";
    body.style.height = "fit-content";
    checkType();
    genField.innerText = `#include "LibBaseMemTool.h"
    int main(int argc,char **argv)
    {
        int ipid;
        PACKAGENAME *bm;
        PACKAGENAME *pgl = "com.tencent.ig";
        PACKAGENAME *pkr = "com.pubg.krmobile";
        PACKAGENAME *pnv = "com.vng.pubgmobile";
        PACKAGENAME *ptw = "com.rekoo.pubgm";
        PACKAGENAME *pin = "com.pubg.imobile";
        PACKAGENAME *pcn = "com.meowos.messenger";
        int pubgCN = getPID(pcn);
        int pubgGL = getPID(pgl);
        int pubgKR = getPID(pkr);
        int pubgVN = getPID(pnv);
        int pubgTW = getPID(ptw);
        int pubgIN = getPID(pin);
        if (pubgGL > 0) {
                bm = "com.tencent.ig";
                ipid = pubgGL;
        } else if(pubgKR > 0) {
                bm = "com.pubg.krmobile";
                ipid = pubgKR;
        }else if(pubgVN > 0) {
               bm = "com.vng.pubgmobile";
               ipid = pubgVN;
        }else if(pubgTW > 0) {
               bm = "com.rekoo.pubgm";
               ipid = pubgTW;
        }else if(pubgIN > 0) {
               bm = "com.pubg.imobile";
               ipid = pubgIN;
        }else {
            puts("Game Is Not Opened Yet!!");
            return 1;
        }
        BypassGameSafe();
        char mname[]="${libName.value}";
        long int libbase=get_module_base(ipid, mname);
        ${manageOffEditcpp()}
        RevertBypassGameSafe();
        return 0;
    };`;
}
}

const generateLUA = () => {
    if(!checkDatas()) {
        alert("Fill All Requirement");
    } else {
    body.style.height = "fit-content";
    genField.style.padding = "1rem 2rem";
    genField.innerText = `function setvalue(address,flags,value) local tt={} tt[1]={} tt[1].address=address tt[1].flags=flags tt[1].value=value gg.setValues(tt) end .
    an=gg.getRangesList ('${libName.value}') [1] .start
    ${manageOffEditlua()}`;
    }
};
const checkMatch = () => {
    let i = 0, lengthOff = 0,lengthEdit = 0;
    for(i=0; i<4 ; i++) {
        offset[i].value === "" ? console.log(" ") : lengthOff++;
        editValue[i].value === "" ? console.log(" ") : lengthEdit++;
    }
    if(lengthOff === lengthEdit) { 
        return lengthOff;
     } else {
        alert("Number of input of offset and editvalue differs!!");
        location.reload();
    }
}

const manageOffEditlua = () => {
    let toreturn = " ";
    let length = checkMatch();
    for(i=0; i<length ; i++) {
        toreturn += `\n on${i}=${offset[i].value}
        setvalue(an+on${i},${dataType.value},${editValue[i].value})`;
    }
    return toreturn;
}

const manageOffEditcpp = () => {
    let toreturn = " ";
    let length = checkMatch();
    for(i=0; i<length ; i++) {
        toreturn += `\nlong int by${[i]}=libbase + ${offset[i].value};
        WriteAddress_${type}(bm,by${[i]},${editValue[i].value});`
    }
    return toreturn;
}



const checkType = () => {
    if(dataType.value === "16") {
        type = "FLOAT";
    } else if(dataType.value === "4") {
        type = "DWORD";
    } else if(dataType.value === "1") {
        type = "BYTE";
    } else if(dataType.value === "32") {
        type = "QWORD";
    }
}

const checkDatas = () => {
    if(offset[0].value === "" || editValue.value === "") {
        return false;
    } else {
        return true;
    }
}

const displayManager = (array, type) => {
    let i = 0;
    for(const element of array) {
        i === 0 ? element.style.display = "block" : element.style.display = type;
        element.value = "";
        i++;
    }
}

const multipleOffset = () => {
    if(mulOff.textContent === "Multiple Offsets") {
        mulOff.textContent = "Single Offset";
        displayManager(offset,"block");
        displayManager(editValue,"block");
    } else {
        mulOff.textContent = "Multiple Offsets";
        displayManager(offset,"none");
        displayManager(editValue,"none");
    }
    
}

genCPPBtn.addEventListener('click', generateCPP);
genLUABtn.addEventListener('click', generateLUA);
mulOff.addEventListener('click', multipleOffset);