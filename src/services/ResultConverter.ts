import { Base64 } from 'js-base64'

/**
 * 결과 유형을 URL상으로 알아보기 어렵게 하기위해 한번 꼬아준다.
 * - ex) 13 -> Base64.encode(typeNumber13)
 */
export namespace ResultConverter {
    export const decode = (encodedResult: string) => {
        let decoded = Base64.decode(encodedResult || "0")
        return decoded.replace('typeNumber', '')
    }

    export const encode = (typeNumber: number) => {
        return Base64.encodeURI(`typeNumber${typeNumber}`)
    }    
}