import Medusa from "@medusajs/medusa-js";
// @ts-expect-error -- TODO: Fix "cannot find module" issue.
import { PUBLIC_MEDUSA_BACKEND_URL } from '$env/static/public';

const BACKEND_URL = PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export const createClient = () => new Medusa({ baseUrl: BACKEND_URL, maxRetries: 3 });