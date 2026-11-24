import type { Connector } from "@/lib/connectors/types";
import { coinAfrique } from "@/lib/connectors/coinafrique";
import { expatDakar } from "@/lib/connectors/expat-dakar";

/** Registered connectors. A source needs ToS review + a connector here to be crawled. */
export const CONNECTORS: Connector[] = [expatDakar, coinAfrique];
