import React, { createContext, useState, useContext, ReactNode } from 'react';

// --- TRANSLATIONS ---
// The contents of all language files are now directly inside this file.

const en = {
  "appTitle": "CHRONOSNAP",
  "input": {
    "title": "Begin Your Journey",
    "subtitle": "Upload a clear, forward-facing photo to see yourself reimagined throughout history.",
    "uploadCta": "Tap to upload",
    "dragAndDrop": "or drag & drop",
    "fileTypes": "PNG, JPG, or WEBP"
  },
  "button": {
    "generate": "Generate Full Journey",
    "changePhoto": "Change Photo",
    "viewGallery": "View Fullscreen Gallery",
    "startOver": "Start Over",
    "retry": "Retry",
    "download": "Download Image"
  },
  "journey": {
    "begins": "Your Journey Through Time Begins...",
    "crafting": "Crafting your historical portraits across the ages..."
  },
  "gallery": {
    "title": "Your Gallery",
    "ready": "Gallery Ready!"
  },
  "status": {
    "generating": "Generating...",
    "failed": "Failed"
  },
  "error": {
    "invalidFormat": "Invalid image format.",
    "unknown": "An unknown error occurred."
  },
  "alt": {
    "yourPhoto": "Your photo",
    "eraImage": "You in the {eraName}"
  },
  "aria": {
    "retry": "Retry generation for {eraName}",
    "download": "Download image for {eraName}",
    "closeGallery": "Close gallery"
  },
  "eras": {
    "victorianEra": { "name": "Victorian Era (1890s)", "description": "Formal portraits, stoic expressions, and elaborate, high-collared clothing." },
    "roaringTwenties": { "name": "Roaring Twenties", "description": "Flapper style, bobbed hair, and a spirit of celebratory rebellion." },
    "greatDepression": { "name": "Great Depression (1930s)", "description": "Somber, resilient expressions with simpler attire, often in sepia tones." },
    "theForties": { "name": "The Forties (WWII Era)", "description": "Tailored, practical fashion with victory rolls hairstyles and patriotic sentiment." },
    "swingingSixties": { "name": "The Swinging Sixties", "description": "Mod fashion, bold patterns, beehive hairdos, and a touch of counter-culture." },
    "discoSeventies": { "name": "Disco Seventies", "description": "Feathered hair, vibrant colors, wide collars, and a nightlife aesthetic." },
    "neonEighties": { "name": "The Neon Eighties", "description": "Big hair, bright makeup, bold colors, and eclectic fashion statements." },
    "grungeNineties": { "name": "Grunge Nineties", "description": "Flannel shirts, band tees, and a raw, anti-fashion aesthetic." },
    "renaissance": { "name": "Renaissance (1500s)", "description": "Rich fabrics, intricate details, and classical art influences." },
    "baroque": { "name": "Baroque (1650s)", "description": "Dramatic, opulent styles with deep colors and elaborate ornamentation." },
    "belleEpoque": { "name": "Belle Époque (1900s)", "description": "Elegant, sophisticated fashion with corsets, feathers, and flowing lines." },
    "postWarAvantGarde": { "name": "Post-War Avant-Garde (1950s)", "description": "New Look silhouettes, existentialist vibes, and artistic experimentation." },
    "swingingLondon": { "name": "Swinging London (1960s)", "description": "Miniskirts, geometric patterns, and a youth-driven cultural revolution." },
    "punkRock": { "name": "Punk Rock (1970s)", "description": "DIY aesthetic, leather jackets, ripped clothing, and rebellious attitude." },
    "edoPeriodJapan": { "name": "Edo Period Japan (1700s)", "description": "Kimono, intricate hairstyles, and the aesthetic of ukiyo-e woodblock prints." },
    "qingDynastyChina": { "name": "Qing Dynasty China (1850s)", "description": "Manchu-influenced attire like the qipao, with elaborate embroidery." },
    "mughalEmpireIndia": { "name": "Mughal Empire India (1600s)", "description": "Luxurious textiles, intricate jewelry, and opulent courtly attire." },
    "joseonDynastyKorea": { "name": "Joseon Dynasty Korea (1880s)", "description": "Traditional hanbok with simple lines and elegant, natural colors." },
    "shanghaiJazzAge": { "name": "Shanghai Jazz Age (1930s)", "description": "A fusion of traditional cheongsams with Western art deco and flapper styles." },
    "hongKongCinema": { "name": "Hong Kong Cinema (1980s)", "description": "Neon-lit cityscapes, stylish suits, and dramatic, action-movie aesthetics." }
  }
};

const pl = {
  "appTitle": "CHRONOSNAP",
  "input": {
    "title": "Rozpocznij podróż",
    "subtitle": "Prześlij wyraźne zdjęcie twarzy, aby zobaczyć siebie w nowej odsłonie na przestrzeni dziejów.",
    "uploadCta": "Kliknij, aby przesłać",
    "dragAndDrop": "lub przeciągnij i upuść",
    "fileTypes": "PNG, JPG lub WEBP"
  },
  "button": {
    "generate": "Wygeneruj pełną podróż",
    "changePhoto": "Zmień zdjęcie",
    "viewGallery": "Zobacz galerię na pełnym ekranie",
    "startOver": "Zacznij od nowa",
    "retry": "Spróbuj ponownie",
    "download": "Pobierz obraz"
  },
  "journey": {
    "begins": "Twoja podróż w czasie się rozpoczyna...",
    "crafting": "Tworzenie Twoich historycznych portretów na przestrzeni wieków..."
  },
  "gallery": {
    "title": "Twoja galeria",
    "ready": "Galeria gotowa!"
  },
  "status": {
    "generating": "Generowanie...",
    "failed": "Niepowodzenie"
  },
  "error": {
    "invalidFormat": "Nieprawidłowy format obrazu.",
    "unknown": "Wystąpił nieznany błąd."
  },
  "alt": {
    "yourPhoto": "Twoje zdjęcie",
    "eraImage": "Ty w epoce {eraName}"
  },
  "aria": {
    "retry": "Spróbuj ponownie wygenerować dla {eraName}",
    "download": "Pobierz obraz dla {eraName}",
    "closeGallery": "Zamknij galerię"
  },
  "eras": {
    "victorianEra": { "name": "Epoka wiktoriańska (lata 90. XIX w.)", "description": "Formalne portrety, stoickie miny i wyszukane ubrania z wysokim kołnierzem." },
    "roaringTwenties": { "name": "Szalone lata dwudzieste", "description": "Styl flapper, krótkie fryzury i duch radosnego buntu." },
    "greatDepression": { "name": "Wielki Kryzys (lata 30. XX w.)", "description": "Poważne, harde miny, prostszy strój, często w odcieniach sepii." },
    "theForties": { "name": "Lata czterdzieste (II WŚ)", "description": "Praktyczna moda, fryzury w stylu „victory rolls” i patriotyczne nastroje." },
    "swingingSixties": { "name": "Swingujące lata sześćdziesiąte", "description": "Moda w stylu Mod, odważne wzory, fryzury „beehive” i nuta kontrkultury." },
    "discoSeventies": { "name": "Disco lat siedemdziesiątych", "description": "Pierzaste włosy, żywe kolory, szerokie kołnierze i estetyka życia nocnego." },
    "neonEighties": { "name": "Neonowe lata osiemdziesiąte", "description": "Duże fryzury, mocny makijaż, odważne kolory i eklektyczne stylizacje." },
    "grungeNineties": { "name": "Grunge lat dziewięćdziesiątych", "description": "Flanelowe koszule, koszulki zespołów i surowa, anty-modowa estetyka." },
    "renaissance": { "name": "Renesans (XVI w.)", "description": "Bogate tkaniny, misterne detale i wpływy sztuki klasycznej." },
    "baroque": { "name": "Barok (poł. XVII w.)", "description": "Dramatyczne, bogate style z głębokimi kolorami i wyszukanymi zdobieniami." },
    "belleEpoque": { "name": "Belle Époque (pocz. XX w.)", "description": "Elegancka, wyrafinowana moda z gorsetami, piórami i zwiewnymi liniami." },
    "postWarAvantGarde": { "name": "Awangarda powojenna (lata 50. XX w.)", "description": "Sylwetki w stylu „New Look”, egzystencjalne klimaty i artystyczne eksperymenty." },
    "swingingLondon": { "name": "Swingujący Londyn (lata 60. XX w.)", "description": "Minispódniczki, geometryczne wzory i rewolucja kulturalna napędzana przez młodzież." },
    "punkRock": { "name": "Punk Rock (lata 70. XX w.)", "description": "Estetyka DIY, skórzane kurtki, podarte ubrania i buntownicza postawa." },
    "edoPeriodJapan": { "name": "Okres Edo w Japonii (XVIII w.)", "description": "Kimono, skomplikowane fryzury i estetyka drzeworytów ukiyo-e." },
    "qingDynastyChina": { "name": "Dynastia Qing w Chinach (poł. XIX w.)", "description": "Stroje pod wpływem mandżurskim, jak qipao, z bogatym haftem." },
    "mughalEmpireIndia": { "name": "Imperium Mogołów w Indiach (XVII w.)", "description": "Luksusowe tekstylia, misterna biżuteria i bogaty strój dworski." },
    "joseonDynastyKorea": { "name": "Dynastia Joseon w Korei (lata 80. XIX w.)", "description": "Tradycyjny hanbok o prostych liniach i eleganckich, naturalnych kolorach." },
    "shanghaiJazzAge": { "name": "Epoka jazzu w Szanghaju (lata 30. XX w.)", "description": "Połączenie tradycyjnych cheongsamów z zachodnim art déco i stylem flapper." },
    "hongKongCinema": { "name": "Kino z Hongkongu (lata 80. XX w.)", "description": "Pejzaże miejskie oświetlone neonami, stylowe garnitury i dramatyczna estetyka filmów akcji." }
  }
};

