





































































var tagsUrl = {
  "merrychristmas": "merry-christmas",
  "gloryhole": "glory-hole",
  "college-(18+)": "college-18",
  "school-(18+)": "school-18",
  "teen-(18+)": "teen-18",
  "sexoadulto": "sexo-adulto",
  "sexoanal": "sexo-anal",
  "paugrande": "pau-grande",
  "bate-papoporvídeonu": "bate-papoporvideonu",
  "Âncora": "ancora",
  "boa-aparência": "boa-aparencia",
  "adereços": "aderecos",
  "masturbação": "masturbacao",
  "bunda-de-pêssego": "bunda-de-pessego",
  "secretário": "secretario",
  "bêbado": "bebado",
  "empregada-doméstica": "empregada-domestica",
  "irmã-mais-velha": "irma-mais-velha",
  "dupla-penetração": "dupla-penetracao",
  "público": "publico",
  "compilação": "compilacao",
  "aeromoça-de-avião": "aeromoça-de-aviao",
  "vestiário": "vestiario",
  "engraçado": "engracado",
  "música": "musica",
  "massagem-erótica": "massagem-erotica",
  "aborígene": "aborigene",
  "mãe-e-filho": "mae-e-filho",
  "japonês": "japones",
  "ejaculação-precoce": "ejaculacao-precoce",
  "asiático": "asiatico",
  "francês": "frances",
  "mulher-grávida": "mulher-gravida",
  "britânico": "britanico",
  "posições-sexuais": "posicoes-sexuais",
  "boneca-inflável": "boneca-inflavel",
  "romântico": "romantico",
  "fazer-sexo-em-pé": "fazer-sexo-em-pe",
  "transgênero": "transgenero",
  "fundição": "fundicao",
  "granddaughter": "granddaughter",
  "carícia": "caricia",
  "injeção": "injecao",
  "encenação": "encenacao",
  "calça-de-couro": "calca-de-couro",
  "avalokitesvara-sentado-em-lótus": "avalokitesvara-sentado-em-lotus",
  "molho-de-pássaro": "molho-de-passaro",
  "webcamshow": "web-cam-show",
  "sexogay": "sexo-gay",
  "spa-de-óleo-essencial": "spa-de-oleo-essencial",
  "transmissão-ao-vivo-ao-ar-livre": "transmissao-ao-vivo-ao-ar-livre",
  "ereção-matinal": "erecao-matinal",
  "técnico-de-massagem": "tecnico-de-massagem",
  "enorme-quantidade-de-sêmen": "enorme-quantidade-de-semen",
  "alemão": "alemao",
  "incesto-entre-irmãos-e-irmãs": "incesto-entre-irmaos-e-irmas",
  "lgbtq+": "lgbtq",
  "teen(18+)": "teen-18",
  "prematureejaculation": "premature-ejaculation",
  "lickingpussy": "licking-pussy",
  "adolescente(18+)": "adolescente-18",
  "pornoxvideos": "porno-xvideos",
  "青少年(18岁以上)": "青少年-18岁以上",
  "sexo-gay-grátis": "sexo-gay-gratis",
  "trêspessoas": "trespessoas",
  "lésbicas": "lesbicas",
  "sexoviolento": "sexo-violento",
  "livebroadcast": "live-broadcast",
  "malebutt": "male-butt",
  "chuparpênis": "chuparpenis",
  "apenasfãs": "apenasfas",
  "duplapenetração": "duplapenetracao",
  "pênisgordo": "penisgordo",
  "garotão": "garotao",
  "garotocomtesão": "garotocomtesao",
  "transmissão-direta-pela-internet": "transmissao-direta-pela-internet",
  "fendadopênis": "fendadopenis",
  "chupandopênis": "chupandopenis",
  "pênismolhado": "penismolhado",
  "pênisfalsoempacote": "penisfalsoempacote",
  "papaideaçúcar": "papaideacucar",
  "bebêdeaçúcar": "bebedeacucar",
  "remoparacães": "remoparacaes",
  "vídeodeorgasmo": "vídeo-deorgasmo",
  "serviçomasculino": "serviço-masculino",
  "orgasmofeminino": "orgasmo-feminino",
  "agarotadeóculos": "agarotadeóculos",
  "youngwoman": "young-woman",
  "face-sitting": "face-sitting",
  "-reverse-cowgirl":  "reverse-cowgirl",
}





export default function ({ route, redirect, app }) {
  const currentLocale = app.i18n.locale
  const { name, params } = route;
  if( name.indexOf("tag-name") != -1 && tagsUrl[params.name] ){
    if( currentLocale != "en" ){
      redirect(`/${currentLocale}/tag/${tagsUrl[params.name]}`)
    }else{
      redirect(`/tag/${tagsUrl[params.name]}`)
    }
  }
  // 如果路由不匹配任何页面，重定向到当前语言的首页
  if (route.matched.length == 0) {
    redirect(`/`)
  }
}