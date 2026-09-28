# -*- coding: utf-8 -*-
"""Generate per-partner-type specification markdown files."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "partenaires" / "specs"
OUT.mkdir(parents=True, exist_ok=True)

PARTNERS: list[dict] = [
    {
        "file": "01-constructeur-btp.md",
        "title": "Constructeur / entreprise BTP",
        "priority": "P0",
        "category": "Construction",
        "status": "Relation existante — à nommer & signer",
        "summary": "Firme de construction partenaire pour devis et réalisation après achat terrain (clé en main ou gros œuvre).",
        "need": "Le client a un terrain (ou vient de l’acheter) et veut chiffrer / construire sans chercher un artisan au hasard.",
        "offer": "Devis structuré, planning, contrat travaux, options finition. L’agence intro + suit le lead jusqu’à signature.",
        "commission": "2–5 % du montant HT du contrat travaux signé (ou paliers : forfait si < 30 M, % au-delà). Déclencheur : acompte client encaissé.",
        "addons": ["02-simulateur-construction", "03-simulateur-budget-total", "06-pack-terrain-maison", "26-suivi-chantier"],
        "flow": [
            "Simu construction ou Pack Terrain→Maison",
            "Lead PartnerLead(type=constructeur) avec surface, zone, budget",
            "Partenaire rappelle < 48 h → visite terrain / devis",
            "Signature → CommissionEvent",
        ],
        "sla": "Rappel client 24–48 h ; devis sous 7–14 j ; photos chantier si suivi léger activé",
        "contract": "Convention apporteur + responsabilité chantier 100 % partenaire ; agence non co-contractante travaux",
        "kpis": "leads, devis_sent, contrats_signes, commission_fcfa, delai_rappel",
        "risks": "Retards livraison, malfaçons → process plainte + droit de retirer le partenaire de la shortlist",
        "v1": "1 firme nommée + CTA WhatsApp depuis simu",
        "later": "2–3 constructeurs shortlistés par zone ; scoring avis ; escrow jalons",
    },
    {
        "file": "02-architecte.md",
        "title": "Architecte",
        "priority": "P0",
        "category": "Construction",
        "status": "Relation existante — à nommer & signer",
        "summary": "Architecte de confiance pour plans de qualité, PC/TeleDAC, et projects au-dessus du seuil légal (~30 M FCFA).",
        "need": "Plans sérieux, conformité urbanisme, esthétique ; obligation archi au-delà d’un coût de construction élevé.",
        "offer": "Esquisse → APS/APD → dossiers permis ; éventuellement plans types adaptés SN.",
        "commission": "10–20 % des honoraires architecte **ou** forfait intro 150–500k FCFA selon ticket. Déclencheur : signature mission archi.",
        "addons": ["02-simulateur-construction", "09-permis-construire-cu", "25-plans-types"],
        "flow": [
            "CTA « Parler à un architecte » si budget estimé > seuil",
            "Brief (surface, niveaux, style, budget)",
            "RDV / visioconf → devis mission",
            "Commission à la signature de la mission",
        ],
        "sla": "Retour sous 48–72 h ; 1ère esquisse selon devis",
        "contract": "Convention apporteur ; client signe avec l’architecte (ordre de service)",
        "kpis": "leads_archi, missions_signees, ticket_moyen, upsell_constructeur",
        "risks": "Confusion archi vs dessinateur non habilité ; vérifier inscription Ordre",
        "v1": "1 architecte nommé + brief type",
        "later": "Catalogue plans types + custom ; co-offre archi+constructeur",
    },
    {
        "file": "03-notaire.md",
        "title": "Notaire",
        "priority": "P0",
        "category": "Juridique",
        "status": "Relation existante — à nommer & signer",
        "summary": "Étude notariale de confiance pour actes de vente, séquestre, mutations TF, procurations diaspora.",
        "need": "Sécuriser le closing ; éviter paiements Wave directs au vendeur ; mutation au Livre foncier.",
        "offer": "Avant-contrat / acte authentique, séquestre, formalités Conservation, conseil pièces.",
        "commission": "Forfait apporteur par dossier clos (souvent 50–200k FCFA) selon accord déontologique de l’étude. Éviter % agressifs sur émoluments.",
        "addons": ["17-notaire-pack-juridique", "18-calculateur-frais-acquisition", "35-escrow-sequestre", "37-procuration-assist"],
        "flow": [
            "Offre acceptée → tunnel closing",
            "Intro étude + envoi checklist pièces",
            "Séquestre & signature",
            "Commission à l’acte / mutation engagée",
        ],
        "sla": "Prise en charge dossier < 72 h ; liste pièces écrite dès J0",
        "contract": "Accord commercial compatible déontologie notariale ; traçabilité apporteur",
        "kpis": "dossiers_ouverts, actes_signes, delai_moyen_closing, commission",
        "risks": "Conflit si notaire « du vendeur » imposé ; toujours proposer notre étude ou choix client éclairé",
        "v1": "1 étude + checklist closing dans le CRM",
        "later": "Estimateur frais branché barème ; procuration diaspora pack",
    },
    {
        "file": "04-formalites-papiers-legaux.md",
        "title": "Formalités & obtention de papiers légaux",
        "priority": "P0",
        "category": "Administratif",
        "status": "Relation existante — à nommer & signer",
        "summary": "Cabinet / expert démarches pour NICAD, plan cadastral, CU, permis, quitus, dossiers DGID — le « faire établir les papiers ».",
        "need": "Clients (surtout diaspora) perdus dans les guichets ; délais ; pièces manquantes qui bloquent notaire ou chantier.",
        "offer": "Prise en charge dossier administratif : constitution, suivi, récupération pièces officielles.",
        "commission": "Forfait par type de dossier (ex. 50–300k selon complexité) **ou** 15–25 % des honoraires cabinet. Déclencheur : dossier déposé / pièce obtenue.",
        "addons": ["08-due-diligence-fonciere", "09-permis-construire-cu", "21-certification-docs", "43-regularisation-tf"],
        "flow": [
            "Agent détecte trou documentaire",
            "Lead formalités avec liste pièces manquantes",
            "Partenaire chiffure + timeline",
            "Suivi statut dans CRM (déposé / obtenu / bloqué)",
        ],
        "sla": "Devis 48 h ; reporting hebdo sur dossiers ouverts",
        "contract": "Périmètre écrit (ce qui est inclus) ; pas de garantie de résultat administration — obligation de moyens",
        "kpis": "dossiers, pieces_obtenues, delai_median, unblock_rate_closing",
        "risks": "Promesses irréalistes de délais admin ; communication prudente au client",
        "v1": "1 interlocuteur + grille forfaits types (NICAD, CU, PC…)",
        "later": "Statuts auto dans portail client ; bundle diligence+formalités",
    },
    {
        "file": "05-financier-investissement.md",
        "title": "Financier / structuration d’investissements colossaux",
        "priority": "P0",
        "category": "Finance",
        "status": "Relation existante — à nommer & signer",
        "summary": "Financier de haut vol pour tickets immobiliers importants : montage, co-invest, dette, club deal, family office.",
        "need": "Au-delà du crédit retail classique : projets multi-lots, promo légère, acquisition patrimoniale lourde, diaspora HNWI.",
        "offer": "Structuration financière, mise en relation capital / dette, due diligence investisseur, éventuellement SPV.",
        "commission": "Success fee 0,5–2 % du ticket clos **et/ou** retainer partagé. Seuil d’activation ex. projet ≥ 200–500 M FCFA (à caler).",
        "addons": ["03-simulateur-budget-total", "08-due-diligence-fonciere", "50-co-acquisition"],
        "flow": [
            "Lead qualifié gros ticket (agent flag « capital »)",
            "NDA / teaser one-pager",
            "Call financier + agence + client",
            "Success fee à closing financement ou acquisition",
        ],
        "sla": "Réponse d’éligibilité sous 5 j ouvrés ; teaser standardisé",
        "contract": "Mandat de présentation + success fee écrit ; conformité KYC / anti-blanchiment côté financier",
        "kpis": "leads_hnwi, appels, tickets_clos, fee_fcfa",
        "risks": "Promesse de rendement ; rester sur « mise en relation » — pas de conseil en investissement non habilité",
        "v1": "1 financier nommé + seuil ticket + template teaser",
        "later": "Club deals sur lots promoteur ; reporting investisseurs",
    },
    {
        "file": "06-geometre-bornage.md",
        "title": "Géomètre / bornage",
        "priority": "P1",
        "category": "Foncier technique",
        "status": "À recruter",
        "summary": "Géomètre expert pour bornage, superficie réelle, plan — avant achat ou avant construction.",
        "need": "Litiges de limites, écart superficie annoncée vs réelle, exigence banque / notaire / PC.",
        "offer": "Levé, bornage contradictoire, plan pour dossier.",
        "commission": "10–15 % honoraires ou forfait intro 25–75k FCFA.",
        "addons": ["07-bornage-geometre", "08-due-diligence-fonciere"],
        "flow": ["Flag diligence", "Lead géomètre", "PV bornage → dossier notaire"],
        "sla": "Devis 48 h ; intervention selon zone",
        "contract": "Convention apporteur standard",
        "kpis": "leads, missions, unblock_title_issues",
        "risks": "Géomètre non assermenté — exiger qualification",
        "v1": "1 géomètre Dakar + 1 Petite Côte si possible",
        "later": "Couverture régionale",
    },
    {
        "file": "07-avocat-immobilier.md",
        "title": "Avocat immobilier / contentieux",
        "priority": "P1",
        "category": "Juridique",
        "status": "À recruter",
        "summary": "Avocat pour litiges fonciers, double vente, recouvrement locatif lourd, rédaction hors notaire.",
        "need": "Contentieux ou situation anormale que le notaire ne traite pas seul.",
        "offer": "Consultation, mise en demeure, procédure.",
        "commission": "Forfait intro ou 10–15 % honoraires (selon dossier).",
        "addons": ["08-due-diligence-fonciere", "23-scoring-locataire"],
        "flow": ["Escalade litige", "Intro avocat", "Suivi statut"],
        "sla": "Rappel 24–48 h",
        "contract": "Convention ; client = mandant de l’avocat",
        "kpis": "consults, dossiers_ouverts",
        "risks": "Conflits d’intérêts si avocat aussi du vendeur",
        "v1": "1 cabinet référencé",
        "later": "Grille urgences (saisie, expulsion)",
    },
    {
        "file": "08-courtier-credit-banque.md",
        "title": "Courtier crédit / banque",
        "priority": "P1",
        "category": "Finance",
        "status": "À recruter",
        "summary": "Accès crédit immobilier retail (CDI/CDD selon banques) et orientation dossier.",
        "need": "Financer achat / construction hors vente étalée agence.",
        "offer": "Montage dossier, comparatif banques, suivi accord.",
        "commission": "Partage commission courtage bancaire (selon banque) ou forfait dossier.",
        "addons": ["01-simulateur-mensualite", "18-calculateur-frais-acquisition", "24-epargne-construction"],
        "flow": ["CTA financer", "Lead courtier", "Accord de principe → closing"],
        "sla": "1er RDV sous 5 j",
        "contract": "Accord apporteur / courtier",
        "kpis": "dossiers, accords, taux_obtention",
        "risks": "Survente capacité d’emprunt — disclaimer",
        "v1": "1 courtier ou 1 contact banque",
        "later": "Simulateur capacité d’emprunt",
    },
    {
        "file": "09-assureur-courtier.md",
        "title": "Assureur / courtier MRH–PNO",
        "priority": "P1",
        "category": "Assurance",
        "status": "À recruter",
        "summary": "Couverture habitation locataire / PNO propriétaire non occupant à la signature.",
        "need": "Obligation ou bon sens à l’entrée dans les lieux / mise en gestion.",
        "offer": "Devis MRH/PNO, souscription, attestation.",
        "commission": "10–20 % de la prime 1ʳᵉ année (usage courtier) ou fee fixe.",
        "addons": ["13-assurance-mrh", "14-assurance-pno"],
        "flow": ["Bail signé / mandat gestion", "Devis assurance", "Attestation upload portail"],
        "sla": "Devis J+1",
        "contract": "Convention courtage",
        "kpis": "polices, primes, renewals",
        "risks": "Sinistres mal gérés → image ; choisir courtier réactif",
        "v1": "1 courtier + 2 compagnies",
        "later": "Upsell annuel auto",
    },
    {
        "file": "10-inspection-diaspora.md",
        "title": "Inspection / contrôle qualité diaspora",
        "priority": "P1",
        "category": "Diaspora",
        "status": "À recruter",
        "summary": "Tiers indépendant pour constater l’état du bien / avancement chantier (photos datées, rapport).",
        "need": "Acheteur à distance : reconstituer la capacité de constater (leçon MyAfric).",
        "offer": "Visite protocolée, rapport PDF, jalons chantier.",
        "commission": "Forfait par visite (agence markup 20–40 % ou fee fixe apporteur).",
        "addons": ["15-inspection-diaspora", "26-suivi-chantier"],
        "flow": ["Lead diaspora", "Cahier des charges visite", "Rapport → go/no-go paiement"],
        "sla": "Visite sous 3–7 j ; rapport 24 h après",
        "contract": "Indépendance vs vendeur/constructeur obligatoire",
        "kpis": "visites, anomalies_detectees, paiements_bloquees_a_raison",
        "risks": "Inspecteur lié au vendeur = pire cas ; clause d’indépendance",
        "v1": "1–2 inspecteurs Dakar",
        "later": "Réseau régional + app photo GPS",
    },
    {
        "file": "11-promoteur-lots.md",
        "title": "Promoteur / lotisseur",
        "priority": "P1",
        "category": "Stock & co-marketing",
        "status": "À recruter",
        "summary": "Accès lots / programmes neufs avec mandat ou commission promoteur.",
        "need": "Élargir le catalogue curated sans porter le stock.",
        "offer": "Lots sécurisés, grilles prix, co-visite, VEFA si applicable.",
        "commission": "2–5 % (ou barème promoteur) sur vente lot / unité.",
        "addons": ["catalogue", "01-simulateur-mensualite"],
        "flow": ["Mandat programme", "Publication curated", "Vente → commission"],
        "sla": "Maj dispo lots hebdo",
        "contract": "Mandat écrit + exclusivité éventuelle par programme",
        "kpis": "lots_live, ventes, commission",
        "risks": "Retards livraison promoteur — disclaimer VEFA",
        "v1": "1 programme partenaire",
        "later": "Multi-programmes + page « neuf »",
    },
    {
        "file": "12-expert-fiscal-foncier.md",
        "title": "Expert fiscal foncier (CGF / CFPB)",
        "priority": "P1",
        "category": "Fiscalité",
        "status": "À recruter",
        "summary": "Accompagnement déclarations CGF/CFPB, exonération quinquennale, optimisation propriétaire.",
        "need": "Propriétaires et investisseurs perdus sur impôts fonciers (angle Keur City / SamaGalle).",
        "offer": "Diagnostic, déclaration, demande exonération CFPB si éligible.",
        "commission": "Forfait dossier ou % honoraires.",
        "addons": ["38-reporting-fiscal", "blog CFPB/CGF"],
        "flow": ["CTA blog / portail proprio", "Lead fiscal", "Déclaration"],
        "sla": "Campagne avant échéances (ex. CGF 1er février)",
        "contract": "Convention ; disclaimer hors conseil fiscal personnalisé si non habilité",
        "kpis": "dossiers_saison, exonérations_deposees",
        "risks": "Conseils fiscaux erronés — s’appuyer sur pro DGID-aware",
        "v1": "1 expert + checklist saison",
        "later": "Reporting annuel pack proprio",
    },
    {
        "file": "13-forage-eau.md",
        "title": "Forage / adduction d’eau",
        "priority": "P2",
        "category": "Chantier annexe",
        "status": "À recruter",
        "summary": "Entreprise de forage et pompage pour terrains non desservis.",
        "need": "Viabiliser avant construction hors réseau SDE.",
        "offer": "Étude, forage, équipement pompe.",
        "commission": "3–8 % devis ou forfait.",
        "addons": ["41-forage-eau", "10-simulateur-pret-a-batir"],
        "flow": ["Simu prêt-à-bâtir", "Lead forage", "Devis"],
        "sla": "Devis 5–7 j",
        "contract": "Apporteur standard",
        "kpis": "devis, forages_realises",
        "risks": "Échec forage — contrat clair sur aléas géologiques",
        "v1": "1 entreprise",
        "later": "Bundle VRD+forage",
    },
    {
        "file": "14-vrd-viabilisation.md",
        "title": "VRD / viabilisation",
        "priority": "P2",
        "category": "Chantier annexe",
        "status": "À recruter",
        "summary": "Voirie, réseaux, branchements pour lot / terrain nu.",
        "need": "Terrain nu → prêt à bâtir.",
        "offer": "Devis VRD, coordination concessionnaires.",
        "commission": "3–8 % marché.",
        "addons": ["42-vrd-viabilisation", "10-simulateur-pret-a-batir"],
        "flow": ["Pack terrain", "Lead VRD"],
        "sla": "Devis 7–14 j",
        "contract": "Apporteur",
        "kpis": "chantiers_vrd",
        "risks": "Dépassements ; buffer imprévus client",
        "v1": "1 entreprise",
        "later": "Estimates dans simu prêt-à-bâtir",
    },
    {
        "file": "15-installateur-solaire.md",
        "title": "Installateur solaire",
        "priority": "P2",
        "category": "Énergie",
        "status": "À recruter",
        "summary": "Kits solaires / onduleurs pour maisons et locatif.",
        "need": "Fiabiliser l’énergie ; upsell post-achat / gestion.",
        "offer": "Étude, installation, SAV.",
        "commission": "5–10 % du kit installé.",
        "addons": ["20-kit-solaire"],
        "flow": ["CTA énergie", "Lead solaire"],
        "sla": "Visite technique 5 j",
        "contract": "Apporteur",
        "kpis": "installations, ticket_moyen",
        "risks": "SAV défaillant → shortlist exigeante",
        "v1": "1 installateur",
        "later": "Offre proprio multi-biens",
    },
    {
        "file": "16-clim-froid.md",
        "title": "Climatisation & froid",
        "priority": "P1",
        "category": "Confort",
        "status": "À recruter",
        "summary": "Fourniture / pose clim + contrats entretien.",
        "need": "Location meublée et standing ; maintenance récurrente.",
        "offer": "Pack clim + entretien annuel.",
        "commission": "% installation + fee contrat entretien année 1.",
        "addons": ["19-pack-clim", "46-contrat-entretien"],
        "flow": ["Bail / remise clés", "Upsell clim"],
        "sla": "Pose sous créneau convenu",
        "contract": "Apporteur",
        "kpis": "packs_vendus, contrats_entretien",
        "risks": "Qualité pose",
        "v1": "1 frigoriste",
        "later": "Marketplace maintenance",
    },
    {
        "file": "17-demenagement.md",
        "title": "Déménagement / ménage",
        "priority": "P2",
        "category": "Lifestyle",
        "status": "À recruter",
        "summary": "Prestataires déménagement et ménage de fin/début de bail.",
        "need": "Friction post-signature.",
        "offer": "Devis volume, créneau, ménage EDL.",
        "commission": "8–15 % prestation.",
        "addons": ["30-demenagement-menage", "48-preavis-remise-cles"],
        "flow": ["Bail signé", "CTA déménager"],
        "sla": "Devis 24–48 h",
        "contract": "Apporteur",
        "kpis": "prestations",
        "risks": "Casse / vols — assurance prestataire",
        "v1": "1–2 prestataires",
        "later": "Pack remise clés tout-en-un",
    },
    {
        "file": "18-photo-home-staging.md",
        "title": "Photographe / home staging",
        "priority": "P2",
        "category": "Marketing biens",
        "status": "À recruter",
        "summary": "Shoot pro et staging léger pour mandats vente/location.",
        "need": "Annonces curated premium.",
        "offer": "Shooting, drone optionnel, staging.",
        "commission": "Forfait agence inclus mandat **ou** % si upsell vendeur.",
        "addons": ["33-home-staging-photo", "39-annonces-boost"],
        "flow": ["Prise mandat", "Shoot sous 7 j"],
        "sla": "Livraison photos 48–72 h",
        "contract": "Prestation ou apporteur",
        "kpis": "biens_shootes, time_to_publish",
        "risks": "Retard publish catalogue",
        "v1": "1 photographe dédié",
        "later": "Visite virtuelle",
    },
    {
        "file": "19-huissier.md",
        "title": "Huissier",
        "priority": "P2",
        "category": "Juridique",
        "status": "À recruter",
        "summary": "Constats, significations, procédures d’exécution locative.",
        "need": "Impayés lourds, conflits occupation.",
        "offer": "Constats d’huissier, actes.",
        "commission": "Forfait intro.",
        "addons": ["23-scoring-locataire", "gestion locative"],
        "flow": ["Escalade impayé", "Intro huissier"],
        "sla": "Urgences 24–48 h",
        "contract": "Apporteur",
        "kpis": "constats, procedures",
        "risks": "Image « dure » — process gradué avant huissier",
        "v1": "1 étude d’huissier",
        "later": "Playbook impayés",
    },
    {
        "file": "20-cloture-portail.md",
        "title": "Clôture & portail",
        "priority": "P2",
        "category": "Chantier annexe",
        "status": "À recruter",
        "summary": "Sécurisation parcelle après achat terrain.",
        "need": "Éviter occupation / vols matériaux.",
        "offer": "Devis clôture, portail, motorisation.",
        "commission": "5–10 % devis.",
        "addons": ["44-cloture-portail", "06-pack-terrain-maison"],
        "flow": ["Post-achat terrain", "CTA clôturer"],
        "sla": "Devis 5 j",
        "contract": "Apporteur",
        "kpis": "chantiers",
        "risks": "Qualité ferronnerie",
        "v1": "1 atelier",
        "later": "Pack sécurité terrain",
    },
    {
        "file": "21-materiaux-negoce.md",
        "title": "Négoce matériaux",
        "priority": "P2",
        "category": "Chantier",
        "status": "À recruter",
        "summary": "Fournisseurs ciment, fer, carrelage — devis agrégés.",
        "need": "Coût chantier transparent ; marge volume.",
        "offer": "Grilles prix, livraison chantier.",
        "commission": "Kickback volume ou marge négociée.",
        "addons": ["27-materiaux-marketplace"],
        "flow": ["Budget construction", "Liste matériaux", "Commande"],
        "sla": "Dispo / délai livraison affichés",
        "contract": "Accord commercial volume",
        "kpis": "GMV materiaux, commission",
        "risks": "Litiges qualité — rôle marketplace clair",
        "v1": "1 négoce partenaire",
        "later": "Marketplace multi-fournisseurs",
    },
    {
        "file": "22-syndic-copropriete.md",
        "title": "Syndic / copropriété",
        "priority": "P2",
        "category": "Gestion",
        "status": "À recruter",
        "summary": "Syndic pour immeubles ; synchro avec gestion locative lots.",
        "need": "Immeubles collectifs ; conformité charges.",
        "offer": "Mandat syndic, AG, charges.",
        "commission": "Apport mandat (forfait ou mois de honoraires).",
        "addons": ["22-portail-multi-biens", "gestion"],
        "flow": ["Immeuble sous mandat", "Intro syndic"],
        "sla": "Proposition sous 7 j",
        "contract": "Apporteur",
        "kpis": "mandats_syndic",
        "risks": "Conflit syndic vs gestionnaire lots",
        "v1": "1 syndic (ex. réseau type Senegal Syndic / local)",
        "later": "Offre immeuble complet",
    },
    {
        "file": "23-fintech-caution-escrow.md",
        "title": "Fintech caution / escrow",
        "priority": "P1",
        "category": "Fintech",
        "status": "À recruter",
        "summary": "Partenaires type caution locative digitale ou séquestre paiements diaspora.",
        "need": "Réduire friction caution et risque paiement vendeur.",
        "offer": "Caution as a service ; escrow milestones.",
        "commission": "Referral fee par dossier activé.",
        "addons": ["11-caution-locative", "35-escrow-sequestre"],
        "flow": ["Bail / closing", "Opt-in fintech"],
        "sla": "API ou process manuel v1",
        "contract": "Partenariat commercial + conformité",
        "kpis": "activations, fee",
        "risks": "Régulation fintech ; communication claire",
        "v1": "1 partenaire caution OU process séquestre notaire",
        "later": "Intégration API",
    },
    {
        "file": "24-agence-partenaire-reseau.md",
        "title": "Agence partenaire / réseau inter-agences",
        "priority": "P2",
        "category": "Réseau",
        "status": "À recruter",
        "summary": "Agences hors zone (Thiès, Saint-Louis, diaspora desk) pour split de commission.",
        "need": "Couverture géographique sans ouvrir une branche tout de suite.",
        "offer": "Apport croisé de mandats / acquéreurs ; co-visite.",
        "commission": "Split classique 50/50 (négociable).",
        "addons": ["40-white-label"],
        "flow": ["Lead hors zone", "Handshake agence", "Split à closing"],
        "sla": "Accusé lead 24 h",
        "contract": "Convention inter-agences",
        "kpis": "leads_echanges, closings_partages",
        "risks": "Qualité hétérogène — charte curated",
        "v1": "1–2 agences alliées",
        "later": "White-label branches",
    },
]


def render(p: dict) -> str:
    addons = ", ".join(f"`{a}`" for a in p["addons"])
    flow = "\n".join(f"{i}. {step}" for i, step in enumerate(p["flow"], 1))
    return f"""# {p['title']}

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `{p['file']}` |
| **Priorité** | **{p['priority']}** |
| **Catégorie** | {p['category']} |
| **Statut** | {p['status']} |
| **Synthèse** | {p['summary']} |