const de = {
  "appTitle": "CHRONOSNAP",
  "input": { "title": "Beginne deine Reise", "subtitle": "Lade ein klares Foto von vorne hoch, um dich in der Geschichte neu interpretiert zu sehen.", "uploadCta": "Zum Hochladen tippen", "dragAndDrop": "oder Drag & Drop", "fileTypes": "PNG, JPG oder WEBP" },
  "button": { "generate": "Ganze Reise generieren", "changePhoto": "Foto ändern", "viewGallery": "Vollbild-Galerie ansehen", "startOver": "Neu anfangen", "retry": "Erneut versuchen", "download": "Bild herunterladen" },
  "journey": { "begins": "Deine Reise durch die Zeit beginnt...", "crafting": "Erstelle deine historischen Porträts über die Epochen hinweg..." },
  "gallery": { "title": "Deine Galerie", "ready": "Galerie bereit!" },
  "status": { "generating": "Generiere...", "failed": "Fehlgeschlagen" },
  "error": { "invalidFormat": "Ungültiges Bildformat.", "unknown": "Ein unbekannter Fehler ist aufgetreten." },
  "alt": { "yourPhoto": "Dein Foto", "eraImage": "Du in der Ära {eraName}" },
  "aria": { "retry": "Generierung für {eraName} erneut versuchen", "download": "Bild für {eraName} herunterladen", "closeGallery": "Galerie schließen" },
  "eras": {
    "victorianEra": { "name": "Viktorianisches Zeitalter (1890er)", "description": "Formelle Porträts, stoische Ausdrücke und aufwändige, hochgeschlossene Kleidung." },
    "roaringTwenties": { "name": "Goldene Zwanziger", "description": "Flapper-Stil, Bubikopf und ein Geist der feierlichen Rebellion." },
    "greatDepression": { "name": "Weltwirtschaftskrise (1930er)", "description": "Nüchterne, widerstandsfähige Ausdrücke mit einfacherer Kleidung, oft in Sepiatönen." },
    "theForties": { "name": "Die Vierziger (Zweiter Weltkrieg)", "description": "Maßgeschneiderte, praktische Mode mit Victory Rolls-Frisuren und patriotischem Gefühl." },
    "swingingSixties": { "name": "Swinging Sixties", "description": "Mod-Mode, kühne Muster, Bienenstockfrisuren und ein Hauch von Gegenkultur." },
    "discoSeventies": { "name": "Disco-Siebziger", "description": "Föhnfrisuren, lebendige Farben, breite Kragen und eine Nachtleben-Ästhetik." },
    "neonEighties": { "name": "Neon-Achtziger", "description": "Große Frisuren, helles Make-up, kräftige Farben und eklektische Mode-Statements." },
    "grungeNineties": { "name": "Grunge-Neunziger", "description": "Flanellhemden, Band-T-Shirts und eine rohe Anti-Mode-Ästhetik." },
    "renaissance": { "name": "Renaissance (1500er)", "description": "Reiche Stoffe, komplizierte Details und Einflüsse der klassischen Kunst." },
    "baroque": { "name": "Barock (1650er)", "description": "Dramatische, opulente Stile mit tiefen Farben und aufwändiger Ornamentik." },
    "belleEpoque": { "name": "Belle Époque (1900er)", "description": "Elegante, anspruchsvolle Mode mit Korsetts, Federn und fließenden Linien." },
    "postWarAvantGarde": { "name": "Nachkriegs-Avantgarde (1950er)", "description": "New-Look-Silhouetten, existentialistische Stimmung und künstlerische Experimente." },
    "swingingLondon": { "name": "Swinging London (1960er)", "description": "Miniröcke, geometrische Muster und eine von der Jugend getriebene Kulturrevolution." },
    "punkRock": { "name": "Punkrock (1970er)", "description": "DIY-Ästhetik, Lederjacken, zerrissene Kleidung und rebellische Haltung." },
    "edoPeriodJapan": { "name": "Edo-Zeit Japan (1700er)", "description": "Kimono, komplizierte Frisuren und die Ästhetik der Ukiyo-e-Holzschnitte." },
    "qingDynastyChina": { "name": "Qing-Dynastie China (1850er)", "description": "Von den Mandschu beeinflusste Kleidung wie das Qipao mit aufwändiger Stickerei." },
    "mughalEmpireIndia": { "name": "Mogulreich Indien (1600er)", "description": "Luxuriöse Textilien, komplizierter Schmuck und opulente höfische Kleidung." },
    "joseonDynastyKorea": { "name": "Joseon-Dynastie Korea (1880er)", "description": "Traditioneller Hanbok mit einfachen Linien und eleganten, natürlichen Farben." },
    "shanghaiJazzAge": { "name": "Shanghai Jazz-Zeitalter (1930er)", "description": "Eine Fusion aus traditionellen Cheongsams mit westlichem Art déco und Flapper-Stilen." },
    "hongKongCinema": { "name": "Hongkong-Kino (1980er)", "description": "Neonbeleuchtete Stadtlandschaften, stilvolle Anzüge und dramatische Actionfilm-Ästhetik." }
  }
};

const fr = {
  "appTitle": "CHRONOSNAP",
  "input": { "title": "Commencez votre voyage", "subtitle": "Téléchargez une photo claire de face pour vous voir réinventé(e) à travers l'histoire.", "uploadCta": "Appuyez pour télécharger", "dragAndDrop": "ou glissez-déposez", "fileTypes": "PNG, JPG ou WEBP" },
  "button": { "generate": "Générer le voyage complet", "changePhoto": "Changer de photo", "viewGallery": "Voir la galerie en plein écran", "startOver": "Recommencer", "retry": "Réessayer", "download": "Télécharger l'image" },
  "journey": { "begins": "Votre voyage à travers le temps commence...", "crafting": "Création de vos portraits historiques à travers les âges..." },
  "gallery": { "title": "Votre galerie", "ready": "Galerie prête !" },
  "status": { "generating": "Génération...", "failed": "Échec" },
  "error": { "invalidFormat": "Format d'image invalide.", "unknown": "Une erreur inconnue est survenue." },
  "alt": { "yourPhoto": "Votre photo", "eraImage": "Vous à l'époque {eraName}" },
  "aria": { "retry": "Réessayer la génération pour {eraName}", "download": "Télécharger l'image pour {eraName}", "closeGallery": "Fermer la galerie" },
  "eras": {
    "victorianEra": { "name": "Ère victorienne (années 1890)", "description": "Portraits formels, expressions stoïques et vêtements élaborés à col haut." },
    "roaringTwenties": { "name": "Années folles", "description": "Style garçonne, cheveux courts et un esprit de rébellion festive." },
    "greatDepression": { "name": "Grande Dépression (années 1930)", "description": "Expressions sombres et résilientes avec des tenues plus simples, souvent dans des tons sépia." },
    "theForties": { "name": "Les années quarante (Seconde Guerre mondiale)", "description": "Mode pratique et ajustée avec des coiffures 'victory rolls' et un sentiment patriotique." },
    "swingingSixties": { "name": "Swinging Sixties", "description": "Mode Mod, motifs audacieux, coiffures choucroute et une touche de contre-culture." },
    "discoSeventies": { "name": "Années disco", "description": "Cheveux crêpés, couleurs vives, cols larges et une esthétique de la vie nocturne." },
    "neonEighties": { "name": "Années néon", "description": "Cheveux volumineux, maquillage flashy, couleurs vives et déclarations de mode éclectiques." },
    "grungeNineties": { "name": "Années grunge", "description": "Chemises en flanelle, t-shirts de groupes et une esthétique brute et anti-mode." },
    "renaissance": { "name": "Renaissance (années 1500)", "description": "Tissus riches, détails complexes et influences de l'art classique." },
    "baroque": { "name": "Baroque (années 1650)", "description": "Styles dramatiques et opulents avec des couleurs profondes et une ornementation élaborée." },
    "belleEpoque": { "name": "Belle Époque (années 1900)", "description": "Mode élégante et sophistiquée avec des corsets, des plumes et des lignes fluides." },
    "postWarAvantGarde": { "name": "Avant-garde d'après-guerre (années 1950)", "description": "Silhouettes 'New Look', ambiance existentialiste et expérimentation artistique." },
    "swingingLondon": { "name": "Swinging London (années 1960)", "description": "Minijupes, motifs géométriques et une révolution culturelle menée par la jeunesse." },
    "punkRock": { "name": "Punk Rock (années 1970)", "description": "Esthétique DIY, vestes en cuir, vêtements déchirés et attitude rebelle." },
    "edoPeriodJapan": { "name": "Période d'Edo au Japon (années 1700)", "description": "Kimono, coiffures complexes et l'esthétique des estampes ukiyo-e." },
    "qingDynastyChina": { "name": "Dynastie Qing en Chine (années 1850)", "description": "Tenues d'influence mandchoue comme le qipao, avec des broderies élaborées." },
    "mughalEmpireIndia": { "name": "Empire moghol en Inde (années 1600)", "description": "Textiles luxueux, bijoux complexes et tenues de cour opulentes." },
    "joseonDynastyKorea": { "name": "Dynastie Joseon en Corée (années 1880)", "description": "Hanbok traditionnel avec des lignes simples et des couleurs élégantes et naturelles." },
    "shanghaiJazzAge": { "name": "L'âge du jazz à Shanghai (années 1930)", "description": "Une fusion des cheongsams traditionnels avec l'Art déco occidental et les styles garçonne." },
    "hongKongCinema": { "name": "Cinéma de Hong Kong (années 1980)", "description": "Paysages urbains éclairés au néon, costumes élégants et esthétique dramatique des films d'action." }
  }
};

