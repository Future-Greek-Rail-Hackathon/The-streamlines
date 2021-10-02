import dotenv from "dotenv-safe";

try {
  dotenv.config({ path: `./.env.${process.env.NODE_ENV}.local` });
} catch (e) {
  dotenv.config();
}

const DOTENV_READY = true;
export default DOTENV_READY;
