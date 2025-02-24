export const EsbilshesLevel = [
    {
    id:1,
    key:"first",
    name:"هيكل رئيسى" 
  },
  {
    id:2,
    key:"second",
    name:"هيكل فرعى تانى" 
  },
  {
    id:3,
    key:"third",
    name:"هيكل فرعى ثالث" 
  },
  {
    id:4,
    key:"fourth",
    name:"هيكل فرعى رابع"
  }
     ]
     export const inputFields = [
 
      {
        id: "02",
        type: "number",
        name: "عدد",
        key: "count",
        category: "genarlildata",
      },
 
      {
        id: "04",
        type: "text",
        name: "المورد",
        key: "supplier",
        category: "finnincedata",
      },
      {
        id: "05",
        type: "text",
        name: "الشركة المصنعة",
        key: "manufacturingCompany",
        category: "finnincedata",
      },
      {
        id: "06",
        type: "number",
        name: "القيمة المالية",
        key: "financialValue",
        category: "finnincedata",
      },
      {
        id: "07",
        type: "date",
        name: "تاريخ الشراء",
        key: "purchaseDate",
        category: "finnincedata",
      },
      {
        id: "08",
        type: "date",
        name: "تاريخ الصيانة الإخيره",
        key: "lastMaintenanceDate",
        category: "genarlildataWorks",
      },
      {
        id: "09",
        type: "date",
        name: "تاريخ الصيانة القادمة",
        key: "nextMaintenanceDate",
        category: "genarlildataWorks",
      },
      {
        id: "10",
        type: "select",
        name: "حالة الإصل",
        key: "kind",
        category: "genarlildata",
        options: [
          { value: "", label: "قم بإختيار النوع" },
          { value: "صالح الإستخدام", label: "صالح الإستخدام" },
          { value: "غير صالح للإستخدام", label: "غير صالح للإستخدام" },
          { value: "بحاجة لصيانة", label: "بحاجة لصيانة" },
        ],
      },
      {
        id: "12",
        type: "select",
        name: "نوع الإصل",
        key: "assettype",
        category: "genarlildata",
        options: [
          { value: "", label: "قم بإختيار النوع" },
      { value: "مضخة الجوكي", label: "مضخة الجوكي" },
      { value: "مضخة الكهرباء", label: "مضخة الكهرباء" },
      { value: "مضخة الديزل", label: "مضخة الديزل" },
      { value: "طفاية ماء", label: "طفاية ماء" },
      { value: "طفاية الرغوة", label: "طفاية الرغوة" },
      { value: "طفاية غاز ثاني أكسيد الكربون", label: "طفاية غاز ثاني أكسيد الكربون" },
      { value: "طفاية مسحوق جاف", label: "طفاية مسحوق جاف" },
      { value: "طفاية المواد الكيميائية الرطبة", label: "طفاية المواد الكيميائية الرطبة" },
      { value: "كاشف دخان", label: "كاشف دخان" },
      { value: "كاشف حرارة", label: "كاشف حرارة" },
      { value: "دش الطوارئ", label: "دش الطوارئ" },
      { value: "مفسلة العيون", label: "مفسلة العيون" },
      { value: "دش الطوارئ ومفسلة العيون", label: "دش الطوارئ ومفسلة العيون" },
      { value: "لوحات الطوارئ المضيفة", label: "لوحات الطوارئ المضيفة" },
      { value: "حقيبة إسعافات أولية", label: "حقيبة إسعافات أولية" },
      { value: "جرس طلب المساعدة فى دورات المياه", label: "جرس طلب المساعدة فى دورات المياه" },
      { value: "ملصقات السلامة", label: "ملصقات السلامة" },
      { value: "خزانات مقاومة للحريق للمواد الكيميائية", label: "خزانات مقاومة للحريق للمواد الكيميائية" },
      { value: "داخلية", label: "داخلية" },
      { value: "خارجية", label: "خارجية" },
      { value: "بصمة", label: "بصمة" },
      { value: "رقم سري", label: "رقم سري" },
      { value: "بطاقة", label: "بطاقة" },
      { value: "أخرى", label: "أخرى" },
        ],
      },
      
      {
        id: "11",
        type: "textarea",
        name: "ملاحظات",
        key: "notes",
        category: "genarlildata",
      },
      {
        id: "13",
        type: "textarea",
        name: "ملاحظات السلامة",
        key: "MaintenanceNotes",
        category: "genarlildataWorks",
      },
      {
        id: "14",
        type: "textarea",
        name: "ملاحظات مدير الأصول",
        key: "mangerNotes",
        category: "finnincedata",
      },
      {
        id: "15",
        type: "text",
        name: "الرقم التسلسلي",
        key: "Serialnumber",
        category: "genarlildata",
      },
   
      {
        id: "17", // Unique ID for this field
        type: "select",
        name: "الحجم", // Label for the select field
        key: "size", // Key for form data (e.g., formData.size)
        category: "generalData", // Category to filter this field
        options: [
          { value: "", label: "اختر الحجم" }, // Default option
          { value: "1 كجم", label: "1 كجم" },
          { value: "2 كجم", label: "2 كجم" },
          { value: "4 كجم", label: "4 كجم" },
          { value: "5 كجم", label: "5 كجم" },
          { value: "6 كجم", label: "6 كجم" },
          { value: "9 لتر", label: "9 لتر" },
          { value: "12 لتر", label: "12 لتر" },
        ],
      },
      {
        id: "18",
        type: "text",
        name: "رقم الكاشف",
        key: "detectorNumber",
        category: "genarlildata",
      },
      {
        id: "19",
        type: "text",
        name: "عدد المسالك المؤدية إليه",
        key: "methodsNumber",
        category: "genarlildata",
      },
      {
        id: "20",
        type: "text",
        name: "رقم الباب",
        key: "DoorNmber",
        category: "genarlildata",
      },
      {
        id: "21",
        type: "text",
        name: "الموقع",
        key: "locationtext",
        category: "genarlildata",
      },
      {
        id: "22",
        type: "text",
        name: "ملاحظات الأمن",
        key: "securtNotes",
        category: "genarlildataWorks",
      },
      {
        id: "23",
        type: "text",
        name: "اسم الوسيلة الأمنية",
        key: "securtmethodname",
        category: "genarlildata",
      },
      {
        id: "24",
        type: "text",
        name: "الغرض من استخدامها",
        key: "securtmethodtype",
        category: "genarlildata",
      },
      {
        id: "25",
        type: "text",
        name: "مكان تخزينها أو استخدامها",
        key: "securtmethodStorage2",
        category: "genarlildata",
      },
      {
        id: "30",
        type: "text",
        name: "تاريخ انتهاء الاستمارة",
        key: "securtmethodStorage",
        category: "genarlildata",
      },
      {
        id: "31",
        type: "text",
        name: "نوع المركبة",
        key: "carType",
        category: "genarlildata",
      },
      {
        id: "32",
        type: "text",
        name: "رقم اللوحة",
        key: "panelNumber",
        category: "genarlildata",
      },
      {
        id: "33",
        type: "text",
        name: "سنة الصنع",
        key: "exportDate",
        category: "genarlildata",
      },
    ];   