import forge from "node-forge";
import { fetch, Body } from "@tauri-apps/api/http";
import uuid4 from "uuid4";

const signUrl = (url: string) => {
  const key = "aVwDprJBYvnz1NBs8W7GBuaHQDeoynolGF5IdsxyYP6lyCzxAOG38hleJo43NnB6";
  const ts = new Date().getTime();

  const hmac = forge.hmac.create();
  hmac.start("sha1", key);
  hmac.update(url.slice(0, 255));
  hmac.update(String(ts));

  return {
    ts,
    hmac: forge.util.encode64(hmac.digest().bytes()),
  };
};

const generateSid = () => {
  const version = "1.9.12";

  return `${version}_${uuid4()}`;
};

export const translatePapago = (source: string, target: string, image: File, langDetect: boolean) => {
  return new Promise<any>(async (res, rej) => {
    const sig = signUrl("https://apis.naver.com/papago/papago_app/ocr/detect");

    fetch("https://apis.naver.com/papago/papago_app/ocr/detect", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "User-Agent": "okhttp/4.9.1",
      },
      query: {
        msgpad: String(sig.ts),
        md: sig.hmac,
      },
      body: Body.form({
        lang: "all",
        upload: "true",
        sid: generateSid(),
        imageId: "",
        reqType: "",
        source: langDetect ? target : source,
        target,
        image: {
          file: new Uint8Array(await image.arrayBuffer()),
          fileName: "image",
          mime: "application/octet-stream",
        },
      }),
    })
      .then((resp) => res(resp.data))
      .catch((err) => rej(err));
  });
};