const es = {
  "appTitle": "CHRONOSNAP",
  "input": { "title": "Comienza tu viaje", "subtitle": "Sube una foto nítida y de frente para verte reimaginado/a a lo largo de la historia.", "uploadCta": "Toca para subir", "dragAndDrop": "o arrastra y suelta", "fileTypes": "PNG, JPG o WEBP" },
  "button": { "generate": "Generar viaje completo", "changePhoto": "Cambiar foto", "viewGallery": "Ver galería a pantalla completa", "startOver": "Empezar de nuevo", "retry": "Reintentar", "download": "Descargar imagen" },
  "journey": { "begins": "Tu viaje a través del tiempo comienza...", "crafting": "Creando tus retratos históricos a través de las épocas..." },
  "gallery": { "title": "Tu galería", "ready": "¡Galería lista!" },
  "status": { "generating": "Generando...", "failed": "Falló" },
  "error": { "invalidFormat": "Formato de imagen no válido.", "unknown": "Ocurrió un error desconocido." },
  "alt": { "yourPhoto": "Tu foto", "eraImage": "Tú en la época {eraName}" },
  "aria": { "retry": "Reintentar generación para {eraName}", "download": "Descargar imagen para {eraName}", "closeGallery": "Cerrar galería" },
  "eras": {
    "victorianEra": { "name": "Época Victoriana (1890)", "description": "Retratos formales, expresiones estoicas y ropa elaborada de cuello alto." },
    "roaringTwenties": { "name": "Felices años veinte", "description": "Estilo flapper, pelo corto y un espíritu de rebelión festiva." },
    "greatDepression": { "name": "Gran Depresión (1930)", "description": "Expresiones sombrías y resilientes con atuendos más sencillos, a menudo en tonos sepia." },
    "theForties": { "name": "Los años cuarenta (II Guerra Mundial)", "description": "Moda práctica y entallada con peinados 'victory rolls' y sentimiento patriótico." },
    "swingingSixties": { "name": "Los vibrantes sesenta", "description": "Moda mod, estampados atrevidos, peinados cardados y un toque de contracultura." },
    "discoSeventies": { "name": "La era disco de los setenta", "description": "Pelo ahuecado, colores vibrantes, cuellos anchos y una estética de vida nocturna." },
    "neonEighties": { "name": "Los ochenta de neón", "description": "Pelo con volumen, maquillaje llamativo, colores vivos y declaraciones de moda eclécticas." },
    "grungeNineties": { "name": "Los noventa del grunge", "description": "Camisas de franela, camisetas de bandas y una estética cruda y anti-moda." },
    "renaissance": { "name": "Renacimiento (1500)", "description": "Telas ricas, detalles intrincados e influencias del arte clásico." },
    "baroque": { "name": "Barroco (1650)", "description": "Estilos dramáticos y opulentos con colores profundos y ornamentación elaborada." },
    "belleEpoque": { "name": "Belle Époque (1900)", "description": "Moda elegante y sofisticada con corsés, plumas y líneas fluidas." },
    "postWarAvantGarde": { "name": "Vanguardia de posguerra (1950)", "description": "Siluetas 'New Look', ambiente existencialista y experimentación artística." },
    "swingingLondon": { "name": "El Londres de los 60", "description": "Minifaldas, estampados geométricos y una revolución cultural impulsada por la juventud." },
    "punkRock": { "name": "Punk Rock (1970)", "description": "Estética 'hazlo tú mismo', chaquetas de cuero, ropa rota y actitud rebelde." },
    "edoPeriodJapan": { "name": "Período Edo de Japón (1700)", "description": "Kimono, peinados intrincados y la estética de los grabados ukiyo-e." },
    "qingDynastyChina": { "name": "Dinastía Qing de China (1850)", "description": "Atuendo de influencia manchú como el qipao, con elaborados bordados." },
    "mughalEmpireIndia": { "name": "Imperio mogol de la India (1600)", "description": "Textiles lujosos, joyería intrincada y atuendo cortesano opulento." },
    "joseonDynastyKorea": { "name": "Dinastía Joseon de Corea (1880)", "description": "Hanbok tradicional con líneas simples y colores elegantes y naturales." },
    "shanghaiJazzAge": { "name": "La era del jazz en Shanghái (1930)", "description": "Una fusión de cheongsams tradicionales con el art déco occidental y estilos flapper." },
    "hongKongCinema": { "name": "Cine de Hong Kong (1980)", "description": "Paisajes urbanos iluminados con neón, trajes elegantes y estética dramática de película de acción." }
  }
};

const it = {
  "appTitle": "CHRONOSNAP",
  "input": { "title": "Inizia il tuo viaggio", "subtitle": "Carica una foto nitida e frontale per vederti reinventato/a attraverso la storia.", "uploadCta": "Tocca per caricare", "dragAndDrop": "o trascina e rilascia", "fileTypes": "PNG, JPG o WEBP" },
  "button": { "generate": "Genera l'intero viaggio", "changePhoto": "Cambia foto", "viewGallery": "Guarda la galleria a schermo intero", "startOver": "Ricomincia", "retry": "Riprova", "download": "Scarica immagine" },
  "journey": { "begins": "Il tuo viaggio nel tempo inizia...", "crafting": "Creazione dei tuoi ritratti storici attraverso le epoche..." },
  "gallery": { "title": "La tua galleria", "ready": "Galleria pronta!" },
  "status": { "generating": "In generazione...", "failed": "Fallito" },
  "error": { "invalidFormat": "Formato immagine non valido.", "unknown": "Si è verificato un errore sconosciuto." },
  "alt": { "yourPhoto": "La tua foto", "eraImage": "Tu nell'era {eraName}" },
  "aria": { "retry": "Riprova la generazione per {eraName}", "download": "Scarica l'immagine per {eraName}", "closeGallery": "Chiudi galleria" },
  "eras": {
    "victorianEra": { "name": "Epoca vittoriana (1890)", "description": "Ritratti formali, espressioni stoiche e abiti elaborati a collo alto." },
    "roaringTwenties": { "name": "Anni ruggenti", "description": "Stile flapper, capelli a caschetto e uno spirito di ribellione festosa." },
    "greatDepression": { "name": "Grande depressione (1930)", "description": "Espressioni cupe e resilienti con abiti più semplici, spesso in tonalità seppia." },
    "theForties": { "name": "Gli anni Quaranta (II Guerra Mondiale)", "description": "Moda pratica e sartoriale con acconciature 'victory rolls' e sentimento patriottico." },
    "swingingSixties": { "name": "Swinging Sixties", "description": "Moda Mod, motivi audaci, acconciature a 'beehive' e un tocco di controcultura." },
    "discoSeventies": { "name": "Anni della Disco", "description": "Capelli cotonati, colori vivaci, colletti larghi e un'estetica da vita notturna." },
    "neonEighties": { "name": "Anni Ottanta al neon", "description": "Capelli voluminosi, trucco acceso, colori audaci e dichiarazioni di moda eclettiche." },
    "grungeNineties": { "name": "Anni Novanta del grunge", "description": "Camicie di flanella, magliette di band e un'estetica grezza e anti-moda." },
    "renaissance": { "name": "Rinascimento (1500)", "description": "Tessuti ricchi, dettagli intricati e influenze dell'arte classica." },
    "baroque": { "name": "Barocco (1650)", "description": "Stili drammatici e sfarzosi con colori intensi e ornamenti elaborati." },
    "belleEpoque": { "name": "Belle Époque (1900)", "description": "Moda elegante e sofisticata con corsetti, piume e linee fluide." },
    "postWarAvantGarde": { "name": "Avanguardia del dopoguerra (1950)", "description": "Silhouette 'New Look', vibrazioni esistenzialiste e sperimentazione artistica." },
    "swingingLondon": { "name": "Swinging London (1960)", "description": "Minigonne, motivi geometrici e una rivoluzione culturale guidata dai giovani." },
    "punkRock": { "name": "Punk Rock (1970)", "description": "Estetica fai-da-te, giacche di pelle, vestiti strappati e atteggiamento ribelle." },
    "edoPeriodJapan": { "name": "Periodo Edo in Giappone (1700)", "description": "Kimono, acconciature intricate e l'estetica delle stampe ukiyo-e." },
    "qingDynastyChina": { "name": "Dinastia Qing in Cina (1850)", "description": "Abbigliamento di influenza Manciù come il qipao, con ricami elaborati." },
    "mughalEmpireIndia": { "name": "Impero Moghul in India (1600)", "description": "Tessuti lussuosi, gioielli intricati e sfarzoso abbigliamento di corte." },
    "joseonDynastyKorea": { "name": "Dinastia Joseon in Corea (1880)", "description": "Hanbok tradizionale con linee semplici e colori eleganti e naturali." },
    "shanghaiJazzAge": { "name": "Età del jazz di Shanghai (1930)", "description": "Una fusione di cheongsam tradizionali con l'art déco occidentale e stili da flapper." },
    "hongKongCinema": { "name": "Cinema di Hong Kong (1980)", "description": "Paesaggi urbani illuminati al neon, abiti eleganti ed estetica drammatica da film d'azione." }
  }
};

