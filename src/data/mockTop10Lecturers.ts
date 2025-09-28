import { Lecture } from "../interfaces/Lecture/Lecture"

export const mockTop10Lecturers: Lecture[] = [
  {
    id: "lecturer-001",
    name: "Nguyễn Thị Minh Anh",
    email: "minhanh.nguyen@iia.edu.vn",
    department: "Bộ môn Kỹ thuật phần mềm",
    quote:
      "Công nghệ là cầu nối giữa ý tưởng và hiện thực. Hãy để tôi giúp các em xây dựng những cây cầu vững chắc nhất.",
    avatarUrl: "/images/lecturer-1.jpg",
    votes: 1247,
  },
  {
    id: "lecturer-002",
    name: "Trần Văn Đức",
    email: "duc.tran@iia.edu.vn",
    department: "Bộ môn Thiết kế đồ họa",
    quote:
      "Thiết kế không chỉ là tạo ra cái đẹp, mà là giải quyết vấn đề một cách sáng tạo và hiệu quả.",
    avatarUrl: "/images/lecturer-2.jpg",
    votes: 1156,
  },
  {
    id: "lecturer-003",
    name: "Lê Thị Hương",
    email: "huong.le@iia.edu.vn",
    department: "Bộ môn Quản trị doanh nghiệp",
    quote:
      "Kinh doanh thành công không chỉ dựa vào kiến thức mà còn cần tư duy chiến lược và khả năng thích ứng.",
    avatarUrl: "/images/lecturer-3.jpg",
    votes: 1089,
  },
  {
    id: "lecturer-004",
    name: "Phạm Minh Tuấn",
    email: "tuan.pham@iia.edu.vn",
    department: "Bộ môn Hoạt hình kỹ thuật số",
    quote:
      "Hoạt hình là nghệ thuật mang sự sống vào những ý tưởng tưởng chừng như không thể.",
    avatarUrl: "/images/lecturer-4.jpg",
    votes: 1023,
  },
  {
    id: "lecturer-005",
    name: "Hoàng Thị Lan",
    email: "lan.hoang@iia.edu.vn",
    department: "Bộ môn Tiếng Anh chuyên ngành",
    quote:
      "Ngôn ngữ là chìa khóa mở ra thế giới. Hãy để tôi giúp các em chinh phục tiếng Anh một cách tự nhiên nhất.",
    avatarUrl: "/images/lecturer-5.jpg",
    votes: 987,
  },
  {
    id: "lecturer-006",
    name: "Vũ Đình Khang",
    email: "khang.vu@iia.edu.vn",
    department: "Bộ môn An toàn thông tin",
    quote:
      "Bảo mật không phải là sản phẩm, mà là quá trình. Hãy học cách bảo vệ thông tin một cách thông minh.",
    avatarUrl: "/images/lecturer-6.jpg",
    votes: 945,
  },
  {
    id: "lecturer-007",
    name: "Đặng Thị Mai",
    email: "mai.dang@iia.edu.vn",
    department: "Bộ môn Quản trị Du lịch và khách sạn",
    quote:
      "Du lịch là cầu nối văn hóa, là cơ hội để khám phá và trải nghiệm những điều tuyệt vời nhất của thế giới.",
    avatarUrl: "/images/lecturer-7.jpg",
    votes: 892,
  },
  {
    id: "lecturer-008",
    name: "Bùi Văn Hùng",
    email: "hung.bui@iia.edu.vn",
    department: "Bộ môn Phát triển khởi nghiệp",
    quote:
      "Khởi nghiệp không chỉ là tạo ra doanh nghiệp, mà là tạo ra giá trị và giải quyết vấn đề thực tế.",
    avatarUrl: "/images/lecturer-8.jpg",
    votes: 856,
  },
  {
    id: "lecturer-009",
    name: "Ngô Thị Thu",
    email: "thu.ngo@iia.edu.vn",
    department: "Bộ môn tiếng Nhật",
    quote:
      "Học tiếng Nhật không chỉ là học ngôn ngữ, mà còn là học cách tư duy và văn hóa của một dân tộc.",
    avatarUrl: "/images/lecturer-9.jpg",
    votes: 823,
  },
  {
    id: "lecturer-010",
    name: "Lý Văn Nam",
    email: "nam.ly@iia.edu.vn",
    department: "Bộ môn Quản trị Truyền thông đa phương tiện",
    quote:
      "Truyền thông đa phương tiện là nghệ thuật kể chuyện bằng công nghệ, tạo ra những trải nghiệm đáng nhớ.",
    avatarUrl: "/images/lecturer-10.jpg",
    votes: 798,
  },
]

// Helper function to get top 10 lecturers sorted by vote count
export const getTop10Lecturers = (): Lecture[] => {
  return mockTop10Lecturers.sort((a, b) => b.votes - a.votes)
}

// Helper function to get lecturer by rank (1-10)
export const getLecturerByRank = (rank: number): Lecture | undefined => {
  const sortedLecturers = getTop10Lecturers()
  return sortedLecturers[rank - 1]
}
