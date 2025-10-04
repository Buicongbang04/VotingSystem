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
    id: "physical-education",
    name: "Giáo dục thể chất",
    nameEn: "Physical Education",
    group: "basic",
  },
  {
    id: "mathematics",
    name: "Toán",
    nameEn: "Mathematics",
    group: "basic",
  },
]

export const SPECIALIZED_DEPARTMENTS: Department[] = [
  {
    id: "software-engineering",
    name: "Kỹ thuật phần mềm",
    nameEn: "Software Engineering",
    group: "specialized",
  },
  {
    id: "information-security",
    name: "An toàn thông tin",
    nameEn: "Information Security",
    group: "specialized",
  },
  {
    id: "artificial-intelligence",
    name: "Trí tuệ nhân tạo",
    nameEn: "Artificial Intelligence",
    group: "specialized",
  },
  {
    id: "information-systems",
    name: "Hệ thống thông tin",
    nameEn: "Information Systems",
    group: "specialized",
  },
  {
    id: "computer-fundamentals",
    name: "Nền tảng máy tính",
    nameEn: "Computer Fundamentals",
    group: "specialized",
  },
  {
    id: "business-administration",
    name: "Quản trị doanh nghiệp",
    nameEn: "Business Administration",
    group: "specialized",
  },
  {
    id: "startup-development",
    name: "Phát triển khởi nghiệp",
    nameEn: "Startup Development",
    group: "specialized",
  },
  {
    id: "communication-technology",
    name: "Công nghệ truyền thông",
    nameEn: "Communication Technology",
    group: "specialized",
  },
  {
    id: "digital-fine-arts",
    name: "Thiết kế mỹ thuật số",
    nameEn: "Digital Fine Arts Design",
    group: "specialized",
  },
  {
    id: "english",
    name: "Tiếng Anh",
    nameEn: "English",
    group: "specialized",
  },
  {
    id: "japanese-language",
    name: "Tiếng Nhật",
    nameEn: "Japanese Language",
    group: "specialized",
  },
  {
    id: "politics",
    name: "Chính trị",
    nameEn: "Politics",
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
