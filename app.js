const libName = document.getElementById("lib-selection");
const dataType = document.getElementById("data-selection");
const offset = document.getElementById("offset");
const editValue = document.getElementById("edit-to");
const genCPPBtn = document.getElementById("gen-cpp");
const genLUABtn = document.getElementById("gen-lua");
const genField = document.getElementById("gen-box");
const body = document.getElementById("boddy");

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
        long int by=libbase + ${offset.value};
        WriteAddress_${type}(bm,by,${editValue.value});
        RevertBypassGameSafe();
        return 0;
    };`;
}
}

const generateLUA = () => {
    if(!checkDatas()) {
        alert("Fill All Requirement");
    } else {
     window.innerWidth > 680 ? body.style.height = "100vh" : body.style.height = "fit-content";
    genField.style.padding = "1rem 2rem";
    genField.innerText = `function setvalue(address,flags,value) local tt={} tt[1]={} tt[1].address=address tt[1].flags=flags tt[1].value=value gg.setValues(tt) end .
    an=gg.getRangesList ('${libName.value}') [1] .start
    on=${offset.value}
    setvalue(an+on,${dataType.value},${editValue.value})`;
    }
};

const checkType = () => {
    if(dataType.value === "16") {
        type = "FLOAT";
    } else if(dataType.value === "4") {
        type = "DWORD";
    } else if(dataType.value === "1") {
        type = "BYTE";
    }
}

const checkDatas = () => {
    if(offset.value === "" || editValue.value === "") {
        return false;
    } else {
        return true;
    }
}

genCPPBtn.addEventListener('click', generateCPP);
genLUABtn.addEventListener('click', generateLUA);
