export type Department = {
  id: string
  name: string
  nameEn: string
  group: "basic" | "specialized"
}

export const BASIC_DEPARTMENTS: Department[] = [
  {
    id: "preparatory-english",
    name: "Bộ môn Tiếng Anh dự bị",
    nameEn: "Preparatory English Department",
    group: "basic",
  },
  {
    id: "traditional-music",
    name: "Bộ môn Âm nhạc Truyền thống",
    nameEn: "Traditional Music Department",
    group: "basic",
  },
  {
    id: "soft-skills",
    name: "Bộ môn Kỹ năng mềm",
    nameEn: "Soft Skills Department",
    group: "basic",
  },
  {
    id: "politics",
    name: "Bộ môn Chính trị",
    nameEn: "Politics Department",
    group: "basic",
  },
  {
    id: "mathematics",
    name: "Bộ môn Toán",
    nameEn: "Mathematics Department",
    group: "basic",
  },
  {
    id: "physical-education",
    name: "Bộ môn Giáo dục thể chất",
    nameEn: "Physical Education Department",
    group: "basic",
  },
  {
    id: "software-engineering",
    name: "Bộ môn Kỹ thuật phần mềm",
    nameEn: "Software Engineering Department",
    group: "basic",
  },
]

export const SPECIALIZED_DEPARTMENTS: Department[] = [
  {
    id: "digital-animation",
    name: "Bộ môn Hoạt hình kỹ thuật số",
    nameEn: "Digital Animation Department",
    group: "specialized",
  },
  {
    id: "multimedia-communications",
    name: "Bộ môn Quản trị Truyền thông đa phương tiện",
    nameEn: "Multimedia Communications Management Department",
    group: "specialized",
  },
  {
    id: "japanese-language",
    name: "Bộ môn tiếng Nhật",
    nameEn: "Japanese Language Department",
    group: "specialized",
  },
  {
    id: "business-administration",
    name: "Bộ môn Quản trị doanh nghiệp",
    nameEn: "Business Administration Department",
    group: "specialized",
  },
  {
    id: "graphic-design",
    name: "Bộ môn Thiết kế đồ họa",
    nameEn: "Graphic Design Department",
    group: "specialized",
  },
  {
    id: "tourism-hotel-management",
    name: "Bộ môn Quản trị Du lịch và khách sạn",
    nameEn: "Tourism and Hotel Management Department",
    group: "specialized",
  },
  {
    id: "cf",
    name: "Bộ môn CF",
    nameEn: "CF Department",
    group: "specialized",
  },
  {
    id: "startup-development",
    name: "Bộ môn Phát triển khởi nghiệp",
    nameEn: "Startup Development Department",
    group: "specialized",
  },
  {
    id: "specialized-english",
    name: "Bộ môn Tiếng Anh chuyên ngành",
    nameEn: "Specialized English Department",
    group: "specialized",
  },
  {
    id: "information-security",
    name: "Bộ môn An toàn thông tin",
    nameEn: "Information Security Department",
    group: "specialized",
  },
  {
    id: "its",
    name: "Bộ môn ITS",
    nameEn: "ITS Department",
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
