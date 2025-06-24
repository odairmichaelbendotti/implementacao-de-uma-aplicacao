const MedicalSpecialty = {
    ANESTESIOLOGIA: "Anestesiologia",
    CARDIOLOGIA: "Cardiologia",
    CIRURGIA_GERAL: "Cirurgia Geral",
    CIRURGIA_PLASTICA: "Cirurgia Plástica",
    DERMATOLOGIA: "Dermatologia",
    ENDOCRINOLOGIA: "Endocrinologia",
    GASTROENTEROLOGIA: "Gastroenterologia",
    GERIATRIA: "Geriatria",
    GINECOLOGIA_OBSTETRICIA: "Ginecologia e Obstetrícia",
    HEMATOLOGIA: "Hematologia",
    INFECTOLOGIA: "Infectologia",
    MASTOLOGIA: "Mastologia",
    NEUROCIRURGIA: "Neurocirurgia",
    NEUROLOGIA: "Neurologia",
    OFTALMOLOGIA: "Oftalmologia",
    ONCOLOGIA: "Oncologia",
    ORTOPEDIA_TRAUMATOLOGIA: "Ortopedia e Traumatologia",
    OTORRINOLARINGOLOGIA: "Otorrinolaringologia",
    PEDIATRIA: "Pediatria",
    PNEUMOLOGIA: "Pneumologia",
    PSIQUIATRIA: "Psiquiatria",
    RADIOLOGIA: "Radiologia",
    REUMATOLOGIA: "Reumatologia",
    UROLOGIA: "Urologia",
}

// Object.entries converte um objeto em um array de chave valor:
export const medicalSpecialtiesOptions = Object.entries(MedicalSpecialty).map(([key, value]) => ({
    key: key,
    value: value,
}));