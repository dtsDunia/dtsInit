import { Config } from "@/Config";

export default function () {
    const imgFor = (path:string|null|undefined, useOri:boolean) => {
        if(useOri){
            return Config.API_IMGORI+path
        }else{
            return Config.API_IMG500+path
        }
    }
    return {imgFor}
}