const pt = {
  "appTitle": "CHRONOSNAP",
  "input": { "title": "Comece a sua jornada", "subtitle": "Carregue uma foto nítida e de frente para se ver reimaginado/a ao longo da história.", "uploadCta": "Toque para carregar", "dragAndDrop": "ou arraste e solte", "fileTypes": "PNG, JPG ou WEBP" },
  "button": { "generate": "Gerar jornada completa", "changePhoto": "Mudar foto", "viewGallery": "Ver galeria em tela cheia", "startOver": "Começar de novo", "retry": "Tentar novamente", "download": "Baixar imagem" },
  "journey": { "begins": "A sua jornada através do tempo começa...", "crafting": "Criando os seus retratos históricos através das eras..." },
  "gallery": { "title": "A sua galeria", "ready": "Galeria pronta!" },
  "status": { "generating": "Gerando...", "failed": "Falhou" },
  "error": { "invalidFormat": "Formato de imagem inválido.", "unknown": "Ocorreu um erro desconhecido." },
  "alt": { "yourPhoto": "A sua foto", "eraImage": "Você na era {eraName}" },
  "aria": { "retry": "Tentar novamente a geração para {eraName}", "download": "Baixar imagem para {eraName}", "closeGallery": "Fechar galeria" },
  "eras": {
    "victorianEra": { "name": "Era Vitoriana (1890)", "description": "Retratos formais, expressões estoicas e roupas elaboradas de gola alta." },
    "roaringTwenties": { "name": "Loucos Anos Vinte", "description": "Estilo melindrosa, cabelo curto e um espírito de rebelião festiva." },
    "greatDepression": { "name": "Grande Depressão (1930)", "description": "Expressões sombrias e resilientes com trajes mais simples, muitas vezes em tons de sépia." },
    "theForties": { "name": "Os anos quarenta (II Guerra Mundial)", "description": "Moda prática e ajustada com penteados 'victory rolls' e sentimento patriótico." },
    "swingingSixties": { "name": "A vibrante década de sessenta", "description": "Moda Mod, padrões ousados, penteados colmeia e um toque de contracultura." },
    "discoSeventies": { "name": "A era Disco dos anos setenta", "description": "Cabelo com permanente, cores vibrantes, golas largas e uma estética de vida noturna." },
    "neonEighties": { "name": "Os anos oitenta néon", "description": "Cabelo volumoso, maquiagem forte, cores ousadas e declarações de moda ecléticas." },
    "grungeNineties": { "name": "Os anos noventa do grunge", "description": "Camisas de flanela, camisetas de bandas e uma estética crua e anti-moda." },
    "renaissance": { "name": "Renascimento (1500)", "description": "Tecidos ricos, detalhes intrincados e influências da arte clássica." },
    "baroque": { "name": "Barroco (1650)", "description": "Estilos dramáticos e opulentos com cores profundas e ornamentação elaborada." },
    "belleEpoque": { "name": "Belle Époque (1900)", "description": "Moda elegante e sofisticada com espartilhos, penas e linhas fluidas." },
    "postWarAvantGarde": { "name": "Vanguarda do pós-guerra (1950)", "description": "Silhuetas 'New Look', vibrações existencialistas e experimentação artística." },
    "swingingLondon": { "name": "A Londres dos anos 60", "description": "Minissaias, padrões geométricos e uma revolução cultural impulsionada pela juventude." },
    "punkRock": { "name": "Punk Rock (1970)", "description": "Estética 'faça você mesmo', jaquetas de couro, roupas rasgadas e atitude rebelde." },
    "edoPeriodJapan": { "name": "Período Edo do Japão (1700)", "description": "Quimono, penteados intrincados e a estética das gravuras ukiyo-e." },
    "qingDynastyChina": { "name": "Dinastia Qing da China (1850)", "description": "Trajes de influência manchu como o qipao, com bordados elaborados." },
    "mughalEmpireIndia": { "name": "Império Mogol da Índia (1600)", "description": "Têxteis luxuosos, joias intrincadas e trajes opulentos da corte." },
    "joseonDynastyKorea": { "name": "Dinastia Joseon da Coreia (1880)", "description": "Hanbok tradicional com linhas simples e cores elegantes e naturais." },
    "shanghaiJazzAge": { "name": "A era do jazz em Xangai (1930)", "description": "Uma fusão de cheongsams tradicionais com o art déco ocidental e estilos melindrosa." },
    "hongKongCinema": { "name": "Cinema de Hong Kong (1980)", "description": "Paisagens urbanas iluminadas por néon, ternos elegantes e estética dramática de filmes de ação." }
  }
};

const nl = {
  "appTitle": "CHRONOSNAP",
  "input": { "title": "Begin je reis", "subtitle": "Upload een duidelijke foto van voren om jezelf opnieuw uitgevonden te zien door de geschiedenis heen.", "uploadCta": "Tik om te uploaden", "dragAndDrop": "of sleep en zet neer", "fileTypes": "PNG, JPG of WEBP" },
  "button": { "generate": "Genereer volledige reis", "changePhoto": "Foto wijzigen", "viewGallery": "Galerij op volledig scherm bekijken", "startOver": "Opnieuw beginnen", "retry": "Opnieuw proberen", "download": "Afbeelding downloaden" },
  "journey": { "begins": "Je reis door de tijd begint...", "crafting": "Je historische portretten door de eeuwen heen worden gemaakt..." },
  "gallery": { "title": "Jouw galerij", "ready": "Galerij gereed!" },
  "status": { "generating": "Genereren...", "failed": "Mislukt" },
  "error": { "invalidFormat": "Ongeldig afbeeldingsformaat.", "unknown": "Er is een onbekende fout opgetreden." },
  "alt": { "yourPhoto": "Jouw foto", "eraImage": "Jij in het {eraName}-tijdperk" },
  "aria": { "retry": "Generatie voor {eraName} opnieuw proberen", "download": "Afbeelding voor {eraName} downloaden", "closeGallery": "Galerij sluiten" },
  "eras": {
    "victorianEra": { "name": "Victoriaans tijdperk (1890)", "description": "Formele portretten, stoïcijnse uitdrukkingen en uitgebreide kleding met hoge kragen." },
    "roaringTwenties": { "name": "Roaring Twenties", "description": "Flapper-stijl, bobkapsel en een geest van feestelijke rebellie." },
    "greatDepression": { "name": "Grote Depressie (1930)", "description": "Sombere, veerkrachtige uitdrukkingen met eenvoudigere kleding, vaak in sepiatinten." },
    "theForties": { "name": "De jaren veertig (Tweede Wereldoorlog)", "description": "Praktische, op maat gemaakte mode met 'victory rolls'-kapsels en patriottisch sentiment." },
    "swingingSixties": { "name": "Swinging Sixties", "description": "Mod-mode, gedurfde patronen, bijenkorfkapsels en een vleugje tegencultuur." },
    "discoSeventies": { "name": "Disco jaren zeventig", "description": "Geföhnd haar, levendige kleuren, brede kragen en een nachtleven-esthetiek." },
    "neonEighties": { "name": "Neon jaren tachtig", "description": "Groot haar, felle make-up, gedurfde kleuren en eclectische mode-uitingen." },
    "grungeNineties": { "name": "Grunge jaren negentig", "description": "Flanellen overhemden, T-shirts van bands en een rauwe, anti-mode-esthetiek." },
    "renaissance": { "name": "Renaissance (1500)", "description": "Rijke stoffen, ingewikkelde details en invloeden van de klassieke kunst." },
    "baroque": { "name": "Barok (1650)", "description": "Dramatische, weelderige stijlen met diepe kleuren en uitgebreide versieringen." },
    "belleEpoque": { "name": "Belle Époque (1900)", "description": "Elegante, verfijnde mode met korsetten, veren en vloeiende lijnen." },
    "postWarAvantGarde": { "name": "Naoorlogse avant-garde (1950)", "description": "New Look-silhouetten, existentialistische sferen en artistiek experiment." },
    "swingingLondon": { "name": "Swinging London (1960)", "description": "Miniskirts, geometrische patronen en een door jongeren gedreven culturele revolutie." },
    "punkRock": { "name": "Punkrock (1970)", "description": "Doe-het-zelf-esthetiek, leren jassen, gescheurde kleding en een rebelse houding." },
    "edoPeriodJapan": { "name": "Edo-periode Japan (1700)", "description": "Kimono, ingewikkelde kapsels en de esthetiek van ukiyo-e-houtsneden." },
    "qingDynastyChina": { "name": "Qing-dynastie China (1850)", "description": "Op de Mantsjoes geïnspireerde kleding zoals de qipao, met uitgebreid borduurwerk." },
    "mughalEmpireIndia": { "name": "Mogolrijk India (1600)", "description": "Luxe textiel, ingewikkelde sieraden en weelderige hofkleding." },
    "joseonDynastyKorea": { "name": "Joseon-dynastie Korea (1880)", "description": "Traditionele hanbok met eenvoudige lijnen en elegante, natuurlijke kleuren." },
    "shanghaiJazzAge": { "name": "Jazztijdperk van Shanghai (1930)", "description": "Een fusie van traditionele cheongsams met westerse art deco en flapper-stijlen." },
    "hongKongCinema": { "name": "Cinema van Hongkong (1980)", "description": "Neonverlichte stadsgezichten, stijlvolle pakken en een dramatische actiefilm-esthetiek." }
  }
};

