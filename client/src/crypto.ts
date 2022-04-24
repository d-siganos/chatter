import { AES, enc } from "crypto-ts";

export const encrypt = (text: string, key: string) => {
  return AES.encrypt(text, key).toString();
}

export const decrypt = (cipher: string, key: string) => {
  return AES.decrypt(cipher, key).toString(enc.Utf8);
}
