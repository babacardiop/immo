# -*- coding: utf-8 -*-
"""Reorganize add-ons and partenaires specs into category folders."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# --- Add-ons ---
ADDON_CATS: dict[str, dict] = {
    "01-outils-simulateurs": {
        "title": "Outils & simulateurs",
        "desc": "Calculateurs lead magnet (mensualité, construction, budget, estimation, frais, carte prix).",
        "files": [
            "01-simulateur-mensualite.md",
            "02-simulateur-construction.md",
            "03-simulateur-budget-total.md",
            "04-estimation-vendeur.md",
            "10-simulateur-pret-a-batir.md",
            "18-calculateur-frais-acquisition.md",
            "34-comparateur-frais.md",
            "52-carte-prix-m2.md",
        ],
    },
    "02-terrain-construction": {
        "title": "Terrain & construction",
        "desc": "Du terrain sécurisé à la maison : diligence, bornage, permis, packs, chantier, viabilisation.",
        "files": [
            "06-pack-terrain-maison.md",
            "07-bornage-geometre.md",
            "08-due-diligence-fonciere.md",
            "09-permis-construire-cu.md",
            "25-plans-types.md",
            "26-suivi-chantier.md",
            "27-materiaux-marketplace.md",
            "41-forage-eau.md",
            "42-vrd-viabilisation.md",
            "43-regularisation-tf.md",
            "44-cloture-portail.md",
        ],
    },
    "03-location-gestion": {
        "title": "Location & gestion",
        "desc": "Bail, caution, EDL, assurances, portail proprio, maintenance, colocation, saisonnier.",
        "files": [
            "11-caution-locative.md",
            "12-etat-des-lieux-digital.md",
            "13-assurance-mrh.md",
            "14-assurance-pno.md",
            "22-portail-multi-biens.md",
            "23-scoring-locataire.md",
            "29-report-loyer.md",
            "30-demenagement-menage.md",
            "31-pack-meuble.md",
            "32-maintenance-marketplace.md",
            "38-reporting-fiscal.md",
            "46-contrat-entretien.md",
            "47-colocation-matching.md",
            "48-preavis-remise-cles.md",
            "49-location-saisonniere.md",
        ],
    },
    "04-vente-accession": {
        "title": "Vente, closing & accession",
        "desc": "Notaire, staging, escrow, épargne construction, crédit, co-acquisition, reprise étalé.",
        "files": [
            "17-notaire-pack-juridique.md",
            "24-epargne-construction.md",
            "28-credit-epargne-mfi.md",
            "33-home-staging-photo.md",
            "35-escrow-sequestre.md",
            "50-co-acquisition.md",
            "51-reprise-etale.md",
        ],
    },
    "05-diaspora-confiance": {
        "title": "Diaspora & confiance",
        "desc": "Inspection à distance, multi-devise, docs certifiés, conciergerie, procuration.",
        "files": [
            "15-inspection-diaspora.md",
            "16-multi-devise.md",
            "21-certification-docs.md",
            "36-conciergerie-bien-vide.md",
            "37-procuration-assist.md",
        ],
    },
    "06-energie-confort": {
        "title": "Énergie & confort",
        "desc": "Clim, solaire, groupe électrogène.",
        "files": [
            "19-pack-clim.md",
            "20-kit-solaire.md",
            "45-groupe-electrogene.md",
        ],
    },
    "07-contenu-marketing-b2b": {
        "title": "Contenu, marketing & B2B",
        "desc": "Guides SEO / blog, boost annonces, white-label branches.",
        "files": [
            "05-guides-seo.md",
            "39-annonces-boost.md",
            "40-white-label.md",
        ],
    },
}

# --- Partenaires ---
PARTNER_CATS: dict[str, dict] = {
    "01-construction-chantier": {
        "title": "Construction & chantier",
        "desc": "BTP, archi, géomètre, forage, VRD, clôture, matériaux.",
        "files": [
            "01-constructeur-btp.md",
            "02-architecte.md",
            "06-geometre-bornage.md",
            "13-forage-eau.md",
            "14-vrd-viabilisation.md",
            "20-cloture-portail.md",
            "21-materiaux-negoce.md",
        ],
    },
    "02-juridique-admin": {
        "title": "Juridique & administratif",
        "desc": "Notaire, formalités, avocat, huissier, fiscalité foncière.",
        "files": [
            "03-notaire.md",
            "04-formalites-papiers-legaux.md",
            "07-avocat-immobilier.md",
            "12-expert-fiscal-foncier.md",
            "19-huissier.md",
        ],
    },
    "03-finance-assurance": {
        "title": "Finance & assurance",
        "desc": "Financier gros tickets, crédit, assureur, fintech caution/escrow.",
        "files": [
            "05-financier-investissement.md",
            "08-courtier-credit-banque.md",
            "09-assureur-courtier.md",
            "23-fintech-caution-escrow.md",
        ],
    },
    "04-diaspora-services": {
        "title": "Diaspora & services",
        "desc": "Inspection, déménagement, clim, solaire, photo, syndic.",
        "files": [
            "10-inspection-diaspora.md",
            "15-installateur-solaire.md",
            "16-clim-froid.md",
            "17-demenagement.md",
            "18-photo-home-staging.md",
            "22-syndic-copropriete.md",
        ],
    },
    "05-reseau-stock": {
        "title": "Réseau & stock",
        "desc": "Promoteurs et agences partenaires.",
        "files": [
            "11-promoteur-lots.md",
            "24-agence-partenaire-reseau.md",
        ],
    },
}

TITLES_ADDON = {
    "01-simulateur-mensualite.md": ("Simulateur de mensualité", "P0"),
    "02-simulateur-construction.md": ("Simulateur coût de construction", "P0"),
    "03-simulateur-budget-total.md": ("Simulateur budget total projet", "P0"),
    "04-estimation-vendeur.md": ("Estimation de bien (vendeur)", "P0"),
    "05-guides-seo.md": ("Guides & pages outils SEO", "P0"),
    "06-pack-terrain-maison.md": ("Pack Terrain → Maison", "P1"),
    "07-bornage-geometre.md": ("Bornage / géomètre", "P1"),
    "08-due-diligence-fonciere.md": ("Due diligence foncière", "P1"),
    "09-permis-construire-cu.md": ("Permis de construire & CU", "P1"),
    "10-simulateur-pret-a-batir.md": ("Simulateur terrain nu → prêt à bâtir", "P1"),
    "11-caution-locative.md": ("Caution locative digitale", "P1"),
    "12-etat-des-lieux-digital.md": ("État des lieux digital", "P1"),
    "13-assurance-mrh.md": ("Assurance habitation (MRH)", "P1"),
    "14-assurance-pno.md": ("Assurance PNO", "P1"),
    "15-inspection-diaspora.md": ("Inspection à distance (diaspora)", "P1"),
    "16-multi-devise.md": ("Affichage multi-devise", "P1"),
    "17-notaire-pack-juridique.md": ("Notaire / pack juridique", "P1"),
    "18-calculateur-frais-acquisition.md": ("Calculateur frais d'acquisition", "P1"),
    "19-pack-clim.md": ("Pack climatisation + entretien", "P1"),
    "20-kit-solaire.md": ("Kit solaire / onduleur", "P1"),
    "21-certification-docs.md": ("Coffre-fort documents / certification", "P1"),
    "22-portail-multi-biens.md": ("Portail multi-biens propriétaire", "P1"),
    "23-scoring-locataire.md": ("Garant / scoring locataire", "P1"),
    "24-epargne-construction.md": ("Calendrier d'épargne construction", "P1"),
    "25-plans-types.md": ("Plans types / catalogues maisons", "P2"),
    "26-suivi-chantier.md": ("Suivi de chantier léger", "P2"),
    "27-materiaux-marketplace.md": ("Marketplace matériaux", "P3"),
    "28-credit-epargne-mfi.md": ("Crédit / épargne construction (MFI)", "P3"),
    "29-report-loyer.md": ("Report / lissage de loyer", "P2"),
    "30-demenagement-menage.md": ("Déménagement / ménage", "P2"),
    "31-pack-meuble.md": ("Pack meublé / kit premier logement", "P2"),
    "32-maintenance-marketplace.md": ("Marketplace maintenance", "P2"),
    "33-home-staging-photo.md": ("Home staging / shoot photo", "P2"),
    "34-comparateur-frais.md": ("Comparateur frais", "P2"),
    "35-escrow-sequestre.md": ("Escrow / séquestre paiements", "P2"),
    "36-conciergerie-bien-vide.md": ("Conciergerie bien vide", "P2"),
    "37-procuration-assist.md": ("Assistance procuration (POA)", "P2"),
    "38-reporting-fiscal.md": ("Reporting fiscal annuel proprio", "P2"),
    "39-annonces-boost.md": ("Boost SEO / social annonces", "P2"),
    "40-white-label.md": ("White-label branche / agence partenaire", "P3"),
    "41-forage-eau.md": ("Forage / adduction eau", "P2"),
    "42-vrd-viabilisation.md": ("VRD / viabilisation lot", "P2"),
    "43-regularisation-tf.md": ("Régularisation / montée en TF", "P2"),
    "44-cloture-portail.md": ("Clôture & portail", "P2"),
    "45-groupe-electrogene.md": ("Groupe électrogène / stabilisateur", "P2"),
    "46-contrat-entretien.md": ("Contrat entretien multi-technique", "P2"),
    "47-colocation-matching.md": ("Colocation / coliving matching", "P2"),
    "48-preavis-remise-cles.md": ("Préavis & remise des clés pack", "P2"),
    "49-location-saisonniere.md": ("Location saisonnière / meublé diaspora", "P2"),
    "50-co-acquisition.md": ("Co-acquisition familiale", "P2"),
    "51-reprise-etale.md": ("Transfert / reprise dossier étalé", "P2"),
    "52-carte-prix-m2.md": ("Carte prix/m² par quartier", "P2"),
}


def move_tree(base: Path, cats: dict[str, dict], fix_blog_links: bool = False) -> dict[str, str]:
    """Move files into category dirs. Returns {filename: category_slug}."""
    mapping: dict[str, str] = {}
    specs = base / "specs"
    if not specs.exists():
        raise SystemExit(f"missing {specs}")

    # Collect current locations (flat or already nested)
    current: dict[str, Path] = {}
    for p in specs.rglob("*.md"):
        current[p.name] = p

    for slug, meta in cats.items():
        dest_dir = specs / slug
        dest_dir.mkdir(parents=True, exist_ok=True)
        for fname in meta["files"]:
            if fname not in current:
                print("WARN missing", fname)
                continue
            src = current[fname]
            dest = dest_dir / fname
            if src.resolve() != dest.resolve():
                if dest.exists():
                    dest.unlink()
                shutil.move(str(src), str(dest))
                print("move", src.relative_to(ROOT), "->", dest.relative_to(ROOT))
            mapping[fname] = slug

            if fix_blog_links and fname == "05-guides-seo.md":
                text = dest.read_text(encoding="utf-8")
                # Depth: specs/cat/file → need ../../../blog
                text2 = text.replace("](../../blog/", "](../../../blog/")
                if text2 != text:
                    dest.write_text(text2, encoding="utf-8")
                    print("fixed blog links in", dest.name)

    # Remove empty leftover dirs under specs (not category dirs)
    for p in list(specs.iterdir()):
        if p.is_dir() and p.name not in cats:
            # only remove if empty or only leftovers
            leftover = list(p.rglob("*"))
            if not leftover or all(x.is_dir() for x in leftover):
                shutil.rmtree(p, ignore_errors=True)

    # Remove any stray md still at specs root
    for p in specs.glob("*.md"):
        print("WARN still at root:", p.name)

    return mapping


def write_addons_readme(mapping: dict[str, str]) -> None:
    lines = [
        "# Specs add-ons (1 fichier = 1 add-on)",
        "",
        "Organisées par **catégorie**. Overview : [`docs/add-ons.md`](../add-ons.md).",
        "",
        "## Catégories",
        "",
        "| Dossier | Thème | Nb |",
        "| --- | --- | --- |",
    ]
    for slug, meta in ADDON_CATS.items():
        lines.append(
            f"| [`specs/{slug}/`](./specs/{slug}/) | {meta['title']} | {len(meta['files'])} |"
        )
    lines += ["", "---", ""]

    for slug, meta in ADDON_CATS.items():
        lines += [
            f"## {meta['title']}",
            "",
            f"{meta['desc']}",
            "",
            "| # | Add-on | Priorité | Fichier |",
            "| --- | --- | --- | --- |",
        ]
        for fname in meta["files"]:
            title, prio = TITLES_ADDON[fname]
            num = fname[:2]
            lines.append(
                f"| {num} | {title} | {prio} | [`{fname}`](./specs/{slug}/{fname}) |"
            )
        lines += ["", ""]

    lines += [
        "## Comment utiliser",
        "",
        "1. Lire l'overview [`../add-ons.md`](../add-ons.md).",
        "2. Implémenter d'abord les **P0** puis **P1**.",
        "3. Chaque spec : problème, marché, inputs/outputs, UX, data, API, monetization, KPIs, risques, sources.",
        "4. Régénérer (structure catégories) : `python scripts/generate_addon_specs.py` puis `python scripts/reorganize_specs.py` si besoin.",
        "",
    ]
    path = ROOT / "docs" / "add-ons" / "README.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    print("wrote", path.relative_to(ROOT))


def write_partners_readme() -> None:
    # Read titles/status from files after move
    lines = [
        "# Partenaires — fiches (1 fichier = 1 type)",
        "",
        "Organisées par **catégorie**. Vue d’ensemble : [`docs/partenaires.md`](../partenaires.md).",
        "",
        "## Catégories",
        "",
        "| Dossier | Thème | Nb |",
        "| --- | --- | --- |",
    ]
    for slug, meta in PARTNER_CATS.items():
        lines.append(
            f"| [`specs/{slug}/`](./specs/{slug}/) | {meta['title']} | {len(meta['files'])} |"
        )
    lines += ["", "---", ""]

    specs = ROOT / "docs" / "partenaires" / "specs"
    for slug, meta in PARTNER_CATS.items():
        lines += [
            f"## {meta['title']}",
            "",
            f"{meta['desc']}",
            "",
            "| # | Partenaire | Priorité | Statut | Fichier |",
            "| --- | --- | --- | --- | --- |",
        ]
        for fname in meta["files"]:
            fpath = specs / slug / fname
            text = fpath.read_text(encoding="utf-8") if fpath.exists() else ""
            title_m = re.search(r"^# (.+)$", text, re.M)
            prio_m = re.search(r"\*\*Priorité\*\*\s*\|\s*\*\*([^*]+)\*\*", text)
            stat_m = re.search(r"\*\*Statut\*\*\s*\|\s*(.+?)\s*\|", text)
            title = title_m.group(1).strip() if title_m else fname
            prio = prio_m.group(1).strip() if prio_m else "?"
            status = (stat_m.group(1).strip() if stat_m else "?").split("—")[0].strip()
            lines.append(
                f"| {fname[:2]} | {title} | {prio} | {status} | [`{fname}`](./specs/{slug}/{fname}) |"
            )
        lines += ["", ""]

    lines += [
        "## Comment utiliser",
        "",
        "1. **P0 existants** : nommer le partenaire dans §12 de la fiche + signer la convention d’apporteur.",
        "2. Brancher le CTA produit → `PartnerLead`.",
        "3. Suivre `CommissionEvent` dans le CRM agence.",
        "4. Recruter les **À recruter** selon vague V1.5 / V2 (`partenaires.md` §6).",
        "",
        "## Lien add-ons",
        "",
        "Les add-ons (`docs/add-ons/`) sont souvent le **front** (outil / checklist) ; le partenaire est le **back** (exécution + commission).",
        "",
    ]
    path = ROOT / "docs" / "partenaires" / "README.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    print("wrote", path.relative_to(ROOT))


def patch_cross_links(addon_map: dict[str, str]) -> None:
    replacements = {
        "docs/add-ons/specs/05-guides-seo.md": f"docs/add-ons/specs/{addon_map['05-guides-seo.md']}/05-guides-seo.md",
        "`docs/add-ons/specs/05-guides-seo.md`": f"`docs/add-ons/specs/{addon_map['05-guides-seo.md']}/05-guides-seo.md`",
        "docs/add-ons/specs/`)(./add-ons/specs/)": "docs/add-ons/specs/` (par catégories)",
    }
    files = [
        ROOT / "docs" / "blog" / "strategie.md",
        ROOT / "docs" / "blog" / "README.md",
        ROOT / "docs" / "blog" / "benchmark-editorial.md",
        ROOT / "docs" / "add-ons.md",
        ROOT / "docs" / "assets.md",
        ROOT / "docs" / "partenaires.md",
    ]
    for path in files:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        orig = text
        # generic: specs/05-guides-seo.md → specs/07-contenu-marketing-b2b/05-guides-seo.md
        for fname, slug in addon_map.items():
            old = f"add-ons/specs/{fname}"
            new = f"add-ons/specs/{slug}/{fname}"
            text = text.replace(old, new)
            # relative forms in README already regenerated
        if "add-ons/specs/`]" in text or "52 specs dans" in text:
            text = text.replace(
                "52 specs dans [`docs/add-ons/specs/`](./add-ons/specs/).",
                "52 specs classées par catégorie dans [`docs/add-ons/`](./add-ons/README.md).",
            )
        if text != orig:
            path.write_text(text, encoding="utf-8")
            print("patched links in", path.relative_to(ROOT))


def patch_partner_footer_links() -> None:
    """Partner specs say ../../partenaires.md — after one more nesting need ../../../"""
    specs = ROOT / "docs" / "partenaires" / "specs"
    for f in specs.rglob("*.md"):
        text = f.read_text(encoding="utf-8")
        text2 = text.replace("](../../partenaires.md)", "](../../../partenaires.md)")
        text2 = text2.replace("](../../add-ons.md)", "](../../../add-ons.md)")
        if text2 != text:
            f.write_text(text2, encoding="utf-8")


def main() -> None:
    addon_map = move_tree(ROOT / "docs" / "add-ons", ADDON_CATS, fix_blog_links=True)
    move_tree(ROOT / "docs" / "partenaires", PARTNER_CATS)
    write_addons_readme(addon_map)
    write_partners_readme()
    patch_cross_links(addon_map)
    patch_partner_footer_links()

    # Verify counts
    n_addon = len(list((ROOT / "docs" / "add-ons" / "specs").rglob("*.md")))
    n_part = len(list((ROOT / "docs" / "partenaires" / "specs").rglob("*.md")))
    print(f"DONE add-ons={n_addon} partenaires={n_part}")


if __name__ == "__main__":
    main()