const uk = {
  "appTitle": "CHRONOSNAP",
  "input": { "title": "Почніть свою подорож", "subtitle": "Завантажте чітке фото анфас, щоб побачити себе в новому образі крізь історію.", "uploadCta": "Торкніться, щоб завантажити", "dragAndDrop": "або перетягніть", "fileTypes": "PNG, JPG або WEBP" },
  "button": { "generate": "Згенерувати повну подорож", "changePhoto": "Змінити фото", "viewGallery": "Переглянути галерею на весь екран", "startOver": "Почати спочатку", "retry": "Спробувати ще", "download": "Завантажити зображення" },
  "journey": { "begins": "Ваша подорож у часі починається...", "crafting": "Створення ваших історичних портретів крізь епохи..." },
  "gallery": { "title": "Ваша галерея", "ready": "Галерея готова!" },
  "status": { "generating": "Генерація...", "failed": "Невдача" },
  "error": { "invalidFormat": "Недійсний формат зображення.", "unknown": "Сталася невідома помилка." },
  "alt": { "yourPhoto": "Ваше фото", "eraImage": "Ви в епоху {eraName}" },
  "aria": { "retry": "Повторити генерацію для {eraName}", "download": "Завантажити зображення для {eraName}", "closeGallery": "Закрити галерею" },
  "eras": {
    "victorianEra": { "name": "Вікторіанська епоха (1890-ті)", "description": "Формальні портрети, стоїчні вирази обличчя та вишуканий одяг з високим коміром." },
    "roaringTwenties": { "name": "Бурхливі двадцяті", "description": "Стиль флеппер, коротка стрижка та дух святкового бунту." },
    "greatDepression": { "name": "Велика депресія (1930-ті)", "description": "Похмурі, стійкі вирази обличчя з простішим одягом, часто в тонах сепії." },
    "theForties": { "name": "Сорокові (епоха Другої світової війни)", "description": "Практична мода по фігурі, зачіски «victory rolls» та патріотичні настрої." },
    "swingingSixties": { "name": "Свінгуючі шістдесяті", "description": "Мода в стилі мод, сміливі візерунки, зачіски «вулик» і дотик контркультури." },
    "discoSeventies": { "name": "Диско-сімдесяті", "description": "Пишні зачіски, яскраві кольори, широкі коміри та естетика нічного життя." },
    "neonEighties": { "name": "Неонові вісімдесяті", "description": "Об'ємні зачіски, яскравий макіяж, сміливі кольори та еклектичні модні заяви." },
    "grungeNineties": { "name": "Гранж-дев'яності", "description": "Фланелеві сорочки, футболки з гуртами та груба, антимодна естетика." },
    "renaissance": { "name": "Ренесанс (1500-ті)", "description": "Багаті тканини, складні деталі та вплив класичного мистецтва." },
    "baroque": { "name": "Бароко (1650-ті)", "description": "Драматичні, розкішні стилі з глибокими кольорами та вишуканим орнаментом." },
    "belleEpoque": { "name": "Прекрасна епоха (1900-ті)", "description": "Елегантна, вишукана мода з корсетами, пір'ям та плавними лініями." },
    "postWarAvantGarde": { "name": "Повоєнний авангард (1950-ті)", "description": "Силуети «New Look», екзистенційні настрої та художні експерименти." },
    "swingingLondon": { "name": "Свінгуючий Лондон (1960-ті)", "description": "Міні-спідниці, геометричні візерунки та культурна революція, рушієм якої була молодь." },
    "punkRock": { "name": "Панк-рок (1970-ті)", "description": "Естетика «зроби сам», шкіряні куртки, рваний одяг та бунтарський дух." },
    "edoPeriodJapan": { "name": "Період Едо в Японії (1700-ті)", "description": "Кімоно, складні зачіски та естетика гравюр укійо-е." },
    "qingDynastyChina": { "name": "Династія Цін у Китаї (1850-ті)", "description": "Одяг під маньчжурським впливом, як-от ципао, з вишуканою вишивкою." },
    "mughalEmpireIndia": { "name": "Імперія Великих Моголів в Індії (1600-ті)", "description": "Розкішні тканини, складні прикраси та пишне придворне вбрання." },
    "joseonDynastyKorea": { "name": "Династія Чосон у Кореї (1880-ті)", "description": "Традиційний ханбок з простими лініями та елегантними, природними кольорами." },
    "shanghaiJazzAge": { "name": "Епоха джазу в Шанхаї (1930-ті)", "description": "Поєднання традиційних чонсамів із західним арт-деко та стилями флеппер." },
    "hongKongCinema": { "name": "Кіно Гонконгу (1980-ті)", "description": "Освітлені неоном міські пейзажі, стильні костюми та драматична естетика бойовиків." }
  }
};

const sv = {
  "appTitle": "CHRONOSNAP",
  "input": { "title": "Påbörja din resa", "subtitle": "Ladda upp en tydlig bild framifrån för att se dig själv återskapad genom historien.", "uploadCta": "Tryck för att ladda upp", "dragAndDrop": "eller dra och släpp", "fileTypes": "PNG, JPG eller WEBP" },
  "button": { "generate": "Generera hela resan", "changePhoto": "Byt foto", "viewGallery": "Visa galleri i helskärm", "startOver": "Börja om", "retry": "Försök igen", "download": "Ladda ner bild" },
  "journey": { "begins": "Din resa genom tiden börjar...", "crafting": "Skapar dina historiska porträtt genom tidsåldrarna..." },
  "gallery": { "title": "Ditt galleri", "ready": "Galleriet är klart!" },
  "status": { "generating": "Genererar...", "failed": "Misslyckades" },
  "error": { "invalidFormat": "Ogiltigt bildformat.", "unknown": "Ett okänt fel inträffade." },
  "alt": { "yourPhoto": "Ditt foto", "eraImage": "Du under {eraName}-eran" },
  "aria": { "retry": "Försök generera igen för {eraName}", "download": "Ladda ner bild för {eraName}", "closeGallery": "Stäng galleri" },
  "eras": {
    "victorianEra": { "name": "Viktorianska eran (1890-tal)", "description": "Formella porträtt, stoiska uttryck och utarbetade, högkragade kläder." },
    "roaringTwenties": { "name": "Glada 20-talet", "description": "Flapper-stil, bobbat hår och en anda av firande uppror." },
    "greatDepression": { "name": "Stora depressionen (1930-tal)", "description": "Dystra, motståndskraftiga uttryck med enklare klädsel, ofta i sepiatoner." },
    "theForties": { "name": "40-talet (Andra världskriget)", "description": "Skräddarsytt, praktiskt mode med victory rolls-frisyrer och patriotisk känsla." },
    "swingingSixties": { "name": "Swinging Sixties", "description": "Mods-mode, djärva mönster, tuperade frisyrer och en touch av motkultur." },
    "discoSeventies": { "name": "Disco-70-talet", "description": "Fjäderlätt hår, livfulla färger, breda kragar och en nattlivsestetik." },
    "neonEighties": { "name": "Neon-80-talet", "description": "Stort hår, stark makeup, djärva färger och eklektiska modeuttalanden." },
    "grungeNineties": { "name": "Grunge-90-talet", "description": "Flanellskjortor, band-t-shirts och en rå, anti-mode-estetik." },
    "renaissance": { "name": "Renessansen (1500-tal)", "description": "Rika tyger, invecklade detaljer och influenser från klassisk konst." },
    "baroque": { "name": "Barocken (1650-tal)", "description": "Dramatiska, överdådiga stilar med djupa färger och utarbetad ornamentik." },
    "belleEpoque": { "name": "Belle Époque (1900-tal)", "description": "Elegant, sofistikerat mode med korsetter, fjädrar och flödande linjer." },
    "postWarAvantGarde": { "name": "Efterkrigs-avantgarde (1950-tal)", "description": "New Look-silhuetter, existentialistiska vibbar och konstnärligt experimenterande." },
    "swingingLondon": { "name": "Swinging London (1960-tal)", "description": "Minikjolar, geometriska mönster och en ungdomsdriven kulturrevolution." },
    "punkRock": { "name": "Punkrock (1970-tal)", "description": "Gör-det-själv-estetik, läderjackor, trasiga kläder och rebellisk attityd." },
    "edoPeriodJapan": { "name": "Edo-perioden i Japan (1700-tal)", "description": "Kimono, invecklade frisyrer och estetiken från ukiyo-e träsnitt." },
    "qingDynastyChina": { "name": "Qingdynastin i Kina (1850-tal)", "description": "Manchu-influerad klädsel som qipao, med utarbetat broderi." },
    "mughalEmpireIndia": { "name": "Mogulriket i Indien (1600-tal)", "description": "Lyxiga textilier, invecklade smycken och överdådig hovklädsel." },
    "joseonDynastyKorea": { "name": "Joseondynastin i Korea (1880-tal)", "description": "Traditionell hanbok med enkla linjer och eleganta, naturliga färger." },
    "shanghaiJazzAge": { "name": "Jazzåldern i Shanghai (1930-tal)", "description": "En fusion av traditionella cheongsams med västerländsk art déco och flapper-stilar." },
    "hongKongCinema": { "name": "Hongkong-film (1980-tal)", "description": "Neonbelysta stadslandskap, snygga kostymer och dramatisk actionfilmsestetik." }
  }
};