## 1. Besoin client

{p['need']}

## 2. Offre partenaire

{p['offer']}

## 3. Commission (indicatif — à figer en convention)

{p['commission']}

## 4. Synergies add-ons / produit

{addons}

## 5. Parcours (passerelle)

{flow}

## 6. SLA attendu

{p['sla']}

## 7. Cadre contractuel

{p['contract']}

## 8. Données (cible)

- `Partner` {{ id, type, name, zones[], contact, status }}
- `PartnerLead` {{ partnerId, clientId, listingId?, payload, status }}
- `CommissionEvent` {{ leadId, amount, currency, trigger, paidAt? }}

## 9. KPI

{p['kpis']}

## 10. Risques

{p['risks']}

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | {p['v1']} |
| **Plus tard** | {p['later']} |

## 12. Fiche partenaire nommé (à remplir)

| Champ | Valeur |
| --- | --- |
| Raison sociale / nom | _TBD_ |
| Contact principal | _TBD_ |
| Tél / WhatsApp | _TBD_ |
| Zone couverte | _TBD_ |
| Convention signée | Non / Oui (date) |
| Taux / forfait acté | _TBD_ |
| Notes internes | _TBD_ |

---

Voir aussi : [`docs/partenaires.md`](../../partenaires.md) · [`docs/add-ons.md`](../../add-ons.md)
"""


def main() -> None:
    rows = []
    for p in PARTNERS:
        path = OUT / p["file"]
        path.write_text(render(p), encoding="utf-8")
        rows.append(
            f"| {p['file'][:2]} | {p['title']} | {p['priority']} | {p['status'].split('—')[0].strip()} | [`specs/{p['file']}`](./specs/{p['file']}) |"
        )
        print("wrote", path.relative_to(ROOT))

    readme = f"""# Partenaires — fiches (1 fichier = 1 type)

Passerelles monétisables (commissions d’apport). Vue d’ensemble : [`docs/partenaires.md`](../partenaires.md).

| # | Partenaire | Priorité | Statut | Fichier |
| --- | --- | --- | --- | --- |
{chr(10).join(rows)}

## Comment utiliser

1. **P0 existants** : nommer le partenaire dans §12 de la fiche + signer la convention d’apporteur.
2. Brancher le CTA produit (simu, closing, bail) → `PartnerLead`.
3. Suivre `CommissionEvent` dans le CRM agence.
4. Recruter les **À recruter** selon vague V1.5 / V2 (`partenaires.md` §6).

## Lien add-ons

Les add-ons (`docs/add-ons/`) sont souvent le **front** (outil / checklist) ; le partenaire est le **back** (exécution + commission).
"""
    (ROOT / "docs" / "partenaires" / "README.md").write_text(readme, encoding="utf-8")
    print("wrote docs/partenaires/README.md")


if __name__ == "__main__":
    main()
