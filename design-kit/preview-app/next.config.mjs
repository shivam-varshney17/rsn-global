import {fileURLToPath} from "node:url";
import path from "node:path";
export default {turbopack:{root:path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..")}};
