export type Department = {
  id: string
  name: string
  nameEn: string
  group: "basic" | "specialized"
}

export const BASIC_DEPARTMENTS: Department[] = [
  {
    id: "preparatory-english",
    name: "Tiếng Anh dự bị",
    nameEn: "Preparatory English",
    group: "basic",
  },
  {
    id: "traditional-music",
    name: "Âm nhạc Truyền thống",
    nameEn: "Traditional Music",
    group: "basic",
  },
  {
    id: "soft-skills",
    name: "Kỹ năng mềm",
    nameEn: "Soft Skills",
    group: "basic",
  },
  {
    id: "politics",
    name: "Chính trị",
    nameEn: "Politics",
    group: "basic",
  },
  {
    id: "mathematics",
    name: "Toán",
    nameEn: "Mathematics",
    group: "basic",
  },
  {
    id: "physical-education",
    name: "Giáo dục thể chất",
    nameEn: "Physical Education",
    group: "basic",
  },
  {
    id: "software-engineering",
    name: "Kỹ thuật phần mềm",
    nameEn: "Software Engineering",
    group: "basic",
  },
]

export const SPECIALIZED_DEPARTMENTS: Department[] = [
  {
    id: "digital-animation",
    name: "Hoạt hình kỹ thuật số",
    nameEn: "Digital Animation",
    group: "specialized",
  },
  {
    id: "multimedia-communications",
    name: "Quản trị Truyền thông đa phương tiện",
    nameEn: "Multimedia Communications Management",
    group: "specialized",
  },
  {
    id: "japanese-language",
    name: "Tiếng Nhật",
    nameEn: "Japanese Language",
    group: "specialized",
  },
  {
    id: "business-administration",
    name: "Quản trị doanh nghiệp",
    nameEn: "Business Administration",
    group: "specialized",
  },
  {
    id: "graphic-design",
    name: "Thiết kế đồ họa",
    nameEn: "Graphic Design",
    group: "specialized",
  },
  {
    id: "tourism-hotel-management",
    name: "Quản trị Du lịch và khách sạn",
    nameEn: "Tourism and Hotel Management",
    group: "specialized",
  },
  {
    id: "cf",
    name: "CF",
    nameEn: "CF",
    group: "specialized",
  },
  {
    id: "startup-development",
    name: "Phát triển khởi nghiệp",
    nameEn: "Startup Development",
    group: "specialized",
  },
  {
    id: "specialized-english",
    name: "Tiếng Anh chuyên ngành",
    nameEn: "Specialized English",
    group: "specialized",
  },
  {
    id: "information-security",
    name: "An toàn thông tin",
    nameEn: "Information Security",
    group: "specialized",
  },
  {
    id: "its",
    name: "ITS",
    nameEn: "ITS",
    group: "specialized",
  },
]

export const ALL_DEPARTMENTS: Department[] = [
  ...BASIC_DEPARTMENTS,
  ...SPECIALIZED_DEPARTMENTS,
]

export const DEPARTMENT_GROUPS = {
  BASIC: "basic" as const,
  SPECIALIZED: "specialized" as const,
} as const

export const getDepartmentsByGroup = (
  group: "basic" | "specialized"
): Department[] => {
  return ALL_DEPARTMENTS.filter((dept) => dept.group === group)
}

export const getDepartmentById = (id: string): Department | undefined => {
  return ALL_DEPARTMENTS.find((dept) => dept.id === id)
}