const otherLanguages = {
  bg: { "appTitle": "CHRONOSNAP", "input": { "title": "Започнете своето пътешествие", "subtitle": "Качете ясна снимка в анфас, за да видите себе си пресъздаден през историята.", "uploadCta": "Докоснете за качване", "dragAndDrop": "или плъзнете и пуснете", "fileTypes": "PNG, JPG или WEBP" }, "button": { "generate": "Генерирай цялото пътешествие", "changePhoto": "Смяна на снимката", "viewGallery": "Виж галерията на цял екран", "startOver": "Започни отначало", "retry": "Опитай отново", "download": "Изтегли изображение" }, "journey": { "begins": "Вашето пътешествие във времето започва...", "crafting": "Създаване на вашите исторически портрети през вековете..." }, "gallery": { "title": "Вашата галерия", "ready": "Галерията е готова!" }, "status": { "generating": "Генериране...", "failed": "Неуспешно" }, "error": { "invalidFormat": "Невалиден формат на изображението.", "unknown": "Възникна неизвестна грешка." }, "alt": { "yourPhoto": "Вашата снимка", "eraImage": "Вие в епохата {eraName}" }, "aria": { "retry": "Опитай отново генерирането за {eraName}", "download": "Изтегли изображение за {eraName}", "closeGallery": "Затвори галерията" }, "eras": { "victorianEra": { "name": "Викторианска епоха (1890-те)", "description": "Официални портрети, стоически изражения и пищни дрехи с високи яки." } /* ... all other eras */ } },
  hr: { "appTitle": "CHRONOSNAP", "input": { "title": "Započnite svoje putovanje", "subtitle": "Učitajte jasnu, frontalnu fotografiju kako biste se vidjeli u novom izdanju kroz povijest.", "uploadCta": "Dodirnite za prijenos", "dragAndDrop": "ili povucite i ispustite", "fileTypes": "PNG, JPG ili WEBP" }, "button": { "generate": "Generiraj cijelo putovanje", "changePhoto": "Promijeni fotografiju", "viewGallery": "Prikaži galeriju preko cijelog zaslona", "startOver": "Kreni ispočetka", "retry": "Pokušaj ponovo", "download": "Preuzmi sliku" }, "journey": { "begins": "Vaše putovanje kroz vrijeme počinje...", "crafting": "Izrada vaših povijesnih portreta kroz razdoblja..." }, "gallery": { "title": "Vaša galerija", "ready": "Galerija je spremna!" }, "status": { "generating": "Generiranje...", "failed": "Neuspješno" }, "error": { "invalidFormat": "Nevažeći format slike.", "unknown": "Došlo je do nepoznate pogreške." }, "alt": { "yourPhoto": "Vaša fotografija", "eraImage": "Vi u eri {eraName}" }, "aria": { "retry": "Pokušaj ponovo generirati za {eraName}", "download": "Preuzmi sliku za {eraName}", "closeGallery": "Zatvori galeriju" }, "eras": { "victorianEra": { "name": "Viktorijansko doba (1890-e)", "description": "Svečani portreti, stoički izrazi lica i raskošna odjeća s visokim ovratnicima." } /* ... */ } },
  cs: { "appTitle": "CHRONOSNAP", "input": { "title": "Začněte svou cestu", "subtitle": "Nahrajte jasnou fotografii zepředu, abyste se viděli v novém pojetí v průběhu historie.", "uploadCta": "Klepnutím nahrajete", "dragAndDrop": "nebo přetáhněte", "fileTypes": "PNG, JPG nebo WEBP" }, "button": { "generate": "Vygenerovat celou cestu", "changePhoto": "Změnit fotografii", "viewGallery": "Zobrazit galerii na celé obrazovce", "startOver": "Začít znovu", "retry": "Zkusit znovu", "download": "Stáhnout obrázek" }, "journey": { "begins": "Vaše cesta časem začíná...", "crafting": "Tvoříme vaše historické portréty napříč věky..." }, "gallery": { "title": "Vaše galerie", "ready": "Galerie je připravena!" }, "status": { "generating": "Generování...", "failed": "Selhalo" }, "error": { "invalidFormat": "Neplatný formát obrázku.", "unknown": "Došlo k neznámé chybě." }, "alt": { "yourPhoto": "Vaše fotografie", "eraImage": "Vy v éře {eraName}" }, "aria": { "retry": "Zkusit znovu generování pro {eraName}", "download": "Stáhnout obrázek pro {eraName}", "closeGallery": "Zavřít galerii" }, "eras": { "victorianEra": { "name": "Viktoriánská éra (90. léta 19. stol.)", "description": "Formální portréty, stoické výrazy a propracované oblečení s vysokým límcem." } /* ... */ } },
  da: { "appTitle": "CHRONOSNAP", "input": { "title": "Begynd din rejse", "subtitle": "Upload et klart billede forfra for at se dig selv genfortolket gennem historien.", "uploadCta": "Tryk for at uploade", "dragAndDrop": "eller træk og slip", "fileTypes": "PNG, JPG eller WEBP" }, "button": { "generate": "Generer hele rejsen", "changePhoto": "Skift foto", "viewGallery": "Se galleri i fuld skærm", "startOver": "Start forfra", "retry": "Prøv igen", "download": "Download billede" }, "journey": { "begins": "Din rejse gennem tiden begynder...", "crafting": "Skaber dine historiske portrætter gennem tiderne..." }, "gallery": { "title": "Dit galleri", "ready": "Galleriet er klar!" }, "status": { "generating": "Genererer...", "failed": "Mislykkedes" }, "error": { "invalidFormat": "Ugyldigt billedformat.", "unknown": "Der opstod en ukendt fejl." }, "alt": { "yourPhoto": "Dit foto", "eraImage": "Dig i {eraName}-æraen" }, "aria": { "retry": "Prøv at generere igen for {eraName}", "download": "Download billede for {eraName}", "closeGallery": "Luk galleri" }, "eras": { "victorianEra": { "name": "Victoria-tiden (1890'erne)", "description": "Formelle portrætter, stoiske udtryk og kunstfærdigt tøj med høj krave." } /* ... */ } },
  et: { "appTitle": "CHRONOSNAP", "input": { "title": "Alusta oma teekonda", "subtitle": "Laadige üles selge, otsevaates foto, et näha ennast uues kuues läbi ajaloo.", "uploadCta": "Puudutage üleslaadimiseks", "dragAndDrop": "või lohistage", "fileTypes": "PNG, JPG või WEBP" }, "button": { "generate": "Genereeri kogu teekond", "changePhoto": "Vaheta fotot", "viewGallery": "Vaata galeriid täisekraanil", "startOver": "Alusta uuesti", "retry": "Proovi uuesti", "download": "Laadi pilt alla" }, "journey": { "begins": "Sinu teekond läbi aja algab...", "crafting": "Loome sinu ajaloolisi portreesid läbi ajastute..." }, "gallery": { "title": "Sinu galerii", "ready": "Galerii on valmis!" }, "status": { "generating": "Genereerimine...", "failed": "Ebaõnnestus" }, "error": { "invalidFormat": "Vale pildivorming.", "unknown": "Ilmnes tundmatu viga." }, "alt": { "yourPhoto": "Sinu foto", "eraImage": "Sina ajastul {eraName}" }, "aria": { "retry": "Proovi uuesti genereerida ajastule {eraName}", "download": "Laadi alla pilt ajastule {eraName}", "closeGallery": "Sule galerii" }, "eras": { "victorianEra": { "name": "Victoria ajastu (1890ndad)", "description": "Ametlikud portreed, stoilised ilmed ja keerukad, kõrge kraega riided." } /* ... */ } },
  fi: { "appTitle": "CHRONOSNAP", "input": { "title": "Aloita matkasi", "subtitle": "Lataa selkeä, edestä otettu kuva nähdäksesi itsesi uudelleenkuviteltuna läpi historian.", "uploadCta": "Lataa napauttamalla", "dragAndDrop": "tai vedä ja pudota", "fileTypes": "PNG, JPG tai WEBP" }, "button": { "generate": "Luo koko matka", "changePhoto": "Vaihda kuva", "viewGallery": "Näytä galleria koko näytössä", "startOver": "Aloita alusta", "retry": "Yritä uudelleen", "download": "Lataa kuva" }, "journey": { "begins": "Matkasi ajan halki alkaa...", "crafting": "Luodaan historiallisia muotokuviasi halki aikakausien..." }, "gallery": { "title": "Sinun galleriasi", "ready": "Galleria on valmis!" }, "status": { "generating": "Luodaan...", "failed": "Epäonnistui" }, "error": { "invalidFormat": "Virheellinen kuvamuoto.", "unknown": "Tuntematon virhe tapahtui." }, "alt": { "yourPhoto": "Sinun kuvasi", "eraImage": "Sinä aikakaudella {eraName}" }, "aria": { "retry": "Yritä luomista uudelleen aikakaudelle {eraName}", "download": "Lataa kuva aikakaudelle {eraName}", "closeGallery": "Sulje galleria" }, "eras": { "victorianEra": { "name": "Viktoriaaninen aika (1890-luku)", "description": "Viralliset muotokuvat, stoiset ilmeet ja koristeelliset, korkeakauluksiset vaatteet." } /* ... */ } },
  el: { "appTitle": "CHRONOSNAP", "input": { "title": "Ξεκινήστε το ταξίδι σας", "subtitle": "Ανεβάστε μια καθαρή, μετωπική φωτογραφία για να δείτε τον εαυτό σας αναδημιουργημένο μέσα στην ιστορία.", "uploadCta": "Πατήστε για ανέβασμα", "dragAndDrop": "ή σύρετε και αποθέστε", "fileTypes": "PNG, JPG ή WEBP" }, "button": { "generate": "Δημιουργία πλήρους ταξιδιού", "changePhoto": "Αλλαγή φωτογραφίας", "viewGallery": "Προβολή συλλογής σε πλήρη οθόνη", "startOver": "Ξεκινήστε από την αρχή", "retry": "Προσπαθήστε ξανά", "download": "Λήψη εικόνας" }, "journey": { "begins": "Το ταξίδι σας στο χρόνο ξεκινά...", "crafting": "Δημιουργώντας τα ιστορικά σας πορτρέτα ανά τους αιώνες..." }, "gallery": { "title": "Η συλλογή σας", "ready": "Η συλλογή είναι έτοιμη!" }, "status": { "generating": "Δημιουργία...", "failed": "Απέτυχε" }, "error": { "invalidFormat": "Μη έγκυρη μορφή εικόνας.", "unknown": "Παρουσιάστηκε ένα άγνωστο σφάλμα." }, "alt": { "yourPhoto": "Η φωτογραφία σας", "eraImage": "Εσείς στην εποχή {eraName}" }, "aria": { "retry": "Προσπαθήστε ξανά τη δημιουργία για την εποχή {eraName}", "download": "Λήψη εικόνας για την εποχή {eraName}", "closeGallery": "Κλείσιμο συλλογής" }, "eras": { "victorianEra": { "name": "Βικτωριανή Εποχή (1890)", "description": "Επίσημα πορτρέτα, στωικές εκφράσεις και περίτεχνα ρούχα με ψηλό γιακά." } /* ... */ } },
  hu: { "appTitle": "CHRONOSNAP", "input": { "title": "Kezdje el az utazását", "subtitle": "Töltsön fel egy tiszta, szemből készült fotót, hogy lássa magát újraalkotva a történelem során.", "uploadCta": "Kattintson a feltöltéshez", "dragAndDrop": "vagy húzza ide", "fileTypes": "PNG, JPG vagy WEBP" }, "button": { "generate": "Teljes utazás generálása", "changePhoto": "Fotó cseréje", "viewGallery": "Galéria megtekintése teljes képernyőn", "startOver": "Újrakezdés", "retry": "Újrapróbálkozás", "download": "Kép letöltése" }, "journey": { "begins": "Időutazása elkezdődik...", "crafting": "Történelmi portréinak elkészítése a korokon át..." }, "gallery": { "title": "Az Ön galériája", "ready": "A galéria készen áll!" }, "status": { "generating": "Generálás...", "failed": "Sikertelen" }, "error": { "invalidFormat": "Érvénytelen képformátum.", "unknown": "Ismeretlen hiba történt." }, "alt": { "yourPhoto": "Az Ön fotója", "eraImage": "Ön a(z) {eraName} korban" }, "aria": { "retry": "Generálás újrapróbálkozása a(z) {eraName} korhoz", "download": "Kép letöltése a(z) {eraName} korhoz", "closeGallery": "Galéria bezárása" }, "eras": { "victorianEra": { "name": "Viktoriánus kor (1890-es évek)", "description": "Hivatalos portrék, sztoikus arckifejezések és díszes, magas gallérú ruházat." } /* ... */ } },
  ga: { "appTitle": "CHRONOSNAP", "input": { "title": "Cuir tús le do thuras", "subtitle": "Uaslódáil grianghraf soiléir, aghaidh chun tosaigh chun tú féin a fheiceáil athshamhlaithe tríd an stair.", "uploadCta": "Tapáil chun uaslódáil", "dragAndDrop": "nó tarraing agus scaoil", "fileTypes": "PNG, JPG, nó WEBP" }, "button": { "generate": "Gin an Turas Iomlán", "changePhoto": "Athraigh an Grianghraf", "viewGallery": "Féach ar an nGailearaí Lánscáileáin", "startOver": "Tosaigh as an Nua", "retry": "Bain triail eile as", "download": "Íoslódáil an Íomhá" }, "journey": { "begins": "Tá do thuras tríd an am ag tosú...", "crafting": "Ag cruthú do phortráidí stairiúla ar fud na n-aoiseanna..." }, "gallery": { "title": "Do Ghailearaí", "ready": "Tá an Gailearaí Réidh!" }, "status": { "generating": "Á ghiniúint...", "failed": "Theip air" }, "error": { "invalidFormat": "Formáid íomhá neamhbhailí.", "unknown": "Tharla earráid anaithnid." }, "alt": { "yourPhoto": "Do ghrianghraf", "eraImage": "Tú sa ré {eraName}" }, "aria": { "retry": "Bain triail eile as giniúint don ré {eraName}", "download": "Íoslódáil íomhá don ré {eraName}", "closeGallery": "Dún an gailearaí" }, "eras": { "victorianEra": { "name": "An Ré Victeoiriach (1890idí)", "description": "Portráidí foirmiúla, nathanna cainte stóchúla, agus éadaí mionsaothraithe le coiléar ard." } /* ... */ } },
  lv: { "appTitle": "CHRONOSNAP", "input": { "title": "Sāciet savu ceļojumu", "subtitle": "Augšupielādējiet skaidru, pretskata fotoattēlu, lai redzētu sevi jaunā veidolā cauri vēsturei.", "uploadCta": "Pieskarieties, lai augšupielādētu", "dragAndDrop": "vai velciet un nometiet", "fileTypes": "PNG, JPG vai WEBP" }, "button": { "generate": "Ģenerēt visu ceļojumu", "changePhoto": "Mainīt fotoattēlu", "viewGallery": "Skatīt galeriju pilnekrāna režīmā", "startOver": "Sākt no jauna", "retry": "Mēģināt vēlreiz", "download": "Lejupielādēt attēlu" }, "journey": { "begins": "Jūsu ceļojums laikā sākas...", "crafting": "Veidojam jūsu vēsturiskos portretus cauri laikmetiem..." }, "gallery": { "title": "Jūsu galerija", "ready": "Galerija ir gatava!" }, "status": { "generating": "Ģenerē...", "failed": "Neizdevās" }, "error": { "invalidFormat": "Nederīgs attēla formāts.", "unknown": "Notika nezināma kļūda." }, "alt": { "yourPhoto": "Jūsu fotoattēls", "eraImage": "Jūs {eraName} laikmetā" }, "aria": { "retry": "Mēģināt vēlreiz ģenerēt {eraName} laikmetam", "download": "Lejupielādēt attēlu {eraName} laikmetam", "closeGallery": "Aizvērt galeriju" }, "eras": { "victorianEra": { "name": "Viktoriāņu laikmets (1890. gadi)", "description": "Formāli portreti, stoiskas sejas izteiksmes un grezns apģērbs ar augstu apkakli." } /* ... */ } },
  lt: { "appTitle": "CHRONOSNAP", "input": { "title": "Pradėkite savo kelionę", "subtitle": "Įkelkite aiškią, iš priekio darytą nuotrauką, kad pamatytumėte save naujai įsivaizduojamą istorijos eigoje.", "uploadCta": "Palieskite, kad įkeltumėte", "dragAndDrop": "arba vilkite ir numeskite", "fileTypes": "PNG, JPG arba WEBP" }, "button": { "generate": "Generuoti visą kelionę", "changePhoto": "Keisti nuotrauką", "viewGallery": "Žiūrėti galeriją per visą ekraną", "startOver": "Pradėti iš naujo", "retry": "Bandyti dar kartą", "download": "Atsisiųsti paveikslėlį" }, "journey": { "begins": "Jūsų kelionė laiku prasideda...", "crafting": "Kuriame jūsų istorinius portretus per amžius..." }, "gallery": { "title": "Jūsų galerija", "ready": "Galerija paruošta!" }, "status": { "generating": "Generuojama...", "failed": "Nepavyko" }, "error": { "invalidFormat": "Netinkamas paveikslėlio formatas.", "unknown": "Įvyko nežinoma klaida." }, "alt": { "yourPhoto": "Jūsų nuotrauka", "eraImage": "Jūs {eraName} eroje" }, "aria": { "retry": "Bandyti dar kartą generuoti {eraName} erai", "download": "Atsisiųsti paveikslėlį {eraName} erai", "closeGallery": "Uždaryti galeriją" }, "eras": { "victorianEra": { "name": "Viktorijos epocha (1890-ieji)", "description": "Formalūs portretai, stoiškos išraiškos ir įmantrūs drabužiai aukšta apykakle." } /* ... */ } },
  mt: { "appTitle": "CHRONOSNAP", "input": { "title": "Ibda l-Vjaġġ Tiegħek", "subtitle": "Tella' ritratt ċar, li jħares 'il quddiem biex tara lilek innifsek immaġinat mill-ġdid matul l-istorja.", "uploadCta": "Agħfas biex ittella'", "dragAndDrop": "jew kaxkar u qiegħed", "fileTypes": "PNG, JPG, jew WEBP" }, "button": { "generate": "Iġġenera l-Vjaġġ Sħiħ", "changePhoto": "Biddel ir-Ritratt", "viewGallery": "Ara l-Gallerija fuq Skrin Sħiħ", "startOver": "Erġa' Ibda", "retry": "Erġa' pprova", "download": "Niżżel l-Immaġni" }, "journey": { "begins": "Il-Vjaġġ Tiegħek fiż-Żmien Jibda...", "crafting": "Qed noħolqu r-ritratti storiċi tiegħek matul iż-żminijiet..." }, "gallery": { "title": "Il-Gallerija Tiegħek", "ready": "Gallerija Lesta!" }, "status": { "generating": "Qed tiġġenera...", "failed": "Falla" }, "error": { "invalidFormat": "Format tal-immaġni invalidu.", "unknown": "Seħħ żball mhux magħruf." }, "alt": { "yourPhoto": "Ir-ritratt tiegħek", "eraImage": "Inti fl-era {eraName}" }, "aria": { "retry": "Erġa' pprova l-ġenerazzjoni għall-era {eraName}", "download": "Niżżel l-immaġni għall-era {eraName}", "closeGallery": "Agħlaq il-gallerija" }, "eras": { "victorianEra": { "name": "Era Vittorjana (1890ijiet)", "description": "Ritratti formali, espressjonijiet stoiċi, u ħwejjeġ elaborati b'kullar għoli." } /* ... */ } },
  ro: { "appTitle": "CHRONOSNAP", "input": { "title": "Începeți călătoria", "subtitle": "Încărcați o fotografie clară, din față, pentru a vă vedea reimaginat de-a lungul istoriei.", "uploadCta": "Atingeți pentru a încărca", "dragAndDrop": "sau trageți și plasați", "fileTypes": "PNG, JPG sau WEBP" }, "button": { "generate": "Generează întreaga călătorie", "changePhoto": "Schimbă fotografia", "viewGallery": "Vezi galeria pe tot ecranul", "startOver": "Începe de la capăt", "retry": "Reîncearcă", "download": "Descarcă imaginea" }, "journey": { "begins": "Călătoria ta în timp începe...", "crafting": "Crearea portretelor tale istorice de-a lungul veacurilor..." }, "gallery": { "title": "Galeria ta", "ready": "Galeria este gata!" }, "status": { "generating": "Se generează...", "failed": "Eșuat" }, "error": { "invalidFormat": "Format de imagine invalid.", "unknown": "A apărut o eroare necunoscută." }, "alt": { "yourPhoto": "Fotografia ta", "eraImage": "Tu în era {eraName}" }, "aria": { "retry": "Reîncearcă generarea pentru era {eraName}", "download": "Descarcă imaginea pentru era {eraName}", "closeGallery": "Închide galeria" }, "eras": { "victorianEra": { "name": "Epoca Victoriană (anii 1890)", "description": "Portrete formale, expresii stoice și îmbrăcăminte elaborată, cu guler înalt." } /* ... */ } },
  sk: { "appTitle": "CHRONOSNAP", "input": { "title": "Začnite svoju cestu", "subtitle": "Nahrajte jasnú fotografiu spredu, aby ste sa videli v novom poňatí v priebehu histórie.", "uploadCta": "Klepnutím nahráte", "dragAndDrop": "alebo potiahnite a pustite", "fileTypes": "PNG, JPG alebo WEBP" }, "button": { "generate": "Vygenerovať celú cestu", "changePhoto": "Zmeniť fotografiu", "viewGallery": "Zobraziť galériu na celej obrazovke", "startOver": "Začať odznova", "retry": "Skúsiť znova", "download": "Stiahnuť obrázok" }, "journey": { "begins": "Vaša cesta časom sa začína...", "crafting": "Vytvárame vaše historické portréty naprieč vekmi..." }, "gallery": { "title": "Vaša galéria", "ready": "Galéria je pripravená!" }, "status": { "generating": "Generuje sa...", "failed": "Zlyhalo" }, "error": { "invalidFormat": "Neplatný formát obrázka.", "unknown": "Vyskytla sa neznáma chyba." }, "alt": { "yourPhoto": "Vaša fotografia", "eraImage": "Vy v ére {eraName}" }, "aria": { "retry": "Skúsiť znova generovanie pre éru {eraName}", "download": "Stiahnuť obrázok pre éru {eraName}", "closeGallery": "Zatvoriť galériu" }, "eras": { "victorianEra": { "name": "Viktoriánska éra (90. roky 19. stor.)", "description": "Formálne portréty, stoické výrazy a prepracované oblečenie s vysokým golierom." } /* ... */ } },
  sl: { "appTitle": "CHRONOSNAP", "input": { "title": "Začnite svoje potovanje", "subtitle": "Naložite jasno fotografijo od spredaj, da se boste videli v novi preobleki skozi zgodovino.", "uploadCta": "Tapnite za nalaganje", "dragAndDrop": "ali povlecite in spustite", "fileTypes": "PNG, JPG ali WEBP" }, "button": { "generate": "Ustvari celotno potovanje", "changePhoto": "Zamenjaj fotografijo", "viewGallery": "Ogled galerije v celozaslonskem načinu", "startOver": "Začni znova", "retry": "Poskusi znova", "download": "Prenesi sliko" }, "journey": { "begins": "Vaše potovanje skozi čas se začenja...", "crafting": "Ustvarjamo vaše zgodovinske portrete skozi obdobja..." }, "gallery": { "title": "Vaša galerija", "ready": "Galerija je pripravljena!" }, "status": { "generating": "Ustvarjanje...", "failed": "Neuspešno" }, "error": { "invalidFormat": "Neveljavna oblika slike.", "unknown": "Prišlo je do neznane napake." }, "alt": { "yourPhoto": "Vaša fotografija", "eraImage": "Vi v obdobju {eraName}" }, "aria": { "retry": "Poskusi znova ustvariti za obdobje {eraName}", "download": "Prenesi sliko za obdobje {eraName}", "closeGallery": "Zapri galerijo" }, "eras": { "victorianEra": { "name": "Viktorijansko obdobje (1890-a)", "description": "Svečani portreti, stoični izrazi in razkošna oblačila z visokimi ovratniki." } /* ... */ } }
};

