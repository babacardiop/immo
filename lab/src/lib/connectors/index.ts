import type { Connector } from "@/lib/connectors/types";
import { annoncesImmoSenegal } from "@/lib/connectors/annonces-immo-senegal";
import { appartSn } from "@/lib/connectors/appart-sn";
import { arkadia } from "@/lib/connectors/arkadia";
import { coinAfrique } from "@/lib/connectors/coinafrique";
import { diwaan } from "@/lib/connectors/diwaan";
import { espaceVilla } from "@/lib/connectors/espacevilla";
import { expatDakar } from "@/lib/connectors/expat-dakar";
import { immoStar, troisH } from "@/lib/connectors/g5ere";
import { greenAcres } from "@/lib/connectors/green-acres";
import { habita } from "@/lib/connectors/habita";
import { immobilierSn } from "@/lib/connectors/immobilier-sn";
import { immoSenegal } from "@/lib/connectors/immo-senegal";
import { immolux } from "@/lib/connectors/immolux";
import { immooz } from "@/lib/connectors/immooz";
import { jiji } from "@/lib/connectors/jiji";
import { oroSira } from "@/lib/connectors/jsonld-sitemap";
import { logerDakar } from "@/lib/connectors/loger-dakar";
import { luxuryEstate } from "@/lib/connectors/luxuryestate";
import { logerSenegal } from "@/lib/connectors/logersenegal";
import { paSenegal } from "@/lib/connectors/pa-senegal";
import { senemarket } from "@/lib/connectors/senemarket";
import { seneweb } from "@/lib/connectors/seneweb";
import { snimmo, twoSimmo } from "@/lib/connectors/wpresidence";

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
  paSenegal,
  immoSenegal,
  immolux,
  immooz,
  // diwaan-immo: ToS override by product owner 24/11/2026 (collection/exploitation clause).
  diwaan,
  // appart-sn, green-acres-sn: ToS override by product owner 24/11/2026.
  appartSn,
  greenAcres,
  twoSimmo,
  snimmo,
  troisH,
  immoStar,
  senemarket,
  luxuryEstate,
  // orosira-sn: generic IP clause + Arcjet — waiting for product-owner go (not ToS-approved).
  oroSira,
];
