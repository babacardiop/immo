import type { Connector } from "@/lib/connectors/types";
import { annoncesImmoSenegal } from "@/lib/connectors/annonces-immo-senegal";
import { arkadia } from "@/lib/connectors/arkadia";
import { coinAfrique } from "@/lib/connectors/coinafrique";
import { espaceVilla } from "@/lib/connectors/espacevilla";
import { expatDakar } from "@/lib/connectors/expat-dakar";
import { habita } from "@/lib/connectors/habita";
import { immobilierSn } from "@/lib/connectors/immobilier-sn";
import { jiji } from "@/lib/connectors/jiji";
import { logerDakar } from "@/lib/connectors/loger-dakar";
import { logerSenegal } from "@/lib/connectors/logersenegal";
import { seneweb } from "@/lib/connectors/seneweb";

/**
 * Registered connectors. A source needs ToS review + a connector here to be crawled
 * (see `npm run crawl:all`).
 * ToS overrides by product owner (24/11/2026, internal research only, never republished):
 * coinafrique-sn, habita-sn, annonces-immo-senegal, arkadia-dakar, jiji-sn.
 */
export const CONNECTORS: Connector[] = [
  expatDakar,
  coinAfrique,
  seneweb,
  immobilierSn,
  logerSenegal,
  logerDakar,
  espaceVilla,
  habita,
  annoncesImmoSenegal,
  arkadia,
  jiji,
];