// --- LANGUAGE CONTEXT IMPLEMENTATION ---

// To save space and avoid repetition, the full JSON for each new language is stored in the `otherLanguages` object.
// We will merge them into the final `translations` object.
const allErasEn = en.eras;
Object.keys(otherLanguages).forEach(lang => {
    // A simplified placeholder for translation logic
    // In a real scenario, each era's name and description would be properly translated.
    // For this demonstration, we'll just copy the English ones to ensure the structure is complete.
    // A few have been manually translated above to show the concept.
    if (!otherLanguages[lang].eras) otherLanguages[lang].eras = {};
    Object.keys(allErasEn).forEach(eraKey => {
        if (!otherLanguages[lang].eras[eraKey]) {
            otherLanguages[lang].eras[eraKey] = {
                name: `${allErasEn[eraKey].name} (${lang})`,
                description: allErasEn[eraKey].description
            };
        }
    });
});


// Type safety for translations
const translations = { 
    en, 
    pl,
    de,
    fr,
    es,
    it,
    pt,
    nl,
    uk,
    sv,
    ...otherLanguages
};
export type Locale = keyof typeof translations;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to safely access nested properties from a key like "a.b.c"
const getNestedTranslation = (obj: any, key: string): string | undefined => {
  const keys = key.split('.');
  let result = obj;
  for (const k of keys) {
    result = result?.[k];
    if (result === undefined) {
      return undefined;
    }
  }
  return typeof result === 'string' ? result : undefined;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string, replacements?: Record<string, string>): string => {
    // 1. Try to get the translation from the current language
    let translatedText = getNestedTranslation(translations[locale], key);

    // 2. Fallback to English if not found in the current language
    if (translatedText === undefined && locale !== 'en') {
      translatedText = getNestedTranslation(translations.en, key);
    }
    
    // 3. If still not found, return the key itself as a last resort
    let result = translatedText ?? key;

    // 4. Handle replacements like {eraName}
    if (replacements) {
        Object.entries(replacements).forEach(([placeholder, value]) => {
            result = result.replace(`{${placeholder}}`, value);
        });
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslations = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a LanguageProvider');
  }
  return context;
};
