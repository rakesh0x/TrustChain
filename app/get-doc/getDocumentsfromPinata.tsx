import { PinataSDK } from "pinata";
import { pinata } from "@/utils/config";


export async function main() {
    try {
        
        const cidofthefile = localStorage.getItem("cid") as string;
        const data = await pinata.gateways.public.get(cidofthefile);
        console.log(data);

        const url = await pinata.gateways.constructor(
            cidofthefile
        )

        console.log(url);
    } catch (error) {
        console.log(error);
    }   
}

main();