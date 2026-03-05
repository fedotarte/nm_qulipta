import { Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

const sourceCodePro400 = Source_Sans_3({ weight: "400" });

const sourceCodePro700 = Source_Sans_3({ weight: "700" });

const sourceSansPro = localFont({
  src: "./fonts/SourceSansPro-Regular.ttf",
  weight: "400",
});

export { sourceCodePro400, sourceCodePro700, sourceSansPro };
