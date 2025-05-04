// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    // Combined data including full details for flashcard functionality
    const diseases = [
        {
            name: "Osteogenesis Imperfecta",
            story: "Jett, usually agile, experienced multiple fractures after minor falls during training. Her teammates also noticed her sclerae had a distinct blue tint. Her teeth looked somewhat opalescent and fragile.",
            question: "A patient presents with extremely brittle bones prone to fracture, blue sclerae, and teeth resembling dentinogenesis imperfecta. What is the most likely diagnosis?",
            answer: "Osteogenesis Imperfecta",
            fullDetails: `
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">No known treatment. Prognosis varies; Congenita often results in stillbirth or early death.</div>
            `
        },
        {
            name: "Infantile Cortical Hyperostosis (Caffey's)",
            story: "An infant under Brimstone's care developed tender, deep swellings over the jaw and clavicles within the first few months of life. Radiographs showed significant cortical thickening in these areas.",
            question: "An infant presents with tender swellings and cortical hyperostosis, particularly affecting the mandible and clavicles, appearing within the first few months of life. What condition should be suspected?",
            answer: "Infantile Cortical Hyperostosis (Caffey's)",
            fullDetails: `
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">Disease runs a benign course; active manifestations regress without treatment in several weeks to months. Course not altered by antibiotics. Occasionally: residual changes persist, recurrence of pain/thickening occurs.</div>
            `
        },
        {
            name: "Cleidocranial Dysplasia",
            story: "Killjoy consulted about her unusually mobile shoulders – she could nearly touch them together in front. She also mentioned her baby teeth were retained for a long time, and many permanent teeth failed to erupt, with X-rays showing extra teeth.",
            question: "A patient has hypermobile shoulders (due to clavicular defects), delayed exfoliation of deciduous teeth, failed eruption of permanent teeth, and supernumerary teeth. What is the diagnosis?",
            answer: "Cleidocranial Dysplasia",
            fullDetails: `
                <div class="details-title">General Info:</div><div class="details-content">Unknown etiology; often hereditary (AD, variable expression, may be new mutation or recessive with incomplete penetrance). Affects men/women equally. Affects skull, teeth, jaws, shoulder girdles, occasionally long bones.</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Skull: Fontanels remain open/delayed closing (large), sutures may remain open, wormian bones common, sagittal suture sunken (flat skull appearance), prominent frontal/parietal/occipital bones, underdeveloped/narrow paranasal sinuses, brachycephalic head (wide/short). Shoulder Girdle: Complete absence to partial absence/thinning of clavicles, unusual shoulder mobility (midline approximation). Defects of vertebral column, pelvis, long bones, digits also common.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">High, narrow, arched palate; cleft palate possible; underdeveloped maxilla relative to mandible (may be enlarged mandible); underdeveloped zygomatic bones; prolonged retention of deciduous teeth; delay/failure in eruption of permanent teeth (may be permanent); roots short/thinner/deformed; absence or paucity of cellular cementum; unerupted supernumerary teeth (esp. mandibular premolar/incisor areas); partial anodontia (rare).</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Dental: Absence or paucity of cellular cementum.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Open fontanels/sutures; wormian bones; underdeveloped sinuses; absent/partial clavicles; unerupted supernumerary teeth; short/thin/deformed roots.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">No specific treatment for bone; oral care important (restore deciduous teeth as extraction doesn't guarantee eruption; coordinated pedo/ortho/surgery for permanent teeth eruption potential).</div>
            `
        },
        {
            name: "Craniofacial Dysostosis (Crouzon)",
            story: "Cypher presented with concerns about his appearance, including bulging eyes (exophthalmos) and an underdeveloped midface giving his nose a 'parrot's beak' look. His history revealed early fusion of cranial sutures.",
            question: "A patient exhibits premature fusion of cranial sutures, exophthalmos, maxillary hypoplasia, and a 'parrot's beak' nose. Which syndrome is most likely?",
            answer: "Craniofacial Dysostosis (Crouzon)",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Craniofacial Dysostosis (Crouzon disease or syndrome)</div>
                <div class="details-title">General Info:</div><div class="details-content">Occurs without syndactyly. Genetic disease (AD trait, some sporadic). Results from retardation/failure of differentiation of maxillary mesoderm (after 50mm embryo stage).</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Variable appearance due to early synostosis of sutures. Protuberant frontal region, often with ridge to root of nose (triangular frontal defect). Facial malformations: hypoplasia of maxillae, mandibular prognathism, high arched palate (cleft in some cases), exaggerated facial angle, nose resembles 'parrot's beak'. Eye changes: hypertelorism, exophthalmos with divergent strabismus, optic neuritis, choked disks (frequent blindness). May present spina bifida occulta. Mentality variable (may/may not be retarded). Not all features inevitably present.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Hypoplasia of maxillae; mandibular prognathism; high arched palate (sometimes cleft).</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Not detailed in provided text.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Evidence of early suture synostosis; hypoplastic maxilla; high palate.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">Craniectomy at an early age to provide space for the rapidly growing brain.</div>
            `
        },
         {
            name: "Mandibulofacial Dysostosis (Treacher Collins)",
            story: "Reyna sought consultation for her distinct facial features: downward-slanting eyes, underdeveloped cheekbones and lower jaw, and malformed ears. She described her appearance as 'bird-like'.",
            question: "A patient presents with antimongoloid palpebral fissures, malar and mandibular hypoplasia, and ear malformations, creating a 'bird-like' facies. What is the diagnosis?",
            answer: "Mandibulofacial Dysostosis (Treacher Collins)",
            fullDetails: `
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Hypoplasia of the mandible; macrostomia; high palate (sometimes cleft); abnormal tooth position and malocclusion (teeth of upper jaw unaffected).</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Not detailed in provided text.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Malar bones grossly/symmetrically underdeveloped (may be agenesis); nonfusion of zygomatic arches; absence of palatine bones possible; cleft palate visible; hypogenesis/agenesis of mandible; underdeveloped paranasal sinuses; infantile/sclerotic mastoids; absent auditory ossicles, deficient cochlea/vestibular apparatus; normal cranial vault.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">No treatment (likely means no cure, reconstructive options exist). Good prognosis; most patients live a normal life span.</div>
            `
        },
        {
            name: "Pierre Robin Syndrome",
            story: "Neon was brought in as an infant with severe respiratory distress. Examination revealed a significantly small lower jaw (micrognathia), a tongue falling backwards (glossoptosis), and a cleft palate.",
            question: "An infant presents with the triad of micrognathia, glossoptosis, and cleft palate, often leading to respiratory difficulty. This is known as:",
            answer: "Pierre Robin Syndrome",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Pierre Robin Syndrome (Robin Anomalad)</div>
                <div class="details-title">General Info:</div><div class="details-content">Nonspecific anomalad (malformation + derived changes). Occurs isolated (sporadic, low recurrence risk) or part of broader syndromes (e.g., Stickler, Cerebrocostomandibular - higher recurrence risk). Primary defect: arrested development/hypoplasia of mandible.</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Micrognathia (characteristic 'bird facies'); Glossoptosis (tongue falls back due to lack of jaw support, obstructs epiglottis); Cleft palate (tongue prevents palatal shelf fusion, cleft lip does *not* occur with this). Respiratory difficulty is most important result. Other possible systemic defects: congenital heart defects, skeletal anomalies, ocular lesions, mental retardation.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Micrognathia; glossoptosis; cleft palate.</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Focus is on the developmental sequence/arrest.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Micrognathia; cleft palate visible.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">Focus on managing respiratory difficulty (e.g., positioning, airway adjuncts). Prognosis depends on severity and presence of associated defects.</div>
            `
        },
        {
            name: "Marfan Syndrome",
            story: "Chamber, known for his tall, slender frame and unusually long fingers ('spider fingers'), consulted due to joint hypermobility affecting his aim. He also had a high, arched palate.",
            question: "A tall patient with disproportionately long limbs/fingers (arachnodactyly), joint hypermobility, and potentially cardiovascular issues likely has which connective tissue disorder?",
            answer: "Marfan Syndrome",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Marfan Syndrome (Marfan-Achard syndrome, Arachnodactyly)</div>
                <div class="details-title">General Info:</div><div class="details-content">Hereditary disease (AD trait). Disease of connective tissue related to defective organization of collagen (abnormally soluble, reduced stable cross-links, attenuated maturation steps).</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Excessive length of tubular bones -> dolichostenomelia (long thin extremities) & arachnodactyly (spidery fingers). Long/narrow skull and face. Hyperextensibility of joints with habitual dislocations. Kyphosis or scoliosis. Flatfoot. Enlargement of the heart.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">High, arched palatal vault; bifid uvula; malocclusion; multiple odontogenic cysts of maxilla and mandible reported; temporomandibular dysarthrosis.</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Related to defective collagen organization and maturation.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Not detailed, but expect signs related to bone length/shape (dolichostenomelia, scoliosis) and potential odontogenic cysts.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">No specific treatment (likely means no cure, management of complications is key). Good prognosis.</div>
            `
        },
        {
            name: "Down Syndrome (Trisomy 21)",
            story: "Sage noted a patient with characteristic facial features (flat face, slanting eyes), macroglossia, and surprisingly severe periodontal disease despite good hygiene, but very few caries.",
            question: "A patient presents with distinct facial features, macroglossia, severe periodontal disease, but low caries index. This combination is often seen in:",
            answer: "Down Syndrome (Trisomy 21)",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Down Syndrome (Trisomy 21 syndrome, Mongolism)</div>
                <div class="details-title">General Info:</div><div class="details-content">Associated with subnormal mentality. Causative factors: advanced maternal age, uterine/placental abnormalities, chromosomal aberration (Trisomy 21 - 47 chromosomes, most common; Translocation - 46 chromosomes, extra 21 material on another chr., higher recurrence risk, younger mothers; Mosaicism). Increased incidence of acute leukemia.</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Flat face; large anterior fontanel; open sutures; small, slanting eyes with epicanthal folds; open mouth; frequent prognathism; sexual underdevelopment; cardiac abnormalities; hypermobility of the joints.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Macroglossia with protrusion of the tongue; fissured tongue or pebbly tongue (enlarged papillae); high, arched palate; teeth sometimes malformed, enamel hypoplasia, microdontia; universal, severe, destructive periodontal disease (not local origin); complete freedom from dental caries often noted.</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Not detailed in provided text.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Open fontanels/sutures. Dental: microdontia may be visible. Periodontal bone loss.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">No specific treatment for the syndrome itself; management of associated conditions (cardiac, dental - esp. periodontal) is key.</div>
            `
        },
        {
            name: "Osteopetrosis (Marble Bone)",
            story: "Breach reported a history of multiple fractures despite having incredibly dense bones on X-ray. His dentist noted difficulty with extractions due to the bone's fragility and risk of osteomyelitis post-extraction.",
            question: "A patient has radiographic evidence of extremely dense, sclerotic bones throughout the skeleton, but paradoxically suffers from frequent fractures and is at high risk for osteomyelitis after extractions. This suggests:",
            answer: "Osteopetrosis (Marble Bone)",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Osteopetrosis (Marble Bone disease, Albers-Schonberg disease, Osteosclerosis Fragilis Generalisata)</div>
                <div class="details-title">General Info:</div><div class="details-content">Uncommon disease of unknown etiology. Subdivided into: benign dominantly inherited form & malignant recessively inherited form. Most bones involved by diffuse sclerotic process in both.</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">MALIGNANT RECESSIVE: More severe. Present at birth (congenital/neonatal) or early life (infantile/childhood). Earlier onset = more serious. Often stillborn or die soon after birth. Common manifestations: optic atrophy (most common), hepatosplenomegaly, poor growth, frontal bossing, pathologic fractures, hearing loss, facial palsy, genu valgum. Death from anemia or secondary infection (no known patient survives beyond 20 yrs). BENIGN DOMINANT: Less severe. Develops later in life, can survive to old age. Half are asymptomatic. Common manifestations: pathologic fractures (often multiple, most common), bone pain, cranial nerve palsy (optic, facial), osteomyelitis. Cranial nerve involvement due to narrowing of foramina by bone deposition.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Reduced medullary spaces of jaws; fracture of jaw during tooth extraction (fragility); teeth of defective quality (enamel hypoplasia, microscopic dentinal defects, arrested root development); teeth prone to dental caries; retardation of tooth eruption (sclerosis). High risk of osteomyelitis post-extraction.</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Endosteal production of bone; concomitant lack of physiologic bone resorption; prominent osteoblasts but seldom osteoclasts; persistence of cartilaginous cores in bony trabeculae (endochondral bones); disorderly arrangement of trabeculae; fibrous marrow tissue. Benign form: may not be deficiency in osteoclast activity but abnormality in bone type/structure.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Diffuse, homogeneous, symmetrically sclerotic appearance of all bones; clubbing and transverse striations of ends of long bones; medullary cavities replaced by bone; thickened cortex. Jaws may be spared; if affected, roots of teeth nearly invisible.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">No effective treatment. Vitamin D depletion / Vitamin A administration failed. Prognosis poor for malignant form, better for benign form.</div>
            `
        },
        {
            name: "Achondroplasia",
            story: "Raze presented with characteristic short stature, particularly shortened limbs relative to her trunk length. Her head appeared slightly large with a prominent forehead and retruded midface.",
            question: "A patient exhibits dwarfism characterized by rhizomelic shortening of the limbs (proximal segments most affected), a relatively normal trunk length, macrocephaly with frontal bossing, and midface hypoplasia. This is typical of:",
            answer: "Achondroplasia",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Achondroplasia (Chondrodystrophia Fetalis)</div>
                <div class="details-title">General Info:</div><div class="details-content">Disturbance of endochondral bone formation -> characteristic dwarfism. Hereditary condition (AD trait). Begins in utero. High mortality rate if severe (stillborn/die after birth).</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Short height/stature; short and thickened muscular extremities; brachycephalic skull; bowed legs (genu varum); small hands and stubby fingers (trident hand); lumbar lordosis with prominent buttocks; protruding abdomen; limitation of motion in numerous joints (e.g., elbows cannot straighten); arms don't hang freely. Normal intelligence; unusual strength/agility.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Retruded maxilla (due to restriction of growth of base of skull); relative mandibular prognathism; obvious malocclusion; normal dentition.</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Disturbances in epiphyseal cartilage of long bones/ribs and certain membrane bones (base of skull). Retardation or aplasia of zone of provisional calcification of endochondral growth; lack of orderly arrangement of cartilage columns; failure to calcify properly; cartilage not resorbed/replaced by bone normally. Defective chondrocyte development -> disruption of longitudinal bone growth.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Long bones shorter than normal; thickening or mild clubbing of ends of bones; epiphyses appear normal (variable closure time); bones at base of skull fuse prematurely -> shortening & narrow foramen magnum.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">No treatment (likely means no cure, management of complications). If patient survives past first few years, normal life expectancy expected.</div>
            `
        },
         {
            name: "Osteitis Deformans (Paget's Disease)",
            story: "An older Brimstone complained of increasing hat size, bone pain, and some hearing loss. Radiographs revealed enlarged skull bones with patchy sclerotic areas described as 'cotton-wool' spots. Blood tests showed elevated alkaline phosphatase.",
            question: "An older adult presents with bone pain, enlarging skull, potential deafness or visual changes, and radiographs showing mixed lytic and sclerotic lesions ('cotton-wool' appearance), often with elevated serum alkaline phosphatase. This suggests:",
            answer: "Osteitis Deformans (Paget's Disease)",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Osteitis Deformans (Paget's disease of bone)</div>
                <div class="details-title">General Info:</div><div class="details-content">Chronic disease, develops slowly. Etiology unknown (theories: inflammatory, circulatory disturbance, breakdown in normal creeping replacement, infection by 'slow' virus). Predominantly patients > 40 yrs; slight male predilection. Common in England, France, Germany; rare elsewhere; moderate in North America.</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Common symptoms: bone pain, severe headache, deafness (petrous temporal bone/cochlear nerve involvement), blindness/visual disturbances, facial paralysis (facial nerve pressure), dizziness, weakness, mental disturbance. Common features: progressive skull enlargement, deformities of spine/femur/tibia (shortening), bowing of legs, broad/flat chest, spinal curvature, pathologic fractures. Patient assumes 'simian' appearance, facial pattern may become grotesque. Bones warm to touch (increased vascularity), increased fragility/fracture tendency (healing normal, callus abundant). Risk of osteosarcoma development.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Jaw involvement common. Progressive enlargement of maxilla (widening of alveolar ridge, flattening of palate); teeth may become loose/migrate, producing spaces. Similar findings in mandible but less severe. Mouth may remain open (lips too small for enlarged jaw). Inability to wear appliances (dentures need remaking).</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Depends on stage. Osteoclastic & osteoblastic activity. Formation of 'mosaic' bone (partially resorbed/repaired bone) with deeply staining hematoxyphilic reversal lines (alternating phases) -> 'jigsaw-puzzle' appearance. Fibrous marrow, inflammatory edema, focal lymphocytes. Rapid bone formation = immature bone, more osteoid. Bone changes from fibrillar to mature lamellar in resting phase. Obliteration of PDL possible.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Depends on stage: Initial deossification/softening -> bizarre, dysplastic reossification. Osteolytic areas (destructive lesions, multiple/diffuse/isolated; large isolated skull lesion = 'osteoporosis circumscripta') often co-exist with osteoblastic areas (opacities, patchy -> confluent, 'cotton-wool' appearance). Dental: hypercementosis, loss of well-defined lamina dura. Root resorption can occur (unusual).</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">No specific treatment. Calcitonin & diphosphonates used to suppress bone resorption. Mithramycin used (serious side effects). Needs differentiation from other diseases (fibrous dysplasia, hyperparathyroidism, osteomyelitis, fibro-osteoma, osteosarcoma, metastatic carcinoma, multiple myeloma).</div>
            `
        },
        {
            name: "Generalized Cortical Hyperostosis (Van Buchem)",
            story: "An adult patient of Viper's complained of gradual facial changes, deafness, and loss of facial sensation. Radiographs showed diffuse sclerosis of the skull and jaw bones, identified as Van Buchem disease.",
            question: "An adult patient develops facial swelling, deafness, and facial paralysis with radiographic evidence of diffuse endosteal bone sclerosis in the skull and jaws. What rare hereditary condition fits?",
            answer: "Generalized Cortical Hyperostosis (Van Buchem)",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Generalized Cortical Hyperostosis (Van Buchem disease or syndrome, Endosteal Hyperostosis)</div>
                <div class="details-title">General Info:</div><div class="details-content">Excessive deposition of endosteal bone throughout skeleton. Hereditary condition (AR characteristic).</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Usually not discovered until adult life. Facial appearance may be altered (swollen face, widening at mandible angles/nose bridge). Loss of visual acuity, loss of facial sensation, some degree of facial paralysis, deafness, overgrowth of alveolar process.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Widening at the angles of the mandible; overgrowth of the alveolar process.</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Normal dense bone without evidence of remodeling.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Increased density of many bones (hands/feet may be unaffected). Skull exhibits diffuse sclerosis, as may the jaws.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">No treatment. Patients may lead a normal life. Needs differentiation from other sclerosing diseases (osteopetrosis, Paget's, Camurati-Engelmann).</div>
            `
        },
        {
            name: "Massive Osteolysis (Gorham Syndrome)",
            story: "Omen watched helplessly as a section of a patient's mandible seemed to just... disappear over time on radiographs, replaced by soft tissue. The diagnosis was Gorham Syndrome, or 'vanishing bone'.",
            question: "A young adult experiences progressive, spontaneous resorption of a bone (like the mandible), ultimately replacing it with vascular fibrous tissue, sometimes called 'vanishing bone'. This describes:",
            answer: "Massive Osteolysis (Gorham Syndrome)",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Massive Osteolysis (Vanishing Bone, Disappearing Bone, Phantom Bone, Progressive Osteolysis, Gorham Syndrome)</div>
                <div class="details-title">General Info:</div><div class="details-content">Spontaneous, progressive resorption of bone -> ultimate total disappearance. Unknown etiology (may relate to active bone hyperemia). Different from osteolysis with infection or CNS disease.</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Most common in older children, young/middle-aged adults. Affects both sexes equally. Usually affects only one bone (polyostotic cases occur). Common bones: clavicle, scapula, humerus, ribs, ilium, ischium, sacrum. May or may not be painful. Begins suddenly, advances rapidly until bone replaced by thin fibrous tissue layer surrounding cavity.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Destruction of entire mandible in some cases; concomitant maxillary involvement possible. Pain or facial asymmetry. Pathologic fracture following minor trauma. Disturbed eruption pattern of teeth due to loss of normal support.</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Replacement of bone by connective tissue containing many thin-walled blood vessels or anastomosing vascular spaces lined by endothelial cells.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Medullary portions of bone rarefied, present irregular trabeculations, often multilocular cystic appearance. Cortical bone thinned and considerably expanded.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">No specific treatment. Radiation therapy and surgical resection used. If left untreated, can progress to total destruction of involved bone.</div>
            `
        },
        {
            name: "Fibrous Dysplasia (Polyostotic)",
            story: "Astra observed a young patient with limb deformities, bone pain, and characteristic 'cafe-au-lait' skin spots. Multiple bones were affected, pointing towards the polyostotic form of Fibrous Dysplasia (Jaffe's type). If endocrine issues like precocious puberty were present, it would be Albright's syndrome.",
            question: "A patient presents with multiple bone involvement (often unilateral), bone pain, deformities, and 'cafe-au-lait' skin spots. If endocrine issues are also present, it might be Albright's syndrome. This condition is:",
            answer: "Fibrous Dysplasia (Polyostotic)",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Fibrous Dysplasia of Bone (Polyostotic Form)</div>
                <div class="details-title">General Info:</div><div class="details-content">Unknown etiology, uncertain pathogenesis. Can be: involving variable number of bones, accompanied by pigmented skin lesions ('cafe-au-lait' spots) = Jaffe's type; OR involving nearly all bones, with skin lesions AND endocrine disturbances = Albright's syndrome (McCune-Albright Syndrome).</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Manifests early in life. Evident deformity, bowing, or thickening of long bones (often unilateral). Onset insidious, recurrent bone pain common. Bones of face/skull frequently involved -> asymmetry. Other bones: clavicles, pelvic bones, scapulae, long bones, metacarpals, metatarsals. Spontaneous fractures -> invalidism. Skin lesions: irregularly pigmented melanotic 'cafe-au-lait' spots (light brown). Albright's: endocrine disturbances (precocious puberty in females starting 2-3 yrs or younger, vaginal bleeding; pituitary, thyroid, parathyroid, ovary issues), intramuscular soft-tissue myxomas.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Jaw lesions causing expansion and deformity; malalignment, tipping, or displacement of teeth; alteration of eruption time due to endocrine disturbances (Albright's).</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Lesions composed of fibrillar connective tissue with numerous trabeculae of coarse, woven fiber bone; irregular shape, evenly spaced, no relation to function. Large osteocytes; collagen fibers of trabeculae extend into fibrous tissue; bone formation by stellate osteoblasts; wide osteoid seams.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Variable appearance (similar patterns to monostotic: radiolucent, mottled, ground-glass). Lesions often extensive, may involve multiple bones, often unilateral distribution. Expansion, thinning of cortex. Tooth displacement/separation, rare resorption. Thickening of base of skull common.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">Surgical treatment for mild cases (deformity correction); impossible treatment for severe cases. X-ray radiation mentioned (Note: generally avoided now due to sarcoma risk). Prognosis depends upon degree of skeletal involvement.</div>
            `
        },
        {
            name: "Fibrous Dysplasia (Monostotic)",
            story: "Phoenix noticed a slow-growing, painless swelling on his jaw. Radiographs showed a poorly defined lesion with a hazy, 'ground-glass' appearance blending into the surrounding bone.",
            question: "A young adult presents with a painless, expansile jaw lesion. Radiographs show a 'ground-glass' or mottled appearance with ill-defined borders. Histology reveals fibrous tissue replacing normal bone with irregular trabeculae of woven bone. What is the likely diagnosis?",
            answer: "Fibrous Dysplasia (Monostotic)",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Fibrous Dysplasia of the Jaws (Monostotic Form - single bone involved)</div>
                <div class="details-title">General Info:</div><div class="details-content">Less serious than polyostotic but common jaw involvement. Etiology unknown (theories: aberrant bone-forming mesenchymal activity, local infection/trauma trigger, reparative reaction).</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Equal predilection M/F. More common in children/young adults. Painless swelling or bulging of jaw (first sign), usually labial/buccal plate; sometimes protuberant excrescence on inferior border (mandible). Malalignment, tipping, displacement of teeth. Mucosa intact. Maxilla: marked predilection for children, difficult to eradicate radically, lesions not well-circumscribed, extend locally (sinus, zygoma, orbit floor, skull base -> craniofacial fibrous dysplasia), expansion/deformity.</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Painless swelling/bulging of jaw; malalignment/tipping/displacement of teeth. Maxillary lesions cause expansion/deformity, severe malocclusion, bulging canine fossa, prominent zygomatic process -> marked facial deformity.</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Fibrous lesion: proliferating fibroblasts in compact stroma of interlacing collagen fibers. Irregular trabeculae of bone, no definite pattern. C-shaped or 'Chinese character'-shaped trabeculae common.</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">3 basic patterns: (1) Small unilocular or larger multilocular radiolucency, well-circumscribed border, fine trabeculae network. (2) Similar to (1) but increased trabeculation -> more opaque/mottled. (3) Opaque lesion, delicate trabeculae -> 'ground-glass' or 'peau d'orange' appearance; not well-circumscribed, blends into adjacent bone. All types in maxilla or mandible. Cortical bone thinned. Roots separated/moved, occasional severe resorption. Bone may obscure roots. Thickening of base of skull (craniofacial).</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">Surgical removal. Often too large for complete excision without deformity/fracture risk. Majority treated by conservative removal/shaping of portion causing deformity. Ground-glass lesions not circumscribed, may need block resection. Lesions often stabilize after skeletal maturity.</div>
            `
        },
         {
            name: "Cherubism",
            story: "Young Gekko developed noticeable, symmetric fullness in his lower face, giving him 'chubby cheeks'. It started around age 3-4. X-rays revealed bilateral, multilocular radiolucencies in the mandible, making unerupted teeth appear to 'float'.",
            question: "A child presents with bilateral, painless, symmetric swelling of the lower face ('cherubic' appearance), often starting at age 2-5. Radiographs show multilocular radiolucencies in the jaws, particularly the mandible, with displacement of developing teeth. This strongly suggests:",
            answer: "Cherubism",
            fullDetails: `
                <div class="details-title">Syndrome:</div><div class="details-content">Cherubism (Familial Fibrous Dysplasia of the Jaws, Disseminated Juvenile Fibrous Dysplasia, Familial Multilocular Cystic Disease of the Jaws, etc.)</div>
                <div class="details-title">General Info:</div><div class="details-content">Hereditary disease (AD gene, variable expressivity).</div>
                <div class="details-title">Clinical Features:</div><div class="details-content">Manifests early childhood (often 3-4 yrs). Progressive, painless, symmetric swelling of jaws (mandible or maxilla, mostly mandible) -> typical 'chubby face' (cherub). Jaws firm/hard to palpation. Reactive regional lymphadenopathy may be present. Possible pigmented skin lesions (like polyostotic FD). Deciduous dentition shed prematurely (as early as 3 yrs). Defective permanent dentition (absence, displacement, lack of eruption).</div>
                <div class="details-title">Oral Manifestations:</div><div class="details-content">Progressive, painless, symmetric swelling (mandible usually, sometimes maxilla); enlarged palate. Premature deciduous shedding; defective permanent dentition (absent, displaced, unerupted). Intact oral mucosa, normal color.</div>
                <div class="details-title">Histopathology:</div><div class="details-content">Great numbers of large multinucleated giant cells in a loose, delicate fibrillar connective tissue stroma containing large numbers of fibroblasts and many small blood vessels. Inflammatory cells in lesions. Epithelial remnants of developing teeth. Perivascular, eosinophilic cuffing of small capillaries (characteristic).</div>
                <div class="details-title">Radiographic Features:</div><div class="details-content">Extensive bilateral destruction of bone (one or both jaws); expansion and severe thinning of cortical plates. Body of bone may present multilocular appearance. Perforation of cortex may occur. Ramus may be involved, condyle usually spared. Numerous unerupted and displaced teeth appear to be 'floating' in cystlike spaces.</div>
                <div class="details-title">Treatment/Prognosis:</div><div class="details-content">Progresses rapidly during early childhood, tends to become static and may regress as patient approaches puberty. Surgical correction of jaws often deferred until after puberty. Radiation therapy is contraindicated.</div>
            `
        }
    ];

    // --- Game State ---
    let currentDiseaseIndex = 0;
    let score = 0;
    let selectedAnswer = null;
    let answerChecked = false; // Flag to prevent multiple checks
    let currentOptions = []; // Store current options to generate distractors
    const totalDiseases = diseases.length; // Store total number of diseases

    // --- DOM Elements ---
    // Ensure elements are selected *after* DOM is loaded
    const storyTextEl = document.getElementById('story-text');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainerEl = document.getElementById('options-container');
    const feedbackEl = document.getElementById('feedback-section');
    const feedbackTextEl = document.getElementById('feedback-text');
    const feedbackDetailsEl = document.getElementById('feedback-details');
    const nextButton = document.getElementById('next-button');
    const checkButton = document.getElementById('check-button');
    const progressTextEl = document.getElementById('progress-text');
    const progressBarEl = document.getElementById('progress-bar');
    const summarySectionEl = document.getElementById('summary-section');
    const scoreTextEl = document.getElementById('score-text');
    const restartButton = document.getElementById('restart-button');
    const progressContainerEl = document.getElementById('progress-container');
    const storySectionEl = document.getElementById('story-section');
    const questionSectionEl = document.getElementById('question-section');


    // --- Functions ---

    // Fisher-Yates (Knuth) Shuffle algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array; // Return shuffled array
    }

    // Function to get distractors (other disease names)
    function getDistractors(correctAnswer, count) {
        const allNames = diseases.map(d => d.answer); // Use the 'answer' field which holds the disease name
        const distractors = [];
        // Filter out the correct answer to create a pool of potential distractors
        const availableNames = allNames.filter(name => name !== correctAnswer);
        shuffleArray(availableNames); // Shuffle available names

        // Select the required number of distractors
        for (let i = 0; i < count && i < availableNames.length; i++) {
            distractors.push(availableNames[i]);
        }
        // Ensure we have enough distractors, if not, reuse some (less ideal but handles small datasets)
         while (distractors.length < count && availableNames.length > 0) {
             // This loop is unlikely needed with 16 diseases but good practice
             distractors.push(availableNames[distractors.length % availableNames.length]);
         }
        return distractors;
    }


    function loadDisease(index) {
        // Reset state for the new question
        selectedAnswer = null;
        answerChecked = false;
        feedbackEl.style.display = 'none'; // Hide feedback section initially
        feedbackTextEl.textContent = '';
        feedbackDetailsEl.innerHTML = ''; // Clear details
        feedbackTextEl.className = 'mb-2'; // Reset feedback style
        nextButton.style.display = 'none'; // Hide next button
        checkButton.style.display = 'block'; // Show check button
        checkButton.disabled = true; // Disable check until an option is selected

        if (index >= totalDiseases) {
            showSummary();
            return;
        }

        const disease = diseases[index];
        storyTextEl.textContent = disease.story;
        questionTextEl.textContent = disease.question;

        // Update progress
        progressTextEl.textContent = `Disease ${index + 1} / ${totalDiseases}`;
        progressBarEl.style.width = `${((index + 1) / totalDiseases) * 100}%`;


        // Clear previous options and create new ones
        optionsContainerEl.innerHTML = '';
        const correctAnswer = disease.answer;
        const distractors = getDistractors(correctAnswer, 3); // Get 3 distractors
        currentOptions = shuffleArray([correctAnswer, ...distractors]); // Combine and shuffle


        currentOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn', 'btn-primary');
            // Make sure the option text matches exactly what's in the 'answer' field for comparison
            button.onclick = () => selectOption(button, option);
            optionsContainerEl.appendChild(button);
        });
    }

    function selectOption(button, option) {
        if (answerChecked) return; // Don't allow selection after checking

        // Remove selected style from previously selected button (if any)
        const currentlySelected = optionsContainerEl.querySelector('.btn-selected');
        if (currentlySelected) {
            currentlySelected.classList.remove('btn-selected');
             currentlySelected.classList.add('btn-primary');
        }

        // Add selected style to the clicked button
        button.classList.remove('btn-primary');
        button.classList.add('btn-selected');
        selectedAnswer = option; // Store the selected option text
        checkButton.disabled = false; // Enable check button
    }

    function checkAnswer() {
        if (!selectedAnswer || answerChecked) return; // Only check if an answer is selected and not already checked

        answerChecked = true; // Mark as checked
        checkButton.style.display = 'none'; // Hide check button
        nextButton.style.display = 'block'; // Show next button
        feedbackEl.style.display = 'block'; // Show feedback section

        const correctDisease = diseases[currentDiseaseIndex].answer; // Get the correct answer string
        const fullDetails = diseases[currentDiseaseIndex].fullDetails;
        const buttons = optionsContainerEl.querySelectorAll('button');

        buttons.forEach(button => {
            button.disabled = true; // Disable all buttons after checking
            button.classList.remove('btn-primary', 'btn-selected'); // Remove base styling

            if (button.textContent === correctDisease) {
                button.classList.add('btn-correct'); // Highlight correct answer in green
            } else if (button.textContent === selectedAnswer) {
                button.classList.add('btn-incorrect'); // Highlight incorrect selection in red
            } else {
                 button.classList.add('opacity-50'); // Dim others
            }
        });


        if (selectedAnswer === correctDisease) {
            feedbackTextEl.textContent = 'Correct! Well remembered!';
            feedbackTextEl.className = 'mb-2 feedback-correct'; // Apply correct class
            score++;
        } else {
            feedbackTextEl.textContent = `Not quite. The correct diagnosis is ${correctDisease}.`;
             feedbackTextEl.className = 'mb-2 feedback-incorrect'; // Apply incorrect class
        }
         // Display the full details regardless of correct/incorrect
         feedbackDetailsEl.innerHTML = fullDetails;

    }

    function nextDisease() {
        currentDiseaseIndex++;
        loadDisease(currentDiseaseIndex);
    }

     function showSummary() {
        // Hide game elements
        progressContainerEl.style.display = 'none';
        storySectionEl.style.display = 'none';
        questionSectionEl.style.display = 'none';
        feedbackEl.style.display = 'none';
        nextButton.style.display = 'none';
        checkButton.style.display = 'none';


        // Show summary
        scoreTextEl.textContent = `You scored ${score} out of ${totalDiseases}!`;
        summarySectionEl.style.display = 'block';
    }

    function restartQuiz() {
        // Reset state
        currentDiseaseIndex = 0;
        score = 0;
        shuffleArray(diseases); // Reshuffle diseases for a new order


        // Show game elements
        progressContainerEl.style.display = 'block';
        storySectionEl.style.display = 'block';
        questionSectionEl.style.display = 'block';
        feedbackEl.style.display = 'none'; // Hide feedback until check
        checkButton.style.display = 'block';


         // Hide summary
        summarySectionEl.style.display = 'none';


        // Load first question
        loadDisease(currentDiseaseIndex);
    }


    // --- Event Listeners ---
    checkButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', nextDisease);
    restartButton.addEventListener('click', restartQuiz);


    // --- Initial Load ---
    shuffleArray(diseases); // Shuffle diseases on initial load
    loadDisease(currentDiseaseIndex);
});
